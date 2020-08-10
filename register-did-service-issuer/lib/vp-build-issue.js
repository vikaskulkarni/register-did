const vc = require("vc-js");
let curr_date = new Date();
let date = ("0" + curr_date.getDate()).slice(-2);
let month = ("0" + (curr_date.getMonth() + 1)).slice(-2);
let year = curr_date.getFullYear();
const { v1: uuidv1 } = require("uuid");
const uniqueId = uuidv1();

const vpBuildAndIssue = async (encodedJWS) => {
  const credential = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1",
    ],
    type: ["VerifiableCredential", "AlumniCredential"],
    issuer: "https://abcunv.org/issuers/4321",
    issuanceDate: curr_date.toISOString(),
    credentialSubject: {
      id: "did:self:" + uniqueId,
      alumniOf: "ABC University",
      degree: "Masters",
    },
    proof: {
      type: "EcdsaSecp256k1Signature2019",
      created: `${date}-${month}-${year}`,
      jws: encodedJWS,
    },
  };

  const Secp256k1KeyPair = require("secp256k1-key-pair");
  const EcdsaSecp256k1Signature2019 = require("ecdsa-secp256k1-signature-2019");
  const keyPair = await Secp256k1KeyPair.generate();
  keyPair.id = "https://abcunv.org/issuers/keys/1";
  keyPair.controller = "https://abcunv.com/i/xyz";

  const suite = new EcdsaSecp256k1Signature2019({
    verificationMethod: keyPair.id,
    key: keyPair,
  });

  const signedVerifiedCredential = await vc.issue({ credential, suite });

  return { did: "did:self:" + uniqueId, signedVC: signedVerifiedCredential };
};

module.exports = vpBuildAndIssue;
