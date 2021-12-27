export var TokenProvider;
(function (TokenProvider) {
    function toPromiseProvider(provider) {
        if (typeof provider !== 'function') {
            throw new TypeError('TokenProvider must be a function');
        }
        return function () {
            return new Promise(function (resolve, reject) {
                var p = provider(function (token, ttl) {
                    resolve(typeof ttl === 'number' ? [token, ttl] : token);
                });
                if (p && typeof p.then === 'function')
                    p.then(resolve, reject);
            });
        };
    }
    TokenProvider.toPromiseProvider = toPromiseProvider;
})(TokenProvider || (TokenProvider = {}));
//# sourceMappingURL=token.js.map