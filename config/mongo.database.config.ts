import { registerAs } from "@nestjs/config";

export default registerAs('mongo.database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 27017,
  database: process.env.DB_NAME || 'security_lab',
  username: process.env.DB_USER || 'mongo_root',
  password: process.env.DB_PASSWORD || 'some_very_strong_password',
  authSource: process.env.DB_AUTH_DATABASE || 'admin',
}))
