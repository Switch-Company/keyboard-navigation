/**
 * @switch-company/keyboard-navigation - Detect and add a class when the keyboard is used, removes it on click or mouse move.
 * @version v1.0.0
 * @link undefined
 * @license undefined
 **/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['keyboard-navigation'] = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var KeyboardMode = function () {
    function KeyboardMode(options) {
      classCallCheck(this, KeyboardMode);

      this.options = Object.assign({
        classElement: document.documentElement,
        className: 'keyboard',
        moveThreshold: 10
      }, options);

      this.activated = false;

      document.body.addEventListener('keydown', this);
      document.body.addEventListener('click', this, true);

      if (this.options.moveThreshold !== false) {
        document.body.addEventListener('mousemove', this, true);
      }
    }

    createClass(KeyboardMode, [{
      key: 'activate',
      value: function activate(event) {
        if (this.activated || event.keyCode !== 9) {
          return;
        }

        var apply = this.options.rules ? this.options.rules(event) : true;

        if (!apply) {
          return;
        }

        this.options.classElement.classList.add(this.options.className);
        this.activated = true;
      }
    }, {
      key: 'cancel',
      value: function cancel() {
        this.options.classElement.classList.remove(this.options.className);
        this.activated = false;
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(event) {
        switch (event.type) {
          case 'click':
            if (event.detail === 1 && this.activated) {
              this.cancel(event);
            }
            break;
          case 'mousemove':
            if (this.activated) {
              this.watchThreshold(event);
            }
            break;
          default:
            this.activate(event);
        }
      }
    }, {
      key: 'watchThreshold',
      value: function watchThreshold(event) {
        var startX = this.options.mouseX || event.clientX;
        var startY = this.options.mouseY || event.clientY;

        if (!this.options.mouseX) {
          this.options.mouseX = startX;
        }

        if (!this.options.mouseY) {
          this.options.mouseY = startY;
        }

        if (Math.abs(this.options.mouseX - event.clientX) >= this.options.moveThreshold || Math.abs(this.options.mouseY - event.clientY) >= this.options.moveThreshold) {
          delete this.options.mouseX;
          delete this.options.mouseY;

          this.cancel();
        }
      }
    }]);
    return KeyboardMode;
  }();

  return KeyboardMode;

})));
