let fs = require("fs");
let path = require("path");
let didAuth = require("@decentralized-identity/did-auth-jose");

const jwkPriv = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../generated/private.jwk"), "ascii")
);
const jwkPub = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../generated/public.jwk"), "ascii")
);

const privateKey = didAuth.EcPrivateKey.wrapJwk(jwkPriv.kid, jwkPriv);

const generateJWS = async () => {
  const jwtContent = {
    publicKey: [
      {
        id: jwkPub.kid,
        type: "Secp256k1VerificationKey2018",
        publicKeyJwk: jwkPub,
      },
    ],
    service: [
      {
        id: "IdentityHub",
        type: "IdentityHub",
        serviceEndpoint: {
          "@context": "schema.identity.foundation/hub",
          "@type": "UserServiceEndpoint",
          instance: ["did:test:hub.id"],
        },
      },
    ],
  };

  const header = {
    alg: jwkPub.defaultSignAlgorithm,
    kid: jwkPub.kid,
    operation: "create",
    proofOfWork: "{}",
  };

  const cryptoFactory = new didAuth.CryptoFactory([
    new didAuth.Secp256k1CryptoSuite(),
  ]);
  const jwsToken = new didAuth.JwsToken(jwtContent, cryptoFactory);
  const signedBody = await jwsToken.signAsFlattenedJson(privateKey, { header });

  return JSON.stringify(signedBody, 0, 4);
};

//generateJWS();

module.exports = generateJWS;
