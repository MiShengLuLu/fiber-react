/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/Component/index.js":
/*!**************************************!*\
  !*** ./src/react/Component/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reconciliation */ "./src/react/reconciliation/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Component = /*#__PURE__*/function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props;
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(partialState) {
      (0,_reconciliation__WEBPACK_IMPORTED_MODULE_0__.scheduleUpdate)(this, partialState);
    }
  }]);

  return Component;
}();

/***/ }),

/***/ "./src/react/DOM/createDOMElement.js":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createDOMElement)
/* harmony export */ });
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");

function createDOMElement(virtualDOM) {
  var newElement = null;

  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type); // 处理元素的属性

    (0,_updateNodeElement__WEBPACK_IMPORTED_MODULE_0__.default)(newElement, virtualDOM);
  }

  return newElement;
}

/***/ }),

/***/ "./src/react/DOM/index.js":
/*!********************************!*\
  !*** ./src/react/DOM/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOMElement": () => (/* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "updateNodeElement": () => (/* reexport safe */ _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__.default)
/* harmony export */ });
/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ "./src/react/DOM/createDOMElement.js");
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");



/***/ }),

/***/ "./src/react/DOM/updateNodeElement.js":
/*!********************************************!*\
  !*** ./src/react/DOM/updateNodeElement.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateNodeElement)
/* harmony export */ });
function updateNodeElement(newElement, virtualDOM) {
  var oldVirtualDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // 获取节点对应的属性对象
  var newProps = virtualDOM.props || {};
  var oldProps = oldVirtualDOM.props || {};

  if (virtualDOM.type === 'text') {
    // 文本内容是否有变化
    if (newProps.textContent !== oldProps.textContent) {
      // 还需判断父级节点类型是否相同
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        virtualDOM.parent.stateNode.appendChild(document.createTextNode(newProps.textContent));
      } else {
        virtualDOM.parent.stateNode.replaceChild(document.createTextNode(newProps.textContent), oldVirtualDOM.stateNode);
      }
    }

    return;
  }

  Object.keys(newProps).forEach(function (propName) {
    // 获取属性值
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否是事件属性
      if (propName.slice(0, 2) === 'on') {
        //  onClick -> click
        var eventName = propName.toLowerCase().slice(2); // 为元素添加事件

        newElement.addEventListener(eventName, newPropsValue);

        if (oldPropsValue) {
          // 删除原有的事件处理函数
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === 'value' || propName === 'checked') {
        newElement[propName] = newPropsValue;
      } else if (propName !== 'children') {
        if (propName === 'className') {
          newElement.setAttribute('class', newPropsValue);
        } else {
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  }); // 判断属性被删除的请求

  Object.keys(oldProps).forEach(function (propName) {
    var oldPropsValue = oldProps[propName];
    var newPropsValue = newProps[propName];

    if (!oldPropsValue) {
      // 属性被删除了
      if (propName.slice(0, 2) === 'on') {
        var eventName = propName.toLowerCase().slice(2);
        newElement.removeEventListener(eventName, newPropsValue);
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName);
      }
    }
  });
}

/***/ }),

/***/ "./src/react/Misc/Arrified/index.js":
/*!******************************************!*\
  !*** ./src/react/Misc/Arrified/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var arrifiedd = function arrifiedd(tag) {
  return Array.isArray(tag) ? tag : [tag];
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrifiedd);

/***/ }),

/***/ "./src/react/Misc/CreateReactInstance/index.js":
/*!*****************************************************!*\
  !*** ./src/react/Misc/CreateReactInstance/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createReactInstance": () => (/* binding */ createReactInstance)
/* harmony export */ });
var createReactInstance = function createReactInstance(fiber) {
  var instance = null;

  if (fiber.tag === 'class_component') {
    // 类组件
    instance = new fiber.type(fiber.props);
  } else {
    // 函数组件
    instance = fiber.type;
  }

  return instance;
};

/***/ }),

/***/ "./src/react/Misc/CreateStateNode/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateStateNode/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DOM */ "./src/react/DOM/index.js");
/* harmony import */ var _CreateReactInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CreateReactInstance */ "./src/react/Misc/CreateReactInstance/index.js");



var createStateNode = function createStateNode(fiber) {
  if (fiber.tag === 'host_component') {
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
  } else {
    return (0,_CreateReactInstance__WEBPACK_IMPORTED_MODULE_1__.createReactInstance)(fiber);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStateNode);

/***/ }),

/***/ "./src/react/Misc/CreateTaskQueue/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateTaskQueue/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var createTaskQueue = function createTaskQueue() {
  var taskQueue = [];
  return {
    // 向任务队列中添加任务
    push: function push(item) {
      return taskQueue.push(item);
    },
    // 从任务队列中获取任务，遵循先进先出原则
    pop: function pop() {
      return taskQueue.shift();
    },
    // 任务队列中是否还有任务
    isEmpty: function isEmpty() {
      return taskQueue.length === 0;
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTaskQueue);

/***/ }),

/***/ "./src/react/Misc/getTag/index.js":
/*!****************************************!*\
  !*** ./src/react/Misc/getTag/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Component */ "./src/react/Component/index.js");


var getTag = function getTag(vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  } else if (Object.getPrototypeOf(vdom.type) === _Component__WEBPACK_IMPORTED_MODULE_0__.Component) {
    return 'class_component';
  } else {
    return 'function_component';
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTag);

/***/ }),

/***/ "./src/react/Misc/index.js":
/*!*********************************!*\
  !*** ./src/react/Misc/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTaskQueue": () => (/* reexport safe */ _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "arrified": () => (/* reexport safe */ _Arrified__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "createStateNode": () => (/* reexport safe */ _CreateStateNode__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "getTag": () => (/* reexport safe */ _getTag__WEBPACK_IMPORTED_MODULE_3__.default)
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue */ "./src/react/Misc/CreateTaskQueue/index.js");
/* harmony import */ var _Arrified__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arrified */ "./src/react/Misc/Arrified/index.js");
/* harmony import */ var _CreateStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateStateNode */ "./src/react/Misc/CreateStateNode/index.js");
/* harmony import */ var _getTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTag */ "./src/react/Misc/getTag/index.js");





/***/ }),

/***/ "./src/react/createElement/index.js":
/*!******************************************!*\
  !*** ./src/react/createElement/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElement)
/* harmony export */ });
function createElement(type, props) {
  var _ref;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // 处理子元素，判断子元素是否是文本节点
  // 先拷贝 children，然后遍历
  // const childElements = [].concat(children).map(child => {
  //   if (child instanceof Object) {
  //     return child
  //   } else {
  //     return createElement('text', { textContent: child })
  //   }
  // })
  // 如果是布尔值的节点，页面是不展示的，所以需要处理
  var childElements = (_ref = []).concat.apply(_ref, children).reduce(function (result, child) {
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child);
      } else {
        result.push(createElement('text', {
          textContent: child
        }));
      }
    }

    return result;
  }, []);

  return {
    type: type,
    // react 中可以通过 props.children 访问子元素
    props: Object.assign({
      children: childElements
    }, props) // children: childElements

  };
}

/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render),
/* harmony export */   "Component": () => (/* reexport safe */ _Component__WEBPACK_IMPORTED_MODULE_2__.Component),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ "./src/react/createElement/index.js");
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation */ "./src/react/reconciliation/index.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component */ "./src/react/Component/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.default
});

/***/ }),

/***/ "./src/react/reconciliation/index.js":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "scheduleUpdate": () => (/* binding */ scheduleUpdate)
/* harmony export */ });
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM */ "./src/react/DOM/index.js");


var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue)(); // 要执行的子任务

var subTask = null; // 最外层 Fiber 对象，pendingCommit.effects 存储着所有的 Fiber 对象

var pendingCommit = null;

var commitAllWork = function commitAllWork(fiber) {
  fiber.effects.forEach(function (item) {
    if (item.effectTag === 'placement') {
      // 追加节点
      var parentFiber = item.parent;
      /**
       * 继续判断当前 Fiber 对象对应的节点是否是 类组件
       * 父级组件不能直接追加真实 DOM 节点的
       */

      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent;
      }

      if (item.tag === 'host_component') {
        // item.parent.stateNode.appendChild(item.stateNode)
        parentFiber.stateNode.appendChild(item.stateNode);
      }
    } else if (item.effectTag === 'update') {
      // 更新
      if (item.type === item.alternate.type) {
        // 节点类型相同
        (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.updateNodeElement)(item.stateNode, item, item.alternate);
      } else {
        // 节点类型不同
        item.parent.stateNode.replaceChild(item.stateNode, item.alternate.stateNode);
      }
    } else if (item.effectTag === 'delete') {
      // 删除节点
      item.parent.stateNode.removeChild(item.stateNode);
    }
  }); // 备份旧的 Fiber 对象

  fiber.stateNode.__rootFiberContainer = fiber;
};

var getFirstTask = function getFirstTask() {
  // 从任务队列中获取任务
  var task = taskQueue.pop(); // 返回最外层的 Fiber 对象

  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
  };
};

var reconcileChildren = function reconcileChildren(fiber, children) {
  // children 可能是数组，也可能是对象
  var arrifiedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.arrified)(children);
  var index = 0;
  var numberOfElements = arrifiedChildren.length;
  var element = null;
  var newFiber = null; // 上一个兄弟 Fiber 对象

  var prevFiber = null;
  var alternate = null;

  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child;
  } // 执行删除操作 numberOfElements 数组有可能为空，但是 alternate 有可能存在，还是需要执行删除操作


  while (index < numberOfElements || alternate) {
    element = arrifiedChildren[index];
    /**
     * 如果 element 存在，并且其对应的备份 Fiber 对象也存在就做更新操作
     * 如果 element 存在，并且其对应的备份 Fiber 对象不存在就做初始渲染操作
     * 如果 element 不存在，但是其对应的备份 Fiber 对象存在就做节点删除操作
     */

    if (element && alternate) {
      // 子级 Fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
        effects: [],
        effectTag: 'update',
        // stateNode: null,
        parent: fiber,
        alternate: alternate
      };

      if (element.type === alternate.type) {
        // 类型相同
        newFiber.stateNode = alternate.stateNode;
      } else {
        // 类型不同
        // 为 Fiber 节点对象添加 DOM 对象或者组件实例对象
        newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);
      }
    } else if (element && !alternate) {
      // 子级 Fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
        effects: [],
        effectTag: 'placement',
        // stateNode: null,
        parent: fiber
      }; // 为 Fiber 节点对象添加 DOM 对象或者组件实例对象

      newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);
    } else if (!element && alternate) {
      // 删除操作
      alternate.effectTag = 'delete';
      fiber.effects.push(alternate);
    }

    if (index === 0) {
      // 为父级 Fiber 对象添加子级 Fiber 对象
      fiber.child = newFiber;
    } else if (element) {
      // 为 Fiber 对象添加下一个兄弟 Fiber 对象
      prevFiber.sibling = newFiber;
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }

    prevFiber = newFiber;
    index++;
  }
};

var executeTask = function executeTask(fiber) {
  // 构建子节点的 Fiber 对象
  if (fiber.tag === 'class_component') {
    // 如果是类组件，调用组件实例对象的 render 方法，获取 render 返回的 Fiber 的子元素
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === 'function_component') {
    // 如果是函数组件，调用函数组件本身
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    // 普通元素
    reconcileChildren(fiber, fiber.props.children);
  }

  if (fiber.child) {
    return fiber.child;
  }

  var currentExecutelyFiber = fiber; // 当前节点是否有兄弟 Fiber 对象

  while (currentExecutelyFiber.parent) {
    // 合并 effects 数组的 Fiber 对象
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(currentExecutelyFiber.effects.concat([currentExecutelyFiber])); // 当前 Fiber 对象是否有兄弟 Fiber 对象

    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling;
    } // 如果当前 Fiber 对象没有兄弟 Fiber 对象，继续向上查找父亲 Fiber 对象


    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;
};

var workLoop = function workLoop(deadline) {
  // 是否有待执行任务
  if (!subTask) {
    // 从任务队列中获取任务
    subTask = getFirstTask();
  } // 如果任务存在，并且浏览器有空闲时间，就调用 executeTask 方法执行任务


  while (subTask && deadline.timeRemaining() > 1) {
    // 执行任务，并且 executeTask 任务需要返回新的任务
    subTask = executeTask(subTask);
  } // 判断 pendingCommit 对象是否存在


  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};

var performTask = function performTask(deadline) {
  // 循环执行任务
  workLoop(deadline); // 判断 subTask 是否还有任务，或者任务队列还有任务未执行，再一次注册在浏览器空闲时间要执行的任务事件

  if (subTask || !taskQueue.isEmpty) {
    requestIdleCallback(performTask);
  }
};

var render = function render(element, container) {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时间执行任务
   */
  // 任务是通过 VirtualDOM 对象构建 Fiber 对象
  taskQueue.push({
    dom: container,
    props: {
      children: element
    }
  }); // 指定在浏览器空闲事件去执行任务

  requestIdleCallback(performTask);
};
/**
 * 
 * @param {Object} instance 组件实例对象
 * @param {Object} partialState 
 */

var scheduleUpdate = function scheduleUpdate(instance, partialState) {// 将组件的更新视为一个任务添加到任务队列中
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ "./src/react/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var root = document.getElementById('root');
var JSX = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, "React Fiber"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("p", null, "Hi Fiber")); // render(JSX, root)
// setTimeout(() => {
//   const jsx = (
//     <div>
//       {/* <p>change React Fiber</p> */}
//       <p>Hi Fiber</p>
//     </div>
//   )
//   render(jsx, root)
// }, 2000)

var Greating = /*#__PURE__*/function (_Component) {
  _inherits(Greating, _Component);

  var _super = _createSuper(Greating);

  function Greating(props) {
    var _this;

    _classCallCheck(this, Greating);

    _this = _super.call(this, props);
    _this.state = {
      name: '张三'
    };
    return _this;
  }

  _createClass(Greating, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, this.props.title, " Fiber React ", this.state.name, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("br", null), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("button", {
        onClick: function onClick() {
          return _this2.setState({
            name: '李四'
          });
        }
      }, "\u6309\u94AE"));
    }
  }]);

  return Greating;
}(_react__WEBPACK_IMPORTED_MODULE_0__.Component);

(0,_react__WEBPACK_IMPORTED_MODULE_0__.render)( /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Greating, {
  title: "Hello"
}), root);

function Heart(props) {
  return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null, "\u2665", /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("br", null), props.title);
} // render(<Heart title="Hello Fiber React" />, root)
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map