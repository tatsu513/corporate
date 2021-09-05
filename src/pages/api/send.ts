const sgMail = require('@sendgrid/mail');
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email, name, title, message } = req.body;

  console.log(email, name, title, message);

  const msg = {
    to: email,
    from: 'no-reply@kiku-to-kaku.com',
    subject:
      '【株式会社聴くと描く】お問い合わせありがとうございました。',
    text: 'and easy to do anywhere, even with Node.js',
    html: `
      <strong>${name} 様</strong>
      <br/>
      <p>
      お問い合わせありがとうございます。<br/>
      以下の内容でお問い合わせを受け付けました。
      </p>
      -----------------------------------
      <pre style="white-space: pre-line;">
      ${title}
      </pre>
      <pre style="white-space: pre-line;">
      ${message}
      </pre>
      -----------------------------------
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({
        statusCode: 200,
      });
    })
    .catch((error: Error) => {
      res.status(200).json({
        statusCode: 500,
      });
    });
}
