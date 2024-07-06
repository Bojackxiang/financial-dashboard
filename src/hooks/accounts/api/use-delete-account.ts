import { client } from "@/lib/hono";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono/client";
import { toast } from "sonner";
import { ACCOUNTS_QUERY_KEY } from "@/constants/UI_QUERY_KEY";

type ResponseType =
  | InferResponseType<(typeof client.api.account)["bulk-delete"]["$post"]>
  | {};
type RequestType = {
  ids: string[];
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      if (!userId) {
        throw new Error("Unauthenticated");
      }

      if (json.ids.length == 0) return [];

      const response = await client.api.account["bulk-delete"]["$post"]({
        json,
      });
      const parsedJson = await response.json();

      if (parsedJson.data == null && parsedJson.status < 0) {
        throw new Error(`${parsedJson.message}: ${parsedJson.error}`);
      } else {
        return parsedJson;
      }
    },
    onSuccess: () => {
      toast.success("Accounts Deleted successfully");
      queryClient.invalidateQueries({ queryKey: [ACCOUNTS_QUERY_KEY] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
