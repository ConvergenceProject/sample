// Import npm packages.
import mongoose from "mongoose";
import staticData from "./constants/staticData";

const database = {

  // mongodb connect.
  connect: async () => {

    try {
      mongoose.set("strictQuery", false);
      const con = await mongoose.connect(staticData.databaseUrl!);
      console.log(`MongoDB connected`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

  },

  // mongodb disconnect.
  close: async () => {

    try {
      const clo = await mongoose.disconnect();
    } catch (error) {
      console.error(error);
    }

  }

}

export default database;

