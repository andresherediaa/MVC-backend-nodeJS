import { json } from "express";
import {
    getAllLaunches,
    updateAllLaunches,
    existLaunchWithId,
    abortLaunchWithId,
} from "../../models/launches.model.js";

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}
function httpPostAllLaunches(req, res) {
    const launchData = req.body;
    launchData.launchDate = new Date(launchData.launchDate);
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
    updateAllLaunches(launchData);
    return res.status(201).json({
        message: launchData,
        ok: true,
    });
}

async function httpRemoveLaunchId(req, res) {
    const launchId = parseInt(req.params.id);
    //if launch id doesn't exist
    if (!existLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Launch ID doesn't esxist",
        });
    }

    const deleteLaunch = await abortLaunchWithId(launchId);
    return res.status(200).json({
        success: true,
        launches: deleteLaunch,
    });
}

export { httpGetAllLaunches, httpPostAllLaunches, httpRemoveLaunchId };
