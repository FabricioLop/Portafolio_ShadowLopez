import { monthsSince } from './experience';

describe('monthsSince', () => {
  const start = new Date(2026, 2, 23); // 23 mar 2026

  it('cuenta meses de calendario completos', () => {
    expect(monthsSince(start, new Date(2026, 6, 23))).toBe(4);  // 23 jul
    expect(monthsSince(start, new Date(2027, 2, 23))).toBe(12); // un año
  });

  it('no suma el mes hasta llegar al día de inicio', () => {
    expect(monthsSince(start, new Date(2026, 3, 22))).toBe(0); // 22 abr
    expect(monthsSince(start, new Date(2026, 3, 23))).toBe(1); // 23 abr
  });

  it('nunca devuelve negativos', () => {
    expect(monthsSince(start, new Date(2025, 0, 1))).toBe(0);
  });
});
