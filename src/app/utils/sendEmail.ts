import nodemailer from 'nodemailer';
import getConfigOption from '../configs';
import { TUser } from '../modules/User/user.interface';

export const sendEmail = async (
  user: TUser,
  resetPasswordUiLink: string,
  html: string | undefined = undefined,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: getConfigOption('env') === 'production',
    auth: {
      user: getConfigOption('nodeMailerUserName'),
      pass: getConfigOption('nodeMailerPass'),
    },
  });

  await transporter.sendMail({
    from: getConfigOption('nodeMailerUserName'),
    to: user?.email,
    subject: 'Reset your password within ten mins!',
    text: '',
    html:
      html ||
      `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4caf50;
        color: #ffffff;
        text-align: center;
        padding: 20px;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        color: #333333;
        line-height: 1.6;
      }
      .button {
        display: block;
        width: fit-content;
        background-color: #4caf50;
        color: #ffffff;
        padding: 12px 20px;
        text-align: center;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
        margin: 20px auto;
      }
      .footer {
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #888888;
        background-color: #f1f1f1;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        Reset Your Password
      </div>
      <div class="content">
        <p style="font-weight:bold; text-transform: capitalize; font-size:20px;">Hi ${user?.name},</p>
        <p>
          We received a request to reset your password. Please click the button
          below to reset it:
        </p>
        <a href="${resetPasswordUiLink}" class="button">Reset Password</a>
        <p>
          If you didn’t request a password reset, you can safely ignore this
          email. Your account is secure.
        </p>
        <p>This link will expire in <strong>[X hours]</strong>.</p>
      </div>
      <div class="footer">
        <p>
          If you have any questions, contact our support team at
          <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.
        </p>
        <p>© [Year] [Your Company Name]. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

    `,
  });
};
