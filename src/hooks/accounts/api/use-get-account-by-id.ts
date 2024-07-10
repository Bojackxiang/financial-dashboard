import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

import { ACCOUNT_QUERY_KEY } from "@/constants/UI_QUERY_KEY";
import { ERROR_MESSAGE as UI_ERROR_MESSAGE } from "@/constants/UI_ERROR_MESSAGE";

export const useGetAccountById = (id: string | undefined) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [ACCOUNT_QUERY_KEY, { id }],
    queryFn: async () => {
      if (!id) {
        const errorMsg = UI_ERROR_MESSAGE["InValidAcctId"].message;

        throw new Error(errorMsg);
      }
      const response = await client.api.account[":id"].$get({ param: { id } });

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
