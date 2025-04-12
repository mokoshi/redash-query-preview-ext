import React from "react";
import { QueryListItem } from "../components/QueryListItem";
import { useFetchQueriesTag } from "../hooks/use-fetch-queries";
import { Loading } from "../components/Loading";
import { Config } from "../../../config";

export const QueryListTag: React.FC = () => {
  const { data, isLoading } = useFetchQueriesTag(Config.featuredTag);

  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.results.length === 0) {
    return <div>クエリがありません</div>;
  }

  return data.results.map((d) => <QueryListItem query={d} />);
};
