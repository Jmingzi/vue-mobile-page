## Vue-mobile-page
<p>
  <a href="https://www.npmjs.com/package/vue-mobile-page"><img src="https://img.shields.io/npm/dm/vue-mobile-page.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-mobile-page"><img src="https://img.shields.io/npm/v/vue-mobile-page.svg" alt="Version"></a>
</p>

vue移动端下拉分页插件，其本质是使用指令实现。

## Feature
 - [x] scroll节流   
 - [x] 分页逻辑

## Usage

```
// install
npm install vue-mobile-page --save

import page from 'vue-mobile-page'
...
{
  mixins: [page]
}
```

wrapper 分页滚动容器，固定的高度，用来获取scrollTop  
wrapper-item 分页包裹容器，用来获取高度
```vue
<div class="wrapper" v-page="{ wrapperCls: 'wrapper-item', callback: getList }">
  <div class="wrapper-item">
    <div class="demo-item" v-for="item in list">{{item.title}}</div>
  </div>
</div>
```

指令v-page参数
```js
{ 
  // 包裹容器类名
  wrapperCls: 'wrapper-item', 
  // 回调函数
  callback: getList 
}
```

getList接受一个参数fn，为分页回调，用来处理是否可以继续请求分页  
只需要将接口返回的数据结果作为参数回传

```js
getList(pageCb) {
  console.log('currentPage', this.currentPage)
  let currentPageData = []
  pageCb && pageCb(currentPageData)
}
```

内置data
```
currentPage: 1,
pageSize: 20,
// 只要结果返回为空，noDate === true
// 以此可以来判断是否加载完成
noData: false
```


