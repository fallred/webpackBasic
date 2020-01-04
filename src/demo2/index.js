let str = require('./a.js');
import name from './b.js';
import './index.css';

document.querySelector('.block1').innerHTML = str;
document.querySelector('.block2').innerHTML = name;

//有可能返回一个新的文件路径，也有可能返回base64图片编码
//是相对于输出目录的路径
import logo from './images/logo.png';
let img = new Image();
img.src = logo;
document.body.appendChild(img);

if (module.hot) {
    module.hot.accept();
    // module.hot.accept('./a.js', function(){
    //     let str = require('./a.js');
    //     console.log(str);
    //     document.getElementById('app').innerHTML = str;
    // });
}