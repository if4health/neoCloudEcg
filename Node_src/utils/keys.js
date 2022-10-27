const fs = require('fs');
const { exportJWK } = require('jose');
const jwt = require('jsonwebtoken');
const S3Service = require('../service/S3Service');

const getPublicKey = async function () {
  return await S3Service.downloadFromS3(process.env.OAUTH_PUB);
};

const getPrivateKey = async function () {
  return await S3Service.downloadFromS3(process.env.OAUTH_PRIVATE);
};

module.exports.getPublicKey = getPublicKey;
module.exports.getPrivateKey = getPrivateKey;
module.exports.exportJWK = function (publicKey) {
  return exportJWK(publicKey);
};

module.exports.signPayload = async function (payload, expiresIn) {
  return jwt.sign(payload, await getPrivateKey(), {
    algorithm: 'RS256',
    expiresIn,
  });
};

module.exports.verifyToken = async function (token) {
  return jwt.verify(token, await getPublicKey());
};

module.exports.verifySymmetricToken = function (token) {
  return jwt.verify(token, process.env.OAUTH_SECRET);
};
