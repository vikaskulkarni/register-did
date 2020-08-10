let express = require("express");
let router = express.Router();

const fs = require("fs");

const Credentials = require("../dao/storeCredentials");

const getCredentialsHandler = require("../dao/storeCredentialsHandler")(
  Credentials
);

router.get("/", (req, res) => {
  res.status(200).send({ service: "Key Issuer" });
});

router.get("/health", (req, res) => {
  res.status(200).send({ status: "ok" });
});

router.post("/generateKeys", async (req, res) => {
  let genKey = require("../lib/generate-keys");
  await genKey();
  res.send({ uri: "downloadPub" });
});

router.post("/generateJWS", async (req, res) => {
  const pubFile = `./generated/public.jwk`;
  const priFile = `./generated/private.jwk`;
  if (!fs.existsSync(pubFile) || !fs.existsSync(priFile)) {
    res.status(500);
    res.send({
      error:
        "Key files are not yet generated, please use POST /generateKeys to generate",
    });
  } else {
    let genJWS = require("../lib/generate-jws");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(await genJWS());
    res.end();
  }
});

router.get("/downloadPub", (req, res) => {
  const file = `./generated/public.jwk`;
  if (!fs.existsSync(file)) {
    res.status(500);
    res.send({
      error:
        "Public file is not yet generated, please use POST /generateKeys to generate",
    });
  } else {
    res.setHeader("Content-type", "text/plain");
    res.download(file);
  }
});

router.post("/issueVerifiedCredential", async (req, res) => {
  if (!req.body.encodedJWS) {
    handleError(res, "Invalid user input", "Must provide encodedJWS.", 400);
  }

  let vpBuilder = require("../lib/vp-build-issue");

  let newDID = await vpBuilder(req.body.encodedJWS);

  getCredentialsHandler(newDID, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }

    res.status(result.status);
    return res.json(result.responseJson);
  });
});

module.exports = router;
