import { join } from "path";
export function replaceLastDir(path: string, dir: string) {
  const slicePath = path
    .split("/")
    .slice(0, -1)
    .join("/");

  return join(slicePath, dir);
}
