import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import {HttpException} from "@nestjs/common";
const Mailer = require('nodemailer/lib/mailer');

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be success registration email', async () => {
    let email = 'test@mail.com';
    let callback;
    jest.spyOn(Mailer.prototype, 'sendMail').mockImplementation(function (mailOptions, cb) {
      expect(mailOptions['to']).toEqual(email);
      callback = cb;
    })

    try {
      await service.registrationMail(email, 'Test text')
      callback()
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
    }
  })

});
