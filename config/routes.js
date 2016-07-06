module.exports = function( server ){

    var drivers = require('../controllers/drivers');
    server.get('/drivers', drivers.index);
};