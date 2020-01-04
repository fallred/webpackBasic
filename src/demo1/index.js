let str = require('./a.js');
import './index.css';
// import './style.less';
// console.log(str);
document.getElementById('app').innerHTML = str;
if (module.hot) {
    module.hot.accept();
    // module.hot.accept('./a.js', function(){
    //     let str = require('./a.js');
    //     console.log(str);
    //     document.getElementById('app').innerHTML = str;
    // });
}