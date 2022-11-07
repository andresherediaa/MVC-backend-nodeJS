import { getAllPlanets } from "../../models/planets.model.js";

function httGetAllPlanets(req, res) {
    return res.status(200).json(getAllPlanets());
}

export { httGetAllPlanets };
