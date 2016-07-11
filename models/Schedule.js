module.exports = function( sequelize, DataTypes ){
    var Schedule = sequelize.define( 'Schedule', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            day_of_week: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isIn: [
                       [ 0, 1, 2, 3, 4, 5, 6]
                    ]
                }
            },
            driver_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            vehicle_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            start_time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            end_time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            driver_name:{
                type:DataTypes.STRING,
                allowNull:false
            },
            /**
             * 0 = current schedule
             * 1 = past schedule
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
            tableName: 'schedules',
            associate: function( models ){
                Schedule.belongsTo( models.Driver );
            }
        } );
    return Schedule;
};
