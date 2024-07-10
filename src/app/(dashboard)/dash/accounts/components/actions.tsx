"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditAccount } from "@/hooks/accounts/use-open-account";

type Props = {
  id: string;
};

const Actions = (props: Props) => {
  const { id } = props;
  const { onOpen } = useEditAccount();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-blue-600" variant="ghost">
            Action
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onOpen(id)}>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Actions;
