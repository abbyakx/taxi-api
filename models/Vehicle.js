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
            },
            /**
             * 0 = current vehicle
             * 1 = past vehicle
             */
            status:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    isIn: [
                        [ 0, 1 ]
                    ]
                }
            }
        },
        {
            tableName: 'vehicles'
        } );
    return Vehicle;
};