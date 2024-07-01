import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { ERROR_MESSAGE as UI_ERROR_MESSAGE } from "@/constants/UI_ERROR_MESSAGE";
import { ACCOUNTS_QUERY_KEY } from "@/constants/UI_QUERY_KEY";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: [ACCOUNTS_QUERY_KEY],
    queryFn: async () => {
      const response = await client.api.account.$get();

      if (!response.ok) {
        throw new Error("Check your network");
      }

      const { data, status, error } = await response.json();

      if (status < 0 && error) {
        const errorMsg =
          UI_ERROR_MESSAGE[error as keyof typeof UI_ERROR_MESSAGE].message;

        throw new Error(errorMsg);
      }

      return data;
    },
  });

  return query;
};
