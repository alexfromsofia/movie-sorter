var webpack = require('webpack');
var path = require('path');
var distPath = path.resolve('./dist');

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './client',
        hot: true,
        port: 3210
    },
    entry: [
        'babel-polyfill',
        'webpack-hot-middleware/client',
        './client/client.js',
        './client/index.css'
    ],
    output: {
        path: distPath,
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!cssnext-loader?sourceMap',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|png|ttf|svg|ico)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
        ]
    }
};