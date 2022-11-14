import launches from "./launches.schema.js";
import planets from "./planets.schema.js";

const DEFAULT_FLIGHT_NUMBER = 0;
async function getAllLaunches() {
    return await launches.find({}, { __v: 0, _id: 0 });
}
async function saveLaunch(launch) {
    let planetName = await planets.findOne(
        { keplerName: launch.target },
        { __v: 0, _id: 0 }
    );
    if (!planetName) {
        throw new Error("Planet isn't avalible in the list");
    }
    await launches.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    launch.flightNumber =
        (await getLastestFlightNumber()) || DEFAULT_FLIGHT_NUMBER;
    launch.upcoming = true;
    launch.success = true;
    launch.customers = ["AHA", "NASA"];

    return await saveLaunch(launch);
}

async function getLastestFlightNumber() {
    const flightNumber = await launches.findOne().sort({ flightNumber: -1 });
    return flightNumber ? flightNumber.flightNumber + 1 : flightNumber;
}

async function existLaunchWithId(id) {
    return await launches.findOne({
        flightNumber: id,
    });
}

async function abortLaunchWithId(id) {
    const abortResponse = await launches.updateOne(
        {
            flightNumber: id,
        },
        {
            upcoming: false,
            success: false,
        }
    );
    return abortResponse.modifiedCount==1 && abortResponse.matchedCount==1;
}

export {
    getAllLaunches,
    scheduleNewLaunch,
    existLaunchWithId,
    abortLaunchWithId,
};
