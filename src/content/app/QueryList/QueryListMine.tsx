import React from "react";
import { QueryListItem } from "../components/QueryListItem";
import { useFetchQueriesMine } from "../hooks/use-fetch-queries";
import { Loading } from "../components/Loading";

export const QueryListMine: React.FC = () => {
  const { data, isLoading } = useFetchQueriesMine();

  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.results.length === 0) {
    return <div>クエリがありません</div>;
  }

  return data.results.map((d) => <QueryListItem query={d} />);
};
