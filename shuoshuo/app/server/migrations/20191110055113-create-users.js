'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
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
    },{
        tableName:'users',
        charset:'utf8mb4',
        collate:'utf8mb4_bin'
    }).then(()=>{
      return queryInterface.addIndex('users',{
        name:'username',
        unique:true,  //该索引表示值唯一，表示不允许有相同username的值
        fields:['username']
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};