*常规页面引入多个js文件带来的问题：
·多个js文件加载导致多个http请求，页面速度变慢
·单个js文件中无法弄清楚哪些变量或方法来自哪个文件
·js文件之间的依赖关系复杂，依赖顺序容易出错
·文件未压缩导致加载过慢

*关于模块：
·文档：https://www.webpackjs.com/concepts/modules/
·文档：https://www.webpackjs.com/api/module-methods/

*环境：
·安装node环境
·npm init使项目符合node规范，以便webpack打包项目
·避免使用全局安装webpack，因为不同版本的webpack版本不兼容。npm uninstall webpack webpack-cli -g
·webpack-cli使我们可以在命令行中直接使用webpack命令
·局部安装：
  -- npm install webpack --save-dev
  -- npm install webpack-cli --save-dev //webpack-cli使我们在命令行中可以运行webpack命令
·npx webpack -v：查看当前项目下的webpack版本
·使用：
  -- npx webpack index.js  //用webpack翻译index.js文件
  -- 代码参考：src/lesson1

*webpack是什么？
·webpack是什么:webpack是一个模块打包工具
·能够识别以下规范的模块代码：
  -- ES Moudule：import a from './a.js' export default a
  -- Common JS：var a=require('./a.js')  module.exports=a
  -- CMD
  -- ADM
·借助loader，webpack可以实现打包css、png等任何文件
·webpacak的本质是基于nodejs编写
·作用：
  -- 打包多个js，减少http请求
  -- 明确文件之间的依赖关系（易读）
  -- 简化文件之间的依赖顺序（易于调试）
·打包输出信息：
  -- hash：hash值，本次打包的唯一值
  -- version：打包用到webpack版本
  -- time：打包耗时
  -- asset：打包完成后生成的文件名称
  -- size：文件大小
  -- chunks：打包生成的文件的id值
  -- chunk names：打包入口的文件名


*webpack.config.js：
·webpack.config.js是webpack的配置文件
·修改默认配置文件为webpackconf.js：npx webpack --config webpackconf.js
·模式(mode)：production、development。默认production，代码被压缩

*loader：
·webpack默认只能打包js文件
·文件(图片)打包：  
  -- file-loader：
     -- 文件打包
     -- 作用：将文件移动到dist文件夹下 → 将文件随机命名或自定义 → 将文件名作为返回值返回
  -- url-loader：
     -- 与file-loader相似
     -- 可以将文件打包为base64
     -- limit: 满足限制文件大小才进行打包，以免js过大，影响加载
        {
            loader: 'url-loader',
            options: {
                name: '[name]_[hash].[ext]',
                outputPath: 'images/',
               limit: 10240
            }
		    }
·样式打包：
  -- postcss-loader：自动添加css的浏览器厂商前缀，如-webkit-、-ms-等
  -- sass-loader：将sass文件翻译为css文件
  -- css-loader：分析出css文件之间的import引用关系，并将他们打包成一个css文件
  -- style-loader：将css-loader打包出的文件内容挂在到html下的head中
  -- 配置：
     {
         test: /\.scss$/,
         use: [
             'style-loader', 
             {
               loader:'css-loader', 
               options:{
                 importLoaders:2,  //当引入的css文件存在@import其他css文件,该配置能使引入的其他css文件也进行postcss-loade和sass-loader这2个loader打包
                 modules:true,  //开启css模块化打包，防止全局引入的css影响其他模块的css,注意代码也要调整，参考《5、loader--css-modules》
               }
             },
             'sass-loader',
             'postcss-loader'
         ]
     }
  -- loader的执行顺序：从下至上、从右至左

*plugins：
·plugins可以在webpack运行到某个时刻的时候帮你做一些事情
·html-webpack-plugin：
  -- 在打包结束后自动生成一个html文件，并把打包生成的js自动引入进来
  -- 可以配置指定模板来生成html文件
·clean-webpack-plugin：
  -- 重新打包前，删除原来的打包文件夹
  -- 可以配置需要删除的文件夹
·HotModuleReplacementPlugin：
  -- webpack自带插件
  -- 它允许在运行时更新各种模块，而无需进行完全刷新。即页面不刷新的情况下，更新代码并生效。
  -- 在webpack.config.js中配置：
     -- plugins: [new webpack.HotModuleReplacementPlugin()]
     -- devServer: {hot: true,hotOnly: true}
  -- 在js中使用：vue-loader实现了以下代码，所以看上去vue自带热更新效果
     import number from './number'
     number()
     if(module.hot){
       module.hot.accept('./number',()=>{
         documnet.body.removeChild(document.getElementById('number'))
         number()
       })
     }

*webpack核心配置：
·entry：
  -- 打包入口，支持多页面的多个入口
  -- 文档：https://www.webpackjs.com/configuration/entry-context/#entry
·output：
  -- publicPath：path是webpack所有文件的输出的路径，必须是绝对路径；publicPath 并不会对生成文件的路径造成影响，主要是对你的页面里面引入的资源的路径做对应的补全，常见的就是css文件里面引入的图片
  -- 文档：https://www.webpackjs.com/configuration/output/
·devtool:
  -- source-map：开启sourceMap,调试时可以从打包后的文件对应到源码位置
  -- cheap-module-eval-source-map：开发环境中推荐的模式，提示比较全，且打包速度快。
     -- 其中cheap：表示只映射到源码的多少行，不映射到多少列（因为多少列通常意义不太大），这样可以很大提升打包速度
     -- 其中module：可以映射到第三方模块源码中
     -- 其中eval：eval方式生成sourceMap，速度快
  -- cheap-module-source-map：线上生产环境调试时推荐的模式，提示效果比cheap-module-eval-source-map更好
  -- 文档：https://www.webpackjs.com/configuration/devtool/
·devServer：
  -- 基本功能：启动一个本地服务器，监听文件变化自动打包，并且自动刷新浏览器。而webpack --watch只会监听变化自动打包这一个功能。
  -- 配置：
  	devServer: {	//启动devServer服务器
		    contentBase: './dist',	//指定服务器根路径
		    open: true,	//自动打开浏览器，自动访问服务器地址
		    port: 8080,	//指定服务端口
        proxy:{ //启动代理
          '/api':'http://localhost:3000'  //当访问url中包含api，则跳转指定代理url
        }
	  }
·






























