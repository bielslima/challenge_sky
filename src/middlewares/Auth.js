const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensagem: "Não autorizado!" });

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).json({ mensagem: "Token inválido!" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ mensagem: "Token inválido!" });
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: "Token inválido!" });
    req.user_id = decoded.user_id;
    next();
  });
};
