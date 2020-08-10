const Credentials = {};
const DIDS_COLLECTION = "dids";
const db = require("../bin/db").getDb;

Credentials.get = (did, cb) => {
  db().collection(DIDS_COLLECTION).find({ did }).toArray(cb);
};

module.exports = Credentials;
