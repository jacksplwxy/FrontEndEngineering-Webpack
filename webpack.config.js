const path=require('path')

module.exports = {
    entry:'./index.js', //打包入口，即从哪个文件开始打包
    output:{    //打包输出
        filename:'bundle.js',   //打包后的文件名
        path:path.resolve(__dirname,'src/bundle')   //打包后的路径位置：在webpack.config.js路径下的src下的bundle文件夹下
    }
}