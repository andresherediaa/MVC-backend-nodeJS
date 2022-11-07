import request from "supertest";
import app from "../../app.js";

describe("TEST GET /LAUNCHES", () => {
    test("should respond with 200 ok", async () => {
        await request(app)
            .get("/launches")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});

describe("TEST POST /LAUNCH", () => {
    const data = {
        mission: "kepler exploration",
        rocket: "Explorer IS1",
        launchDate: "January, 03, 2023",
        target: "Kepler-1652-b",
        customers: ["ZtM", "others"],
    };
    test("should respond with 201 ok ", async () => {
        await request(app)
            .post("/launches")
            .send(data)
            .set("Accept", "application/json")
            .expect("content-type", /json/)
            .expect(201);
    });
    test("should respond with message==> Invalid or empty field in launch 400", async () => {
        const response = await request(app)
            .post("/launches")
            .set("Accept", "application/json")
            .send({ ...data, mission: undefined })
            .expect("Content-Type", /json/)
            .expect(400);
        expect(response.body).toMatchObject({
            message: "Invalid or empty field in launch",
            ok: false,
        });
    });
    test("should respond with mesage ==> Invalid format on Date", async () => {
        await request(app)
            .post("/launches")
            .set("Accept", "application/json")
            .send({ ...data, launchDate: "" })
            .expect("Content-Type", /json/)
            .expect(400);
    });
});
