'use strict';
module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define('Likes', {
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
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }, {
    tableName:'Likes'
  });
  Likes.associate = function(models) {
    // associations can be defined here
  };
  return Likes;
};