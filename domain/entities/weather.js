"use strict";
const Sequelize = require(`sequelize`);

module.exports = function(sequelize) {
  const Cities = sequelize.define(`cidades`, {
    cityKey: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: `CD_CIDADE`,
      autoIncrement: true
    },
    city: { type: Sequelize.STRING, field: `DS_NOME_CIDADE` },
    latlong: { type: Sequelize.STRING, field: `NR_LATLONG` },
    updateDate: { type: Sequelize.DATE, field: `DT_CONTATO`}
  }, {
    schema: `contatos`,
    tableName: `acoes_de_contato`,
    timestamps: false
  });

  return Cities;
};
