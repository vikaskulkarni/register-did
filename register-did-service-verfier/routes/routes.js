let express = require("express");
let router = express.Router();
const db = require("../bin/db").getDb;
const DIDS_COLLECTION = "dids";
const Credentials = require("../dao/findCredentials");

router.get("/", (req, res) => {
  res.status(200).send({ service: "DID Verifier" });
});

router.get("/health", (req, res) => {
  res.status(200).send({ status: "ok" });
});

router.get("/verify/:did", (req, res) => {
  const findCredentialsHandler = require("../dao/findCredentialsHandler")(
    Credentials
  );

  findCredentialsHandler(req.params.did, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }

    res.status(result.status);
    return res.json(result.response);
  });
});

module.exports = router;
