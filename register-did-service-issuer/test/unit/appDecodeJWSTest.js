const { expect } = require("chai");

const decodeJWS = require("../../lib/decode-jws");

describe("decodeJWS", () => {
  it("should decode JWS successfully", (done) => {
    const encodedJWS =
      "eyJwdWJsaWNLZXkiOlt7ImlkIjoiI2tleS0xIiwidHlwZSI6IlNlY3AyNTZrMVZlcmlmaWNhdGlvbktleTIwMTgiLCJwdWJsaWNLZXlKd2siOnsia3R5IjoiRUMiLCJraWQiOiIja2V5LTEiLCJjcnYiOiJQLTI1NksiLCJ4Ijoic3hWLTlUQjZYTi1OX3NOdXJmSENaRl9lRFBHV0tFZmlKVlotVnR1YXhnMCIsInkiOiJMT09BMmxkMWoyTi03M0kxUktYMEFTc29vbDdyTkpDQ0Fpckd6RkFFSzBvIiwiZGVmYXVsdEVuY3J5cHRpb25BbGdvcml0aG0iOiJub25lIiwiZGVmYXVsdFNpZ25BbGdvcml0aG0iOiJFUzI1NksifX1dLCJzZXJ2aWNlIjpbeyJpZCI6IklkZW50aXR5SHViIiwidHlwZSI6IklkZW50aXR5SHViIiwic2VydmljZUVuZHBvaW50Ijp7IkBjb250ZXh0Ijoic2NoZW1hLmlkZW50aXR5LmZvdW5kYXRpb24vaHViIiwiQHR5cGUiOiJVc2VyU2VydmljZUVuZHBvaW50IiwiaW5zdGFuY2UiOlsiZGlkOnRlc3Q6aHViLmlkIl19fV19";
    const returnVal = decodeJWS(encodedJWS);
    expect(returnVal.publicKey).to.exist;

    done();
  });
});
