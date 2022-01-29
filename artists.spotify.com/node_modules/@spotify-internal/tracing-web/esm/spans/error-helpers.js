import { Tags } from 'opentracing';
import { Logs } from '..';
export function finishWithError(span, err) {
    withError(span, err);
    span.finish();
    return span;
}
export function withError(span, err) {
    span.setTag(Tags.ERROR, true);
    span.log({
        [Logs.EVENT]: 'error',
        [Logs.ERROR_OBJECT]: err,
        [Logs.ERROR_KIND]: err.name,
        [Logs.MESSAGE]: err.message,
        [Logs.STACK]: err.stack,
    });
    return span;
}
//# sourceMappingURL=error-helpers.js.map