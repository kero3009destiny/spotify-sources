import { EventEmitter } from '@spotify-internal/emitter';
import { Event } from '../enums/event';
export class ConnectionObserver extends EventEmitter {
    constructor(options) {
        super();
        const hasWindow = typeof window !== 'undefined';
        const notifyBeforeUnload = options && options.notifyBeforeUnload;
        this._navigator = (hasWindow && window.navigator) || null;
        if (hasWindow && typeof window.addEventListener === 'function') {
            window.addEventListener('online', this.emitSync.bind(this, Event.CONNECTION_ONLINE, null));
            window.addEventListener('offline', this.emitSync.bind(this, Event.CONNECTION_OFFLINE, null));
            if (notifyBeforeUnload) {
                window.addEventListener(Event.WINDOW_BEFORE_UNLOAD, this.emitSync.bind(this, Event.WINDOW_BEFORE_UNLOAD, null));
            }
        }
    }
    static create(options) {
        return new ConnectionObserver(options);
    }
    isOnline() {
        const navigator = this._navigator;
        if (navigator && 'onLine' in navigator) {
            return navigator.onLine;
        }
        return true;
    }
}
//# sourceMappingURL=connection_observer.js.map