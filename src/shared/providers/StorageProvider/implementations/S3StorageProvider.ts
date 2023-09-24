/* eslint-disable import-helpers/order-imports */
import { resolve } from "path";
import fs from "fs";
import { S3 } from "aws-sdk";
import mime from "mime";

import upload from "../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
  async save(filename: string, folder: string): Promise<string> {
    const originalPath = resolve(upload.tmpFolder, filename);
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: filename,
        ACL: "public-read",
        Body: fileContent,
        ContentType: mime.getType(originalPath),
      })
      .promise();

    await fs.promises.stat(originalPath);
    await fs.promises.unlink(originalPath);

    return filename;
  }
  async delete(filename: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `process.env.AWS_BUCKET/${folder}`,
        Key: filename,
      })
      .promise();
  }
}

export { S3StorageProvider };
