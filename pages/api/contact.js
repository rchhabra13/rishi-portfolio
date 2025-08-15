import nodemailer from "nodemailer";

const required = (value, name) => {
  if (!value) throw new Error(`${name} is required`);
  return value;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fullName, email, message } = req.body || {};
    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "fullName, email and message are required" });
    }

    const host = required(process.env.EMAIL_SERVER_HOST, "EMAIL_SERVER_HOST");
    const port = Number(required(process.env.EMAIL_SERVER_PORT, "EMAIL_SERVER_PORT"));
    const user = required(process.env.EMAIL_SERVER_USER, "EMAIL_SERVER_USER");
    const pass = required(process.env.EMAIL_SERVER_PASSWORD, "EMAIL_SERVER_PASSWORD");
    const to = required(process.env.EMAIL_TO, "EMAIL_TO");

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `New contact form submission from ${fullName}`;
    const text = `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`;

    await transporter.sendMail({
      from: `Portfolio Contact <${user}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("/api/contact error:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

