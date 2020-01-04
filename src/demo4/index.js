import './module1';
import './index.css';
import './index.less';
import './index.scss';

import $ from 'jquery';

// 注意库的引入顺序
console.log('jQuery:', window.jQuery);

// webpack.ProvidePlugin后不需要全局引入
// import _ from 'lodash';
const arr = _.join(['a','b','c'],'@');
console.log(arr);

console.log(AUTHOR);
// expose-loader
// let $ = require('expose-loader?jQuery!jquery');
$('#app').append('<span>quanli3</span>');

// if (module.hot) {
//     module.hot.accept();
// }