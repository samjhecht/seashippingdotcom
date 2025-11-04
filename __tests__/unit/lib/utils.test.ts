import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('should merge Tailwind classes correctly', () => {
    // Arrange
    const baseClasses = 'px-4 py-2';
    const conditionalClasses = 'bg-blue-500';

    // Act
    const result = cn(baseClasses, conditionalClasses);

    // Assert
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('should handle conflicting Tailwind classes', () => {
    // Arrange
    const classes1 = 'px-4 py-2';
    const classes2 = 'px-6';

    // Act
    const result = cn(classes1, classes2);

    // Assert
    expect(result).toBe('py-2 px-6');
  });

  it('should handle conditional classes', () => {
    // Arrange
    const isActive = true;
    const isDisabled = false;

    // Act
    const result = cn(
      'base-class',
      isActive && 'active',
      isDisabled && 'disabled'
    );

    // Assert
    expect(result).toBe('base-class active');
  });

  it('should handle arrays of classes', () => {
    // Arrange
    const classArray = ['class1', 'class2', 'class3'];

    // Act
    const result = cn(classArray);

    // Assert
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle empty input', () => {
    // Act
    const result = cn();

    // Assert
    expect(result).toBe('');
  });

  it('should handle undefined and null values', () => {
    // Act
    const result = cn('valid-class', undefined, null, 'another-class');

    // Assert
    expect(result).toBe('valid-class another-class');
  });
});
