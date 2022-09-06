//所有的postcss的插件都是一个函数
const pxToRem =require('postcss-pxtorem')
module.exports = {
  //插件
  plugins: [
    pxToRem({
      // rootValue: 37.5,//根节点字体大小
      // 如果是vant 37.5如果自己的代码75
      // fi1e当前编译的css的文件路径
      rootValue:({file})=>(/vant/.test(file)?37.5:75),
      propList: ['*'],//所有的属性都转成rem
    })
  ]
}
