import nodemailer from "nodemailer";


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
