const path = require('path')

module.exports = {
    mode: 'development',
    module: {
        rules: [{
            test: /\.(png|jpg)$/,
            use: {
                loader: 'file-loader'
            }
        }]
    },
    output: {
        filename: 'dundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    }
}