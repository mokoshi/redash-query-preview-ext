import { useEffect, useRef, useState } from "react";
import { setupEditorHook } from "./setup-editor-hook";

export function useEditorWordAtCursor(): string {
  const [word, setWord] = useState<string>("");
  const wordRef = useRef<string>("");

  useEffect(() => {
    setupEditorHook({
      onCursorChange: async (word) => {
        if (wordRef.current !== word) {
          wordRef.current = word;
          setWord(word);
        }
      },
    });
  }, [wordRef]);

  return word;
}
