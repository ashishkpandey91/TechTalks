import { ID, Models, Storage } from "appwrite";
import AppClient from "../client";
import CONF from "@/conf";
import { Service } from "@/type/services";
import { handleError } from "@/utils/errorHandler";

class BucketService extends AppClient {
  #storage: Storage;
  #bucketId: string;

  constructor() {
    super();
    this.#storage = new Storage(this.client);
    this.#bucketId = CONF.get("APPWRITE_BUCKET_ID");
  }

  async uploadImage(
    file: File,
    fileId: string = ID.unique()
  ): Promise<Service<Models.File>> {
    try {
      const data = await this.#storage.createFile(this.#bucketId, fileId, file);
      return { data, error: null };
    } catch (error) {
      return handleError(error);
    }
  }

  getPreview(fileId: string): string {
    return this.#storage.getFilePreview(this.#bucketId, fileId);
  }
}

export const bucketService = new BucketService();
