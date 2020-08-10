const { expect } = require("chai");

const getCredentialsHandler = require("../../dao/storeCredentialsHandler");

describe("storeCredentialsHandler", () => {
  it("stores the DID credential Credntials.persist is successful", (done) => {
    const newDID = {
      did: "did:self:0b13f420-da74-11ea-979d-2df8358f22ad",
      signedVC: {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://www.w3.org/2018/credentials/examples/v1",
        ],
        type: ["VerifiableCredential", "AlumniCredential"],
        issuer: "https://abcunv.org/issuers/4321",
        issuanceDate: "2020-08-09T19:10:52.475Z",
        credentialSubject: {
          id: "did:self:0b13f420-da74-11ea-979d-2df8358f22ad",
          alumniOf: "ABC University",
          degree: "Masters",
        },
        proof: [
          {
            type: "EcdsaSecp256k1Signature2019",
            created: "09-08-2020",
            jws:
              "eyJwdWJsaWNLZXkiOlt7ImlkIjoiI2tleS0xIiwidHlwZSI6IlNlY3AyNTZrMVZlcmlmaWNhdGlvbktleTIwMTgiLCJwdWJsaWNLZXlKd2siOnsia3R5IjoiRUMiLCJraWQiOiIja2V5LTEiLCJjcnYiOiJQLTI1NksiLCJ4Ijoic3hWLTlUQjZYTi1OX3NOdXJmSENaRl9lRFBHV0tFZmlKVlotVnR1YXhnMCIsInkiOiJMT09BMmxkMWoyTi03M0kxUktYMEFTc29vbDdyTkpDQ0Fpckd6RkFFSzBvIiwiZGVmYXVsdEVuY3J5cHRpb25BbGdvcml0aG0iOiJub25lIiwiZGVmYXVsdFNpZ25BbGdvcml0aG0iOiJFUzI1NksifX1dLCJzZXJ2aWNlIjpbeyJpZCI6IklkZW50aXR5SHViIiwidHlwZSI6IklkZW50aXR5SHViIiwic2VydmljZUVuZHBvaW50Ijp7IkBjb250ZXh0Ijoic2NoZW1hLmlkZW50aXR5LmZvdW5kYXRpb24vaHViIiwiQHR5cGUiOiJVc2VyU2VydmljZUVuZHBvaW50IiwiaW5zdGFuY2UiOlsiZGlkOnRlc3Q6aHViLmlkIl19fV19",
          },
          {
            type: "EcdsaSecp256k1Signature2019",
            created: "2020-08-09T19:16:09Z",
            jws:
              "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..MEUCIBFIEdYz3JKQhQxPMAJo2YQXLx8eZwa7AX3Km2Y2MlHkAiEAjqNfTmRnh10Dgef6_FdyPh3WqToqofoBlFlOxoIouYE",
            proofPurpose: "assertionMethod",
            verificationMethod: "https://abcunv.org/issuers/keys/1",
          },
        ],
      },
    };
    const Credentials = {
      persist: (newDID, cb) => {
        cb(null, newDID);
      },
    };

    const handleRequest = getCredentialsHandler(Credentials);

    handleRequest(newDID, (err, result) => {
      if (err) return done(err);

      expect(result.status).to.equal(200);
      expect(result.responseJson.did).to.exist;
      expect(result.responseJson.signedVC).to.exist;
      done();
    });
  });
});
