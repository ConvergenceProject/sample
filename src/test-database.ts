// // Import npm packages.
// import mongoose from "mongoose";
// import staticData from "./constants/staticData";

// const database = {

//   // mongodb connect.
//   connect: async () => {

//     try {
//       mongoose.set("strictQuery", false);
//       const con = await mongoose.connect(staticData.databaseUrl!);
//       console.log(`MongoDB connected`);
//     } catch (error) {
//       console.error(error);
//       process.exit(1);
//     }

//   },

//   // mongodb disconnect.
//   close: async () => {

//     try {
//       const clo = await mongoose.disconnect();
//     } catch (error) {
//       console.error(error);
//     }

//   }

// }

// export default database;


// import mongoose from 'mongoose';
// import Mockgoose from 'mockgoose';

// const mockgoose = new Mockgoose(mongoose);


// import staticData from "./constants/staticData";

// const database = {

//   // mongodb connect.
//   connect: async () => {

//     try {
//       mockgoose.set("strictQuery", false);
//       const con = await mockgoose.connect(staticData.databaseUrl!);
//       console.log(`MongoDB connected`);
//     } catch (error) {
//       console.error(error);
//       process.exit(1);
//     }

//   },

//   // mongodb disconnect.
//   close: async () => {

//     try {
//       const clo = await mockgoose.disconnect();
//     } catch (error) {
//       console.error(error);
//     }

//   }

// }

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

const testDatabase = {

  connect: async () => {
    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();

      await mongoose.connect(mongoUri);
    } catch (error) {
      return console.log(error);
    }
  },
  close: async () => {

    try {
      if (mongoose.connection) { // Check if the connection is open before attempting to drop the database
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      }

      await mongoServer.stop();
    } catch (error) {
      return console.log(error);
    }

  }
}

export default testDatabase;