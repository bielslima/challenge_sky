module.exports = (input) => {
    var sha256 = require("crypto-js/sha256");
    return sha256(input).toString();
}