'use strict';
module.exports = (sequelize, DataTypes) => {
  const ObraDeArte = sequelize.define('ObraDeArte', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    artista: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  }, {});
  ObraDeArte.associate = function(models) {
    ObraDeArte.belongsToMany(models.Museo, {
      through: models.MuseoObraDeArte,
      foreignKey: 'idObraDeArte',
      otherKey: 'idMuseo'
    });
  };
  return ObraDeArte;
};
