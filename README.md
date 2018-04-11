### Vue-mobile-page
<p>
  <a href="https://www.npmjs.com/package/vue-mobile-page"><img src="https://img.shields.io/npm/dm/vue-mobile-page.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-mobile-page"><img src="https://img.shields.io/npm/v/vue-mobile-page.svg" alt="Version"></a>
</p>

vue移动端下拉分页插件，其本质是使用指令实现。

### Feature
 - [x] scroll节流   
 - [x] 分页逻辑

### Usage
```
// install
npm install vue-mobile-page --save

import page from 'vue-mobile-page'
...
{
  mixins: [ page ]
}
```

### 工作流程
`binding`指令的时候会去执行一次`beforeCallback` -> `callback` -> `afterCallback`

其他场景——需要手动执行，提供了`doCallback`(详见method说明)方法

### Dom结构
wrapper 分页滚动容器，固定的高度，用来获取scrollTop  
wrapper-item 分页包裹容器，用来获取高度

```vue
<template>
<div 
  class="wrapper" 
  v-page="{ 
    wrapperCls: 'wrapper-item', 
    callback: getList,
    beforeCallback: beforeGetList,
    afterCallback: afterGetList
  }"
>
  <div class="wrapper-item">
    <div class="demo-item" v-for="item in list">{{item.title}}</div>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    getList(pageCb) {
      console.log('currentPage', this.currentPage)
      let currentPageData = []
      pageCb && pageCb(currentPageData)
    },
    
    beforeGetList() {
      
    },
    
    afterGetList(isNoData) {
      
    }
  }
}
</script>
```

### 参数

参数名|描述|默认值
---|---|---
childWrapperCls|子容器类名，用来校验Dom结构的合理性|''
callback|分页回调|''
beforeCallback|分页前的回调，例如可以用来控制请求开关|''
afterCallback|分页后的回调，接受一个参数`noData`，同上|''
loadingOpen|是否开启默认的loading效果|true
throttleTime|截流waitTime|500ms

### 内置data
参数名|描述|默认值
---|---|---
currentPage|''|1
pageSize|''|20
noData|是否没有更多数据了|false
pageOpen|分页请求的开关，一般用在`beforeCallback`函数中|true
pageLoading|分页是否正在请求|false
loadingEl|请求loading的Dom节点|null

### 内置method
```js
// 用来重置分页相关参数
resetPage() {
  // ...
}

// 手动执行分页回调
// @params callback {Function} 拉取数据的函数
// @params beforeCallback {Function} 分页前的回调
// @params afterCallback {Function} 分页后的回调
doCallback(callback, beforeCallback, afterCallback) {
  // ...
}
```




