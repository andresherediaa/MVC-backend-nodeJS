const launches = new Map();

const launch = {
    flightNumber: 0,
    mission: "kepler exploration",
    rocket: "Explorer IS1",
    launchDate: new Date(),
    target: "Kepler-1652-b",
    customers: ["ZtM", "others"],
    upcoming: true,
    success: true,
};

const launch2 = {
    flightNumber: 1,
    mission: "kepler exploration 1",
    rocket: "Explorer IS1",
    launchDate: new Date(),
    target: "Kepler-1652-b",
    customers: ["ZtM", "others"],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);
launches.set(launch2.flightNumber, launch2);

function getAllLaunches() {
    return Array.from(launches.values());
}
function updateAllLaunches(launch) {
    launch.flightNumber = launches.size + 1;
    launch.upcoming = true;
    launch.success = false;
    launches.set(launch.flightNumber, launch);
}

function existLaunchWithId(id) {
    return launches.has(id);
}

function abortLaunchWithId(id) {
    return new Promise((resolve, reject) => {
        try {
            const abort = launches.get(id);
            abort.upcoming = false;
            abort.success = false;
            resolve(abort);
        } catch (error) {
            reject(error);
        }
    });
}

export {
    getAllLaunches,
    updateAllLaunches,
    existLaunchWithId,
    abortLaunchWithId,
};
