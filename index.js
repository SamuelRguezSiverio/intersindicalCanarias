/* index.js */
console.log('--- INICIO DE LA APLICACIÓN ---');

try {
  require('./backend/index.js');
} catch (error) {
  console.error('--- ERROR FATAL AL INICIAR ---');
  console.error(error);
}