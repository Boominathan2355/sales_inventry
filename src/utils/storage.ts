/**
 * Safe storage utility to prevent "Access to storage is not allowed" errors
 * when running in restricted environments (incognito, iframes, etc.)
 */

class MemoryStorage implements Storage {
  private data: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.data).length;
  }

  clear(): void {
    this.data = {};
  }

  getItem(key: string): string | null {
    return this.data[key] || null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.data);
    return keys[index] || null;
  }

  removeItem(key: string): void {
    delete this.data[key];
  }

  setItem(key: string, value: string): void {
    this.data[key] = String(value);
  }
}

const isStorageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

export const safeLocalStorage: Storage = isStorageAvailable('localStorage') 
  ? window.localStorage 
  : new MemoryStorage();

export const safeSessionStorage: Storage = isStorageAvailable('sessionStorage') 
  ? window.sessionStorage 
  : new MemoryStorage();

// Log status to help debugging
if (!isStorageAvailable('localStorage')) {
  console.warn('LocalStorage is not available in this context. Using in-memory fallback.');
}
