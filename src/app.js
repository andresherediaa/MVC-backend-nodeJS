import express from "express";

//Express configuration
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        data: "sdfdsf",
    });
});

export default app;
