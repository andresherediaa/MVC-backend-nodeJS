import fs from "fs";
import path from "path";
import planets from "./planets.schema.js";
import { parse } from "csv-parse";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const habitablePlanets = [];
function isHabitablePlanets(planet) {
    return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.1 &&
        planet["koi_prad"] < 1.6
    );
}

//all this proccess is asyncronus, so we need a promise to
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(
            path.join(__dirname, "../..", "data", "2.1 kepler_data.csv")
        )
            .pipe(
                parse({
                    comment: "#",
                    columns: true,
                })
            )
            .on("data", async (chunk) => {
                if (isHabitablePlanets(chunk)) {
                    await savePlanet(chunk);
                }
            })
            .on("error", (error) => {
                reject(error);
            })
            .on("end", async () => {
                const numberPlanets = (await getAllPlanets()).length;
                console.log(
                    "habitablePlanets process has been done !!",
                    numberPlanets
                );
                resolve();
            });
    });
}

async function getAllPlanets() {
    return await planets.find({}, { __v: 0, _id: 0 });
}

async function savePlanet(planet) {
    await planets.updateOne(
        {
            keplerName: planet.kepler_name,
        },
        {
            keplerName: planet.kepler_name,
        },
        {
            upsert: true,
        }
    );
}

export { getAllPlanets, loadPlanetsData };
