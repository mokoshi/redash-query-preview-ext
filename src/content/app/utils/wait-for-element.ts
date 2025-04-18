export async function waitForElement(selector: string) {
  return new Promise<Element>((resolve) => {
    const checkExist = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkExist);
        resolve(element);
      }
    }, 100);
  });
}
