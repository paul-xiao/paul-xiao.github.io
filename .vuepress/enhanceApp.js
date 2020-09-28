export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app
  //https://wyydsb.xin/javaScript/comment.html gitalk
  Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      el.event = function (event) {
        if (!(el == event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.event)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.event)
    },
  });
}