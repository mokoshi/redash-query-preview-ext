import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../redash/url";

export function useFetchQueryDetail(queryId: string) {
  return useQuery({
    queryKey: ["queries", queryId],
    queryFn: async ({ queryKey }) => {
      const queryId = queryKey[1];
      if (!queryId) {
        throw new Error("Query ID is required");
      }
      const res = await fetch(getApiUrl(`queries/${queryId}`));
      const data = await res.json();
      return data;
    },
  });
}
