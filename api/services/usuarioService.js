const database = require("../models");
const { hash } = require('bcryptjs');
const { where } = require("sequelize");
const uuid = require("uuid");

class UsuarioService {
  async cadastrar(dto) {
    // Acessar a base de dados - a função findOne recebe um objeto que a gente consegue passar filtros (parametros de busca com where)
    const usuario = await database.usuarios.findOne({
      where: {
        email: dto.email
      }
    });

    // Analisar se o usuario já foi cadastrado a partir do email
    if (usuario) {
      throw new Error('Usuario já cadastrado');
    }

    try {
      // Hash para proteção de senha do usuario
      const senhaHash = await hash(dto.senha, 8);

      // Cadastro do user
      const novoUsuario = await database.usuarios.create({
        // v4 gera um hash no padrão v4
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash
      });

      return novoUsuario;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário");
    }

  }

  async buscarTodosUsuarios() {
    // Buscar e retorna todos os usuarios
    const usuarios = await database.usuarios.findAll();
    return usuarios;
  }

  async buscarUsuarioPorId(id) {
    const usuario = await database.usuarios.findOne({
      where: {
        id: id
      }
    });

    if (!usuario) {
      throw new Error("Usuario não cadastrado");
    }

    return usuario;

  }

  async editarUsuario(dto) {
    const usuario = await this.buscarUsuarioPorId(dto.id);

    try {
      // Editar os att do usuario
      usuario.nome = dto.nome;
      usuario.email = dto.email;
      await usuario.save();
      return usuario;
    } catch (error) {
      throw new Error("Erro ao editar usuario!");
    }
  }

  async deletarUsuarioPorId(id) {
    await this.buscarUsuarioPorId(id);

    try {
      await database.usuarios.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}

module.exports = UsuarioService;