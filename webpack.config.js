const path = require('path');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './src/sourse.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};