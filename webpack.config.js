const path = require('path');
module.exports = {
    target: "web",
    entry: {
        app: [ "./src/main.ts" ]
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "front-bundle.js",
    },
    devServer: {
        host: '0.0.0.0', // Required for docker
        publicPath: '',
        contentBase: path.resolve(__dirname, "src"),
        watchContentBase: true,
        compress: true,
        port: 9001
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        modules: [
            'node_modules'
        ]
    },
    mode: 'development',
};