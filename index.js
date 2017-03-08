'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listenActions = exports.addActionListener = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var actionListener = function () {
    var _actionListeners = {};

    var actionListener = function actionListener(store) {
        return function (next) {
            return function (_ref) {
                var type = _ref.type,
                    rest = _objectWithoutProperties(_ref, ['type']);

                _actionListeners[type] && _actionListeners[type].forEach(function (lst) {
                    return lst(rest);
                });
                next(_extends({ type: type }, rest));
            };
        };
    };

    function addActionListener(type, fn) {
        if (_actionListeners[type]) {
            _actionListeners[type] = _actionListeners[type].filter(function (f) {
                return f !== fn;
            }).push(fn);
        } else {
            _actionListeners[type] = [fn];
        }
        return function () {
            _actionListeners[type] = _actionListeners[type].filter(function (f) {
                return f !== fn;
            });
        };
    }

    return {
        middleware: actionListener,
        addActionListener: addActionListener
    };
}();

exports.default = actionListener.middleware;

var addActionListener = actionListener.addActionListener;

function listenActions(Component) {
    var ListenerComponent = function (_React$Component) {
        _inherits(ListenerComponent, _React$Component);

        function ListenerComponent() {
            var _ref2;

            var _temp, _this, _ret;

            _classCallCheck(this, ListenerComponent);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ListenerComponent.__proto__ || Object.getPrototypeOf(ListenerComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.unSub = [], _this.addActionListeners = function (listeners) {
                _this.unSub = Object.keys(listeners).reduce(function (arr, listenerName) {
                    return [].concat(_toConsumableArray(arr), [addActionListener(listenerName, listeners[listenerName])]);
                }, []);
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(ListenerComponent, [{
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.unSub.forEach(function (fn) {
                    return fn();
                });
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Component, _extends({ addActionListeners: this.addActionListeners }, this.props));
            }
        }]);

        return ListenerComponent;
    }(_react2.default.Component);

    return ListenerComponent;
}

exports.addActionListener = addActionListener;
exports.listenActions = listenActions;