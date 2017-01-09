'use strict';
module.exports = function(sequelize, DataTypes) {
  var userjob = sequelize.define('userjob', {
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userjob;
};