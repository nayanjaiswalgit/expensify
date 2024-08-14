import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  (async function () {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Rest You password",
      html: `<p>Click <a href= "${resetLink}">Here </a> to confirm email.</p>`,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  })();
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  (async function () {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Hello World",
      html: `<p>Click <a href= "${confirmLink}">Here </a> to confirm email.</p>`,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  })();
};

export const sendTwoFactorTokenEmail = async (email: string, code: string) => {
  (async function () {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA Code: ${code}</p>`,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  })();
};
