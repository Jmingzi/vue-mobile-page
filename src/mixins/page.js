export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      noData: false,
      pageOpen: true,
      pageLoading: false,
      loadingEl: null
    }
  },
  directives: {
    page: {
      bind(el, binding, vNode) {
        // params
        let {
          wrapperCls,
          childWrapperCls,
          callback,
          beforeCallback,
          afterCallback,
          throttleTime,
          loadingOpen
        } = binding.value
        // 父容器
        let wrapperHeight
        // 子容器
        let childNodeWrapperHeight
        // 子节点
        const childNode = el.childNodes[0]
        // context
        const vm = vNode.context

        // 兼容前版本的参数名
        if (!childWrapperCls && wrapperCls) {
          childWrapperCls = wrapperCls
        }

        // loading
        if (loadingOpen !== false) {
          vm.genLoading(el)
        }

        // check child wrapper class
        if (
          childWrapperCls &&
          childNode &&
          childNode.classList.contains(childWrapperCls)
        ) {
          // 初次加载
          if (vm.currentPage === 1) {
            vm.doCallback(callback, beforeCallback, afterCallback)
          }

          el.addEventListener(
            'touchmove',
            vm.throttle(() => {
              wrapperHeight = el.offsetHeight
              childNodeWrapperHeight = childNode.offsetHeight
              // console.log(wrapperHeight, el.scrollTop, childNodeWrapperHeight)
              if (
                !vm.pageLoading &&
                !vm.noData &&
                childNodeWrapperHeight > wrapperHeight &&
                wrapperHeight + el.scrollTop >= childNodeWrapperHeight
              // childNodeWrapperHeight !== 0
              ) {
                vm.doCallback(callback, beforeCallback, afterCallback)
              }
            }, throttleTime || 500),
            { trailing: true, leading: true }
          )
        } else {
          console.error('you should give child wrapper class name')
        }
      }
    }
  },

  watch: {
    pageLoading(val) {
      this.loadingShow(val)
      return val
    }
  },

  methods: {
    doCallback(callback, beforeCallback, afterCallback) {
      beforeCallback && beforeCallback()

      // 分页开关
      if (!this.pageOpen) {
        return
      }

      this.pageLoading = true
      this.pageOpen = false

      callback && callback(data => {
        this.pageOpen = true
        this.pageLoading = false

        if (data instanceof Array) {
          this.noData = data.length === 0 && this.currentPage > 1
          afterCallback && afterCallback(this.noData)

          // 显示无更多了
          if (this.noData) {
            this.$nextTick().then(() => {
              this.loadingShow(true, '没有更多了')
            })
          }
        } else {
          console.error('params type must be an Array for page callback')
        }

        this.currentPage ++
      })
    },

    resetPage() {
      this.currentPage = 1
      this.pageSize = 20
      this.noData = false
      this.pageLoading = false
      this.pageOpen = true
    },

    genLoading(parentEl) {
      const loadingEl = document.createElement('p')
      loadingEl.style.cssText = 'text-align:center;line-height:40px;color:#999;font-size:14px;display:none;'
      this.loadingEl = loadingEl
      parentEl.appendChild(loadingEl)
    },

    loadingShow(type, txt = '加载中...') {
      if (this.loadingEl) {
        this.loadingEl.innerText = txt
        this.loadingEl.style.display = type ? '' : 'none'

        const parentEl = this.loadingEl.parentNode
        parentEl.scrollTop = parentEl.scrollTop + this.loadingEl.offsetHeight
      }
    },

    throttle(func, wait, options) {
      let timeout, context, args, result
      let previous = 0
      if (!options) options = {}

      let later = function() {
        previous = options.leading === false ? 0 : Date.now()
        timeout = null
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }

      let throttled = function() {
        let now = Date.now()
        if (!previous && options.leading === false) previous = now
        let remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout)
            timeout = null
          }
          previous = now
          result = func.apply(context, args)
          if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining)
        }
        return result
      }

      throttled.cancel = function() {
        clearTimeout(timeout)
        previous = 0
        timeout = context = args = null
      }

      return throttled
    }
  }
}
