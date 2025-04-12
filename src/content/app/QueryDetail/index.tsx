import React from "react";
import { useFetchQueryDetail } from "../hooks/use-fetch-query-detail";
import { getUrl } from "../redash/url";
import { Loading } from "../components/Loading";
import { QueryResults } from "./QueryResults";

type Props = {
  queryId: string;
};

export const QueryDetail: React.FC<Props> = ({ queryId }) => {
  const { data, isLoading } = useFetchQueryDetail(queryId);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {isLoading && <Loading />}
      {data && (
        <div>
          <h4>{data.name}</h4>
          <p>{data.description}</p>
          <p>
            <a target="_blank" href={getUrl(`queries/${queryId}`)}>
              query_{data.id}
            </a>
          </p>
        </div>
      )}
      <div
        style={{
          flex: 1,
          borderTop: "1px solid #ddd",
          paddingTop: 8,
          overflow: "scroll",
        }}
      >
        <QueryResults queryId={queryId} />
      </div>
    </div>
  );
};
