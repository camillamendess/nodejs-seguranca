const { verify, decode } = require('jsonwebtoken');
const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access token não informado");
  }

  const [, accessToken] = token.split(" "); // Essa linha de código está usando desestruturação de arrays para extrair o segundo valor da string token após dividi-la por um espaço (" ")

  try {
    verify(accessToken, jsonSecret.secret);

    const { id, email } = await decode(accessToken);

    req.usuarioId = id;
    req.usuarioEmail = email;

    return next();

  } catch (error) {
    res.status(401).send("Usuario não autorizado");
  }
}