const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.alzados.org',
    port: 465,
    secure: true,
    auth: {
      user: 'intersindicalhuc@alzados.org',
      pass: 'uoHp2G79xyRJjrD'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  

const sendEmail = (to, subject, text) => {
    const mailOptions = {
      from: 'intersindicalhuc@alzados.org',
      to: to,
      subject: subject,
      text: text
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
      } else {
        console.log('Correo enviado:', info.response);
      }
    });
  };
  

  module.exports = { sendEmail };
