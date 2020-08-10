const findCredentialsHandler = (Credentials) => (did, cb) => {
  Credentials.get(did, (err, doc) => {
    if (err) {
      return cb(err);
    }
    let response = doc[0];
    delete response.did;
    delete response._id;

    cb(null, { status: 200, response });
  });
};

module.exports = findCredentialsHandler;
