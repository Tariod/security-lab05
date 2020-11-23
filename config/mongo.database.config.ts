import { registerAs } from '@nestjs/config';

export default registerAs('mongo.database', () => {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT) || 27017;
  return {
    uri: `mongodb://${host}:${port}`,
    dbName: process.env.DB_NAME || 'security_lab',
    user: process.env.DB_USER || 'mongo_root',
    pass: process.env.DB_PASSWORD || 'some_very_strong_password',
    authSource: process.env.DB_AUTH_DATABASE || 'admin',
  };
});
