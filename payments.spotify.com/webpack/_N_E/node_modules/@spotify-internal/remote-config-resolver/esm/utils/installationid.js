import { v4 as uuid } from 'uuid';
import { INSTALLATION_ID_COOKIE_KEY, INSTALLATION_ID_STORAGE_KEY, } from '../constants';
import { getCookie } from './system';
function getUuid() {
    try {
        return uuid();
    }
    catch (err) {
        // ref: https://github.com/uuidjs/uuid/blob/3df73a98f07c0a38a94bcaf1ecde0e384dc3b126/lib/rng-browser.js#L20-L32
        return uuid({
            rng: function () {
                var randomNumbers = new Array(16);
                var r;
                for (var i = 0; i < 16; i++) {
                    if ((i & 0x03) === 0)
                        r = Math.random() * 0x100000000;
                    randomNumbers[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
                }
                return randomNumbers;
            },
        });
    }
}
export function defaultInstallationId(storage) {
    return getFromStorage(storage) || getCookie(INSTALLATION_ID_COOKIE_KEY) || '';
}
export function isValidInstallationId(id) {
    return typeof id === 'string' && id.length > 5;
}
export function createInstallationId() {
    return getCookie(INSTALLATION_ID_COOKIE_KEY) || getUuid();
}
function getFromStorage(storage) {
    if (!storage)
        return undefined;
    var installationId = storage.getItem(INSTALLATION_ID_STORAGE_KEY);
    if (!installationId) {
        installationId = createInstallationId();
        storage.setItem(INSTALLATION_ID_STORAGE_KEY, installationId);
    }
    return installationId;
}
//# sourceMappingURL=installationid.js.map