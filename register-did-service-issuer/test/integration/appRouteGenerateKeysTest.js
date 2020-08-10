describe("Generate Keys", function () {
  let app = require("../../app.js"),
    request = require("supertest");
  const { expect } = require("chai");
  const fs = require("fs");
  let path = "";

  before(function () {
    path = "./generated/public.jwk";

    fs.existsSync(path) && fs.unlinkSync(path);
  });

  after(function () {
    fs.existsSync(path) && fs.unlinkSync(path);
  });

  describe("POST /generateKeys", () => {
    it("Responds with success json", (done) => {
      request(app)
        .post("/generateKeys")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.uri).to.equal("downloadPub");
          done();
        });
    });
  });
});
