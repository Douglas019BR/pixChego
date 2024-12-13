const fs = require('fs');
const path = require('path');

const logFilePath = path.resolve(__dirname, '../../error.log');

function logError(message, error) {
  console.log(message)
  console.error(error)
  const timestamp = new Date().toISOString();
  const logMessage = `
---
${timestamp}
Message: ${message}
Error: ${error instanceof Error ? error.message : JSON.stringify(error)}
Stack: ${error instanceof Error ? error.stack : 'N/A'}
---
`;

  try {
    fs.appendFileSync(logFilePath, logMessage);
    console.error(logMessage);
  } catch (writeError) {
    console.error('log writting error:', writeError);
  }
}

module.exports = { logError };
