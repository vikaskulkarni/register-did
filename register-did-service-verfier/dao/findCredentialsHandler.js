const findCredentialsHandler = (Credentials) => (did, cb) => {
  Credentials.get(did, (err, doc) => {
    if (err || doc.length == 0) {
      return cb({ message: "Invalid DID" });
    }
    let response = doc[0];
    delete response.did;
    delete response._id;

    cb(null, { status: 200, response });
  });
};

module.exports = findCredentialsHandler;
