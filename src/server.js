import http from "http";
import app from "./app.js";
import { loadPlanetsData } from "./models/planets.model.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
//server config
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const MONGO_DB_URL = process.env.MONGO_DATABASE;
mongoose.connection.once("open", () => {
    console.log("Database Connected");
});
mongoose.connection.on("error", (error) => {
    console.log(`Error in database connection ${error}`);
});

async function startServer() {
    try {
        await mongoose.connect(MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await loadPlanetsData();
        server.listen(PORT, () => {
            console.log(`Server running in PORT ${PORT}`);
        });
    } catch (error) {
        console.log("error loadind models data", error);
    }
}

startServer();
