'use strict';

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
    return queryInterface.bulkInsert('Contents', [{
        user_id: 2,
        title: 'bbbbb',
        content: '222222',
        comment_count: 1
      },
      {
        user_id: 1,
        title: 'ccccc',
        content: '33333',
        comment_count: 1
      },
      {
        user_id: 2,
        title: 'ddddd',
        content: '44444',
        comment_count: 1
      },
      {
        user_id: 1,
        title: 'eeeee',
        content: '55555',
        comment_count: 1
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