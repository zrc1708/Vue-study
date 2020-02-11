'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user-profile', {
         id: {
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            type:Sequelize.INTEGER,
            comment:'用户id'
         } ,
         user_id:{
          type:Sequelize.INTEGER,
          filed:'user_id',
          allowNull:false,
          defaultValue:0
         },
        nickname:{
          type:Sequelize.STRING(12),
          allowNull:false,
          defaultValue:''
        },
        real_nanme:{
          type:Sequelize.STRING(12),
          allowNull:false,
          defaultValue:''
        },
        gender:{
          type:Sequelize.STRING(12),
          allowNull:false,
          defaultValue:''
        },
        birthday:{
          type:Sequelize.DATE,
          allowNull:false,
        },
        createdAt:{
          allowNull:false,
          type:Sequelize.DATE,
          filed:'created_at',
          comment:'用户注册时间'
        },
        updatedAt:{
          allowNull:false,
          type:Sequelize.DATE,
          filed:'updated_at',
          comment:'用户最新一次登录时间'
        },
        },{
          tableName:'user-profile',
          charset:'utf8mb4',
          collate:'utf8mb4_bin',
          indexes:[
            {
  
            }
          ]
        });
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('user-profile');
  }
};
