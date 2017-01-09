'use strict';
module.exports = function(sequelize, DataTypes) {
  var job = sequelize.define('job', {
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    summary: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return job;
};