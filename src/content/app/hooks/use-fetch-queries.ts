import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../redash/url";
import { QueriesResponse } from "../redash/types";

function buildQueryHook(queryKey: string[], endpoint: string) {
  return function useFetchQueries() {
    return useQuery<QueriesResponse>({
      queryKey,
      queryFn: async () => {
        const res = await fetch(getApiUrl(endpoint));
        const data = await res.json();
        return data;
      },
    });
  };
}

export const useFetchQueriesAll = (search: string) =>
  buildQueryHook(["queries_all", search], "queries?q=" + search)();
export const useFetchQueriesFavorites = buildQueryHook(
  ["queries_favorites"],
  "queries/favorites"
);
export const useFetchQueriesMine = buildQueryHook(
  ["queries_mine"],
  "queries/my"
);

export const useFetchQueriesTag = (tag: string) =>
  buildQueryHook(["queries_tag", tag], `queries?tags=${tag}`)();
