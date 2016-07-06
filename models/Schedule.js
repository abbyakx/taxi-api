module.exports = function( sequelize, DataTypes ){
    var Schedule = sequelize.define( 'Schedule', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            day_of_week: {
                type: DataTypes.STRING,
                allowNull: false
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
        },
        {
            tableName: 'schedules',
            associate: function( models ){
                Schedule.belongsTo( models.Driver );
            }
        } );
    return Schedule;
};
