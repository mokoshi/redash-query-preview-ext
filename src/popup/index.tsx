import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <div style={{ padding: 20 }}>
        <h1>Redash Query Preview</h1>
      </div>
    </React.StrictMode>
  );
}
