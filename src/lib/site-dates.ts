/**
 * Hero countdown / “married + count up” moment (same instant the countdown used historically).
 * ISO without timezone is interpreted as local time in the browser.
 */
export const WEDDING_COUNTDOWN_AT = new Date("2026-04-25T15:00:00");

/**
 * Photo uploads open at the start of the wedding day in Ethiopia (EAT, UTC+3).
 * April 25, 2026 00:00 EAT === April 24, 2026 21:00 UTC
 */
export const PHOTO_UPLOAD_OPENS_AT = new Date("2026-04-24T21:00:00.000Z");

export function isPhotoUploadEnabled(at: Date = new Date()): boolean {
  return at.getTime() >= PHOTO_UPLOAD_OPENS_AT.getTime();
}
