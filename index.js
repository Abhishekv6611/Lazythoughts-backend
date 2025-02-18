import express from "express";
import { DB } from "./Config/db.js";
import cors from "cors";
import LazzyRoutes from './routes/LazzyRoutes.js'
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5400;
DB();

app.use(LazzyRoutes)






app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} `);
});
