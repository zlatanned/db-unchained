module.exports = {
    llmProvider: process.env.LLM_PROVIDER || 'groq',   // Options: 'groq', 'openai' etc.
    enableAutoDetectLang: process.env.ENABLE_AUTO_DETECT_LANGUAGE,
    groq: {
        apiKey: process.env.GROQ_API_KEY,
        model: process.env.GROQ_MODEL,
        temperature: process.env.GROQ_TEMPEARATURE || 0
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        temperature: process.env.OPENAI_TEMPERATURE || 0
    }
};
  