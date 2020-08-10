const { expect } = require("chai");

const findCredentialsHandler = require("../../dao/findCredentialsHandler");

describe("findCredentialsHandler", () => {
  it("verifies the DID credential", (done) => {
    const did = "did:self:0b13f420-da74-11ea-979d-2df8358f22ad";
    const mockRes = [
      {
        did: "did:self:0b13f420-da74-11ea-979d-2df8358f22ad",
        _id: "5f304a42b553e99a4ed24c85",
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
              created: "2020-08-09T19:10:53Z",
              jws:
                "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..MEQCIAOrfN_b-xwSCs4pYeGyyPy5h2bndDlC_i-66ouBXpYDAiBq8wrxniVfbcSuiV5oufr0pLjZef0iqtEa970vNnn8SA",
              proofPurpose: "assertionMethod",
              verificationMethod: "https://abcunv.org/issuers/keys/1",
            },
          ],
        },
      },
    ];

    const Credentials = {
      get: (did, cb) => {
        cb(null, mockRes);
      },
    };

    const handleRequest = findCredentialsHandler(Credentials);

    handleRequest(did, (err, result) => {
      if (err) return done(err);

      expect(result.status).to.equal(200);
      expect(result.response.did).to.not.exist;
      expect(result.response.signedVC).to.exist;
      done();
    });
  });
});
