import express from "express";
import { httpGetAllLaunches, httpPostAllLaunches, httpRemoveLaunchId} from "./launches.controller.js";

const launchesRouter = express.Router();
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpPostAllLaunches);
launchesRouter.delete("/:id", httpRemoveLaunchId);

export { launchesRouter };
