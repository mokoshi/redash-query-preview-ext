import React from "react";
import { QueryListItem } from "../components/QueryListItem";
import { useFetchQueriesAll } from "../hooks/use-fetch-queries";
import { Loading } from "../components/Loading";

type Props = {
  searchTerm: string;
};

export const QueryListAll: React.FC<Props> = ({ searchTerm }) => {
  const { data, isLoading } = useFetchQueriesAll(searchTerm);

  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.results.length === 0) {
    return <div>クエリがありません</div>;
  }

  return data.results.map((d) => <QueryListItem query={d} />);
};
