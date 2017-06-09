const loaderUtils = require("loader-utils");
module.exports = function (source, map) {
  this.cacheable && this.cacheable();
  const query = loaderUtils.getOptions(this) || {};

  for (let i = 0; i < query.functionArray.length; i++) {
    const functionName = query.functionArray[i].functionName;
    const functionBody = query.functionArray[i].functionBody;
    const searchFuncRegExp = new RegExp(functionName + '\(.*\)', 'g');
    console.log('functionBody', functionBody)
    const func = new Function(functionBody);
    source = source.replace(searchFuncRegExp, rv => {
      console.log(rv);
      const param = rv.match(/(\'|\").*(\'|\")/)[0].replace(/\'|\"/g, '');
      return func(param);
    })
  }
  console.log(source)
  this.callback(null, source, map);
}
