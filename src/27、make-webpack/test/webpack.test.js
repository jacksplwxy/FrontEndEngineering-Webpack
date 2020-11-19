var webpack = require('../src/webpack'); 
const path = require('path')

//最终测试
const code = webpack(path.join(__dirname,'./src/index.js'))
console.log(code)