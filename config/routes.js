module.exports = function( server ){

    var drivers = require('../controllers/drivers');
    server.get('/drivers', drivers.index);
    server.post('/drivers', drivers.create);
    server.get('/drivers/:driver_id', drivers.view);
    server.put('/drivers/:driver_id', drivers.update);
};