/**
 * Fechas de las que dependen los contadores del portafolio.
 * Cambia solo esto: todo lo que se muestra en pantalla se recalcula solo.
 */

/** Inicio de las prácticas como QA Trainee en Mandu - Visma. */
export const MANDU_START = new Date(2026, 2, 23); // 23 de marzo de 2026

/**
 * Meses completos transcurridos desde `from` hasta hoy.
 * Cuenta meses de calendario, no bloques de 30 días: el 23 de cada mes suma uno.
 */
export function monthsSince(from: Date, now: Date = new Date()): number {
  let months =
    (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth());
  if (now.getDate() < from.getDate()) months--;
  return Math.max(0, months);
}
