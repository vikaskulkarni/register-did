# register-did
A POC on Decentralised Identifiers

With Docker
```
cd register-did
docker-compose up --build --remove-orphans
```
This will bring up;
```
Eureka Server
ZUUL Server
Register DID Issuer
Register DID Verifier
```

```
cd register-did-ui
npm install
npm start or npm run start-dev
```

Without Docker

```
cd register-did

cd eureka
java -jar eureka-service-vk.jar

cd zuul
java -jar zuul-service-vk.jar

cd register-did-service-issuer
npm install
npm start

cd register-did-service-verfier
npm install
npm start

cd register-did-ui
npm install
npm start or npm run start-dev
```
Note: Without Docker, the Verification end point will not work (Work in progress)

To run tests
```
cd register-did-service-issuer
npm install
npm test

cd register-did-service-verifier
npm install
npm test
```
