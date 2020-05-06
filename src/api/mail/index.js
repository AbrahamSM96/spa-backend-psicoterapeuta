import { Router } from 'express';
import nodemailer from 'nodemailer';
require('dotenv').config();

const router = new Router();

router.post('/', (req, res, next) => {
  console.log('This block 3 isworking');

  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const content = `name: ${name} \n email: ${email} \n message: ${message} `;

  const transport = {
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: process.env.PORT_HOST,
    secure: process.env.SECURE,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };

  const transporter = nodemailer.createTransport(transport);

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(success, 'Server is ready to take messages');
    }
  });

  console.log(req.body);

  const mail = {
    from: name,
    to: process.env.EMAIL,
    subject: 'New Message',
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500, err.message);
      res.json({
        msg: 'fail',
      });
    } else {
      console.log('Email sent', data.messageId);
      res.status(200).jsonp(req.body);
      res.json({
        msg: 'success',
      });
    }
  });
});

export default router;
