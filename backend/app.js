import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

// Custom Imports
import { router } from "./routes/routes.js";

dotenv.config({ path: "./config.env" });
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
