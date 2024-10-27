const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  async login(dto) {
    // Adicione await para resolver a Promise retornada por findOne
    const usuario = await database.usuarios.findOne({
      attributes: ['id', 'email', 'senha'],
      where: {
        email: dto.email
      }
    });

    if (!usuario) {
      throw new Error("Usuario não cadastrado");
    }

    const senhaIguais = await compare(dto.senha, usuario.senha); // Retorna um boolean, true se a senha forem iguais e false se for diferente

    if (!senhaIguais) {
      throw new Error("Usuario ou senha inválida");
    }

    // sign(payload, secret, options)
    const accessToken = sign({
      id: usuario.id,
      email: usuario.email
    }, jsonSecret.secret, {
      expiresIn: 86400,
    });

    return { accessToken };

  }
}

module.exports = AuthService;