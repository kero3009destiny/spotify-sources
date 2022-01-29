export function push(data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
}
export function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
}
export function previousConsent() {
    window.dataLayer = window.dataLayer || [];
    let hasConsent = {
        analytics_storage: 'denied',
        ad_storage: 'denied',
    };
    window.dataLayer.forEach((value) => {
        if (value[0] === 'consent' &&
            (value[1] === 'default' || value[1] === 'update')) {
            hasConsent = value[2];
        }
    });
    return hasConsent;
}
//# sourceMappingURL=index.js.map