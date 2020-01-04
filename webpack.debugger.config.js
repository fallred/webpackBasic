const path = require('path');
module.exports = {
    mode:'development',
    entry: './src/demoDebugger/index.js',
    output: {
        path:path.join(__dirname, 'buildDebugger'),
        filename: 'bundle.js'
    }
};