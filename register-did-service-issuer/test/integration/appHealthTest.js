let app = require("../../app.js"),
  request = require("supertest");
const { expect } = require("chai");

describe("GET /", () => {
  it("Responds with success json", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.service).to.equal("Key Issuer");
        done();
      });
  });
});
