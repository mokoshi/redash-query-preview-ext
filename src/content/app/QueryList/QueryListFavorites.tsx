import React from "react";
import { QueryListItem } from "../components/QueryListItem";
import { useFetchQueriesFavorites } from "../hooks/use-fetch-queries";
import { Loading } from "../components/Loading";

export const QueryListFavorites: React.FC = () => {
  const { data, isLoading } = useFetchQueriesFavorites();

  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.results.length === 0) {
    return <div>クエリがありません</div>;
  }

  return data.results.map((d) => <QueryListItem query={d} />);
};
