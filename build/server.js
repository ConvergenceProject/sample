"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load required packages
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
// import cors from 'cors';
const staticData_1 = __importDefault(require("./constants/staticData"));
//const swStats = require('swagger-stats');
database_1.default.connect().then(() => console.log('Connected to Db'))
    .catch((err) => console.log("err"));
// Create our Express application
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
const routes_1 = __importDefault(require("./routes/routes")); //importing route
(0, routes_1.default)(app); //register the route
// Start the server
app.listen(staticData_1.default.port);
module.exports = app;
console.log("Running on port ", staticData_1.default.port);
//pm2 start process.json
//npm start
//npm run start:dev
