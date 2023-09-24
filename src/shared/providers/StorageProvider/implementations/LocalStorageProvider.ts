import fs from "fs";
import { resolve } from "path";

import upload from "../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(filename: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, filename),
      resolve(`${upload.tmpFolder}/${folder}`, filename)
    );

    return filename;
  }
  async delete(filename: string, folder: string): Promise<void> {
    const filepath = resolve(`${upload.tmpFolder}/${folder}`, filename);

    try {
      await fs.promises.stat(filepath);
    } catch {
      return;
    }

    await fs.promises.unlink(filepath);
  }
}

export { LocalStorageProvider };
