'use strict';
module.exports = function(sequelize, DataTypes) {
  var job = sequelize.define('job', {
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    summary: DataTypes.STRING,
    link: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          models.job.belongsToMany(models.user, {through: "usersJobs"});
      }
    }
  });
  return job;
};
