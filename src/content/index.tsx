import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { waitForElement } from "./app/utils/wait-for-element";

async function main() {
  // wait for the target element to be available and mount our app on it
  const leftPane = await waitForElement("schema-browser");

  if (document.getElementById("__redash_query_preview__")) {
    return;
  }

  const div = document.createElement("div");
  div.id = "__redash_query_preview__";
  leftPane.appendChild(div);

  console.log("mounting app");
  const root = ReactDOM.createRoot(div);
  root.render(<App />);
}

window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray) => {
    main();
    return target.apply(thisArg, argArray as any);
  },
});
window.addEventListener("popstate", (event) => {
  main();
});
main();
