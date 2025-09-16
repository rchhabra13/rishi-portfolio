import nodemailer from "nodemailer";
import { getFirestore } from "../../lib/firebaseAdmin";

const required = (value, name) => {
  if (!value) throw new Error(`${name} is required`);
  return value;
};

// Rate limiting (simple in-memory store - in production, use Redis)
const submissions = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxSubmissions = 3; // Max 3 submissions per 15 minutes

  if (!submissions.has(ip)) {
    submissions.set(ip, []);
  }

  const userSubmissions = submissions.get(ip);
  // Remove old submissions outside the window
  const validSubmissions = userSubmissions.filter(time => now - time < windowMs);
  
  if (validSubmissions.length >= maxSubmissions) {
    return true;
  }

  // Add current submission
  validSubmissions.push(now);
  submissions.set(ip, validSubmissions);
  return false;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fullName, email, message, subject } = req.body || {};
    if (!fullName || !email || !message || !subject) {
      return res.status(400).json({ error: "fullName, email, subject and message are required" });
    }

    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (isRateLimited(clientIP)) {
      return res.status(429).json({ error: "Too many submissions. Please try again later." });
    }

    // Basic spam protection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations'];
    const messageText = (message + subject + fullName).toLowerCase();
    if (spamKeywords.some(keyword => messageText.includes(keyword))) {
      return res.status(400).json({ error: "Message appears to be spam." });
    }

    // Store in Firebase
    try {
      const db = getFirestore();
      const contactRef = db.collection('contacts');
      await contactRef.add({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        ip: clientIP,
        userAgent: req.headers['user-agent'] || '',
        timestamp: new Date(),
        status: 'new'
      });
    } catch (firebaseError) {
      console.error('Firebase error:', firebaseError);
      // Continue with email even if Firebase fails
    }

    // Send email notification
    try {
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

      const emailSubject = `New Contact Form Submission: ${subject}`;
      const emailText = `
New contact form submission from your portfolio:

Name: ${fullName}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from: ${clientIP}
Time: ${new Date().toISOString()}
      `.trim();

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; border: 1px solid #dee2e6; padding: 20px; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
            <p>Sent from: ${clientIP}</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `Portfolio Contact <${user}>`,
        to,
        replyTo: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Still return success if Firebase worked
    }

    return res.status(200).json({ 
      ok: true, 
      message: "Thank you for your message! I'll get back to you soon." 
    });
  } catch (err) {
    console.error("/api/contact error:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

