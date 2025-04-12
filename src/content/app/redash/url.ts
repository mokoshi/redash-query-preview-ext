export function getUrl(path: string) {
  const url = new URL(window.location.href);
  return `https://${url.host}/${path}`;
}

export function getApiUrl(path: string) {
  const url = new URL(window.location.href);
  return `https://${url.host}/api/${path}`;
}
