import { Databases, Models, Query } from "appwrite";
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
        slug,
        {
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

  async updatePost(post: Post): Promise<Service<PostDocument>> {
    const { content, slug, status, title, featuredImage } = post;
    console.log("This is running ");
    try {
      const res = await this.#databases.updateDocument<PostDocument>(
        this.#db_id,
        this.#collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );

      return { data: res, error: null };
    } catch (error) {
      return handleError(error);
    }
  }

  async deletePost(slug: Post["slug"]): Promise<Service<boolean>> {
    try {
      await this.#databases.deleteDocument(
        this.#db_id,
        this.#collectionId,
        slug
      );
      return { data: true, error: null };
    } catch (error) {
      return handleError(error);
    }
  }

  async getPost(slug: Post["slug"]): Promise<Service<Models.Document>> {
    try {
      const res = await this.#databases.getDocument<PostDocument>(
        this.#db_id,
        this.#collectionId,
        slug
      );
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
