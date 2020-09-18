import app from "../app";
import request from "supertest";

describe("HEAD /status", () => {
  it("should respond",  function(done) {
    request(app)
        .head("/status")
        .expect(200, done);
  });
});

describe("GET /status", () => {
  it("should respond",  function(done) {
    request(app)
        .get("/status")
        .expect(200, done);
  });
});
