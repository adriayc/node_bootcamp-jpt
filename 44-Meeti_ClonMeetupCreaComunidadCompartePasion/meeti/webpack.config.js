const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: './public/js/app.js',  
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, "./public/dist")
    },
    module: {
        rules: [    
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}