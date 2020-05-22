const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
describe("User routes test", () => {
  beforeAll(async () => {
    const mongoDb = new MongoMemoryServer();
    const uri = await mongoDb.getUri();
    await mongoose.connect(
      uri,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });
  it("signup user", () => {
    return request(app)
      .post("/api/v1/user")
      .send({
        name: "Trivedh",
        email: "trivedhnani@gmail.com",
        password: "test1234",
        confirmPassword: "test1234",
      })
      .expect(200)
      .expect("Authorization", "Bearer jwt");
  });
});
