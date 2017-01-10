'use strict';

var bcrypt = require('bcrypt');


module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Password must be between 1 and 99'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, callback) {
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash;
        callback(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          models.user.belongsToMany(models.job, {through: "userjob"});
      }
    }
  });
  return user;
};
