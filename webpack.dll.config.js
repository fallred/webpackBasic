const path=require('path');
const DllPlugin=require('webpack/lib/DllPlugin');
module.exports={
    mode: 'none',
    // 把 React 相关模块的放到一个单独的动态链接库
    entry: {
        react:['react','react-dom']
    },
    output: {
        // 输出的文件都放到 buildDll 目录下
        path: path.resolve(__dirname,'buildDll'),
        // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称
        filename: '[name].dll.js',
        // 存放动态链接库的全局变量名称,例如对应 react 来说就是 _dll_react
        library: '_dll_[name]',
    },
    plugins: [
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            // 例如 react.manifest.json 中就有 "name": "_dll_react"
            name: '_dll_[name]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.join(__dirname, 'buildDll', '[name].manifest.json')
        })
    ]
}