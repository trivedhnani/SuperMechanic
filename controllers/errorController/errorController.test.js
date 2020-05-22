const httpMocks = require("node-mocks-http");
const AppError = require("../../utils/appError");
const errorHanlder = require("./errorController");
describe("Error Controller testing", () => {
  it("developer error testing", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    const err = new Error("error message");
    errorHanlder(err, req, res, next);
    const data = res._getJSONData();
    expect(data.message).toEqual("error message");
    expect(data.err).toEqual({ ...err, statusCode: 500, status: "fail" });
    expect(res.statusCode).toEqual(500);
  });
  it("developer error testing when error is operational", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    const err = new AppError(404, "error message");
    errorHanlder(err, req, res, next);
    const data = res._getJSONData();
    expect(data.message).toEqual("error message");
    expect(data.err).toEqual({ ...err });
    expect(res.statusCode).toEqual(404);
  });
});
