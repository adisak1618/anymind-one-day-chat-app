import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should return default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('default');
  });

  it('should return stored value when localStorage has data', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update state and localStorage when setStoredValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe('"new-value"');
  });

  it('should handle functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));
    
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    
    expect(result.current[0]).toBe(1);
    expect(localStorage.getItem('test-key')).toBe('1');
  });

  it('should remove item from localStorage when removeStoredValue is called', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('stored-value');
    
    act(() => {
      result.current[2]();
    });
    
    expect(result.current[0]).toBe('default');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('should handle JSON parsing errors gracefully', () => {
    // Set invalid JSON in localStorage
    localStorage.setItem('test-key', 'invalid-json{');
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    expect(result.current[0]).toBe('default');
  });

  it('should handle complex objects', () => {
    type ComplexObject = {
      id: number;
      name: string;
      nested: {
        value: boolean;
      };
    };
    
    const { result } = renderHook(() => useLocalStorage<ComplexObject | null>('test-key', null));
    
    const complexObject: ComplexObject = {
      id: 1,
      name: 'test',
      nested: {
        value: true
      }
    };
    
    act(() => {
      result.current[1](complexObject);
    });
    
    expect(result.current[0]).toEqual(complexObject);
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(complexObject));
  });

  it('should handle localStorage quota exceeded errors', () => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = jest.fn(() => {
      throw new Error('QuotaExceededError');
    });
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    // Should not crash and should maintain the current state
    expect(result.current[0]).toBe('new-value');
    
    localStorage.setItem = originalSetItem;
  });
});
