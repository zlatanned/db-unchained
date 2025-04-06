/**
 * @description At least 10 characters and 3 valid words.
 *    Must contain an action verb showing intent (flexible across DBs, languages).
 * @param {String} prompt
 * @returns {Boolean}
 */
function isValidPrompt(prompt) {
    if (!prompt || typeof prompt !== 'string') return false;
  
    const cleanPrompt = prompt.trim();
    if (cleanPrompt.length < 10) return false;
  
    const words = cleanPrompt.match(/\b[a-zA-Z]{2,}\b/g) || [];
    if (words.length < 3) return false;
  
    const hasIntent = /(find|get|fetch|count|list|show|generate|display|select|create|update|delete)/i.test(cleanPrompt);
    if (!hasIntent) return false;
  
    return true;
  }
  
  module.exports = { isValidPrompt };
  