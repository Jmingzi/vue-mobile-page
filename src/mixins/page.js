export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      noData: false,
      pageLoading: false
    }
  },
  directives: {
    page: {
      bind(el, binding, vNode) {
        // check wrapper class
        let wrapperHeight, childNodeWrapperHeight
        let { wrapperCls, callback, throttleTime } = binding.value
        let childNode = el.childNodes[0]
        let vm = vNode.context

        if (
          wrapperCls &&
          childNode &&
          childNode.classList.contains(wrapperCls)
        ) {
          el.addEventListener('touchmove', vm.throttle(() => {
            // console.log('scroll', el.scrollTop)
            wrapperHeight = el.offsetHeight
            childNodeWrapperHeight = childNode.offsetHeight
            if (
              !vm.pageLoading &&
              !vm.noData &&
              wrapperHeight + el.scrollTop >= childNodeWrapperHeight &&
              childNodeWrapperHeight !== 0
            ) {
              vm.pageLoading = true
              vm.currentPage ++
              callback && callback((data)=> {
                vm.pageLoading = false
                if (data instanceof Array) {
                  vm.noData = data.length === 0
                } else {
                  console.error('params type must be an Array for page callback')
                }
              })
            }
          }, throttleTime || 500), { trailing: true, leading: true })
        } else {
          console.log('you should give wrapper class name')
        }
      }
    }
  },
  methods: {
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
