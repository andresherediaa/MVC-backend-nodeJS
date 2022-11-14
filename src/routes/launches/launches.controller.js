import {
    getAllLaunches,
    scheduleNewLaunch,
    existLaunchWithId,
    abortLaunchWithId,
} from "../../models/launches.model.js";

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}
async function httpPostAllLaunches(req, res) {
    const launchData = req.body;
    launchData.launchDate = new Date(launchData.launchDate);
    try {
        if (
            !launchData.mission ||
            !launchData.target ||
            !launchData.launchDate ||
            !launchData.rocket
        ) {
            return res.status(400).json({
                message: "Invalid or empty field in launch",
                ok: false,
            });
        }
        if (isNaN(launchData.launchDate)) {
            return res.status(400).json({
                message: "Invalid format on Date",
                ok: false,
            });
        }
        await scheduleNewLaunch(launchData);
        return res.status(201).json({
            message: launchData,
            ok: true,
        });
    } catch (error) {
        console.log("error", error.message);
        return res.status(400).json({
            message: error.message,
            ok: false
        });
    }
}

async function httpRemoveLaunchId(req, res) {
    const launchId = parseInt(req.params.id);
    const existLaunch = await existLaunchWithId(launchId);
    if (!existLaunch) {
        return res.status(404).json({
            error: "Launch ID doesn't esxist",
        });
    }

    const deleteLaunch = await abortLaunchWithId(launchId);
    if(!deleteLaunch) {
        return res.status(400).json({
            ok: false,
            error: "Launch was not updated",
        });
    }
    return res.status(200).json({
        ok: true,
        launches: deleteLaunch,
    });
}

export { httpGetAllLaunches, httpPostAllLaunches, httpRemoveLaunchId };
