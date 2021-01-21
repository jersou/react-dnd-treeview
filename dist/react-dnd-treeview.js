(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dnd"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dnd", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["react-dnd-treeview"] = factory(require("react"), require("react-dnd"), require("classnames"));
	else
		root["react-dnd-treeview"] = factory(root["React"], root["react-dnd"], root["classnames"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TreeView = TreeView;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(3);
	
	var _Node = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function TreeView(props) {
	  return _react2.default.createElement(
	    "div",
	    { className: props.classNames.treeView },
	    _react2.default.createElement(_Node.TreeViewItemList, { parentNode: null, nodes: props.rootNodes, renderNode: props.renderNode, classNames: props.classNames, onMoveNode: props.onMoveNode })
	  );
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.DroppableTreeViewInsertTarget = DroppableTreeViewInsertTarget;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDnd = __webpack_require__(4);
	
	var _DraggedNode = __webpack_require__(5);
	
	var _InsertTarget = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var handleCanDrop = function handleCanDrop(item, _monitor, props) {
	    return !(props.parentNode === item.parentNode && (props.parentChildIndex === item.parentChildIndex || props.parentChildIndex === item.parentChildIndex + 1)) && !item.allSourceIDs.has(props.parentNode ? props.parentNode.id : null);
	};
	var handleDrop = function handleDrop(item, _monitor, props) {
	    return props.onMoveNode({
	        oldParentNode: item.parentNode,
	        oldParentChildIndex: item.parentChildIndex,
	        oldPrecedingNode: item.precedingNode,
	        node: item.node,
	        newParentNode: props.parentNode,
	        newParentChildIndex: props.parentChildIndex,
	        newPrecedingNode: props.precedingNode
	    }), {
	        parentNode: props.parentNode,
	        parentChildIndex: props.parentChildIndex
	    };
	};
	var collectNodeDropProps = function collectNodeDropProps(monitor) {
	    return {
	        canDrop: monitor.canDrop(),
	        isDropping: monitor.isOver({ shallow: true }) && monitor.canDrop()
	    };
	};
	function DroppableTreeViewInsertTarget(props) {
	    var _useDrop = (0, _reactDnd.useDrop)({
	        accept: _DraggedNode.TYPE,
	        collect: collectNodeDropProps,
	        drop: function drop(item, monitor) {
	            return monitor.didDrop() ? undefined // some child already handled drop
	            : handleDrop(item, monitor, props);
	        },
	        canDrop: function canDrop(item, monitor) {
	            return handleCanDrop(item, monitor, props);
	        }
	    }),
	        _useDrop2 = _slicedToArray(_useDrop, 2),
	        _useDrop2$ = _useDrop2[0],
	        canDrop = _useDrop2$.canDrop,
	        isDropping = _useDrop2$.isDropping,
	        dropRef = _useDrop2[1];
	
	    return _react2.default.createElement(
	        "div",
	        { ref: dropRef, style: Object.assign({}, props.insertBefore ? _InsertTarget.Styles.insertBeforeTarget : _InsertTarget.Styles.insertAfterTarget, canDrop ? _InsertTarget.Styles.insertTargetCanDrop : {}, isDropping ? _InsertTarget.Styles.insertTargetDropping : {}) },
	        _react2.default.createElement("div", { style: isDropping ? _InsertTarget.Styles.insertTargetMarkerDropping : {} })
	    );
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TYPE = exports.TYPE = "TreeNode";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var NormalStyles;
	(function (NormalStyles) {
	    NormalStyles.insertTarget = {
	        boxSizing: "border-box",
	        width: "100%",
	        height: "1em",
	        position: "absolute",
	        zIndex: 1,
	        display: "none"
	    };
	    NormalStyles.insertBeforeTarget = {
	        top: "-0.5em"
	    };
	    NormalStyles.insertAfterTarget = {
	        bottom: "-0.5em"
	    };
	    NormalStyles.insertTargetCanDrop = {
	        display: "flex"
	    };
	    NormalStyles.insertTargetDropping = {};
	    NormalStyles.insertTargetMarkerDropping = {
	        boxSizing: "border-box",
	        width: "100%",
	        height: "3px",
	        borderRadius: "2px",
	        background: "linear-gradient(90deg, gray, white)",
	        alignSelf: "center"
	    };
	})(NormalStyles || (NormalStyles = {}));
	var DebugStyles;
	(function (DebugStyles) {
	    DebugStyles.insertTarget = {
	        opacity: 0.5
	    };
	    DebugStyles.insertTargetCanDrop = {};
	    DebugStyles.insertTargetDropping = {
	        opacity: 0.9
	    };
	    DebugStyles.insertBeforeTarget = {
	        backgroundColor: "#ffffdd"
	    };
	    DebugStyles.insertAfterTarget = {
	        backgroundColor: "#ffddff"
	    };
	})(DebugStyles || (DebugStyles = {}));
	var isDebug = false;
	var Styles = exports.Styles = undefined;
	(function (Styles) {
	    Styles.insertBeforeTarget = Object.assign({}, NormalStyles.insertTarget, NormalStyles.insertBeforeTarget, isDebug ? DebugStyles.insertTarget : {}, isDebug ? DebugStyles.insertBeforeTarget : {});
	    Styles.insertAfterTarget = Object.assign({}, NormalStyles.insertTarget, NormalStyles.insertAfterTarget, isDebug ? DebugStyles.insertTarget : {}, isDebug ? DebugStyles.insertAfterTarget : {});
	    Styles.insertTargetCanDrop = Object.assign({}, NormalStyles.insertTargetCanDrop, isDebug ? DebugStyles.insertTargetCanDrop : {});
	    Styles.insertTargetDropping = Object.assign({}, NormalStyles.insertTargetDropping, isDebug ? DebugStyles.insertTargetDropping : {});
	    Styles.insertTargetMarkerDropping = NormalStyles.insertTargetMarkerDropping;
	})(Styles || (exports.Styles = Styles = {}));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.DraggableTreeViewItem = DraggableTreeViewItem;
	exports.TreeViewItemList = TreeViewItemList;
	
	var _classnames2 = __webpack_require__(8);
	
	var _classnames3 = _interopRequireDefault(_classnames2);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDnd = __webpack_require__(4);
	
	var _DraggedNode = __webpack_require__(5);
	
	var _InsertTarget = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var EMPTY_NODELIST = [];
	var gatherNodeIDs = function gatherNodeIDs(node) {
	    var nodeIDs = new Set([node.id]);
	    if (node.children) {
	        node.children.forEach(function (node) {
	            return gatherNodeIDs(node).forEach(function (id) {
	                return nodeIDs.add(id);
	            });
	        });
	    }
	    return nodeIDs;
	};
	var collectNodeDragProps = function collectNodeDragProps(monitor) {
	    return {
	        isDragging: monitor.isDragging()
	    };
	};
	function DraggableTreeViewItem(props) {
	    var _useDrag = (0, _reactDnd.useDrag)({
	        item: {
	            type: _DraggedNode.TYPE,
	            node: props.node,
	            allSourceIDs: gatherNodeIDs(props.node),
	            parentNode: props.parentNode,
	            parentChildIndex: props.parentChildIndex,
	            precedingNode: props.precedingNode
	        },
	        collect: collectNodeDragProps
	    }),
	        _useDrag2 = _slicedToArray(_useDrag, 2),
	        isDragging = _useDrag2[0].isDragging,
	        dragRef = _useDrag2[1];
	
	    return _react2.default.createElement(
	        "div",
	        { ref: dragRef, className: (0, _classnames3.default)(props.classNames.node, _defineProperty({}, props.classNames.nodeDragging, isDragging)), key: props.node.id },
	        _react2.default.createElement(
	            "div",
	            null,
	            props.renderNode(props.node)
	        ),
	        props.node.isCollapsed ? null : _react2.default.createElement(
	            "div",
	            { className: props.classNames.nodeChildren },
	            props.node.children && props.node.children.length > 0 ? _react2.default.createElement(TreeViewItemList, { parentNode: props.node, nodes: props.node.children ? props.node.children : EMPTY_NODELIST, classNames: props.classNames, renderNode: props.renderNode, onMoveNode: props.onMoveNode }) : _react2.default.createElement(_InsertTarget.DroppableTreeViewInsertTarget, { insertBefore: false, parentNode: props.node, parentChildIndex: 0, precedingNode: null, onMoveNode: props.onMoveNode })
	        )
	    );
	}
	var nodesWithPredecessors = function nodesWithPredecessors(nodes) {
	    return nodes.map(function (node, index) {
	        return { node: node, precedingNode: nodes[index - 1] };
	    });
	};
	// TODO: add a mechanism to apply the CSS equivalent:
	// .nodePositioningWrapper:hover {
	//   /* otherwise drop targets interfere with drag start */
	//   z-index: 2;
	// }
	function TreeViewItemList(props) {
	    return _react2.default.createElement(
	        "div",
	        { className: props.classNames.nodeList },
	        nodesWithPredecessors(props.nodes).map(function (node, index) {
	            return _react2.default.createElement(
	                "div",
	                { key: node.node.id, style: { position: "relative" }, className: props.classNames.nodePositioningWrapper },
	                index === 0 ? _react2.default.createElement(_InsertTarget.DroppableTreeViewInsertTarget, { insertBefore: true, parentNode: props.parentNode, parentChildIndex: index, precedingNode: null, onMoveNode: props.onMoveNode }) : null,
	                _react2.default.createElement(_InsertTarget.DroppableTreeViewInsertTarget, { insertBefore: false, parentNode: props.parentNode, parentChildIndex: index + 1, precedingNode: node.node, onMoveNode: props.onMoveNode }),
	                _react2.default.createElement(DraggableTreeViewItem, { parentNode: props.parentNode, parentChildIndex: index, precedingNode: node.precedingNode, node: node.node, classNames: props.classNames, renderNode: props.renderNode, onMoveNode: props.onMoveNode })
	            );
	        })
	    );
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=react-dnd-treeview.js.map