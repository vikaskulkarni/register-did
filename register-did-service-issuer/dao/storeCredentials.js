const Credentials = {};
const DIDS_COLLECTION = "dids";
const db = require("../bin/db").getDb;

Credentials.persist = (newDID, cb) => {
  db().collection(DIDS_COLLECTION).insertOne(newDID, cb);
};

module.exports = Credentials;
