const sgMail = require('@sendgrid/mail');
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email, name, title, message } = req.body;

  const msg = {
    to: email,
    bcc: 'contact@kiku-to-kaku.com',
    from: 'no-reply@kiku-to-kaku.com',
    subject:
      '【株式会社聴くと描く - 小久保】お問い合わせありがとうございます',
    text: 'and easy to do anywhere, even with Node.js',
    html: `
      ${name} 様
      <br/>
      <p>
      この度は、お問い合わせありがとうございます。<br/>
      以下の内容でお問い合わせを受け付けました。<br/>
      内容確認後、ご連絡致しますので今しばらくお待ちください。
      </p>
      <span>-----------------------------------</span><br/>
      ${title}<br/>
      <br/>
      ${message}<br/>
      <span>-----------------------------------</span>
      <br/>
      <br/>
      <br/>
      =====================================<br/>
      株式会社 聴くと描く<br/>
      小久保 明美 (Akemi Kokubo)<br/>
      〒270-0163 千葉県流山市南流山3-6-7 Trist Airport<br/>
      https://kiku-to-kaku.com/<br/>
      =====================================<br/>
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
