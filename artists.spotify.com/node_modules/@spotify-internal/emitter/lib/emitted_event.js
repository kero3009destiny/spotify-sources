/**
 * An event object.
 *
 * @typeParam T - The type of the `data` property of this event.
 */
export class EmittedEvent {
    /**
     * @param type - The name of the event
     * @param data - The data that is associated with the event.
     */
    constructor(type, data) {
        /**
         * A flag that indicates whether the `preventDefault()` method has been called
         * on this event.
         */
        this.defaultPrevented = false;
        /**
         * A flag that indicates whether the `stopImmediatePropagation()` method has
         * been called on this event.
         */
        this.immediateStopped = false;
        /**
         * A flag that indicates whether the `stopPropagation()` method has been
         * called on this event.
         */
        this.stopped = false;
        this.type = type;
        this.data = data;
    }
    /**
     * Prevents the default behaviour of this event.
     *
     * Note that whether this is respected is dependent on the emitter itself.
     */
    preventDefault() {
        this.defaultPrevented = true;
    }
    /**
     * Stops the propagation of the event.
     *
     * Note that whether this is respected is dependent on the emitter itself.
     *
     * In cases of proxied events, calling this method prevents the proxies from
     * emitting this event.
     */
    stopPropagation() {
        this.stopped = true;
    }
    /**
     * Stops the immediate propagation of the event.
     *
     * Event listeners are called in the order they were added. Calling this
     * method inside a listener prevents the emitter from calling listeners after
     * the current one.
     */
    stopImmediatePropagation() {
        this.immediateStopped = true;
    }
}
//# sourceMappingURL=emitted_event.js.map