import React, { useCallback } from "react";
import { QueriesResponse } from "../redash/types";
import { getUrl } from "../redash/url";

type Props = {
  query: QueriesResponse["results"][number];
};

function useCopyToClipboard(text: string) {
  const [copied, setCopied] = React.useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, []);

  return { copied, copy };
}

export const QueryListItem: React.FC<Props> = ({ query }) => {
  const { copied, copy } = useCopyToClipboard(`query_${query.id}`);

  return (
    <div style={{ borderRadius: 1, padding: 4, backgroundColor: "#f8f8f8" }}>
      <div style={{ fontSize: "1rem" }}>query_{query.id}</div>
      <div style={{ color: "#000" }}>{query.name}</div>
      <div
        style={{
          marginTop: 2,
          display: "flex",
          gap: 4,
          justifyContent: "flex-end",
        }}
      >
        <a href={getUrl(`queries/${query.id}`)} target="_blank">
          開く
        </a>
        |
        <a style={{ cursor: "pointer" }} onClick={copy}>
          コピー
          <div
            style={{
              opacity: copied ? 1 : 0,
              transition: "opacity 0.2s",
              position: "absolute",
              right: 0,
              padding: 2,
              backgroundColor: "#eeeeee",
              boxShadow: "0 0 4px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ color: "#000" }}>Copied!</span>
          </div>
        </a>
      </div>
    </div>
  );
};
