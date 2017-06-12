# function-pre-run-loader
根据webpack配置中的函数名，查找指定的函数。用此函数的执行结果替换掉该函数。


Read this in other languages: [English](README.md)
## Install
```
npm install --save-dev function-pre-run-loader
```
## Usage
 在webpack配置中添加类似下面的配置：
```js
module: {
  rules: [
      {
        test: /routes\.js$/,
        loader: 'function-pre-run-loader',
        query: {
          functionArray: [
            {
              functionName: 'dynamicImportPage',
              functionArgs: ['comPath'],
              functionBody: "return `r => require.ensure([], () => r(require('${comPath}')), '${comPath.replace(new RegExp('.*\/page\/|\.vue', 'g'), '').replace(new RegExp('\/', 'g'), '-').toLocaleLowerCase()}')`"
            }
          ],
        }
      },
  ]
}
```
如果你在项目上面的例子配置，function-pre-run-loader 会帮你把以 routes.js 为结尾文件中的 ```dynamicImportPage('components/page/base/user.vue')``` 转化为 ```r => require.ensure([], () => r(require('components/page/base/user.vue')), 'base-user')``` 这样会减少你的书写量而且让 chunkName 的命名更加规范。