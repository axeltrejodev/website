import { z } from "zod";

export const string = z.string({
  error: "mustBeString",
});

export const text = string.min(1, {
  error: "mustBeText",
});

export const email = z.email({
  error: "mustBeEmail",
});

export const object = <T extends z.ZodRawShape>(t: T): z.ZodObject<T> =>
  z.object(t, {
    error: "mustBeObject",
  });

export const contactSchema = object({
  name: text,
  email: email,
  subject: text,
  message: text,
});

export type Contact = z.infer<typeof contactSchema>;
