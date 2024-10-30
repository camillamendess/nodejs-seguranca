const database = require("../models");

const permissoes = (listaPermissoes) => {
  return async (req, res, next) => {
    const { usuarioId } = req;

    const usuario = await database.usuarios.findOne({
      // O atributo include é utilizado quando precisamos retornar as informações a partir de um relacionamento entre duas tabelas. 
      include: [
        {
          model: database.permissoes,
          as: 'usuario_permissoes',
          attributes: ['id', 'nome']
        }
      ],
      where: {
        id: usuarioId
      }
    });

    if (!usuario) {
      return res.status(401).send("Usuario não cadastrado");
    }
    // Filtrando as permissoes relacionadas ao usuario logado
    const permissoesCadastradas = usuario.usuario_permissoes
      .map((permissao) => permissao.nome)
      .some((permissao) => listaPermissoes.includes(permissao));

    if (!permissoesCadastradas) {
      return res.status(401).send("Usuario não possui acesso a essa rota");
    }

    return next();
  }
}

module.exports = permissoes;