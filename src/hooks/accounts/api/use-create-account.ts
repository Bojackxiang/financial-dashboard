import { InferResponseType } from "hono";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { ACCOUNTS_QUERY_KEY } from "@/constants/UI_QUERY_KEY";

type ResponseType = InferResponseType<typeof client.api.account.$post> | {};
type RequestType =
  | InferResponseType<typeof client.api.account.$post>["data"]
  | null;

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      if (!userId) {
        throw new Error("Unauthenticated");
      }

      const response = await client.api.account.$post({
        json: {
          // @ts-ignore:next-line
          name: data.name,
          // @ts-ignore:next-line
          plaidId: data.name,
          userId: userId || "",
        },
      });

      const parsedJson = await response.json();

      if (parsedJson.data == null && parsedJson.status < 0) {
        throw new Error(`${parsedJson.message}: ${parsedJson.error}`);
      } else {
        return parsedJson;
      }
    },
    onSuccess: () => {
      toast.success("Account Create successfully");
      queryClient.invalidateQueries({ queryKey: [ACCOUNTS_QUERY_KEY] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
