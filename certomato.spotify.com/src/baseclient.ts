/* eslint-disable max-lines */
import { Scope, Session } from '@sentry/hub';
import {
  Client,
  Event,
  EventHint,
  Integration,
  IntegrationClass,
  Options,
  SessionStatus,
  Severity,
} from '@sentry/types';
import {
  dateTimestampInSeconds,
  Dsn,
  isPrimitive,
  isThenable,
  logger,
  normalize,
  SentryError,
  SyncPromise,
  truncate,
  uuid4,
} from '@sentry/utils';

import { Backend, BackendClass } from './basebackend';
import { IntegrationIndex, setupIntegrations } from './integration';

/**
 * Base implementation for all JavaScript SDK clients.
 *
 * Call the constructor with the corresponding backend constructor and options
 * specific to the client subclass. To access these options later, use
 * {@link Client.getOptions}. Also, the Backend instance is available via
 * {@link Client.getBackend}.
 *
 * If a Dsn is specified in the options, it will be parsed and stored. Use
 * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
 * invalid, the constructor will throw a {@link SentryException}. Note that
 * without a valid Dsn, the SDK will not send any events to Sentry.
 *
 * Before sending an event via the backend, it is passed through
 * {@link BaseClient._prepareEvent} to add SDK information and scope data
 * (breadcrumbs and context). To add more custom information, override this
 * method and extend the resulting prepared event.
 *
 * To issue automatically created events (e.g. via instrumentation), use
 * {@link Client.captureEvent}. It will prepare the event and pass it through
 * the callback lifecycle. To issue auto-breadcrumbs, use
 * {@link Client.addBreadcrumb}.
 *
 * @example
 * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(NodeBackend, options);
 *   }
 *
 *   // ...
 * }
 */
export abstract class BaseClient<B extends Backend, O extends Options> implements Client<O> {
  /**
   * The backend used to physically interact in the environment. Usually, this
   * will correspond to the client. When composing SDKs, however, the Backend
   * from the root SDK will be used.
   */
  protected readonly _backend: B;

  /** Options passed to the SDK. */
  protected readonly _options: O;

  /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
  protected readonly _dsn?: Dsn;

  /** Array of used integrations. */
  protected _integrations: IntegrationIndex = {};

  /** Number of call being processed */
  protected _processing: number = 0;

  /**
   * Initializes this client instance.
   *
   * @param backendClass A constructor function to create the backend.
   * @param options Options for the client.
   */
  protected constructor(backendClass: BackendClass<B, O>, options: O) {
    this._backend = new backendClass(options);
    this._options = options;

    if (options.dsn) {
      this._dsn = new Dsn(options.dsn);
    }
  }

  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  public captureException(exception: any, hint?: EventHint, scope?: Scope): string | undefined {
    let eventId: string | undefined = hint && hint.event_id;

    this._process(
      this._getBackend()
        .eventFromException(exception, hint)
        .then(event => this._captureEvent(event, hint, scope))
        .then(result => {
          eventId = result;
        }),
    );

    return eventId;
  }

  /**
   * @inheritDoc
   */
  public captureMessage(message: string, level?: Severity, hint?: EventHint, scope?: Scope): string | undefined {
    let eventId: string | undefined = hint && hint.event_id;

    const promisedEvent = isPrimitive(message)
      ? this._getBackend().eventFromMessage(String(message), level, hint)
      : this._getBackend().eventFromException(message, hint);

    this._process(
      promisedEvent
        .then(event => this._captureEvent(event, hint, scope))
        .then(result => {
          eventId = result;
        }),
    );

    return eventId;
  }

  /**
   * @inheritDoc
   */
  public captureEvent(event: Event, hint?: EventHint, scope?: Scope): string | undefined {
    let eventId: string | undefined = hint && hint.event_id;

    this._process(
      this._captureEvent(event, hint, scope).then(result => {
        eventId = result;
      }),
    );

    return eventId;
  }

  /**
   * @inheritDoc
   */
  public captureSession(session: Session): void {
    if (!session.release) {
      logger.warn('Discarded session because of missing release');
    } else {
      this._sendSession(session);
      // After sending, we set init false to inidcate it's not the first occurence
      session.update({ init: false });
    }
  }

  /**
   * @inheritDoc
   */
  public getDsn(): Dsn | undefined {
    return this._dsn;
  }

  /**
   * @inheritDoc
   */
  public getOptions(): O {
    return this._options;
  }

  /**
   * @inheritDoc
   */
  public flush(timeout?: number): PromiseLike<boolean> {
    return this._isClientProcessing(timeout).then(ready => {
      return this._getBackend()
        .getTransport()
        .close(timeout)
        .then(transportFlushed => ready && transportFlushed);
    });
  }

  /**
   * @inheritDoc
   */
  public close(timeout?: number): PromiseLike<boolean> {
    return this.flush(timeout).then(result => {
      this.getOptions().enabled = false;
      return result;
    });
  }

  /**
   * Sets up the integrations
   */
  public setupIntegrations(): void {
    if (this._isEnabled()) {
      this._integrations = setupIntegrations(this._options);
    }
  }

  /**
   * @inheritDoc
   */
  public getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null {
    try {
      return (this._integrations[integration.id] as T) || null;
    } catch (_oO) {
      logger.warn(`Cannot retrieve integration ${integration.id} from the current Client`);
      return null;
    }
  }

  /** Updates existing session based on the provided event */
  protected _updateSessionFromEvent(session: Session, event: Event): void {
    let crashed = false;
    let errored = false;
    let userAgent;
    const exceptions = event.exception && event.exception.values;

    if (exceptions) {
      errored = true;

      for (const ex of exceptions) {
        const mechanism = ex.mechanism;
        if (mechanism && mechanism.handled === false) {
          crashed = true;
          break;
        }
      }
    }

    const user = event.user;
    if (!session.userAgent) {
      const headers = event.request ? event.request.headers : {};
      for (const key in headers) {
        if (key.toLowerCase() === 'user-agent') {
          userAgent = headers[key];
          break;
        }
      }
    }

    session.update({
      ...(crashed && { status: SessionStatus.Crashed }),
      user,
      userAgent,
      errors: session.errors + Number(errored || crashed),
    });
    this.captureSession(session);
  }

  /** Deliver captured session to Sentry */
  protected _sendSession(session: Session): void {
    this._getBackend().sendSession(session);
  }

  /** Waits for the client to be done with processing. */
  protected _isClientProcessing(timeout?: number): PromiseLike<boolean> {
    return new SyncPromise(resolve => {
      let ticked: number = 0;
      const tick: number = 1;

      const interval = setInterval(() => {
        if (this._processing == 0) {
          clearInterval(interval);
          resolve(true);
        } else {
          ticked += tick;
          if (timeout && ticked >= timeout) {
            clearInterval(interval);
            resolve(false);
          }
        }
      }, tick);
    });
  }

  /** Returns the current backend. */
  protected _getBackend(): B {
    return this._backend;
  }

  /** Determines whether this SDK is enabled and a valid Dsn is present. */
  protected _isEnabled(): boolean {
    return this.getOptions().enabled !== false && this._dsn !== undefined;
  }

  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A new event with more information.
   */
  protected _prepareEvent(event: Event, scope?: Scope, hint?: EventHint): PromiseLike<Event | null> {
    const { normalizeDepth = 3 } = this.getOptions();
    const prepared: Event = {
      ...event,
      event_id: event.event_id || (hint && hint.event_id ? hint.event_id : uuid4()),
      timestamp: event.timestamp || dateTimestampInSeconds(),
    };

    this._applyClientOptions(prepared);
    this._applyIntegrationsMetadata(prepared);

    // If we have scope given to us, use it as the base for further modifications.
    // This allows us to prevent unnecessary copying of data if `captureContext` is not provided.
    let finalScope = scope;
    if (hint && hint.captureContext) {
      finalScope = Scope.clone(finalScope).update(hint.captureContext);
    }

    // We prepare the result here with a resolved Event.
    let result = SyncPromise.resolve<Event | null>(prepared);

    // This should be the last thing called, since we want that
    // {@link Hub.addEventProcessor} gets the finished prepared event.
    if (finalScope) {
      // In case we have a hub we reassign it.
      result = finalScope.applyToEvent(prepared, hint);
    }

    return result.then(evt => {
      if (typeof normalizeDepth === 'number' && normalizeDepth > 0) {
        return this._normalizeEvent(evt, normalizeDepth);
      }
      return evt;
    });
  }

  /**
   * Applies `normalize` function on necessary `Event` attributes to make them safe for serialization.
   * Normalized keys:
   * - `breadcrumbs.data`
   * - `user`
   * - `contexts`
   * - `extra`
   * @param event Event
   * @returns Normalized event
   */
  protected _normalizeEvent(event: Event | null, depth: number): Event | null {
    if (!event) {
      return null;
    }

    const normalized = {
      ...event,
      ...(event.breadcrumbs && {
        breadcrumbs: event.breadcrumbs.map(b => ({
          ...b,
          ...(b.data && {
            data: normalize(b.data, depth),
          }),
        })),
      }),
      ...(event.user && {
        user: normalize(event.user, depth),
      }),
      ...(event.contexts && {
        contexts: normalize(event.contexts, depth),
      }),
      ...(event.extra && {
        extra: normalize(event.extra, depth),
      }),
    };
    // event.contexts.trace stores information about a Transaction. Similarly,
    // event.spans[] stores information about child Spans. Given that a
    // Transaction is conceptually a Span, normalization should apply to both
    // Transactions and Spans consistently.
    // For now the decision is to skip normalization of Transactions and Spans,
    // so this block overwrites the normalized event to add back the original
    // Transaction information prior to normalization.
    if (event.contexts && event.contexts.trace) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      normalized.contexts.trace = event.contexts.trace;
    }
    return normalized;
  }

  /**
   *  Enhances event using the client configuration.
   *  It takes care of all "static" values like environment, release and `dist`,
   *  as well as truncating overly long values.
   * @param event event instance to be enhanced
   */
  protected _applyClientOptions(event: Event): void {
    const options = this.getOptions();
    const { environment, release, dist, maxValueLength = 250 } = options;

    if (!('environment' in event)) {
      event.environment = 'environment' in options ? environment : 'production';
    }

    if (event.release === undefined && release !== undefined) {
      event.release = release;
    }

    if (event.dist === undefined && dist !== undefined) {
      event.dist = dist;
    }

    if (event.message) {
      event.message = truncate(event.message, maxValueLength);
    }

    const exception = event.exception && event.exception.values && event.exception.values[0];
    if (exception && exception.value) {
      exception.value = truncate(exception.value, maxValueLength);
    }

    const request = event.request;
    if (request && request.url) {
      request.url = truncate(request.url, maxValueLength);
    }
  }

  /**
   * This function adds all used integrations to the SDK info in the event.
   * @param event The event that will be filled with all integrations.
   */
  protected _applyIntegrationsMetadata(event: Event): void {
    const sdkInfo = event.sdk;
    const integrationsArray = Object.keys(this._integrations);
    if (sdkInfo && integrationsArray.length > 0) {
      sdkInfo.integrations = integrationsArray;
    }
  }

  /**
   * Tells the backend to send this event
   * @param event The Sentry event to send
   */
  protected _sendEvent(event: Event): void {
    this._getBackend().sendEvent(event);
  }

  /**
   * Processes the event and logs an error in case of rejection
   * @param event
   * @param hint
   * @param scope
   */
  protected _captureEvent(event: Event, hint?: EventHint, scope?: Scope): PromiseLike<string | undefined> {
    return this._processEvent(event, hint, scope).then(
      finalEvent => {
        return finalEvent.event_id;
      },
      reason => {
        logger.error(reason);
        return undefined;
      },
    );
  }

  /**
   * Processes an event (either error or message) and sends it to Sentry.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Sentry.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */
  protected _processEvent(event: Event, hint?: EventHint, scope?: Scope): PromiseLike<Event> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { beforeSend, sampleRate } = this.getOptions();

    if (!this._isEnabled()) {
      return SyncPromise.reject(new SentryError('SDK not enabled, will not send event.'));
    }

    const isTransaction = event.type === 'transaction';
    // 1.0 === 100% events are sent
    // 0.0 === 0% events are sent
    // Sampling for transaction happens somewhere else
    if (!isTransaction && typeof sampleRate === 'number' && Math.random() > sampleRate) {
      return SyncPromise.reject(
        new SentryError(
          `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`,
        ),
      );
    }

    return this._prepareEvent(event, scope, hint)
      .then(prepared => {
        if (prepared === null) {
          throw new SentryError('An event processor returned null, will not send event.');
        }

        const isInternalException = hint && hint.data && (hint.data as { __sentry__: boolean }).__sentry__ === true;
        if (isInternalException || isTransaction || !beforeSend) {
          return prepared;
        }

        const beforeSendResult = beforeSend(prepared, hint);
        if (typeof beforeSendResult === 'undefined') {
          throw new SentryError('`beforeSend` method has to return `null` or a valid event.');
        } else if (isThenable(beforeSendResult)) {
          return (beforeSendResult as PromiseLike<Event | null>).then(
            event => event,
            e => {
              throw new SentryError(`beforeSend rejected with ${e}`);
            },
          );
        }
        return beforeSendResult;
      })
      .then(processedEvent => {
        if (processedEvent === null) {
          throw new SentryError('`beforeSend` returned `null`, will not send event.');
        }

        const session = scope && scope.getSession && scope.getSession();
        if (!isTransaction && session) {
          this._updateSessionFromEvent(session, processedEvent);
        }

        this._sendEvent(processedEvent);
        return processedEvent;
      })
      .then(null, reason => {
        if (reason instanceof SentryError) {
          throw reason;
        }

        this.captureException(reason, {
          data: {
            __sentry__: true,
          },
          originalException: reason as Error,
        });
        throw new SentryError(
          `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${reason}`,
        );
      });
  }

  /**
   * Occupies the client with processing and event
   */
  protected _process<T>(promise: PromiseLike<T>): void {
    this._processing += 1;
    promise.then(
      value => {
        this._processing -= 1;
        return value;
      },
      reason => {
        this._processing -= 1;
        return reason;
      },
    );
  }
}
