var Sequelize = require( 'sequelize' );
var db = require( '../models' );
var _ = require( 'lodash' );

var Driver = db.Driver;


exports.index = function(res,req, next){
    var query = {
        where: {},
        order: 'created_at DESC'
    };

    Driver.findAll(query ).done(function(driver, err){
        if(!!err){
            console.log(err);
            return next();
        }
        else{
            res.send( 200, { drivers: driver });
            return next();
        }
    });

};