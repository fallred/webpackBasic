//zhufengnodejs zhufengjiagou
if(process.env.NODE_ENV == 'production') {
    module.exports = require('./build5/zhufengmath.min.js');
} else {
    module.exports = require('./build5/zhufengmath.js');
}