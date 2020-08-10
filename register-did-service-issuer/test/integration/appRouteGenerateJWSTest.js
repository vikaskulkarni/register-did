describe("Generate JWS", function () {
  let app = require("../../app.js"),
    request = require("supertest");
  const { expect } = require("chai");
  const fs = require("fs");
  let pubPath = "";
  let priPath = "";

  before(function () {
    pubPath = "./generated/public.jwk";
    priPath = "./generated/private.jwk";

    fs.existsSync(pubPath) && fs.unlinkSync(pubPath);
    fs.existsSync(priPath) && fs.unlinkSync(priPath);
  });

  after(function () {
    fs.existsSync(pubPath) && fs.unlinkSync(pubPath);
    fs.existsSync(priPath) && fs.unlinkSync(priPath);
  });

  describe("POST /generateJWS", () => {
    it("Responds with failure json", (done) => {
      request(app)
        .post("/generateJWS")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(500);
          expect(res.body.error).to.equal(
            "Key files are not yet generated, please use POST /generateKeys to generate"
          );
          done();
        });
    });
  });

  describe("POST /generateJWS", () => {
    it("Responds with success json", (done) => {
      request(app)
        .post("/generateKeys")
        .expect(200)
        .end((err, res) => {
          request(app)
            .post("/generateJWS")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.payload).to.exist;
              done();
            });
        });
    });
  });
});
