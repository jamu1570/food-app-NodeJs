import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});

export const sendWelcomeEmail = async (to, name) => {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Our App!',
    html: `<h1>Hello ${name}!</h1><p>Thanks for registering with us 🎉</p>`
  });
};
