import { Databases, ID, Models, Query } from "appwrite";
import AppClient from "../client";
import { Post, PostDocument, Service } from "@/type/services";
import CONF from "@/conf";
import { handleError } from "@/utils/errorHandler";

export class PostServices extends AppClient {
  #databases: Databases;
  #collectionId: string;
  #db_id: string;

  constructor() {
    super();
    this.#databases = new Databases(this.client);
    this.#collectionId = CONF.get("APPWRITE_COLLECTION_ID");
    this.#db_id = CONF.get("APPWRITE_DATABASE_ID");
  }

  async createPost(newPost: Post): Promise<Service<PostDocument>> {
    const { title, slug, content, featuredImage, status, userId } = newPost;
    try {
      const res = await this.#databases.createDocument<PostDocument>(
        this.#db_id,
        this.#collectionId,
        ID.unique(),
        {
          slug,
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );

      return { data: res, error: null };
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  async updatePost(post: PostDocument): Promise<Service<PostDocument>> {
    const { $id, content, slug, status, title, featuredImage } = post;

    try {
      const res = await this.#databases.updateDocument<PostDocument>(
        this.#db_id,
        this.#collectionId,
        $id,
        {
          slug,
          title,
          content,
          featuredImage,
          status,
        }
      );

      return { data: res, error: null };
    } catch (error) {
      console.log("Error in update post ", error);
      return handleError(error);
    }
  }

  async deletePost($id: PostDocument["$id"]): Promise<Service<boolean>> {
    try {
      await this.#databases.deleteDocument(
        this.#db_id,
        this.#collectionId,
        $id
      );
      return { data: true, error: null };
    } catch (error) {
      return handleError(error);
    }
  }

  async getPost(
    slug: Post["slug"]
  ): Promise<Service<Models.DocumentList<PostDocument>>> {
    try {
      const res = await this.#databases.listDocuments<PostDocument>(
        this.#db_id,
        this.#collectionId,
        [Query.equal("slug", [slug])]
      );

      console.log("data from data[] ", res);

      return { data: res, error: null };
    } catch (error) {
      return handleError(error);
    }
  }

  async getPosts(
    queres: string[] = [Query.equal("status", "active")]
  ): Promise<Service<Models.DocumentList<PostDocument>>> {
    try {
      const res = await this.#databases.listDocuments<PostDocument>(
        this.#db_id,
        this.#collectionId,
        queres
      );

      return { data: res, error: null };
    } catch (error) {
      return handleError(error);
    }
  }
}

export const postServices = new PostServices();
