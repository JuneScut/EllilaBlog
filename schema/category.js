const moment = require('moment');

module.exports = function(sequelize, DataTypes){
    return sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'name'
        },
        icon: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'icon'
        },
        parent_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'parent_id'
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
        freezeTableName: true
    })
}