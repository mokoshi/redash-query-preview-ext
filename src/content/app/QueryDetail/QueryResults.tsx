import React, { useState } from "react";
import { useFetchQueryResults } from "../hooks/use-fetch-query-results";
import { Loading } from "../components/Loading";
import { createPortal } from "react-dom";
import { QueryResultResponse } from "../redash/types";

type Props = {
  queryId: string;
};

export const QueryResults: React.FC<Props> = ({ queryId }) => {
  const { data, isLoading } = useFetchQueryResults(queryId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <a style={{ cursor: "pointer" }} onClick={handleOpenDialog}>
          クエリデータを見る
        </a>
        {isDialogOpen &&
          createPortal(
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
              }}
              onClick={handleCloseDialog}
            >
              <dialog
                style={{
                  position: "relative",
                  padding: 20,
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: 4,
                  width: "90%",
                  height: "90%",
                  zIndex: 101,
                }}
                open={isDialogOpen}
                onClick={(e) => e.stopPropagation()} // ダイアログ内のクリックを無視
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3>クエリデータ</h3>
                    <div
                      className="btn btn-default"
                      onClick={handleCloseDialog}
                    >
                      閉じる
                    </div>
                  </div>
                  <div style={{ flex: 1, overflow: "scroll" }}>
                    <ResultTable data={data.query_result.data} />
                  </div>
                </div>
              </dialog>
            </div>,
            document.body
          )}
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th style={{ padding: 3 }}>Column</th>
              <th style={{ padding: 3 }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.query_result.data.columns.map(
              (column: { name: string; type: string }, index: number) => {
                return (
                  <tr key={index}>
                    <td style={{ padding: 3 }}>{column.name}</td>
                    <td style={{ padding: 3 }}>{column.type}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ResultTable: React.FC<{
  data: QueryResultResponse["query_result"]["data"];
}> = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const maxRows = showMore ? Math.min(data.rows.length, 1000) : 10;
  const columns = data.columns.map((column) => column.name);

  return (
    <div>
      <table
        style={{
          width: "max-content",
          minWidth: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                  backgroundColor: "#f2f2f2",
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows
            .slice(0, maxRows)
            .map((row: Record<string, any>, index: number) => (
              <tr key={index}>
                {columns.map((c, i) => (
                  <td
                    key={i}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                      wordBreak: "break-all",
                      maxWidth: "200px",
                    }}
                  >
                    {row[c]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{ marginTop: "12px", textAlign: "center" }}>
        {showMore ? (
          "最大1000件までしか表示しません"
        ) : (
          <a
            onClick={toggleShowMore}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            もっと表示する
          </a>
        )}
      </div>
    </div>
  );
};
