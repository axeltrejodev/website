"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontalIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/uva/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/uva/form";
import { Input } from "@/uva/input";
import { TextArea } from "@/uva/textarea";
import { toast } from "@/uva/toaster";

import { type Contact, contactSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

import { sendContact } from "@/actions/contact";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tR = useTranslations("contact.form.result");
  const tU = useTranslations("utils");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  async function onSubmit(body: Contact) {
    try {
      setIsLoading(true);
      await sendContact(body);
      toast(tR("success.title"), {
        duration: 5000,
        description: tR("success.content"),
      });
      form.reset();
    } catch {
      toast(tR("error.title"), {
        duration: 5000,
        description: tR("error.content"),
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex",
          "flex-col",
          "w-full",
          "gap-6", //
        )}
      >
        <div
          className={cn(
            "grid",
            "md:grid-cols-2",
            "gap-6", //
          )}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="self-start">
                <FormLabel>{t("name.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("name.placeholder")}
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="self-start">
                <FormLabel>{t("email.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("email.placeholder")}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("subject.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("subject.placeholder")}
                  {...field} //
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("message.label")}</FormLabel>
              <FormControl>
                <TextArea
                  placeholder={t("message.placeholder")}
                  {...field} //
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          <span>{isLoading ? tU("loading") : tU("submit")}</span>
          <SendHorizontalIcon className={cn({ hidden: isLoading })} />
        </Button>
      </form>
    </Form>
  );
}
