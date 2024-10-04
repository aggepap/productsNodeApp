const request = require("supertest");
const mongoose = require("mongoose");
const helpers = require("../services/product.service");

const app = require("../index");
const Product = require("../models/product.model");
const productRouter = require("../routes/product.routes");

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

describe("tests for /api/products requests", () => {
  it("GET /api/products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 10000); //timeout

  it("POST /api/products", async () => {
    const res = await request(app).post("/api/products").send({
      product: "Test product",
      cost: 200,
      description: "Product imported for testing purposes",
      quantity: 10,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toBeTruthy();
  });

  it("POST /api/products check for already exist user", async () => {
    const res = await request(app).post("/api/products").send({
      product: "Test product",
      cost: 200,
      description: "Product imported for testing purposes",
      quantity: 10,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeFalsy();
  });
});
describe("For /api/products/{productID} requests", () => {
  it("GET for /api/products/{productID}", async () => {
    const product = await helpers.findLastInsertedProduct();
    const res = await request(app).get(`/api/products/${product.id}`);
    console.log(product.id);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data._id).toBe(product.id);
    expect(res.body.data.cost).toBe(product.cost);
  });

  it("PATCH for api/products/{productID}", async () => {
    const product = await helpers.findLastInsertedProduct();

    const res = await request(app).patch(`/api/products/${product.id}`).send({
      product: "Test product renamed",
      cost: 300,
      description:
        "Product imported for testing purposes and this is updated description",
      quantity: 2,
    });
    console.log(product.id);
    console.log(product.description);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.product).toBe("Test product renamed");
    expect(res.body.data.description).toBe(
      "Product imported for testing purposes and this is updated description"
    );
  });

  it("DELETE for api/products/{productID}", async () => {
    const product = await helpers.findLastInsertedProduct();
    const res = await request(app).delete(`/api/products/${product.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  });
});
