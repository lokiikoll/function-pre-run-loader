# function-pre-run-loader
Find the specified function based on the function name configured in webpack configuration object. Replace the function with the result of this function.

Read this in other languages: [简体中文](README.zh-cn.md)
## Install
```
npm install --save-dev function-pre-run-loader
```
## Usage
 Within your webpack configuration object, you'll need to add the babel-loader to the list of modules, like so:
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
If you are configuring the project above, the function-pre-run-loader will help you convert ```dynamicImportPage('components/page/base/user.vue')``` to ```r => require.ensure([], () => r(require('components/page/base/user.vue')), 'base-user')``` in the route.js. This will reduce your writing and make the chunkName name more standardized.
 