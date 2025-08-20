"use client";

import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { createContext, useContext, useId, type ComponentProps } from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Label } from "@/uva/label";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const formState = useFormState({ name: fieldContext.name });
  const { getFieldState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext)
    throw new Error("useFormField should be used within a FormField");
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: ComponentProps<"div">) {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      data-slot="form-label"
      htmlFor={formItemId}
      data-error={!!error}
      className={cn(
        "data-[error=true]:text-destructive",
        className, //
      )}
      {...props}
    />
  );
}

function FormControl({ ...props }: ComponentProps<typeof Slot>) {
  const {
    error,
    formItemId,
    formDescriptionId,
    formMessageId, //
  } = useFormField();
  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-invalid={!!error}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn(
        "text-muted-foreground",
        "text-sm",
        className, //
      )}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: ComponentProps<"p">) {
  const t = useTranslations("uva.form");
  const { error, formMessageId } = useFormField();
  const text = String(error?.message ?? "");
  let message = "";
  if (text !== "") {
    try {
      const translated = t(text);
      message = translated !== text ? translated : text;
    } catch {
      message = text;
    }
  } else {
    message = t("invalid");
  }
  const body = error ? message : props.children;
  if (!body) return null;
  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn(
        "text-destructive",
        "text-sm",
        className, //
      )}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
