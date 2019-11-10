'use strict';
module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }, {
    tableName:'Comments'
  });
  Comments.associate = function(models) {
    // associations can be defined here
  };
  return Comments;
};