module.exports = function( sequelize, DataTypes ){
    var Driver = sequelize.define( 'Driver', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            license_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'drivers',
            associate: function( models ){
                Driver.hasMany( models.Schedule );
            }
        } );
    return Driver;
};