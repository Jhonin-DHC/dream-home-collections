import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export function isEmailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getFromAddress() {
  return process.env.SMTP_FROM?.trim() || process.env.SMTP_USER || `noreply@${new URL(site.url).hostname}`;
}

function createTransport() {
  if (!isEmailConfigured()) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.");
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1" || port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const transport = createTransport();
  const to = Array.isArray(options.to) ? options.to.join(", ") : options.to;

  await transport.sendMail({
    from: getFromAddress(),
    to,
    subject: options.subject,
    text: options.text,
    html: options.html ?? options.text.replace(/\n/g, "<br />"),
    replyTo: options.replyTo
  });
}

export function getTeamNotifyEmails() {
  const configured = process.env.INQUIRY_NOTIFY_EMAILS || process.env.ADMIN_EMAIL || site.email;
  return configured
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function sendInquiryAlert(inquiry: {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  listingTitle?: string;
  source: string;
}) {
  const recipients = getTeamNotifyEmails();
  if (recipients.length === 0) {
    throw new Error("No team notify emails configured (INQUIRY_NOTIFY_EMAILS or ADMIN_EMAIL).");
  }

  const siteUrl = site.url.replace(/\/$/, "");
  const adminUrl = `${siteUrl}/admin/inquiries`;
  const subject = inquiry.listingTitle
    ? `Tour inquiry — ${inquiry.listingTitle}`
    : "New Dream Home Collections inquiry";

  const text = [
    "A new inquiry was submitted.",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "(none)"}`,
    `Source: ${inquiry.source}`,
    inquiry.listingTitle ? `Listing: ${inquiry.listingTitle}` : "",
    "",
    "Message:",
    inquiry.message || "(none)",
    "",
    `Review in admin: ${adminUrl}`,
    `Inquiry ID: ${inquiry.id}`
  ]
    .filter((line) => line !== "")
    .join("\n");

  await sendEmail({
    to: recipients,
    subject,
    text,
    replyTo: inquiry.email
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const subject = "Reset your Dream Home Collections password";
  const text = [
    "We received a request to reset your Dream Home Collections password.",
    "",
    "Open this link to choose a new password (expires in 1 hour):",
    resetUrl,
    "",
    "If you did not request this, you can ignore this email."
  ].join("\n");

  await sendEmail({
    to: email,
    subject,
    text,
    html: `
      <div style="font-family: Georgia, serif; line-height: 1.6; color: #1b1b1b;">
        <p>We received a request to reset your Dream Home Collections password.</p>
        <p><a href="${resetUrl}" style="color:#14213d;">Choose a new password</a> — this link expires in 1 hour.</p>
        <p style="color:#6b645b;">If you did not request this, you can ignore this email.</p>
      </div>
    `
  });
}
