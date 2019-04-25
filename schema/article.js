const moment = require('moment');
// public getDataValue(key: string): any
// 获得列的值 
module.exports = function(sequelize, DataTypes){
    return sequelize.define('article', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'title'
        },
        author: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'author'
        },
        introduction: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'introduction'
        },
        tag: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'tag'
        },
        cover: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'cover'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        browser: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            field: 'browser',
            defaultValue: 0
        },
        is_del: {
            type: DataTypes.BOOLEAN,
            field: 'is_del',
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            get () {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get () {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 article
        // 为 false MySQL创建的表名称会是复数 articless
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })
}