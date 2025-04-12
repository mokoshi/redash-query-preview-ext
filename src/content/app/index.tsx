import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEditorWordAtCursor } from "./hooks/use-editor-word-at-cursor";
import { QueryDetail } from "./QueryDetail";
import { QueryList } from "./QueryList";

const queryClient = new QueryClient();

export const Main: React.FC = () => {
  const word = useEditorWordAtCursor();
  const queryId = word.match(/^(?:cached_)?query_([\d]+)$/)?.[1];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {queryId ? <QueryDetail queryId={queryId} /> : <QueryList />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
};
