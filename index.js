/* MINIMAL TEST - index.js */
const http = require('http');

// Step 1: Check if Node.js works at all
console.log('=== STEP 1: Node.js is running ===');

// Step 2: Check environment variables
console.log('=== STEP 2: Environment Variables ===');
console.log('PORT:', process.env.PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PASS:', process.env.DB_PASS ? '*** SET ***' : '*** MISSING ***');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Step 3: Start a basic HTTP server (no Express, no Sequelize)
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>Hostinger Node.js funciona!</h1><p>Variables de entorno detectadas:<br>' +
    'DB_NAME: ' + (process.env.DB_NAME || 'NO DEFINIDA') + '<br>' +
    'DB_USER: ' + (process.env.DB_USER || 'NO DEFINIDA') + '<br>' +
    'DB_HOST: ' + (process.env.DB_HOST || 'NO DEFINIDA') + '<br>' +
    'DB_PASS: ' + (process.env.DB_PASS ? 'OK' : 'NO DEFINIDA') + '<br>' +
    'PORT: ' + (process.env.PORT || 'NO DEFINIDA') + '<br>' +
    'NODE_ENV: ' + (process.env.NODE_ENV || 'NO DEFINIDA') +
    '</p>');
});

server.listen(PORT, () => {
  console.log('=== STEP 3: Server listening on port ' + PORT + ' ===');
});