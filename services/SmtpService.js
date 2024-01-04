import nodemailer from "nodemailer";
import config from "../config.js";

    class SmtpService {
        static transporter = nodemailer.createTransport({
          host: config.MAIL_HOST,
          port: config.MAIL_PORT,
          auth: {
            user: config.MAIL_USER,
            pass: config.MAIL_PASSWORD,
          }
        });
      
      static async send(to, subject, text) {
        await this.transporter.sendMail({
            from: config.MAIL_FROM,
            to,
            subject,
            text, 
          });
        }       
      }

      export default SmtpService