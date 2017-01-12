'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersJobs = sequelize.define('usersJobs', {
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      type: DataType.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Datatype.DATE
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
