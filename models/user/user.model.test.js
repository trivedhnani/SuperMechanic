const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
describe("User model test", () => {
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
  it("create and save user", async () => {
    const savedUser = await UserModel.create({
      name: "Trivedh",
      email: "trivedhnani@gmail.com",
      password: "test1234",
      confirmPassword: "test1234",
    });
    expect(savedUser.name).toEqual("Trivedh");
    expect(savedUser.email).toEqual("trivedhnani@gmail.com");
    const match = await bcrypt.compare("test1234", savedUser.password);
    expect(match).toEqual(true);
    expect(savedUser.confirmPassword).toBe(undefined);
  });
});
