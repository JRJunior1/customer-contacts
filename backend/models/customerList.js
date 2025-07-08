const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const customerList = sequelize.define('customerList', 
   "customerList",
    {name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tag: {
        type: DataTypes.ENUM('VIP', 'High Value', 'New Lead'),
        defaultValue: 'New Lead'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'customers_contacts',
    timestamps: false
})

module.exports = customerList;