import sgMail from '@sendgrid/mail';
import { environmentConfig, logger } from '../main/config';

sgMail.setApiKey(environmentConfig().emailConfig.SENDGRID_API_KEY);

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise}
 */
const sendEmail = async (to = '', subject = '', text = ''): Promise<any> => {
  const msg = {
    from: environmentConfig().emailConfig.FROM,
    to,
    subject,
    text,
  };

  await sgMail
    .send(msg)
    .then(() => {
      logger.info('Email sent.');
    })
    .catch((error) => {
      logger.error(error);
    });
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to: string, token: string): Promise<any> => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${environmentConfig().serverConfig.URL}/api/v1/reset-password/${token}`;

  const text = `Dear user, To reset your password, click on this link: ${resetPasswordUrl} \nIf you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to: string, token: string): Promise<any> => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${environmentConfig().serverConfig.URL}/api/v1/verify-user?key=${token}`;
  const text = `Dear user, To verify your email, click on this link: ${verificationEmailUrl} \nIf you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

export { sgMail, sendEmail, sendResetPasswordEmail, sendVerificationEmail };
