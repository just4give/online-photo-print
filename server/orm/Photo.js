/**
 * Created by Mithun.Das on 12/10/2015.
 */
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize');

var photo = sequelize.define('photo', {
    id: {
       type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    imgId: {
        type: Sequelize.STRING,
        field: 'imgId'
    },
    imgSrc: {
        type: Sequelize.STRING,
        field: 'imgSrc'
    },
    fileName: {
        type: Sequelize.STRING,
        field: 'fileName'
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'userId'
    },
    width: {
        type: Sequelize.INTEGER,
        field: 'width'
    },
    height: {
        type: Sequelize.INTEGER,
        field: 'height'
    },
    createdOn: {
        type: Sequelize.DATE,
        field: 'createdOn'
    }

},{
    freezeTableName: true,
    timestamps: false
});

module.exports = photo;
