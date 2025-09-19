"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useRevealOnScroll;

var _react = require("react");

function useRevealOnScroll() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  (0, _react.useEffect)(function () {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: root,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    });
    var candidates = document.querySelectorAll('.anim-fade, .anim-up, .anim-scale');
    candidates.forEach(function (el) {
      return observer.observe(el);
    });
    return function () {
      return observer.disconnect();
    };
  }, [root]);
}
//# sourceMappingURL=useRevealOnScroll.dev.js.map
