module.exports = {
    entry: './index.js',
    output: {
        libraryTarget: 'umd',
        filename     : 'react-property-grid.js',
        library      : 'PropertyGrid'
    },
    module: {
        loaders: require('./loaders.config')
    },
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    }
}