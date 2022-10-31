import http from "http";
import app from "./app.js";

//server config
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`);
});
