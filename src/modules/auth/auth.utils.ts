import * as nodemailer from 'nodemailer';

export const sendAuthMail = async (email: string, authCode: number) => {
  try {
    const transPorter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.SEND_AUTHMAIL_GMAIL_ACCOUNT,
        pass: process.env.SEND_AUTHMAIL_GMAIL_ACCOUNT_PASSWORD,
      },
    });

    const mailOptions = {
      to: `${email}`,
      subject: 'SMCloud 인증 번호 메일입니다.',
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #e9e9e9;">
    <h2 style="color: #333; text-align: center;">SMCloud 인증 번호</h2>
    <p style="font-size: 16px; color: #555;">안녕하세요!</p>
    <p style="font-size: 16px; color: #555;">SMCloud 계정을 인증하기 위한 번호는 다음과 같습니다:</p>
    <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; color: #4CAF50;">${authCode}</div>
    <p style="font-size: 16px; color: #555;">이 번호를 인증 페이지에 입력하여 계정 인증을 완료해 주세요.</p>
    <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px;">이 메일에 대한 문의가 있으시면 관리자에게 문의해 주세요.</p>
    </div>`,
    };

    await transPorter.sendMail(mailOptions);
    return true;
  } catch {
    return false;
  }
};
