export class DummyLogger {
    constructor() {
        this.tag = '';
        this.description = '';
    }
    matchesTag() {
        return false;
    }
    setLevel() { }
    enable() { }
    disable() { }
    log() { }
    debug() { }
    info() { }
    warn() { }
    error() { }
}
//# sourceMappingURL=dummy_logger.js.map