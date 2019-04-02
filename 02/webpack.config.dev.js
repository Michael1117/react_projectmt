const path = require('path');
const fs = require('fs')
const HtmlWebapckPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, 'dev');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js'

// 对每一个入口文件进行遍历 多入口
function getEntry() {
    let entryMap = {};
    // 遍历pageDir  index/ category/ detail
    fs.readdirSync(pageDir).forEach((pathname) => {
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName);

        let fileName = path.resolve(fullPathName, mainFile);

        if(stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    })

    return entryMap;
}

const entryMap = getEntry()

module.exports = {
    mode: 'development',
    entry: entryMap,
    output: {
        path: devPath,
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {test:/\.(js|jsx)$/, use:[{loader: 'babel-loader'}],include: srcRoot},
            {
                test: /\.css$/,
                use: ['style-loader','css-loader'], 
                include: srcRoot
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader'],
                include: srcRoot
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: 'url-loader?limit=8192',  // 小于8192转成base64
                include: srcRoot
            }
        ]
    },
    plugins: [
        new HtmlWebapckPlugin()
    ]
}