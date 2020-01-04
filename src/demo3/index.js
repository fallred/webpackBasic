let name1 = require('./a.js');
import './index.css';
import './index2.css';

document.querySelector('.block1').innerHTML = name1;

if (module.hot) {
    module.hot.accept();
    // module.hot.accept('./a.js', function(){
    //     let str = require('./a.js');
    //     console.log(str);
    //     document.getElementById('app').innerHTML = str;
    // });
}