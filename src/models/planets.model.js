import fs from "fs";
import path from "path";
 
import { parse } from "csv-parse";
 

const habitablePlanets = [];
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
            .on("data", (chunk) => {
                if (isHabitablePlanets(chunk)) {
                    habitablePlanets.push(chunk);
                }
            })
            .on("error", (error) => {
                reject(error);
            })
            .on("end", () => {
                console.log(
                    habitablePlanets.length,
                    "habitablePlanets process has been done !!"
                );
                resolve();
            });
    });
}

function getAllPlanets() {
    return habitablePlanets
}

export { getAllPlanets,  loadPlanetsData };
