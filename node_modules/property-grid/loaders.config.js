module.exports = [
    {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM'
    },
    {
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
    },
    {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
    }
]