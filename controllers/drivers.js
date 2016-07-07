var Sequelize = require( 'sequelize' );
var db = require( '../models' );
var _ = require( 'lodash' );

var Driver = db.Driver;


exports.index = function( req, res, next ){
    var query = {
        where: {},
        order: 'created_at DESC'
    };

    Driver.findAll( query ).done( function( err, driver ){
        if( !!err ){
            console.log( "There is an error" );
            console.log( err );
            return next();
        }
        else{
            console.log( "Here are the drivers" );
            console.log( JSON.stringify( driver ) );

            res.send( 200, { drivers: driver } );
            return next();
        }
    } );
};

exports.create = function( req, res, next ){

    var newDriver = Driver.build( {
        first_name: req.body.driver.first_name,
        last_name: req.body.driver.last_name,
        license_number: req.body.driver.license_number
    } );
    newDriver.save().done( function( err ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else{
            newDriver.values.first_name = newDriver.first_name;
            newDriver.values.last_name = newDriver.last_name;
            newDriver.values.license_number = newDriver.license_number;

            res.send( 200, { driver: newDriver } );
            console.log( "New Driver is created" );
            console.log( newDriver );
            return next();
        }
    } );
};

exports.view = function( req, res, next ){
    Driver.find( {
        where: {
            id: req.params.driver_id
        }
    } ).done( function( err, driver ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else if( !driver ){
            console.log( "No Driver found" );
            res.send( 400, { errors: [ 'Driver not found' ] } );
        }
        else{
            console.log( "Here is the driver" );
            console.log( JSON.stringify(driver) );

            res.send( 200, { driver: driver } );
            return next();
        }
    } )
};

exports.update = function( req, res, next ){
    Driver.find( {
        where: {
            id: req.params.driver_id
        }
    } ).done( function( err, driver ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else if( !driver ){
            console.log( 'No driver found' );
            res.send( 400, { errors: [ 'Driver not found' ] } );
        }
        else{
            if( !!req.body.driver.first_name ){
                driver.first_name = req.body.driver.first_name;
            }
            if( !!req.body.driver.last_name ){
                driver.last_name = req.body.driver.last_name;
            }
            if( !!req.body.driver.license_number ){
                driver.license_number = req.body.driver.license_number;
            }
            else{
                res.send( 400, { errors: [ "Invalid entries" ] } );
                return next();
            }

            driver.save().done( function(){
                res.send( 200, { driver: driver } );
                return next();
            } )
        }
    } );
};

exports.delete = function( req, res, next ){
    Driver.find( {
        where: {
            id: req.params.driver_id
        }
    } ).done( function( err, driver ){
        if( !!err ){
            console.log( err );
            return next();
        }
        else if( !driver ){
            console.log( 'No driver found' );
            res.send( 400, { errors: [ 'Driver not found' ] } );
        }
        else{
            if( driver.status == 0 ){
                driver.status = 1;
                driver.save().done( function(){
                    res.send( 200, { message: ["Driver has been deleted"] } );
                    return next();
                } )
            }
            else{
                res.send( 400, { errors: [ "Driver cannot be deleted" ] } );
                return next();
            }
        }
    } );
};


