var Sequelize = require( 'sequelize' );
var db = require( '../models' );
var _ = require( 'lodash' );

var Schedule = db.Schedule;


exports.index = function( req, res, next ){
    var query = {
        where: {},
        order: 'created_at DESC'
    };

    Schedule.findAll( query ).done( function( err, schedule ){
        if( !!err ){
            console.log( "There is an error" );
            console.log( err );
            return next();
        }
        else{
            console.log( "Here are the schedules" );
            console.log( JSON.stringify( schedule ) );

            res.send( 200, { schedules: schedule } );
            return next();
        }
    } );
};

exports.create = function( req, res, next ){
    Schedule.find( {
        where: {
            driver_id: req.body.schedule.driver_id,
            day_of_week: req.body.schedule.day_of_week
        }
    } ).done( function( err, schedule ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else if( !!schedule ){
            res.send( 400, { errors: [ "This driver already has a schedule for " + req.body.schedule.day_of_week ] } )
        }
        else{
            var newSchedule = Schedule.build( {
                day_of_week: req.body.schedule.day_of_week,
                start_time: req.body.schedule.start_time,
                end_time: req.body.schedule.end_time,
                driver_id: req.body.schedule.driver_id
            } );

            newSchedule.save().done( function( err ){
                if( !!err ){
                    console.log( err );
                    return next();
                }
                else{
                    newSchedule.values.day_of_week = newSchedule.day_of_week;
                    newSchedule.values.start_time = newSchedule.start_time;
                    newSchedule.values.end_time = newSchedule.end_time;
                    newSchedule.values.driver_id = newSchedule.driver_id;

                    res.send( 200, { schedule: newSchedule } );
                    console.log( "New schedule is created" );
                    console.log( newSchedule );
                    return next();
                }
            } );
        }
    } );
};

exports.view = function( req, res, next ){
    Schedule.find( {
        where: {
            id: req.params.schedule_id
        }
    } ).done( function( err, schedule ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else if( !schedule ){
            console.log( "No Schedule found" );
            res.send( 400, { errors: [ 'Schedule not found' ] } );
        }
        else{
            console.log( "Here is the Schedule" );
            console.log( JSON.stringify( schedule ) );

            res.send( 200, { schedule: schedule } );
            return next();
        }
    } )
};

exports.update = function( req, res, next ){
    Schedule.find( {
        where: {
            id: req.params.schedule_id
        }
    } ).done( function( err, schedule ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else if( !schedule ){
            console.log( 'No driver found' );
            res.send( 400, { errors: [ 'Driver not found' ] } );
        }
        else{
            if( !!req.body.schedule.day_of_week ){
                res.send( 400, { error: [ "Cannot change the day of week for the schedule" ] } );
                return next();
            }
            if( !!req.body.schedule.start_time ){
                schedule.start_time = req.body.schedule.start_time;
            }
            if( !!req.body.schedule.end_time ){
                schedule.end_time = req.body.schedule.end_time;
            }
            if( !!req.body.schedule.vehicle_id ){
                schedule.vehicle_id = req.body.schedule.vehicle_id;
            }
            else{
                res.send( 400, { errors: [ "Invalid entries" ] } );
                return next();
            }

            schedule.save().done( function(){
                res.send( 200, { schedule: schedule } );
                return next();
            } )
        }
    } );
};
