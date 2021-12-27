// I think this rule should rather be max-exported-classes..
var StorageCache = /** @class */ (function () {
    function StorageCache(storage) {
        this.storage = storage;
    }
    StorageCache.prototype.get = function (key) {
        if (typeof key !== 'string')
            throw new Error('key must be a string');
        var json = this.storage.getItem(key);
        if (typeof json !== 'string')
            return undefined;
        return JSON.parse(json);
    };
    StorageCache.prototype.set = function (key, value) {
        if (typeof key !== 'string')
            throw new Error('key must be a string');
        var json = JSON.stringify(value);
        this.storage.setItem(key, json);
    };
    return StorageCache;
}());
var SingleItemCache = /** @class */ (function () {
    function SingleItemCache(storage, name) {
        this.cache = new StorageCache(storage);
        this.cacheKey = "com.spotify.single.item.cache:" + name;
    }
    SingleItemCache.prototype.get = function (key) {
        if (typeof key !== 'string')
            throw new Error('key must be a string');
        var entry = this.cache.get(this.cacheKey);
        if (entry && entry.key === key)
            return entry.value;
        return undefined;
    };
    SingleItemCache.prototype.set = function (key, value) {
        if (typeof key !== 'string')
            throw new Error('key must be a string');
        var entry = { key: key, value: value };
        this.cache.set(this.cacheKey, entry);
    };
    return SingleItemCache;
}());
export { SingleItemCache };
//# sourceMappingURL=cache.js.map