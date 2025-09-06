import '@testing-library/jest-dom';

// Mock localStorage for jsdom environment
const localStorageMock = (() => {
  let store = new Map<string, string>();

  return {
    getItem: (key: string): string | null => {
      return store.get(key) || null;
    },
    setItem: (key: string, value: string): void => {
      store.set(key, value);
    },
    removeItem: (key: string): void => {
      store.delete(key);
    },
    clear: (): void => {
      store.clear();
    },
    get length(): number {
      return store.size;
    },
    key: (index: number): string | null => {
      const keys = Array.from(store.keys());
      return keys[index] || null;
    },
  };
})();

// Replace the global localStorage with our mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock sessionStorage for jsdom environment  
const sessionStorageMock = (() => {
  let store = new Map<string, string>();

  return {
    getItem: (key: string): string | null => {
      return store.get(key) || null;
    },
    setItem: (key: string, value: string): void => {
      store.set(key, value);
    },
    removeItem: (key: string): void => {
      store.delete(key);
    },
    clear: (): void => {
      store.clear();
    },
    get length(): number {
      return store.size;
    },
    key: (index: number): string | null => {
      const keys = Array.from(store.keys());
      return keys[index] || null;
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
});

// Mock crypto.randomUUID for jsdom environment
Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-' + Math.random().toString(36).substr(2, 9),
  },
  writable: true,
});

// Mock IntersectionObserver for jsdom environment
Object.defineProperty(window, 'IntersectionObserver', {
  value: class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  },
  writable: true,
});

// Mock ResizeObserver for jsdom environment
Object.defineProperty(window, 'ResizeObserver', {
  value: class ResizeObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  },
  writable: true,
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});

// Console error handling for tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Warning: '))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});