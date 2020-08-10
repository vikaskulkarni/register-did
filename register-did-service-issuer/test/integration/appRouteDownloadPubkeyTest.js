describe("Download Public Key", function () {
  let app = require("../../app.js"),
    request = require("supertest");
  const { expect } = require("chai");
  const fs = require("fs");
  let path = "";

  before(function () {
    path = "./generated/public.jwk";

    fs.existsSync(path) && fs.unlinkSync(path);
  });

  after(function () {});

  describe("GET /downloadPub Fail", () => {
    it("Responds with failure json", (done) => {
      request(app)
        .get("/downloadPub")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(500)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.error).to.equal(
            "Public file is not yet generated, please use POST /generateKeys to generate"
          );
          done();
        });
    });
  });

  describe("GET /downloadPub Success", () => {
    it("Responds with failure json", (done) => {
      request(app)
        .post("/generateKeys")
        .expect(200)
        .end((err, res) => {
          request(app)
            .get("/downloadPub")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              done();
            });
        });
    });
  });
});
