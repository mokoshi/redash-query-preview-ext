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
  const editor = await new Promise<AceAjax.Editor>((resolve) => {
    const checkExist = setInterval(() => {
      if (window.ace && document.getElementById("brace-editor")) {
        clearInterval(checkExist);
        resolve(window.ace.edit("brace-editor"));
      }
    }, 100);
  });

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
