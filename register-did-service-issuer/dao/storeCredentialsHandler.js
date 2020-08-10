const storeCredentialsHandler = (Credentials) => (newDID, cb) => {
  Credentials.persist(newDID, (err, doc) => {
    if (err) {
      return cb(err);
    }
    delete newDID._id;

    cb(null, { status: 200, responseJson: newDID });
  });
};

module.exports = storeCredentialsHandler;
