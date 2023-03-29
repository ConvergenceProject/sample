// Import npm packages.
import express from 'express';

// Import file modules.
import database from './database';
import staticData from './constants/staticData';
import routes from "./routes/routes"
import { IUserAuth } from './interfaces/userInterface';

// The below function use to connect database.
database.connect().then(() => console.log('Connected to Db'))
  .catch((err: Error) => console.log("err"));

// Create our Express application.
const app = express();

// Setup app.
app.use(express.json())
app.use(express.static('public'))

// Register the route.
routes(app); 

// Start the server.
app.listen(staticData.port);

// The below code is related to jwt decode.
declare global {
  namespace Express {
    interface Response {
      user?: IUserAuth
    }
  }
}

export default app;

console.log("Running on port ", staticData.port)
//pm2 start process.json
//npm start
//npm run start:dev