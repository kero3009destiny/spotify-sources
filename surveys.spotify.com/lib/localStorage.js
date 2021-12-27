let useLocalStorage = true;
const inMemoryLocalStorage = {};

const localStorage = (() => {
  try {
    return window.localStorage;
  } catch (e) {
    useLocalStorage = false;
    return {};
  }
})();

for (const key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    inMemoryLocalStorage[key] = localStorage[key];
  }
}

export function getItem(key) {
  return useLocalStorage
    ? localStorage.getItem(key)
    : inMemoryLocalStorage[key];
}

export function setItem(key, value) {
  inMemoryLocalStorage[key] = value;

  if (useLocalStorage) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      useLocalStorage = false;
    }
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } finally {
    delete inMemoryLocalStorage[key];
  }
}



// WEBPACK FOOTER //
// ./src/lib/localStorage.js