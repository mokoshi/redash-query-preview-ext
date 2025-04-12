import React, { useState } from "react";
import { load, save } from "../utils/storage";
import { QueryListAll } from "./QueryListAll";
import { QueryListFavorites } from "./QueryListFavorites";
import { QueryListMine } from "./QueryListMine";
import { QueryListTag } from "./QueryListTag";
import { Config } from "../../../config";

const Filters = {
  all: "すべて",
  favorites: "お気に入り",
  mine: "自分の",
  tag: Config.featuredTag,
};

export const QueryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(load("filter") || "all");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        {Object.entries(Filters).map(([key, value]) => (
          <a
            key={key}
            style={{
              flexGrow: 1,
              cursor: "pointer",
              padding: 2,
              fontSize: "1.1rem",
              textAlign: "center",
              ...(key === filter
                ? {
                    fontWeight: "bold",
                    color: "#000",
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    borderTop: "1px solid #ccc",
                    borderLeft: "1px solid #ccc",
                    borderRight: "1px solid #ccc",
                  }
                : {
                    fontWeight: "normal",
                    color: "#444",
                    borderBottom: "1px solid #ccc",
                  }),
            }}
            onClick={() => {
              setFilter(key);
              save("filter", key);
            }}
          >
            {value}
          </a>
        ))}
      </div>
      {filter === "all" && (
        <input
          type="text"
          placeholder="クエリを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            marginBottom: 4,
            padding: 4,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          overflow: "scroll",
          paddingBottom: 8,
        }}
      >
        {filter === "all" ? (
          <QueryListAll searchTerm={searchTerm} />
        ) : filter === "favorites" ? (
          <QueryListFavorites />
        ) : filter === "mine" ? (
          <QueryListMine />
        ) : filter === "tag" ? (
          <QueryListTag />
        ) : null}
      </div>
    </div>
  );
};
