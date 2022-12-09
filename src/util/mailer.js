/* eslint-disable valid-jsdoc */
import sendgrid from '@sendgrid/mail';
import { env } from '../config';

const {
  ADMIN_EMAIL, SENDGRID_KEY
} = env;

sendgrid.setApiKey(SENDGRID_KEY);

const Mailer = {
  /**
   * send email for password reset
   * @param {object} req
   * @param {object} user
   * @param {object} vendor
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendWelcomeEmail(req, user) {
    const {
      email, name,
    } = user;

    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      subject: `Welcome ${name.toUpperCase()}`,
      html: `<p>We humbly welcome you to ISchdule application, where you can easily book a session with your favaorite lecturer</p><br><br>
      <p>I hope you have a great time with using this appliation.</p><br><br>
      <p>Get the app, and get started 😊.</p>
      `
    };
    try {
      await sendgrid.send(mail);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * send email verification to user after signup
   * @param {object} req
   * @param {object} user - { id, email, firstName ...etc}
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendNotificationEmail(req, user, lecturer, schedule) {
    const { email } = user;
    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      subject: 'YOUR BOOKING WAS SUCCESSFULL',
      html: `<p> Your schedule with Prof. ${lecturer.name} was a success, please ensure to be timely and be there 5 minutes before your time.\n
      Thank you for your continous patronage. \n
      Your schedule is from ${schedule.startTime} to ${schedule.endTime}
        I hope you have a great time with using this appliation.</p><br><br>
       
      `
    };
    try {
      await sendgrid.send(mail);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default Mailer;
