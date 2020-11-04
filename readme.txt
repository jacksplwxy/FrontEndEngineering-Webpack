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
·file-loader：
  -- 文件打包
  -- 作用：将文件移动到dist文件夹下 → 将文件随机命名或自定义 → 将文件名作为返回值返回







































