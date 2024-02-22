import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

const {
  appwriteUrl,
  appwriteProjectId,
  appwriteDatabaseId,
  appwriteCollectionId,
} = conf;

class AppwriteService {
  constructor() {
    this.client = new Client();
    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async saveData({ query, response }) {
    try {
      return await this.databases.createDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        ID.unique(),
        {
          query,
          response
        }
      );
    } catch (error) {
      console.error("Appwrite createDocument error: ", error);
      throw error;
    }
  }

  async listData() {
    try {
      return await this.databases.listDocuments(
        appwriteDatabaseId,
        appwriteCollectionId
      );
    } catch (error) {
      console.error("Appwrite listDocument error: ", error);
      throw error;
    }
  }
}

// Function to initialize the service
const initializeAppwriteService = () => {
  const service = new AppwriteService();
  return service;
};

export default initializeAppwriteService;
