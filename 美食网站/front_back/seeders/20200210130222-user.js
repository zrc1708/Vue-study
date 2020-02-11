const moment = require('moment')
const md5 = require('md5')

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('user', [
        {
          id:1,
          username:'mt',
          password:md5('123456'),
          disabled:false,
          mobile:'130000000000',
          email:'n12@qq.com',
          createdIpAt:'127.0.0.1',
          updatedIpAt:'127.0.0.1',
          createdAt:moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt:moment().format("YYYY-MM-DD HH:mm:ss")
        },
        {
          id:2,
          username:'zmouse',
          password:md5('123456'),
          disabled:false,
          mobile:'140000000000',
          email:'n21@qq.com',
          createdIpAt:'127.0.0.1',
          updatedIpAt:'127.0.0.1',
          createdAt:moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt:moment().format("YYYY-MM-DD HH:mm:ss")
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('user', null, {});
    
  }
};
