import {Sequelize,Model, DataTypes} from "sequelize"
import * as md5 from "md5"

'use strict';
module.exports = (sequelize:Sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      defaultValue: '',
      set(val:string){
        return md5(val)
      }
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    mobile: {
      type: DataTypes.CHAR(12),
      unique: true,
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      defaultValue: ''
    },
    createdIpAt: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: '',
    },
    updatedIpAt: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: '',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    tableName:'user',
    charset:'utf8mb4',
    collate:'utf8mb4_bin',
    indexes:[
      {
  
      }
    ],
    defaultScope:{
      attributes:{
        exclude:['password']
      }
    }
  });
  // User.associate = function (this:Model<any,any>,model:any) {
  //   // associations can be defined here
  // };
  return User;
};