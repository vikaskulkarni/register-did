"use strict";

let issueVerifiedCredential = (data) => {
  let buff = new Buffer(data, "base64");
  let text = buff.toString("ascii");

  return JSON.parse(text);
};

module.exports = issueVerifiedCredential;
