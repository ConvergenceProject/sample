// Import npm packages.
import express from 'express';


// Import file modules.
import routes from "./routes/routes"
import { IUserAuth } from './interfaces/userInterface';


// Create our Express application.
const app = express();

// Setup app.
app.use(express.json())
app.use(express.static('public'))

// Register the route.
routes(app); 

// The below code is related to jwt decode.
declare global {
  namespace Express {
    interface Response {
      user?: IUserAuth
    }
  }
}

export default app;

//pm2 start process.json
//npm start
//npm run start:dev
//npm run test