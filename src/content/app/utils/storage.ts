export function save(key: string, value: string) {
  localStorage.setItem(`reash-query-preview_${key}`, value);
}
export function load(key: string) {
  return localStorage.getItem(`reash-query-preview_${key}`);
}
