
import nodemailer from 'nodemailer'
import { mailSecrets } from './sec.js'

const transporter = nodemailer.createTransport({
  host: mailSecrets.host,
  port:mailSecrets.port,
  secure: false,
  auth: {
    user: mailSecrets.user,
    pass: mailSecrets.password,
  },
});


export async function sendHtmlMail(recipients,subject,html) {
 
  const info = await transporter.sendMail({
    from: mailSecrets.defult_sender, // sender address
    to: recipients.join(', '), // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
  return info
}


export async function sendTextMail(recipients,subject,text) {
 
    const info = await transporter.sendMail({
      from: 'mailtrap@demomailtrap.com', // sender address
      to: recipients.join(', '), // list of receivers
      subject: subject, // Subject line
      text:text,
    });
    return info
  }