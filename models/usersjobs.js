'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersJobs = sequelize.define('usersJobs', {
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersJobs;
};
