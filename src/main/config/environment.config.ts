// Reveal pattern
import dotenv from 'dotenv';
import Joi from 'joi';
import { Error } from 'mongoose';
import { serverErrorHelper } from '../../helpers/http.helper';

dotenv.config();
export const environmentConfig = (): any => {
  const envVarsSchema = Joi.object()
    .keys({
      NODE_ENV: Joi.string().default('development').valid('production', 'development', 'test').required(),
      APP_PATH: Joi.string()
        .default(process.env.INIT_CWD || '')
        .description('Base app path'),
      SERVER_FINGERKEY: Joi.string().description('Server Random Key '),
      SERVER_URL: Joi.string().description('Public url path'),
      SECURE_SERVER_URL: Joi.string().description('Secure url path'),
      PORT: Joi.number().default(8080),
      isHTTPS: Joi.boolean().default(false),
      SECURE_PORT: Joi.number().default(443),
      MONGO_URL: Joi.string().default('').description('Mongo DB url').required(),
      // eslint-disable-next-line quotes
      DB_NAME: Joi.string().default(`prueba`).description('Mongo DB name'),
      JWT_SECRET: Joi.string().default('').description('JWT secret key').required(),
      JWT_ACCESS_EXPIRATION_MINUTES: Joi.string().default('30m').description('minutes after which access tokens expire'),
      JWT_REFRESH_EXPIRATION_DAYS: Joi.string().default('d').description('days after which refresh tokens expire'),
      JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.string().default('m').description('minutes after which reset password token expires'),
      JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.string().default('10m').description('minutes after which verify email token expires'),
      MAIL_OWNER: Joi.string().description('owner for mail service'),
      MAIL_USERNAME: Joi.string().description('username for email server'),
      MAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
      SENDGRID_API_KEY: Joi.string().default('').description('SENDGRID_API_KEY'),
      CA_CERT_MONGO: Joi.string().default('').description('The path for CA Cert file'),
      KEY_CERT_MONGO: Joi.string().default('').description('The path for Key Cert file'),
      PEM_CERT_MONGO: Joi.string().default('').description('The path for PEM Cert file'),
      CA_TOKEN_MONGO: Joi.string().default('').description('The key for open CA cert file'),
      IS_TLS_MONGO: Joi.boolean().default(false).description('Should I Use TLS for mongo?'),
      GOOGLE_CLIENT_ID: Joi.string().description('Cliend ID for google Auth API '),
      GOOGLE_SECRET_ID: Joi.string().description('The key for access Google API Service'),
      npm_package_version: Joi.string().default('').description('Version from package.json'),
      HOST_ENABLED: Joi.string().description('Whitelisted hosts'),
      HOST_TIME_WINDOWD: Joi.string().description('Time enabled for make a certain petitions quantity'),
      HOST_MAX_PETITIONS: Joi.string().description('Max quantity petitions for a window time'),
    })
    .unknown();

  const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

  if (error) {
    throw serverErrorHelper(new Error(`Config validation error: ${error.message}`));
  }

  const { APP_PATH } = envVars;
  const ENV = envVars.NODE_ENV;
  const VERSION = envVars.npm_package_version;

  const serverConfig = {
    SERVER_FINGERKEY: envVars.SERVER_FINGERKEY,
    isHTTPS: envVars.isHTTPS || false,
    PORT: envVars.isHTTPS ? envVars.SECURE_PORT : envVars.PORT,
    URL: envVars.isHTTPS ? envVars.SECURE_SERVER_URL : envVars.SERVER_URL,
    KEY_PEM: envVars.isHTTPS ? envVars.KEY_PEM_HTTPS : '',
    CERT_PEM: envVars.isHTTPS ? envVars.CERT_PEM_HTTPS : '',
    HOST_ENABLED: envVars.HOST_ENABLED,
    HOST_TIME_WINDOWD: envVars.HOST_TIME_WINDOWD,
    HOST_MAX_PETITIONS: envVars.HOST_MAX_PETITIONS,
  };

  const emailConfig = {
    OWNER: envVars.MAIL_OWNER,
    USERNAME: envVars.MAIL_USERNAME,
    FROM: envVars.MAIL_FROM,
    SENDGRID_API_KEY: envVars.SENDGRID_API_KEY,
  };

  const mongooseConfig = {
    URL: envVars.MONGO_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    IS_TLS: envVars.IS_TLS_MONGO,
    CA_CERT: envVars.CA_CERT_MONGO,
    CA_TOKEN: envVars.CA_TOKEN_MONGO,
    KEY_CERT: envVars.KEY_CERT_MONGO,
    PEM_CERT: envVars.PEM_CERT_MONGO,
    DB_NAME: envVars.DB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      sslValidate: false,
      tlsAllowInvalidHostnames: true,
    },
  };

  const jwtConfig = {
    SECRET: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  };

  const googleConfig = {
    GOOGLE_CLIENT_ID: envVars.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID: envVars.GOOGLE_SECRET_ID,
  };

  return {
    APP_PATH,
    ENV,
    VERSION,
    serverConfig,
    emailConfig,
    mongooseConfig,
    jwtConfig,
    googleConfig,
  };
};
