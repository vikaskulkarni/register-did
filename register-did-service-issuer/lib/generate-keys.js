let didAuth = require("@decentralized-identity/did-auth-jose");
let fs = require("fs");

let genKeys = async () => {
  const kid = "#key-1";
  const privateKey = await didAuth.EcPrivateKey.generatePrivateKey(kid);
  const publicKey = privateKey.getPublicKey();
  publicKey.defaultSignAlgorithm = "ES256K";

  fs.writeFileSync("generated/private.jwk", JSON.stringify(privateKey));
  fs.writeFileSync("generated/public.jwk", JSON.stringify(publicKey));

  return true;
};

module.exports = genKeys;
