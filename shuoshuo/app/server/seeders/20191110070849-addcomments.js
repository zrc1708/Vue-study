'use strict';
const md5 = require('md5')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Comments', [{
        content_id: 1,
        user_id: 1,
        content: '评论内容11111'
      },
      {
        content_id: 1,
        user_id: 2,
        content: '评论内容2222'
      },
      {
        content_id: 2,
        user_id: 1,
        content: '评论内容3333'
      }
    ], {})

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};