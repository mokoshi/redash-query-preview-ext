import { waitForElement } from "../utils/wait-for-element";

declare global {
  interface Window {
    ace: AceAjax.Ace;
  }
}

export type ScreenPosition = {
  pageX: number;
  pageY: number;
};

type Params = {
  onCursorChange: (word: string, cursorPosition: ScreenPosition) => void;
};

export async function setupEditorHook({ onCursorChange }: Params) {
  // wait for the page to load and the target element to be available
  await waitForElement("#brace-editor");
  if (!window.ace) {
    console.error("Ace editor is not loaded");
    return;
  }
  const editor = window.ace.edit("brace-editor");

  // Get the current cursor position and extract a word from it
  function getWordFromCursor(): string {
    const position = editor.getCursorPosition();
    const wordRange = editor.session.getWordRange(
      position.row,
      position.column
    );
    const word = editor.session.getTextRange(wordRange);
    console.debug("getWordFromCursor: ", word);
    return word;
  }

  function getCursorScreenPosition(): ScreenPosition {
    const cursorPosition = editor.getCursorPosition();
    const screenPosition = editor.renderer.textToScreenCoordinates(
      cursorPosition.row,
      cursorPosition.column
    );
    return {
      pageX: screenPosition.pageX,
      pageY: screenPosition.pageY,
    };
  }

  editor.session.selection.on("changeCursor", async () => {
    const word = getWordFromCursor();
    const cursorPosition = getCursorScreenPosition();
    onCursorChange(word, cursorPosition);
  });
}
