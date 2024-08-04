const serverless = require('serverless-http');
const app = require('../server'); // Adjust the path if necessary

module.exports.handler = serverless(app);
