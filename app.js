// Simple CLI to accept natural language input and print the generated query.
const readline = require('readline');
const { generateDBQuery } = require('./core/queryGenerator');
const { isValidPrompt, isASupportedLanguage } = require('./util');
const { enableAutoDetectLang } = require('./config/defaults');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    try {
        let queryLanguage = null;
        console.info(enableAutoDetectLang === 'true' ? '🔍 Auto Language Detection Mode Enabled' : '🎯 Manual Language Selection Mode Enabled');
        if (!enableAutoDetectLang) {
            queryLanguage = await ask('Enter the Query Language (e.g: SQL, MongoDB): ');
            if (!isASupportedLanguage(queryLanguage)) {
                console.warn('❌ Please enter a valid & supported Query Language.');
                process.exit(1);
            }
        }

        const userPrompt = await ask('Enter your natural language prompt:\n ');
        if (!isValidPrompt(userPrompt)) {
            console.warn('❌ Please enter a more meaningful prompt');
            process.exit(1);
        }
        const DBQuery = await generateDBQuery(userPrompt, queryLanguage);
        console.log('\nGenerated Query:\n', DBQuery);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        rl.close();
    }
}

main();
