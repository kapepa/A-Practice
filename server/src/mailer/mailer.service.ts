import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as Nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class MailerService {

  createTransport() {
    return Nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 465,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      }
    });
  }

  async registrationMail(email: string, name: string) {
    await this.createTransport().sendMail(
      {
        from: 'A-Recipe',
        to: email,
        subject: 'Registration',
        text: 'You have successfully registered .',
        html: '<div><strong>You have successfully registered. Thanks + name</strong></div>',
      },
      (error) => { if (error) throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This email address is incorrect.',
      }, HttpStatus.FORBIDDEN);}
    );
  }
}
