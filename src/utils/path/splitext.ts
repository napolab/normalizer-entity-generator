import { basename } from "path";

export function splitext(path: string) {
  const splitPath = basename(path).split(".");
  const ext = splitPath[splitPath.length - 1];

  return [splitPath.join(".").replace(`.${ext}`, ""), ext];
}
