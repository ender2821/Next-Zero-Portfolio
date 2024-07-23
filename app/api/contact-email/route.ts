import { type NextRequest, NextResponse } from "next/server";
import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { email, fullName, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.FORMS_EMAIL,
      pass: process.env.FORMS_EMAIL_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.FORMS_EMAIL,
    to: process.env.FORMS_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `andybruening.com contact request from ${fullName} (${email})`,
    text: `Fullname: ${fullName} | Email: ${email} | Message: ${message} `,
    html: `
    <p>Email: ${email}</p>
    <p>Fullname: ${fullName}</p>
    <p>Message: ${message}</p>
    `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(`Failure to send | ${err.message}`);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json(
      { error: `Failure to send | ${err}` },
      { status: 500 }
    );
  }
}
