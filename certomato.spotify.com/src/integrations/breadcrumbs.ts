/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-lines */
import { getCurrentHub } from '@sentry/core';
import { Event, Integration, Severity } from '@sentry/types';
import {
  addInstrumentationHandler,
  getEventDescription,
  getGlobalObject,
  htmlTreeAsString,
  parseUrl,
  safeJoin,
} from '@sentry/utils';

/** JSDoc */
interface BreadcrumbsOptions {
  console: boolean;
  dom: boolean;
  fetch: boolean;
  history: boolean;
  sentry: boolean;
  xhr: boolean;
}

/**
 * Default Breadcrumbs instrumentations
 * TODO: Deprecated - with v6, this will be renamed to `Instrument`
 */
export class Breadcrumbs implements Integration {
  /**
   * @inheritDoc
   */
  public static id: string = 'Breadcrumbs';

  /**
   * @inheritDoc
   */
  public name: string = Breadcrumbs.id;

  /** JSDoc */
  private readonly _options: BreadcrumbsOptions;

  /**
   * @inheritDoc
   */
  public constructor(options?: Partial<BreadcrumbsOptions>) {
    this._options = {
      console: true,
      dom: true,
      fetch: true,
      history: true,
      sentry: true,
      xhr: true,
      ...options,
    };
  }

  /**
   * Create a breadcrumb of `sentry` from the events themselves
   */
  public addSentryBreadcrumb(event: Event): void {
    if (!this._options.sentry) {
      return;
    }
    getCurrentHub().addBreadcrumb(
      {
        category: `sentry.${event.type === 'transaction' ? 'transaction' : 'event'}`,
        event_id: event.event_id,
        level: event.level,
        message: getEventDescription(event),
      },
      {
        event,
      },
    );
  }

  /**
   * Instrument browser built-ins w/ breadcrumb capturing
   *  - Console API
   *  - DOM API (click/typing)
   *  - XMLHttpRequest API
   *  - Fetch API
   *  - History API
   */
  public setupOnce(): void {
    if (this._options.console) {
      addInstrumentationHandler({
        callback: (...args) => {
          this._consoleBreadcrumb(...args);
        },
        type: 'console',
      });
    }
    if (this._options.dom) {
      addInstrumentationHandler({
        callback: (...args) => {
          this._domBreadcrumb(...args);
        },
        type: 'dom',
      });
    }
    if (this._options.xhr) {
      addInstrumentationHandler({
        callback: (...args) => {
          this._xhrBreadcrumb(...args);
        },
        type: 'xhr',
      });
    }
    if (this._options.fetch) {
      addInstrumentationHandler({
        callback: (...args) => {
          this._fetchBreadcrumb(...args);
        },
        type: 'fetch',
      });
    }
    if (this._options.history) {
      addInstrumentationHandler({
        callback: (...args) => {
          this._historyBreadcrumb(...args);
        },
        type: 'history',
      });
    }
  }

  /**
   * Creates breadcrumbs from console API calls
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _consoleBreadcrumb(handlerData: { [key: string]: any }): void {
    const breadcrumb = {
      category: 'console',
      data: {
        arguments: handlerData.args,
        logger: 'console',
      },
      level: Severity.fromString(handlerData.level),
      message: safeJoin(handlerData.args, ' '),
    };

    if (handlerData.level === 'assert') {
      if (handlerData.args[0] === false) {
        breadcrumb.message = `Assertion failed: ${safeJoin(handlerData.args.slice(1), ' ') || 'console.assert'}`;
        breadcrumb.data.arguments = handlerData.args.slice(1);
      } else {
        // Don't capture a breadcrumb for passed assertions
        return;
      }
    }

    getCurrentHub().addBreadcrumb(breadcrumb, {
      input: handlerData.args,
      level: handlerData.level,
    });
  }

  /**
   * Creates breadcrumbs from DOM API calls
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _domBreadcrumb(handlerData: { [key: string]: any }): void {
    let target;

    // Accessing event.target can throw (see getsentry/raven-js#838, #768)
    try {
      target = handlerData.event.target
        ? htmlTreeAsString(handlerData.event.target as Node)
        : htmlTreeAsString((handlerData.event as unknown) as Node);
    } catch (e) {
      target = '<unknown>';
    }

    if (target.length === 0) {
      return;
    }

    getCurrentHub().addBreadcrumb(
      {
        category: `ui.${handlerData.name}`,
        message: target,
      },
      {
        event: handlerData.event,
        name: handlerData.name,
        global: handlerData.global,
      },
    );
  }

  /**
   * Creates breadcrumbs from XHR API calls
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xhrBreadcrumb(handlerData: { [key: string]: any }): void {
    if (handlerData.endTimestamp) {
      // We only capture complete, non-sentry requests
      if (handlerData.xhr.__sentry_own_request__) {
        return;
      }

      const { method, url, status_code, body } = handlerData.xhr.__sentry_xhr__ || {};

      getCurrentHub().addBreadcrumb(
        {
          category: 'xhr',
          data: {
            method,
            url,
            status_code,
          },
          type: 'http',
        },
        {
          xhr: handlerData.xhr,
          input: body,
        },
      );

      return;
    }
  }

  /**
   * Creates breadcrumbs from fetch API calls
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fetchBreadcrumb(handlerData: { [key: string]: any }): void {
    // We only capture complete fetch requests
    if (!handlerData.endTimestamp) {
      return;
    }

    if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === 'POST') {
      // We will not create breadcrumbs for fetch requests that contain `sentry_key` (internal sentry requests)
      return;
    }

    if (handlerData.error) {
      getCurrentHub().addBreadcrumb(
        {
          category: 'fetch',
          data: handlerData.fetchData,
          level: Severity.Error,
          type: 'http',
        },
        {
          data: handlerData.error,
          input: handlerData.args,
        },
      );
    } else {
      getCurrentHub().addBreadcrumb(
        {
          category: 'fetch',
          data: {
            ...handlerData.fetchData,
            status_code: handlerData.response.status,
          },
          type: 'http',
        },
        {
          input: handlerData.args,
          response: handlerData.response,
        },
      );
    }
  }

  /**
   * Creates breadcrumbs from history API calls
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _historyBreadcrumb(handlerData: { [key: string]: any }): void {
    const global = getGlobalObject<Window>();
    let from = handlerData.from;
    let to = handlerData.to;
    const parsedLoc = parseUrl(global.location.href);
    let parsedFrom = parseUrl(from);
    const parsedTo = parseUrl(to);

    // Initial pushState doesn't provide `from` information
    if (!parsedFrom.path) {
      parsedFrom = parsedLoc;
    }

    // Use only the path component of the URL if the URL matches the current
    // document (almost all the time when using pushState)
    if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
      to = parsedTo.relative;
    }
    if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
      from = parsedFrom.relative;
    }

    getCurrentHub().addBreadcrumb({
      category: 'navigation',
      data: {
        from,
        to,
      },
    });
  }
}
