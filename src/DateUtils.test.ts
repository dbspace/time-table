import { describe, it, expect } from 'vitest';
import {
  startOfDay,
  endOfDay,
  addDays,
  isSameDay,
  formatDate,
  isValidDateFormat,
} from './DateUtils';

describe('DateUtils', () => {
  it('startOfDay sets time to 00:00:00.000 UTC', () => {
    const d = new Date(Date.UTC(2025, 10, 2, 15, 30, 45, 123));
    const s = startOfDay(d);
    expect(s.getUTCFullYear()).toBe(2025);
    expect(s.getUTCMonth()).toBe(10);
    expect(s.getUTCDate()).toBe(2);
    expect(s.getUTCHours()).toBe(0);
    expect(s.getUTCMinutes()).toBe(0);
    expect(s.getUTCSeconds()).toBe(0);
    expect(s.getUTCMilliseconds()).toBe(0);
  });

  it('endOfDay sets time to 23:59:59.999 UTC', () => {
    const d = new Date(Date.UTC(2025, 10, 2, 1, 2, 3, 4));
    const e = endOfDay(d);
    expect(e.getUTCFullYear()).toBe(2025);
    expect(e.getUTCMonth()).toBe(10);
    expect(e.getUTCDate()).toBe(2);
    expect(e.getUTCHours()).toBe(23);
    expect(e.getUTCMinutes()).toBe(59);
    expect(e.getUTCSeconds()).toBe(59);
    expect(e.getUTCMilliseconds()).toBe(999);
  });

  it('addDays correctly adds days across month boundary', () => {
    const jan31 = new Date(Date.UTC(2021, 0, 31, 12, 0, 0));
    const feb1 = addDays(jan31, 1);
    expect(feb1.getUTCFullYear()).toBe(2021);
    expect(feb1.getUTCMonth()).toBe(1); // February
    expect(feb1.getUTCDate()).toBe(1);

    const minusOne = addDays(feb1, -2);
    expect(minusOne.getUTCMonth()).toBe(0);
    expect(minusOne.getUTCDate()).toBe(30);
  });

  it('isSameDay returns true for dates on same day (different times)', () => {
    const a = new Date(Date.UTC(2025, 10, 2, 0, 0, 0));
    const b = new Date(Date.UTC(2025, 10, 2, 23, 59, 59));
    expect(isSameDay(a, b)).toBe(true);

    const c = new Date(Date.UTC(2025, 10, 3, 0, 0, 0));
    expect(isSameDay(a, c)).toBe(false);
  });

  it('formatDate returns YYYY-MM-DD (UTC)', () => {
    const d = new Date(Date.UTC(2025, 0, 5, 12, 0, 0));
    expect(formatDate(d)).toBe('2025-01-05');
    const d2 = new Date(Date.UTC(9, 0, 1));
    // Year 9 should format as 9 -> '0009'
    expect(formatDate(d2)).toBe('0009-01-01');
  });

  it('isValidDateFormat validates YYYY-MM-DD', () => {
    expect(isValidDateFormat('2025-11-02')).toBe(true);
    expect(isValidDateFormat('2025-1-2')).toBe(false);
    expect(isValidDateFormat('abcd-ef-gh')).toBe(false);
    expect(isValidDateFormat('2025-13-01')).toBe(true); // format only, not semantic validity
  });
});
