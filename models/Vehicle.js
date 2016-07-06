module.exports = function( sequelize, DataTypes ){
    var Vehicle = sequelize.define( 'Vehicle', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            plate_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            make:{
                type: DataTypes.STRING,
                allowNull:false
            },
            model:{
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'vehicles'
        } );
    return Vehicle;
};