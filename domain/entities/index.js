`use strict`;

const fs = require(`fs`);
const path = require(`path`);
const orm = require(`sequelize`);

module.exports = class Repository {

  constructor(config) {
    this.sql = new orm(
      config.database,
      config.username,
      config.password,
      config.connection
    );
    this.orm = orm;
    this.models = {};
    this.associate();
  }

  associate() {
    fs .readdirSync(__dirname).filter(function(file) {
      return (file.indexOf(`.`) !== 0) && (file !== `index.js`);
    }).forEach((file) => {
      let model = this.sql.import(path.join(__dirname, file));
      this.all[model.name] = model;
    });

    Object.keys(this.all).forEach((modelName) => {
      if (this.all[modelName].options.hasOwnProperty(`classMethods`)) {
        this.all[modelName].options.classMethods.associate(this.all);
      }
    });
  }
};
