'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user', {
         id: {
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            type:Sequelize.INTEGER,
            comment:'用户id'
         } ,
         username:{
           type:Sequelize.STRING(50),
           unique:true,
           allowNull:false,
           defaultValue:''
         },
         password:{
          type:Sequelize.CHAR(32),
          allowNull:false,
          defaultValue:''
        },
        disabled:{
          type:Sequelize.BOOLEAN,
          allowNull:false,
          defaultValue:false,
          comment:'是否是禁用状态'
        },
        mobile:{
          type:Sequelize.CHAR(12),
          unique:true,
          allowNull:false,
          defaultValue:''
        },
        email:{
          type:Sequelize.STRING(50),
          unique:true,
          allowNull:false,
          defaultValue:''
        },
        createdIpAt:{
          type:Sequelize.CHAR(15),
          allowNull:false,
          filed:'created_ip_at',
          defaultValue:'',
          comment:'用户注册的时候的ip'
        },
        updatedIpAt:{
          type:Sequelize.CHAR(15),
          allowNull:false,
          filed:'updated_ip_at',
          defaultValue:'',
          comment:'用户最新一次登录的ip'
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
          tableName:'user',
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
   return queryInterface.dropTable('user');
  }
};
