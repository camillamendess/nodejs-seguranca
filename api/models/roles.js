'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relacionamentos entre tabelas
      roles.belongsToMany(models.usuarios, {
        through: models.usuarios_roles,
        as: 'roles_do_usuario', // Não pode ser o mesmo nome da tabela de relacionamento
        foreignKey: 'role_id'
      });

      roles.belongsToMany(models.permissoes, {
        through: models.roles_permissoes,
        as: 'roles_das_permissoes',
        foreignKey: 'role_id'
      });
    }
  }

  roles.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};