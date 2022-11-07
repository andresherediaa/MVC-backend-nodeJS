import express from "express";
import { planetsRouter } from "./routes/planets/planets.router.js";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import fs from "fs";
import { launchesRouter } from "./routes/launches/launches.router.js";

//Express configuration
const app = express();
var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "..", "logs", "access.log"),
    { flags: "a" }
);
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
app.use('/planets', planetsRouter);
app.use("/launches", launchesRouter);
app.use("/*", (req, res) => {
    //for serving client files routes
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
