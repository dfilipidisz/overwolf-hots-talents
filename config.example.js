const env = process.env.NODE_ENV || 'development';

switch (env) {
  case 'development':
    module.exports = {
      port: 8000,
      tokensecret: 'secret',
      mongoaddress: 'mongodb://127.0.0.1/database-name'
    };
    break;
  default:
    module.exports = {
      port: 8000,
      tokensecret: 'secret',
      mongoaddress: 'mongodb://127.0.0.1/database-name'
    };
}
