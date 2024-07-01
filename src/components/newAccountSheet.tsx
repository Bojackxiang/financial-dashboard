import { z } from "zod";
import { accountSchema } from "@/z-schemas/accountSchema";
import AccountForm from "@/app/forms/AccountForm";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useNewAccount } from "@/hooks/accounts/use-new-account";
import { useCreateAccount } from "@/hooks/accounts/api/use-create-account";

// update account schema for the form
const formSchema = accountSchema.omit({ userId: true });
type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();

  const onNewAccount = (values: FormValues) => {
    console.log(values);
    // @ts-ignore
    mutation.mutate(values, {
      onSuccess: () => {
        // TODO: close the modal
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create new account</SheetDescription>
        </SheetHeader>
        <AccountForm
          onDelete={() => {}}
          onSubmit={onNewAccount}
          defaultValues={{
            name: "sample name",
            plaidId: "123456",
          }}
          disabled={false}
        />
      </SheetContent>
    </Sheet>
  );
};
