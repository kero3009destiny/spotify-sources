export function hexToIntString(hex) {
    function add(xStr, yStr) {
        let c = 0;
        const r = [];
        const x = xStr.split('').map(Number);
        const y = yStr.split('').map(Number);
        while (x.length || y.length) {
            const s = (x.pop() || 0) + (y.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10);
            c = s < 10 ? 0 : 1;
        }
        if (c)
            r.unshift(c);
        return r.join('');
    }
    let dec = '0';
    hex.split('').forEach(chr => {
        const n = parseInt(chr, 16);
        for (let t = 8; t; t >>= 1) {
            dec = add(dec, dec);
            if (n & t)
                dec = add(dec, '1');
        }
    });
    return dec;
}
export function intToHexString(str) {
    const dec = str.toString().split('');
    const sum = [];
    let i;
    let s;
    while (dec.length) {
        s = Number(dec.shift());
        for (i = 0; s || i < sum.length; i++) {
            s += (sum[i] || 0) * 10;
            sum[i] = s % 16;
            s = (s - sum[i]) / 16;
        }
    }
    const hex = [];
    while (sum.length) {
        hex.push(sum.pop().toString(16));
    }
    return hex.join('');
}
export function omitUndefined(obj) {
    return Object.entries(obj).reduce((result, [key, value]) => typeof value === 'undefined' ? result : Object.assign(Object.assign({}, result), { [key]: value }), {});
}
//# sourceMappingURL=util.js.map