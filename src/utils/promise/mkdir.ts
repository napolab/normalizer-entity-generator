import { mkdir, exists } from "fs";

export async function mkdirPromise(path: string) {
  const isExist = await new Promise(resolve => exists(path, resolve));
  if (!isExist) {
    return new Promise((resolve, reject) =>
      mkdir(path, err => (err ? reject(err) : resolve()))
    );
  } else {
    return Promise.resolve();
  }
}
