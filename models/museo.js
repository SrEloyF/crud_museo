'use strict';
module.exports = (sequelize, DataTypes) => {
  const Museo = sequelize.define('Museo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  }, {});
  Museo.associate = function(models) {
    Museo.belongsToMany(models.ObraDeArte, {
      through: models.MuseoObraDeArte,
      foreignKey: 'idMuseo',
      otherKey: 'idObraDeArte'
    });
  };
  return Museo;
};
