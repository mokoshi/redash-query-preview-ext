import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../redash/url";
import { QueryResultResponse } from "../redash/types";

export function useFetchQueryResults(queryId: string) {
  return useQuery<QueryResultResponse>({
    queryKey: ["queries/results", queryId],
    queryFn: async ({ queryKey }) => {
      const queryId = queryKey[1];
      if (!queryId) {
        throw new Error("Query ID is required");
      }
      const res = await fetch(getApiUrl(`queries/${queryId}/results`));
      const data = await res.json();
      return data;
    },
  });
}
