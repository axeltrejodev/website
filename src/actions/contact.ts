"use server";

import { Resend } from "resend";

import { type Contact, contactSchema } from "@/lib/schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(body: Contact) {
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) throw parsed.error;
  const data = parsed.data;
  const { error } = await resend.emails.send({
    from: `Contact Form <onboarding@resend.dev>`,
    to: "axeltrejo.dev@gmail.com",
    subject: data.subject,
    text:
      `Name: ${data.name}\n` + //
      `Email: ${data.email}\n\n` + //
      data.message, //
  });
  if (error) throw error;
}
