var Sequelize = require( 'sequelize' );
var db = require( '../models' );
var _ = require( 'lodash' );

var Vehicle = db.Vehicle;


exports.index = function( req, res, next ){
    var query = {
        where: {},
        order: 'created_at DESC'
    };

    Vehicle.findAll( query ).done( function( err, vehicle ){
        if( !!err ){
            console.log( "There is an error" );
            console.log( err );
            return next();
        }
        else{

            res.send( 200, { vehicles: vehicle } );
            return next();
        }
    } );
};

exports.create = function( req, res, next ){

    var newVehicle = Vehicle.build( {
        plate_number: req.body.vehicle.plate_number,
        make: req.body.vehicle.make,
        model: req.body.vehicle.model,
        //status: 0

    } );

    newVehicle.save().done( function( err ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else{
            newVehicle.values.plate_number = newVehicle.plate_number;
            newVehicle.values.make = newVehicle.make;
            newVehicle.values.model = newVehicle.model;
            newVehicle.values.status = newVehicle.status;


            res.send( 200, { vehicle: newVehicle } );

            return next();
        }
    } );


};

exports.view = function( req, res, next ){
    Vehicle.find( {
        where: {
            id: req.params.vehicle_id
        }
    } ).done( function( err, vehicle ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else if( !vehicle ){
            console.log( "No Vehicle found" );
            res.send( 400, { errors: [ 'Vehicle not found' ] } );
        }
        else{


            res.send( 200, { schedule: vehicle } );
            return next();
        }
    } )
};

//exports.update = function( req, res, next ){
//    Vehicle.find( {
//        where: {
//            id: req.params.vehicle_id
//        }
//    } ).done( function( err, vehicle ){
//        if( !!err ){
//            console.log( err );
//            return next();
//        }
//        else if( !vehicle ){
//            console.log( 'No vehicle found' );
//            res.send( 400, { errors: [ 'Vehicle not found' ] } );
//        }
//        else{
//
//            if( !!req.body.schedule.vehicle_id ){
//                schedule.vehicle_id = req.body.schedule.vehicle_id;
//            }
//            else{
//                res.send( 400, { errors: [ "Invalid entries" ] } );
//                return next();
//            }
//
//            schedule.save().done( function(){
//                res.send( 200, { schedule: schedule } );
//                return next();
//            } )
//        }
//    } );
//};

exports.delete = function( req, res, next ){
    Vehicle.find( {
        where: {
            id: req.params.vehicle_id
        }
    } ).done( function( err, vehicle ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else if( !vehicle ){
            console.log( 'No vehicle found' );
            res.send( 400, { errors: [ 'Vehicle not found' ] } );
        }
        else{
            if( vehicle.status == 0 ){
                vehicle.status = 1;
                vehicle.save().done( function(){
                    res.send( 200, { message: ["Vehicle has been deleted"] } );
                    return next();
                } )
            }
            else{
                res.send( 400, { errors: [ "Vehicle cannot be deleted" ] } );
                return next();
            }
        }
    } );
};

