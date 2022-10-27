import nodemailer from "nodemailer";
import sgMail from '@sendgrid/mail'



export const mailTransport = () => {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "39dfe1714aa3b6",
      pass: "9b2efc17564a89",
    },
  });

  return transport;
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
    console.log("send");
  } catch (error) {
    console.log(error);
  }
}
