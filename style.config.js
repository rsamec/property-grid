var ExtractTextPlugin = require('extract-text-webpack-plugin')

var file = 'index.css'
module.exports = {
    entry: './index.styl',
    output: {
        filename: file
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(file)
    ]
}