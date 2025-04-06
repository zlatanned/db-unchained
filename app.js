// Simple CLI to accept natural language input and print the generated query.
const readline = require('readline');
const { generateDBQuery } = require('./core/queryGenerator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your natural language prompt:\n', async (input) => {
    try {
        const query = await generateDBQuery(input);
        console.log('\nGenerated Query:\n', query);
    } catch (error) {
        console.error('Error:', error);
    }
    rl.close();
});
