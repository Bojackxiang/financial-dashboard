import { z } from "zod";
import { accountSchema } from "@/z-schemas/accountSchema";
import AccountForm from "@/app/forms/AccountForm";
import { useCreateAccount } from "@/hooks/accounts/api/use-create-account";
import { useEditAccount } from "@/hooks/accounts/use-open-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useGetAccountById } from "@/hooks/accounts/api/use-get-account-by-id";

// update account schema for the form
const formSchema = accountSchema.omit({ userId: true });
type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useEditAccount();
  const mutation = useGetAccountById(id);

  const defaultTitle = mutation.data?.name ?? "Edit account";

  const onNewAccount = (values: FormValues) => {
    // @ts-ignore
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>{defaultTitle}</SheetTitle>
          <SheetDescription>Edit account</SheetDescription>
        </SheetHeader>
        <AccountForm
          id={id}
          onDelete={() => {}}
          onSubmit={onNewAccount}
          defaultValues={{
            name: mutation.data?.name ?? "sample name",
            plaidId: "123456",
          }}
          disabled={false}
        />
      </SheetContent>
    </Sheet>
  );
};
