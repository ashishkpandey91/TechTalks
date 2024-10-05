import { Account, AppwriteException, ID, Models } from "appwrite";
import AppClient from "../client";
import { Service } from "@/type/services";

class AuthService extends AppClient {
  account: Account;

  constructor() {
    super();
    this.account = new Account(this.client);
  }

  // Method for create account
  async singup(
    email: string,
    password: string,
    name: string
  ): Promise<Service<Models.User<Models.Preferences>>> {
    try {
      const res = await this.account.create(ID.unique(), email, password, name);
      return { data: res, error: null };
    } catch (error) {
      let message: string = "Something went wrong..";
      if (error instanceof AppwriteException || error instanceof Error) {
        message = error.message;
        console.log("Error From ");
      }

      return { data: null, error: { message } };
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<Service<Models.Session>> {
    try {
      const res = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return { data: res, error: null };
    } catch (error) {
      let message: string = "Something went wrong..";
      if (error instanceof AppwriteException || error instanceof Error) {
        message = error.message;
        console.log("Error From ");
      }

      return { data: null, error: { message } };
    }
  }
}

const authService = new AuthService();
export default authService;
