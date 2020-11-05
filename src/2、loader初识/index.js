import avatar from './avatar.jpg'
// var avatar = require('./avatar.jpg')

console.log('avatar',avatar)

var img =new Image()
img.src=avatar

document.getElementById('root').append(img)