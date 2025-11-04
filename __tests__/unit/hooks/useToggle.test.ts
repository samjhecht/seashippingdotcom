import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToggle } from '@/hooks/useToggle';

describe('useToggle', () => {
  it('should initialize with default value false', () => {
    // Arrange & Act
    const { result } = renderHook(() => useToggle());

    // Assert
    expect(result.current[0]).toBe(false);
  });

  it('should initialize with provided value', () => {
    // Arrange & Act
    const { result } = renderHook(() => useToggle(true));

    // Assert
    expect(result.current[0]).toBe(true);
  });

  it('should toggle value from false to true', () => {
    // Arrange
    const { result } = renderHook(() => useToggle(false));

    // Act
    act(() => {
      result.current[1]();
    });

    // Assert
    expect(result.current[0]).toBe(true);
  });

  it('should toggle value from true to false', () => {
    // Arrange
    const { result } = renderHook(() => useToggle(true));

    // Act
    act(() => {
      result.current[1]();
    });

    // Assert
    expect(result.current[0]).toBe(false);
  });

  it('should toggle value multiple times', () => {
    // Arrange
    const { result } = renderHook(() => useToggle(false));

    // Act & Assert
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });

  it('should set value directly to true', () => {
    // Arrange
    const { result } = renderHook(() => useToggle(false));

    // Act
    act(() => {
      result.current[2](true);
    });

    // Assert
    expect(result.current[0]).toBe(true);
  });

  it('should set value directly to false', () => {
    // Arrange
    const { result } = renderHook(() => useToggle(true));

    // Act
    act(() => {
      result.current[2](false);
    });

    // Assert
    expect(result.current[0]).toBe(false);
  });
});
