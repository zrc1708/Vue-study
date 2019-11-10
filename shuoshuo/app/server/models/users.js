'use strict';
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull:false
    },
    password: {
      allowNull: false,
      type: Sequelize.CHAR(32)
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }, {
    tableName:'users'
  });
  Users.associate = function(models) {
    //hasmany   一对多关系，一个user对应多个content
    Users.hasMany(models.Contents,{
      foreignKey:'user_id',
    })
    Users.hasMany(models.Comments,{
      foreignKey:'user_id',
    })
    
  };
  return Users;
};