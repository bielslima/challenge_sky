const jwt = require("jsonwebtoken");
const secret = require("../config/auth").secret;

module.exports = (params) => jwt.sign(params, secret);
