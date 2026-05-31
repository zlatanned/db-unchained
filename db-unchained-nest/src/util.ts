// src/util.ts
/**
 * @description At least 10 characters and 3 valid words.
 *    Must contain an action verb showing intent (flexible across DBs, languages).
 * @param {string} prompt
 * @returns {boolean}
 */
export function isValidPrompt(prompt: string): boolean {
  if (!prompt || typeof prompt !== 'string') return false;

  const cleanPrompt = prompt.trim();
  if (cleanPrompt.length < 10) return false;

  // excludes any word with less than 2 letters, so "a" or "is" would be removed
  const words = cleanPrompt.match(/\b[a-zA-Z]{2,}\b/g) || [];
  if (words.length < 3) return false;

  const hasIntent =
    /(find|get|fetch|count|list|show|generate|display|select|create|update|delete)/i.test(
      cleanPrompt,
    );
  if (!hasIntent) return false;

  return true;
}

/**
 * @description Checks for supported languages via application.
 * @param {string} queryLanguage
 * @returns {boolean}
 */
export function isASupportedLanguage(queryLanguage: string): boolean {
  const supportedLangs = new Set(['sql', 'mongodb']);
  if (!supportedLangs.has(queryLanguage)) return false;

  return true;
}
