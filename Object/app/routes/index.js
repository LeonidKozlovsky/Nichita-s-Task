const objectRoutes = require('./object_routes');
module.exports = function (app, obj) {
    objectRoutes(app, obj);
}