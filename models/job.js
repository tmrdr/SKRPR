'use strict';
module.exports = function(sequelize, DataTypes) {
  var job = sequelize.define('job', {
    title: DataTypes.STING,
    company: DataTypes.STING,
    summary: DataTypes.STRING,
    link: DataTypes.STING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.job.belongsToMany(models.user, {through: "userjob"});
      }
    }
  });
  return job;
};
