'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('category', {
         id: {
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            type:Sequelize.INTEGER,
            comment:'用户id'
         } ,
         name:{
          type:Sequelize.STRING(50),
          filed:'name',
          allowNull:false,
         },
        pid:{
          type:Sequelize.INTEGER,
          allowNull:false,
          defaultValue:0
        },
        createdAt:{
          allowNull:false,
          type:Sequelize.DATE,
          filed:'created_at',
          comment:'创建时间'
        },
        updatedAt:{
          allowNull:false,
          type:Sequelize.DATE,
          filed:'updated_at',
          comment:'更新时间'
        },
        },{
          tableName:'category',
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
   return queryInterface.dropTable('category');
  }
};
