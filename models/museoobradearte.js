'use strict';
module.exports = (sequelize, DataTypes) => {
  const MuseoObraDeArte = sequelize.define('MuseoObraDeArte', {
    idObraDeArte: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idMuseo: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    timestamps: true
  });
  return MuseoObraDeArte;
};
