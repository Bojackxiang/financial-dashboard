"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/z-schemas/accountSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, ArrowBigUp } from "lucide-react";

// update account schema for the form
const formSchema = accountSchema.omit({ userId: true });
type FormValues = z.input<typeof formSchema>;

type AccountFormType = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete: () => void;
  disabled?: boolean;
};

const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: AccountFormType) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onHandleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const onHandleDelete = () => {
    onDelete?.();
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onHandleSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g Salary Account, Investment"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="plaidId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plaid Id</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="6 digits such as 958304"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={disabled}>
          <ArrowBigUp className="mr-4" size={20} />
          {id ? "Update Account" : "Create Account"}
        </Button>

        {id ? (
          <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={onHandleDelete}
          >
            <Trash className="mr-4" size={20} /> Delete Account
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AccountForm;
