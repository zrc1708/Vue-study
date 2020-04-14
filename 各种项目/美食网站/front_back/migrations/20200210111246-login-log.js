'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('login-log', {
       id: {
          allowNull:false,
          autoIncrement:true,
          primaryKey:true,
          type:Sequelize.INTEGER,
       } ,
       userId:{
         type:Sequelize.INTEGER,
         filed:'user_id',
         allowNull:false,
         defaultValue:0
       },
      loginIpAt:{
        allowNull:false,
        type:Sequelize.CHAR(15),
        filed:'login_ip_at',
        defaultValue:''
      },
      loginAt:{
        allowNull:false,
        type:Sequelize.DATE,
        filed:'login_at',
      },
      },{
        tableName:'login-log',
        charset:'utf8mb4',
        collate:'utf8mb4_bin',
        timestamp:false,
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
   return queryInterface.dropTable('login-log');
  }
};
