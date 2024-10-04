const request = require("supertest");
const mongoose = require("mongoose");
const helpers = require("../services/user.service");

const app = require("../index");
const User = require("../models/user.model");
const userRouter = require("../routes/user.routes");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(
    () => {
      console.log("Connection to database established");
    },
    (err) => {
      console.log("failed to coonect to mongo from Jest");
    }
  );
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("tests for /api/users requests", () => {
  it("GET /api/users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 10000); //timeout

  it("POST /api/users", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        username: "asfsafas",
        password: "12345",
        name: "Basilis",
        lastname: "Papakonstantinoy",
        email: "mail@gmail.com",
        address: {
          area: "Athens",
          road: "Serafidiou 2",
        },
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toBeTruthy();
  });

  it("POST /api/users check for already exist user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        username: "asfsafas",
        password: "12345",
        name: "Basilis",
        lastname: "Papakonstantinoy",
        email: "mail@gmail.com",
        address: {
          area: "Athens",
          road: "Serafidiou 2",
        },
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeFalsy();
  });
});
describe("For /api/users/{username} requests", () => {
  it("GET for /api/users/{username}", async () => {
    const user = await helpers.findLastInsertedUser();
    const res = await request(app).get(`/api/users/${user.username}`);
    console.log(user.username);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe(user.username);
    expect(res.body.data.email).toBe(user.email);
  });

  it("PATCH for api/users/{username}", async () => {
    const user = await helpers.findLastInsertedUser();

    const res = await request(app)
      .patch(`/api/users/${user.username}`)
      .send({
        name: "Lampater",
        lastname: "Ferormonis",
        email: "trialal@gmail.com ",
        address: {
          area: "Area 51",
          road: "road to hell",
        },
      });
    console.log(user.name);
    console.log(user.lastname);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.name).toBe("Lampater");
    expect(res.body.data.lastname).toBe("Ferormonis");
  });

  it("DELETE for api/users/{username}", async () => {
    const user = await helpers.findLastInsertedUser();
    const res = await request(app).delete(`/api/users/${user.username}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  });
});
