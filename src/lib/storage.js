const STORAGE_VERSION = 1;

export function safeParseJSON(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function readStorage(key, fallback) {
  return safeParseJSON(localStorage.getItem(key), fallback);
}

export function writeStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getStorageVersion() {
  return STORAGE_VERSION;
}
