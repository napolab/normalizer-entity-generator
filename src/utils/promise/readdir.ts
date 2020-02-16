import { join } from "path";
import { readdir } from "fs";

export function readDirPromise(path: string): Promise<string[]> {
  return new Promise((resolve, reject) =>
    readdir(path, (err, files) =>
      err ? reject(err) : resolve(files.map(name => join(path, name)))
    )
  );
}
