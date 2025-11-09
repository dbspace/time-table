import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  add,
  subtract,
  multiply,
  divide,
  power,
  sqrt,
  factorial,
  log,
  asyncAdd,
} from './MathUtils';

afterEach(() => {
  // restore timers in case a test used fake timers
  vi.useRealTimers();
});

describe('MathUtils', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 2)).toBe(1);
  });

  it('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it('multiplies two numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  it('divides numbers and throws on division by zero', () => {
    expect(divide(10, 2)).toBe(5);
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });

  it('calculates powers', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(2, -1)).toBeCloseTo(0.5);
  });

  it('calculates square roots and throws for negative input', () => {
    expect(sqrt(9)).toBe(3);
    expect(() => sqrt(-1)).toThrow('Square root of negative number');
  });

  it('calculates factorial and handles edge cases', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(() => factorial(-1)).toThrow('Factorial of negative number');
  });

  it('calculates logarithms and throws on non-positive values', () => {
    expect(log(Math.E)).toBeCloseTo(1);
    expect(log(100, 10)).toBeCloseTo(2);
    expect(() => log(0)).toThrow('Logarithm of non-positive number');
  });

  it('resolves asyncAdd after delay (fast-forward timers)', async () => {
    vi.useFakeTimers();
    const promise = asyncAdd(2, 3);
    // fast-forward the timer used inside asyncAdd
    vi.advanceTimersByTime(1000);
    await expect(promise).resolves.toBe(5);
  });
});
