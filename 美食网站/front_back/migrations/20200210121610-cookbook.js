'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('cookbook', {
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
         userId:{
          type:Sequelize.INTEGER,
          filed:'user_id',
          allowNull:false,
          defaultValue:0
        },
        category_id:{
          type:Sequelize.INTEGER,
          filed:'category_id',
          allowNull:false,
          comment:'属于的分类'
        },
        description:{
          type:Sequelize.STRING(500),
          filed:'description',
          allowNull:false,
          comment:'简介'
         },
         cover:{
          type:Sequelize.STRING(200),
          filed:'cover',
          allowNull:false,
          comment:'封面'
         },
         craft_id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          defaultValue:0,
          comment:'食材'
        },
        level_id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          defaultValue:0,
          comment:'难易度'
        },
        taste_id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          defaultValue:0
        },
        need_time:{
          allowNull:false,
          type:Sequelize.DATE,
          filed:'created_at',
          comment:'创建时间'
        },
        ingredients:{
          type:Sequelize.STRING(50),
          filed:'ingredients',
          allowNull:false,
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
          tableName:'cookbook',
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
   return queryInterface.dropTable('cookbook');
  }
};
