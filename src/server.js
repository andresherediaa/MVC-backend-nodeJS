import http from "http";
import app from "./app.js";
import { loadPlanetsData } from "./models/planets.model.js";

//server config
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
    try {
        await loadPlanetsData();
        server.listen(PORT, () => {
            console.log(`Server running in PORT ${PORT}`);
        });
    } catch (error) {
        console.log("error loadind models data", error);
    }
}

startServer();
