import express from "express";
import { httGetAllPlanets } from "./planets.controller.js";

const planetsRouter = express.Router();
planetsRouter.get("/", httGetAllPlanets);
export { planetsRouter };
