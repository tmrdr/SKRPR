'use strict';
module.exports = function(sequelize, DataTypes) {
    var usersJobs = sequelize.define('usersJobs', {
        userId: DataTypes.INTEGER,
        jobId: DataTypes.INTEGER,
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
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
