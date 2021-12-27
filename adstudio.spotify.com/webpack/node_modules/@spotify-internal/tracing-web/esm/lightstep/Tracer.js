import { Tracer as LightstepTracer } from 'lightstep-tracer';
import * as opentracing from 'opentracing';
import { hexToIntString, intToHexString } from './util';
const OT_TRACE_ID_CHARS = 32;
export class StackdriverTracer extends LightstepTracer {
    inject(spanContext, format, carrier) {
        LightstepTracer.prototype.inject.call(this, spanContext, format, carrier);
        if (format !== opentracing.FORMAT_HTTP_HEADERS &&
            format !== opentracing.FORMAT_TEXT_MAP) {
            return;
        }
        const injectedLSCarrier = carrier;
        const traceGuid = spanContext.traceGUID();
        const spanGuid = injectedLSCarrier['ot-tracer-spanid'];
        const traceGuidForHeader = traceGuid.padEnd(OT_TRACE_ID_CHARS, '0');
        const spanGuidForHeader = hexToIntString(spanGuid);
        const traceValue = `${traceGuidForHeader}/${spanGuidForHeader};o=1`;
        delete injectedLSCarrier['ot-tracer-sampled'];
        delete injectedLSCarrier['ot-tracer-spanid'];
        delete injectedLSCarrier['ot-tracer-traceid'];
        carrier['X-Cloud-Trace-Context'] = traceValue;
    }
    extract(format, carrier) {
        const xCloudTraceContext = carrier['X-Cloud-Trace-Context'];
        const lsCarrier = {};
        if (xCloudTraceContext) {
            const [traceGuid, spanGuid] = xCloudTraceContext
                .replace(';o=1', '')
                .split('/');
            lsCarrier['ot-tracer-traceid'] = traceGuid.substr(0, OT_TRACE_ID_CHARS);
            lsCarrier['ot-tracer-spanid'] = intToHexString(spanGuid);
            lsCarrier['ot-tracer-sampled'] = 'true';
        }
        return LightstepTracer.prototype.extract.call(this, format, lsCarrier);
    }
}
//# sourceMappingURL=Tracer.js.map