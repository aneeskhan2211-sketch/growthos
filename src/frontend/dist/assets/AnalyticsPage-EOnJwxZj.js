import { aT as interpolate, aU as frame, aV as isMotionValue, aW as JSAnimation, aX as useConstant, aY as motionValue, r as reactExports, aZ as MotionConfigContext, a_ as useIsomorphicLayoutEffect, a$ as cancelFrame, b0 as collectMotionValues, b1 as clsx, b2 as React, b3 as filterProps, b4 as getDefaultExportFromCjs, b5 as _baseExtremum, b6 as _baseGt, b7 as _baseIteratee, b8 as _baseLt, b9 as isFunction, ba as Text, bb as polarToCartesian, bc as Layer, bd as getTickClassName, be as adaptEventsOfChild, bf as Label, bg as Dot, bh as Curve, bi as isNil, bj as getValueByDataKey, bk as Shape, bl as Animate, bm as get, bn as interpolateNumber, bo as isEqual, bp as isNumber, bq as LabelList, br as uniqueId, bs as Global, bt as mathSign, bu as findAllByType, v as Cell, bv as getMaxRadius, bw as getPercentValue, bx as warn, by as generateCategoricalChart, bz as formatAxisMap, j as jsxRuntimeExports, h as cn, p as TrendingUp, bA as TrendingDown, bB as useNavigate, bC as useGA4Analytics, a as Button, m as motion, aj as Card, z as Skeleton, T as Tabs, b as TabsList, d as TabsTrigger, aE as TabsContent, A as AnimatePresence, B as Badge, R as ResponsiveContainer, t as Tooltip, bD as AreaChart, bE as CartesianGrid, s as XAxis, Y as YAxis, bF as Area, q as BarChart, u as Bar } from "./index-C-gts07u.js";
import { P as PageHeader } from "./PageHeader-Du6c9ARZ.js";
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function attachFollow(value, source, options = {}) {
  const initialValue = value.get();
  let activeAnimation = null;
  let latestValue = initialValue;
  let latestSetter;
  const unit = typeof initialValue === "string" ? initialValue.replace(/[\d.-]/g, "") : void 0;
  const stopAnimation = () => {
    if (activeAnimation) {
      activeAnimation.stop();
      activeAnimation = null;
    }
    value.animation = void 0;
  };
  const startAnimation = () => {
    const currentValue = asNumber(value.get());
    const targetValue = asNumber(latestValue);
    if (currentValue === targetValue) {
      stopAnimation();
      return;
    }
    const velocity = activeAnimation ? activeAnimation.getGeneratorVelocity() : value.getVelocity();
    stopAnimation();
    activeAnimation = new JSAnimation({
      keyframes: [currentValue, targetValue],
      velocity,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...options,
      onUpdate: latestSetter
    });
  };
  const scheduleAnimation = () => {
    var _a;
    startAnimation();
    value.animation = activeAnimation ?? void 0;
    (_a = value["events"].animationStart) == null ? void 0 : _a.notify();
    activeAnimation == null ? void 0 : activeAnimation.then(() => {
      var _a2;
      value.animation = void 0;
      (_a2 = value["events"].animationComplete) == null ? void 0 : _a2.notify();
    });
  };
  value.attach((v, set) => {
    latestValue = v;
    latestSetter = (latest) => set(parseValue(latest, unit));
    frame.postRender(scheduleAnimation);
  }, stopAnimation);
  if (isMotionValue(source)) {
    let skipNextAnimation = options.skipInitialAnimation === true;
    const removeSourceOnChange = source.on("change", (v) => {
      if (skipNextAnimation) {
        skipNextAnimation = false;
        value.jump(parseValue(v, unit), false);
      } else {
        value.set(parseValue(v, unit));
      }
    });
    const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
    return () => {
      removeSourceOnChange();
      removeValueOnDestroy();
    };
  }
  return stopAnimation;
}
function parseValue(v, unit) {
  return unit ? v + unit : v;
}
function asNumber(v) {
  return typeof v === "number" ? v : parseFloat(v);
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useFollowValue(source, options = {}) {
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  const getFromSource = () => isMotionValue(source) ? source.get() : source;
  if (isStatic) {
    return useTransform(getFromSource);
  }
  const value = useMotionValue(getFromSource());
  reactExports.useInsertionEffect(() => {
    return attachFollow(value, source, options);
  }, [value, JSON.stringify(options)]);
  return value;
}
function useSpring(source, options = {}) {
  return useFollowValue(source, { type: "spring", ...options });
}
var _excluded$1 = ["points", "className", "baseLinePoints", "connectNulls"];
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var isValidatePoint = function isValidatePoint2(point) {
  return point && point.x === +point.x && point.y === +point.y;
};
var getParsedPoints = function getParsedPoints2() {
  var points = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var segmentPoints = [[]];
  points.forEach(function(entry) {
    if (isValidatePoint(entry)) {
      segmentPoints[segmentPoints.length - 1].push(entry);
    } else if (segmentPoints[segmentPoints.length - 1].length > 0) {
      segmentPoints.push([]);
    }
  });
  if (isValidatePoint(points[0])) {
    segmentPoints[segmentPoints.length - 1].push(points[0]);
  }
  if (segmentPoints[segmentPoints.length - 1].length <= 0) {
    segmentPoints = segmentPoints.slice(0, -1);
  }
  return segmentPoints;
};
var getSinglePolygonPath = function getSinglePolygonPath2(points, connectNulls) {
  var segmentPoints = getParsedPoints(points);
  if (connectNulls) {
    segmentPoints = [segmentPoints.reduce(function(res, segPoints) {
      return [].concat(_toConsumableArray(res), _toConsumableArray(segPoints));
    }, [])];
  }
  var polygonPath = segmentPoints.map(function(segPoints) {
    return segPoints.reduce(function(path, point, index) {
      return "".concat(path).concat(index === 0 ? "M" : "L").concat(point.x, ",").concat(point.y);
    }, "");
  }).join("");
  return segmentPoints.length === 1 ? "".concat(polygonPath, "Z") : polygonPath;
};
var getRanglePath = function getRanglePath2(points, baseLinePoints, connectNulls) {
  var outerPath = getSinglePolygonPath(points, connectNulls);
  return "".concat(outerPath.slice(-1) === "Z" ? outerPath.slice(0, -1) : outerPath, "L").concat(getSinglePolygonPath(baseLinePoints.reverse(), connectNulls).slice(1));
};
var Polygon = function Polygon2(props) {
  var points = props.points, className = props.className, baseLinePoints = props.baseLinePoints, connectNulls = props.connectNulls, others = _objectWithoutProperties$1(props, _excluded$1);
  if (!points || !points.length) {
    return null;
  }
  var layerClass = clsx("recharts-polygon", className);
  if (baseLinePoints && baseLinePoints.length) {
    var hasStroke = others.stroke && others.stroke !== "none";
    var rangePath = getRanglePath(points, baseLinePoints, connectNulls);
    return /* @__PURE__ */ React.createElement("g", {
      className: layerClass
    }, /* @__PURE__ */ React.createElement("path", _extends$3({}, filterProps(others, true), {
      fill: rangePath.slice(-1) === "Z" ? others.fill : "none",
      stroke: "none",
      d: rangePath
    })), hasStroke ? /* @__PURE__ */ React.createElement("path", _extends$3({}, filterProps(others, true), {
      fill: "none",
      d: getSinglePolygonPath(points, connectNulls)
    })) : null, hasStroke ? /* @__PURE__ */ React.createElement("path", _extends$3({}, filterProps(others, true), {
      fill: "none",
      d: getSinglePolygonPath(baseLinePoints, connectNulls)
    })) : null);
  }
  var singlePath = getSinglePolygonPath(points, connectNulls);
  return /* @__PURE__ */ React.createElement("path", _extends$3({}, filterProps(others, true), {
    fill: singlePath.slice(-1) === "Z" ? others.fill : "none",
    className: layerClass,
    d: singlePath
  }));
};
var baseExtremum$1 = _baseExtremum, baseGt = _baseGt, baseIteratee$1 = _baseIteratee;
function maxBy(array, iteratee) {
  return array && array.length ? baseExtremum$1(array, baseIteratee$1(iteratee), baseGt) : void 0;
}
var maxBy_1 = maxBy;
const maxBy$1 = /* @__PURE__ */ getDefaultExportFromCjs(maxBy_1);
var baseExtremum = _baseExtremum, baseIteratee = _baseIteratee, baseLt = _baseLt;
function minBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee), baseLt) : void 0;
}
var minBy_1 = minBy;
const minBy$1 = /* @__PURE__ */ getDefaultExportFromCjs(minBy_1);
var _excluded = ["cx", "cy", "angle", "ticks", "axisLine"], _excluded2 = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$2(t, o, e) {
  return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$2() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$2(o, p);
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var PolarRadiusAxis = /* @__PURE__ */ function(_PureComponent) {
  function PolarRadiusAxis2() {
    _classCallCheck$2(this, PolarRadiusAxis2);
    return _callSuper$2(this, PolarRadiusAxis2, arguments);
  }
  _inherits$2(PolarRadiusAxis2, _PureComponent);
  return _createClass$2(PolarRadiusAxis2, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function getTickValueCoord(_ref) {
        var coordinate = _ref.coordinate;
        var _this$props = this.props, angle = _this$props.angle, cx = _this$props.cx, cy = _this$props.cy;
        return polarToCartesian(cx, cy, coordinate, angle);
      }
    )
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor() {
      var orientation = this.props.orientation;
      var textAnchor;
      switch (orientation) {
        case "left":
          textAnchor = "end";
          break;
        case "right":
          textAnchor = "start";
          break;
        default:
          textAnchor = "middle";
          break;
      }
      return textAnchor;
    }
  }, {
    key: "getViewBox",
    value: function getViewBox() {
      var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, angle = _this$props2.angle, ticks = _this$props2.ticks;
      var maxRadiusTick = maxBy$1(ticks, function(entry) {
        return entry.coordinate || 0;
      });
      var minRadiusTick = minBy$1(ticks, function(entry) {
        return entry.coordinate || 0;
      });
      return {
        cx,
        cy,
        startAngle: angle,
        endAngle: angle,
        innerRadius: minRadiusTick.coordinate || 0,
        outerRadius: maxRadiusTick.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props3 = this.props, cx = _this$props3.cx, cy = _this$props3.cy, angle = _this$props3.angle, ticks = _this$props3.ticks, axisLine = _this$props3.axisLine, others = _objectWithoutProperties(_this$props3, _excluded);
      var extent = ticks.reduce(function(result, entry) {
        return [Math.min(result[0], entry.coordinate), Math.max(result[1], entry.coordinate)];
      }, [Infinity, -Infinity]);
      var point0 = polarToCartesian(cx, cy, extent[0], angle);
      var point1 = polarToCartesian(cx, cy, extent[1], angle);
      var props = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, filterProps(others, false)), {}, {
        fill: "none"
      }, filterProps(axisLine, false)), {}, {
        x1: point0.x,
        y1: point0.y,
        x2: point1.x,
        y2: point1.y
      });
      return /* @__PURE__ */ React.createElement("line", _extends$2({
        className: "recharts-polar-radius-axis-line"
      }, props));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;
      var _this$props4 = this.props, ticks = _this$props4.ticks, tick = _this$props4.tick, angle = _this$props4.angle, tickFormatter = _this$props4.tickFormatter, stroke = _this$props4.stroke, others = _objectWithoutProperties(_this$props4, _excluded2);
      var textAnchor = this.getTickTextAnchor();
      var axisProps = filterProps(others, false);
      var customTickProps = filterProps(tick, false);
      var items = ticks.map(function(entry, i) {
        var coord = _this.getTickValueCoord(entry);
        var tickProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({
          textAnchor,
          transform: "rotate(".concat(90 - angle, ", ").concat(coord.x, ", ").concat(coord.y, ")")
        }, axisProps), {}, {
          stroke: "none",
          fill: stroke
        }, customTickProps), {}, {
          index: i
        }, coord), {}, {
          payload: entry
        });
        return /* @__PURE__ */ React.createElement(Layer, _extends$2({
          className: clsx("recharts-polar-radius-axis-tick", getTickClassName(tick)),
          key: "tick-".concat(entry.coordinate)
        }, adaptEventsOfChild(_this.props, entry, i)), PolarRadiusAxis2.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-polar-radius-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, ticks = _this$props5.ticks, axisLine = _this$props5.axisLine, tick = _this$props5.tick;
      if (!ticks || !ticks.length) {
        return null;
      }
      return /* @__PURE__ */ React.createElement(Layer, {
        className: clsx("recharts-polar-radius-axis", this.props.className)
      }, axisLine && this.renderAxisLine(), tick && this.renderTicks(), Label.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      if (/* @__PURE__ */ React.isValidElement(option)) {
        tickItem = /* @__PURE__ */ React.cloneElement(option, props);
      } else if (isFunction(option)) {
        tickItem = option(props);
      } else {
        tickItem = /* @__PURE__ */ React.createElement(Text, _extends$2({}, props, {
          className: "recharts-polar-radius-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$2(PolarRadiusAxis, "displayName", "PolarRadiusAxis");
_defineProperty$2(PolarRadiusAxis, "axisType", "radiusAxis");
_defineProperty$2(PolarRadiusAxis, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: true,
  tick: true,
  tickCount: 5,
  allowDataOverflow: false,
  scale: "auto",
  allowDuplicatedCategory: true
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$1(t, o, e) {
  return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$1() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var eps = 1e-5;
var PolarAngleAxis = /* @__PURE__ */ function(_PureComponent) {
  function PolarAngleAxis2() {
    _classCallCheck$1(this, PolarAngleAxis2);
    return _callSuper$1(this, PolarAngleAxis2, arguments);
  }
  _inherits$1(PolarAngleAxis2, _PureComponent);
  return _createClass$1(PolarAngleAxis2, [{
    key: "getTickLineCoord",
    value: (
      /**
       * Calculate the coordinate of line endpoint
       * @param  {Object} data The Data if ticks
       * @return {Object} (x0, y0): The start point of text,
       *                  (x1, y1): The end point close to text,
       *                  (x2, y2): The end point close to axis
       */
      function getTickLineCoord(data) {
        var _this$props = this.props, cx = _this$props.cx, cy = _this$props.cy, radius = _this$props.radius, orientation = _this$props.orientation, tickSize = _this$props.tickSize;
        var tickLineSize = tickSize || 8;
        var p1 = polarToCartesian(cx, cy, radius, data.coordinate);
        var p2 = polarToCartesian(cx, cy, radius + (orientation === "inner" ? -1 : 1) * tickLineSize, data.coordinate);
        return {
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y
        };
      }
    )
    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor(data) {
      var orientation = this.props.orientation;
      var cos = Math.cos(-data.coordinate * RADIAN);
      var textAnchor;
      if (cos > eps) {
        textAnchor = orientation === "outer" ? "start" : "end";
      } else if (cos < -eps) {
        textAnchor = orientation === "outer" ? "end" : "start";
      } else {
        textAnchor = "middle";
      }
      return textAnchor;
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, radius = _this$props2.radius, axisLine = _this$props2.axisLine, axisLineType = _this$props2.axisLineType;
      var props = _objectSpread$1(_objectSpread$1({}, filterProps(this.props, false)), {}, {
        fill: "none"
      }, filterProps(axisLine, false));
      if (axisLineType === "circle") {
        return /* @__PURE__ */ React.createElement(Dot, _extends$1({
          className: "recharts-polar-angle-axis-line"
        }, props, {
          cx,
          cy,
          r: radius
        }));
      }
      var ticks = this.props.ticks;
      var points = ticks.map(function(entry) {
        return polarToCartesian(cx, cy, radius, entry.coordinate);
      });
      return /* @__PURE__ */ React.createElement(Polygon, _extends$1({
        className: "recharts-polar-angle-axis-line"
      }, props, {
        points
      }));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;
      var _this$props3 = this.props, ticks = _this$props3.ticks, tick = _this$props3.tick, tickLine = _this$props3.tickLine, tickFormatter = _this$props3.tickFormatter, stroke = _this$props3.stroke;
      var axisProps = filterProps(this.props, false);
      var customTickProps = filterProps(tick, false);
      var tickLineProps = _objectSpread$1(_objectSpread$1({}, axisProps), {}, {
        fill: "none"
      }, filterProps(tickLine, false));
      var items = ticks.map(function(entry, i) {
        var lineCoord = _this.getTickLineCoord(entry);
        var textAnchor = _this.getTickTextAnchor(entry);
        var tickProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({
          textAnchor
        }, axisProps), {}, {
          stroke: "none",
          fill: stroke
        }, customTickProps), {}, {
          index: i,
          payload: entry,
          x: lineCoord.x2,
          y: lineCoord.y2
        });
        return /* @__PURE__ */ React.createElement(Layer, _extends$1({
          className: clsx("recharts-polar-angle-axis-tick", getTickClassName(tick)),
          key: "tick-".concat(entry.coordinate)
        }, adaptEventsOfChild(_this.props, entry, i)), tickLine && /* @__PURE__ */ React.createElement("line", _extends$1({
          className: "recharts-polar-angle-axis-tick-line"
        }, tickLineProps, lineCoord)), tick && PolarAngleAxis2.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-polar-angle-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props, ticks = _this$props4.ticks, radius = _this$props4.radius, axisLine = _this$props4.axisLine;
      if (radius <= 0 || !ticks || !ticks.length) {
        return null;
      }
      return /* @__PURE__ */ React.createElement(Layer, {
        className: clsx("recharts-polar-angle-axis", this.props.className)
      }, axisLine && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      if (/* @__PURE__ */ React.isValidElement(option)) {
        tickItem = /* @__PURE__ */ React.cloneElement(option, props);
      } else if (isFunction(option)) {
        tickItem = option(props);
      } else {
        tickItem = /* @__PURE__ */ React.createElement(Text, _extends$1({}, props, {
          className: "recharts-polar-angle-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$1(PolarAngleAxis, "displayName", "PolarAngleAxis");
_defineProperty$1(PolarAngleAxis, "axisType", "angleAxis");
_defineProperty$1(PolarAngleAxis, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: true,
  tickLine: true,
  tickSize: 8,
  tick: true,
  hide: false,
  allowDuplicatedCategory: true
});
var _Pie;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Pie = /* @__PURE__ */ function(_PureComponent) {
  function Pie2(props) {
    var _this;
    _classCallCheck(this, Pie2);
    _this = _callSuper(this, Pie2, [props]);
    _defineProperty(_this, "pieRef", null);
    _defineProperty(_this, "sectorRefs", []);
    _defineProperty(_this, "id", uniqueId("recharts-pie-"));
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    _this.state = {
      isAnimationFinished: !props.isAnimationActive,
      prevIsAnimationActive: props.isAnimationActive,
      prevAnimationId: props.animationId,
      sectorToFocus: 0
    };
    return _this;
  }
  _inherits(Pie2, _PureComponent);
  return _createClass(Pie2, [{
    key: "isActiveIndex",
    value: function isActiveIndex(i) {
      var activeIndex = this.props.activeIndex;
      if (Array.isArray(activeIndex)) {
        return activeIndex.indexOf(i) !== -1;
      }
      return i === activeIndex;
    }
  }, {
    key: "hasActiveIndex",
    value: function hasActiveIndex() {
      var activeIndex = this.props.activeIndex;
      return Array.isArray(activeIndex) ? activeIndex.length !== 0 : activeIndex || activeIndex === 0;
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(sectors) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, label = _this$props.label, labelLine = _this$props.labelLine, dataKey = _this$props.dataKey, valueKey = _this$props.valueKey;
      var pieProps = filterProps(this.props, false);
      var customLabelProps = filterProps(label, false);
      var customLabelLineProps = filterProps(labelLine, false);
      var offsetRadius = label && label.offsetRadius || 20;
      var labels = sectors.map(function(entry, i) {
        var midAngle = (entry.startAngle + entry.endAngle) / 2;
        var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
        var labelProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
          stroke: "none"
        }, customLabelProps), {}, {
          index: i,
          textAnchor: Pie2.getTextAnchor(endPoint.x, entry.cx)
        }, endPoint);
        var lineProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
          fill: "none",
          stroke: entry.fill
        }, customLabelLineProps), {}, {
          index: i,
          points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint]
        });
        var realDataKey = dataKey;
        if (isNil(dataKey) && isNil(valueKey)) {
          realDataKey = "value";
        } else if (isNil(dataKey)) {
          realDataKey = valueKey;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ React.createElement(Layer, {
            key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
          }, labelLine && Pie2.renderLabelLineItem(labelLine, lineProps, "line"), Pie2.renderLabelItem(label, labelProps, getValueByDataKey(entry, realDataKey)))
        );
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-pie-labels"
      }, labels);
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;
      var _this$props2 = this.props, activeShape = _this$props2.activeShape, blendStroke = _this$props2.blendStroke, inactiveShapeProp = _this$props2.inactiveShape;
      return sectors.map(function(entry, i) {
        if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
        var isActive = _this2.isActiveIndex(i);
        var inactiveShape = inactiveShapeProp && _this2.hasActiveIndex() ? inactiveShapeProp : null;
        var sectorOptions = isActive ? activeShape : inactiveShape;
        var sectorProps = _objectSpread(_objectSpread({}, entry), {}, {
          stroke: blendStroke ? entry.fill : entry.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ React.createElement(Layer, _extends({
          ref: function ref(_ref) {
            if (_ref && !_this2.sectorRefs.includes(_ref)) {
              _this2.sectorRefs.push(_ref);
            }
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, adaptEventsOfChild(_this2.props, entry, i), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
        }), /* @__PURE__ */ React.createElement(Shape, _extends({
          option: sectorOptions,
          isActive,
          shapeType: "sector"
        }, sectorProps)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;
      var _this$props3 = this.props, sectors = _this$props3.sectors, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var _this$state = this.state, prevSectors = _this$state.prevSectors, prevIsAnimationActive = _this$state.prevIsAnimationActive;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId, "-").concat(prevIsAnimationActive),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(_ref2) {
        var t = _ref2.t;
        var stepData = [];
        var first = sectors && sectors[0];
        var curAngle = first.startAngle;
        sectors.forEach(function(entry, index) {
          var prev = prevSectors && prevSectors[index];
          var paddingAngle = index > 0 ? get(entry, "paddingAngle", 0) : 0;
          if (prev) {
            var angleIp = interpolateNumber(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle);
            var latest = _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + angleIp(t) + paddingAngle
            });
            stepData.push(latest);
            curAngle = latest.endAngle;
          } else {
            var endAngle = entry.endAngle, startAngle = entry.startAngle;
            var interpolatorAngle = interpolateNumber(0, endAngle - startAngle);
            var deltaAngle = interpolatorAngle(t);
            var _latest = _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + deltaAngle + paddingAngle
            });
            stepData.push(_latest);
            curAngle = _latest.endAngle;
          }
        });
        return /* @__PURE__ */ React.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function attachKeyboardHandlers(pieRef) {
      var _this4 = this;
      pieRef.onkeydown = function(e) {
        if (!e.altKey) {
          switch (e.key) {
            case "ArrowLeft": {
              var next = ++_this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[next].focus();
              _this4.setState({
                sectorToFocus: next
              });
              break;
            }
            case "ArrowRight": {
              var _next = --_this4.state.sectorToFocus < 0 ? _this4.sectorRefs.length - 1 : _this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[_next].focus();
              _this4.setState({
                sectorToFocus: _next
              });
              break;
            }
            case "Escape": {
              _this4.sectorRefs[_this4.state.sectorToFocus].blur();
              _this4.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
        }
      };
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props4 = this.props, sectors = _this$props4.sectors, isAnimationActive = _this$props4.isAnimationActive;
      var prevSectors = this.state.prevSectors;
      if (isAnimationActive && sectors && sectors.length && (!prevSectors || !isEqual(prevSectors, sectors))) {
        return this.renderSectorsWithAnimation();
      }
      return this.renderSectorsStatically(sectors);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.pieRef) {
        this.attachKeyboardHandlers(this.pieRef);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      var _this$props5 = this.props, hide = _this$props5.hide, sectors = _this$props5.sectors, className = _this$props5.className, label = _this$props5.label, cx = _this$props5.cx, cy = _this$props5.cy, innerRadius = _this$props5.innerRadius, outerRadius = _this$props5.outerRadius, isAnimationActive = _this$props5.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (hide || !sectors || !sectors.length || !isNumber(cx) || !isNumber(cy) || !isNumber(innerRadius) || !isNumber(outerRadius)) {
        return null;
      }
      var layerClass = clsx("recharts-pie", className);
      return /* @__PURE__ */ React.createElement(Layer, {
        tabIndex: this.props.rootTabIndex,
        className: layerClass,
        ref: function ref(_ref3) {
          _this5.pieRef = _ref3;
        }
      }, this.renderSectors(), label && this.renderLabels(sectors), Label.renderCallByParent(this.props, null, false), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, sectors, false));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.prevIsAnimationActive !== nextProps.isAnimationActive) {
        return {
          prevIsAnimationActive: nextProps.isAnimationActive,
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: [],
          isAnimationFinished: true
        };
      }
      if (nextProps.isAnimationActive && nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: prevState.curSectors,
          isAnimationFinished: true
        };
      }
      if (nextProps.sectors !== prevState.curSectors) {
        return {
          curSectors: nextProps.sectors,
          isAnimationFinished: true
        };
      }
      return null;
    }
  }, {
    key: "getTextAnchor",
    value: function getTextAnchor(x, cx) {
      if (x > cx) {
        return "start";
      }
      if (x < cx) {
        return "end";
      }
      return "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function renderLabelLineItem(option, props, key) {
      if (/* @__PURE__ */ React.isValidElement(option)) {
        return /* @__PURE__ */ React.cloneElement(option, props);
      }
      if (isFunction(option)) {
        return option(props);
      }
      var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
      return /* @__PURE__ */ React.createElement(Curve, _extends({}, props, {
        key,
        type: "linear",
        className
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function renderLabelItem(option, props, value) {
      if (/* @__PURE__ */ React.isValidElement(option)) {
        return /* @__PURE__ */ React.cloneElement(option, props);
      }
      var label = value;
      if (isFunction(option)) {
        label = option(props);
        if (/* @__PURE__ */ React.isValidElement(label)) {
          return label;
        }
      }
      var className = clsx("recharts-pie-label-text", typeof option !== "boolean" && !isFunction(option) ? option.className : "");
      return /* @__PURE__ */ React.createElement(Text, _extends({}, props, {
        alignmentBaseline: "middle",
        className
      }), label);
    }
  }]);
}(reactExports.PureComponent);
_Pie = Pie;
_defineProperty(Pie, "displayName", "Pie");
_defineProperty(Pie, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: true,
  hide: false,
  minAngle: 0,
  isAnimationActive: !Global.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: false,
  rootTabIndex: 0
});
_defineProperty(Pie, "parseDeltaAngle", function(startAngle, endAngle) {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
});
_defineProperty(Pie, "getRealPieData", function(itemProps) {
  var data = itemProps.data, children = itemProps.children;
  var presentationProps = filterProps(itemProps, false);
  var cells = findAllByType(children, Cell);
  if (data && data.length) {
    return data.map(function(entry, index) {
      return _objectSpread(_objectSpread(_objectSpread({
        payload: entry
      }, presentationProps), entry), cells && cells[index] && cells[index].props);
    });
  }
  if (cells && cells.length) {
    return cells.map(function(cell) {
      return _objectSpread(_objectSpread({}, presentationProps), cell.props);
    });
  }
  return [];
});
_defineProperty(Pie, "parseCoordinateOfPie", function(itemProps, offset) {
  var top = offset.top, left = offset.left, width = offset.width, height = offset.height;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(itemProps.cx, width, width / 2);
  var cy = top + getPercentValue(itemProps.cy, height, height / 2);
  var innerRadius = getPercentValue(itemProps.innerRadius, maxPieRadius, 0);
  var outerRadius = getPercentValue(itemProps.outerRadius, maxPieRadius, maxPieRadius * 0.8);
  var maxRadius = itemProps.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    maxRadius
  };
});
_defineProperty(Pie, "getComposedData", function(_ref4) {
  var item = _ref4.item, offset = _ref4.offset;
  var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
  var pieData = _Pie.getRealPieData(itemProps);
  if (!pieData || !pieData.length) {
    return null;
  }
  var cornerRadius = itemProps.cornerRadius, startAngle = itemProps.startAngle, endAngle = itemProps.endAngle, paddingAngle = itemProps.paddingAngle, dataKey = itemProps.dataKey, nameKey = itemProps.nameKey, valueKey = itemProps.valueKey, tooltipType = itemProps.tooltipType;
  var minAngle = Math.abs(itemProps.minAngle);
  var coordinate = _Pie.parseCoordinateOfPie(itemProps, offset);
  var deltaAngle = _Pie.parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var realDataKey = dataKey;
  if (isNil(dataKey) && isNil(valueKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = "value";
  } else if (isNil(dataKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = valueKey;
  }
  var notZeroItemCount = pieData.filter(function(entry) {
    return getValueByDataKey(entry, realDataKey, 0) !== 0;
  }).length;
  var totalPadingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * minAngle - totalPadingAngle;
  var sum = pieData.reduce(function(result, entry) {
    var val = getValueByDataKey(entry, realDataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = pieData.map(function(entry, i) {
      var val = getValueByDataKey(entry, realDataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? minAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name,
        value: val,
        payload: entry,
        dataKey: realDataKey,
        type: tooltipType
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread(_objectSpread(_objectSpread({
        percent,
        cornerRadius,
        name,
        tooltipPayload,
        midAngle,
        middleRadius,
        tooltipPosition
      }, entry), coordinate), {}, {
        value: getValueByDataKey(entry, realDataKey),
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entry,
        paddingAngle: mathSign(deltaAngle) * paddingAngle
      });
      return prev;
    });
  }
  return _objectSpread(_objectSpread({}, coordinate), {}, {
    sectors,
    data: pieData
  });
});
var PieChart = generateCategoricalChart({
  chartName: "PieChart",
  GraphicalChild: Pie,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
function Sparkline({
  data,
  trend
}) {
  if (!data || data.length < 2) return null;
  const W = 64;
  const H = 24;
  const min = Math.min(...data.map((d) => d.value));
  const max = Math.max(...data.map((d) => d.value));
  const range = max - min || 1;
  const pts = data.map((d, i) => {
    const x = i / (data.length - 1) * W;
    const y = H - (d.value - min) / range * (H - 4) - 2;
    return `${x},${y}`;
  });
  const color = trend === "up" ? "oklch(var(--success))" : trend === "down" ? "oklch(var(--destructive))" : "oklch(var(--muted-foreground))";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: W,
      height: H,
      viewBox: `0 0 ${W} ${H}`,
      className: "sparkline-container shrink-0",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "polyline",
        {
          points: pts.join(" "),
          fill: "none",
          stroke: color,
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: "0.8"
        }
      )
    }
  );
}
function MetricCard({
  label,
  value,
  change,
  changeLabel,
  trend = "neutral",
  sparkline,
  statusLabel,
  icon,
  gradient,
  className,
  "data-ocid": ocid
}) {
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: cn(
        "group relative bg-card border border-border rounded-xl p-4 transition-smooth hover:shadow-card-hover hover:-translate-y-0.5 overflow-hidden",
        className
      ),
      children: [
        gradient && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn("absolute inset-0 rounded-xl opacity-60", gradient),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 truncate", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums leading-none mb-2 truncate", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              change !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: cn(
                    "flex items-center gap-0.5 text-xs font-semibold",
                    trendColor
                  ),
                  children: [
                    trend === "up" && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
                    trend === "down" && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
                    change > 0 ? "+" : "",
                    change,
                    "%"
                  ]
                }
              ),
              changeLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: changeLabel })
            ] }),
            statusLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground", children: statusLabel })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
            icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary", children: icon }),
            sparkline && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { data: sparkline, trend })
          ] })
        ] })
      ]
    }
  );
}
const REVENUE_90D = Array.from({ length: 90 }, (_, i) => {
  const d = new Date(2026, 0, 1);
  d.setDate(d.getDate() + i);
  const label = `${d.getDate()}/${d.getMonth() + 1}`;
  const base = 2800 + Math.sin(i / 7) * 800 + i * 30;
  return {
    label,
    revenue: Math.round(base + Math.random() * 600),
    leads: Math.round(6 + Math.sin(i / 5) * 3 + i * 0.1),
    conversions: Math.round(0.8 + Math.random() * 0.6)
  };
});
const REVENUE_30D = REVENUE_90D.slice(-30);
const REVENUE_7D = REVENUE_90D.slice(-7);
const TRAFFIC_SOURCES = [
  { name: "Google Organic", value: 38, color: "oklch(0.6 0.25 253)" },
  { name: "Google Ads", value: 24, color: "oklch(0.64 0.18 170)" },
  { name: "Direct", value: 15, color: "oklch(0.74 0.2 86)" },
  { name: "Social Media", value: 13, color: "oklch(0.7 0.18 40)" },
  { name: "Referral", value: 10, color: "oklch(0.78 0.15 300)" }
];
const FUNNEL_STAGES = [
  { stage: "Visitors", count: 12400, dropoff: null },
  { stage: "Leads", count: 1247, dropoff: 90 },
  { stage: "Qualified", count: 486, dropoff: 61 },
  { stage: "Proposals Sent", count: 89, dropoff: 81.7 },
  { stage: "Clients Won", count: 37, dropoff: 58.4 }
];
const ROI_TABLE = [
  { source: "Google Ads", leads: 312, cost: 48e3, revenue: 285e3, roi: 494 },
  {
    source: "Organic SEO",
    leads: 289,
    cost: 12e3,
    revenue: 198e3,
    roi: 1550
  },
  { source: "Meta Ads", leads: 198, cost: 35e3, revenue: 142e3, roi: 306 },
  {
    source: "WhatsApp Outreach",
    leads: 167,
    cost: 8e3,
    revenue: 118e3,
    roi: 1375
  },
  { source: "LinkedIn", leads: 124, cost: 22e3, revenue: 96e3, roi: 336 },
  { source: "Referral", leads: 157, cost: 5e3, revenue: 215e3, roi: 4200 }
].sort((a, b) => b.roi - a.roi);
const CLIENT_PERFORMANCE = [
  {
    name: "Sunrise Salon",
    leads: 48,
    revenue: 28500,
    growth: 24,
    trend: "up"
  },
  {
    name: "FitZone Gym",
    leads: 62,
    revenue: 42e3,
    growth: 38,
    trend: "up"
  },
  {
    name: "Dr. Mehta Clinic",
    leads: 31,
    revenue: 19800,
    growth: 15,
    trend: "up"
  },
  {
    name: "TechEdge IT",
    leads: 19,
    revenue: 55e3,
    growth: 52,
    trend: "up"
  },
  {
    name: "StarBites Bakery",
    leads: 44,
    revenue: 12400,
    growth: 8,
    trend: "up"
  }
];
const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_WEEKS = ["W1", "W2", "W3", "W4"];
const HEATMAP_DATA = HEATMAP_WEEKS.map(
  (week) => HEATMAP_DAYS.map((day) => ({
    week,
    day,
    value: Math.floor(Math.random() * 100)
  }))
);
const SPARKLINE = [
  { value: 42 },
  { value: 55 },
  { value: 48 },
  { value: 67 },
  { value: 72 },
  { value: 89 },
  { value: 95 }
];
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0
}) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });
  const display = useTransform(
    spring,
    (v) => `${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN")}${suffix}`
  );
  reactExports.useEffect(() => {
    mv.set(target);
  }, [mv, target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { children: display });
}
function HeatCell({ value, delay }) {
  const intensity = value / 100;
  const alpha = 0.08 + intensity * 0.85;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "rounded aspect-square",
      initial: { opacity: 0, scale: 0.6 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay, duration: 0.3, ease: "easeOut" },
      title: `${value} actions`,
      style: { background: `oklch(0.6 0.25 253 / ${alpha})` }
    }
  );
}
function DateRangePicker({
  value,
  onChange
}) {
  const opts = [
    { label: "Last 7 days", val: "7d" },
    { label: "Last 30 days", val: "30d" },
    { label: "Last 90 days", val: "90d" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-1 bg-muted/50 rounded-lg p-1",
      "data-ocid": "analytics.date_range",
      children: opts.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(o.val),
          "data-ocid": `analytics.date_range.${o.val}`,
          className: `px-3 py-1.5 text-xs font-medium rounded-md transition-fast ${value === o.val ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
          children: o.label
        },
        o.val
      ))
    }
  );
}
function ChartToggle({
  value,
  onChange
}) {
  const opts = [
    { label: "Revenue", val: "revenue" },
    { label: "Leads", val: "leads" },
    { label: "Conversions", val: "conversions" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-1 bg-muted/50 rounded-lg p-1",
      "data-ocid": "analytics.chart_toggle",
      children: opts.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(o.val),
          "data-ocid": `analytics.chart_toggle.${o.val}`,
          className: `px-3 py-1.5 text-xs font-medium rounded-md transition-fast ${value === o.val ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
          children: o.label
        },
        o.val
      ))
    }
  );
}
function RevenueChart({
  data,
  metric
}) {
  const colorMap = {
    revenue: "oklch(0.6 0.25 253)",
    leads: "oklch(0.64 0.18 170)",
    conversions: "oklch(0.74 0.2 86)"
  };
  const color = colorMap[metric];
  const gradId = `grad_${metric}`;
  const tickData = data.filter((_, i) => i % Math.ceil(data.length / 8) === 0);
  const xLabels = new Set(tickData.map((d) => d.label));
  const formatValue = (v) => {
    if (metric === "revenue") return `₹${(v / 1e3).toFixed(0)}K`;
    if (metric === "conversions") return `${v}%`;
    return String(v);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data, margin: { top: 8, right: 8, bottom: 0, left: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: gradId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: color, stopOpacity: 0.18 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: color, stopOpacity: 0 })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CartesianGrid,
      {
        strokeDasharray: "3 3",
        stroke: "oklch(0 0 0 / 0.05)",
        vertical: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "label",
        tick: { fontSize: 10 },
        axisLine: false,
        tickLine: false,
        tickFormatter: (v) => xLabels.has(v) ? v : "",
        interval: 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        tick: { fontSize: 10 },
        axisLine: false,
        tickLine: false,
        tickFormatter: formatValue,
        width: 52
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          borderRadius: 8,
          border: "1px solid oklch(var(--border))",
          fontSize: 12
        },
        formatter: (v) => [
          formatValue(v),
          metric.charAt(0).toUpperCase() + metric.slice(1)
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Area,
      {
        type: "monotone",
        dataKey: metric,
        stroke: color,
        strokeWidth: 2,
        fill: `url(#${gradId})`,
        dot: false,
        activeDot: { r: 4, fill: color },
        animationDuration: 800,
        animationEasing: "ease-out"
      }
    )
  ] }) });
}
function ConversionFunnel() {
  const maxW = 100;
  const widths = FUNNEL_STAGES.map((_, i) => maxW - i * 14);
  const colors = [
    "oklch(0.6 0.25 253)",
    "oklch(0.62 0.22 253)",
    "oklch(0.64 0.18 170)",
    "oklch(0.68 0.18 86)",
    "oklch(0.56 0.15 170)"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-w-lg mx-auto", "data-ocid": "analytics.funnel", children: FUNNEL_STAGES.map((stage, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
      "data-ocid": `analytics.funnel.item.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: stage.stage }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold tabular-nums", children: stage.count.toLocaleString("en-IN") }),
            stage.dropoff !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-destructive font-medium", children: [
              "↓ ",
              stage.dropoff,
              "% drop"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-8 rounded-md flex items-center px-3 transition-smooth",
            style: {
              width: `${widths[i]}%`,
              background: `${colors[i]}`,
              opacity: 0.85 + (i === 0 ? 0.15 : 0)
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-white/90 truncate", children: [
              (stage.count / FUNNEL_STAGES[0].count * 100).toFixed(1),
              "% of visitors"
            ] })
          }
        )
      ]
    },
    stage.stage
  )) });
}
function RoiTable() {
  const maxRoi = ROI_TABLE[0].roi;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", "data-ocid": "analytics.roi.table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[600px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: ["Lead Source", "Leads", "Cost (₹)", "Revenue (₹)", "ROI %"].map(
      (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide",
          children: h
        },
        h
      )
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: ROI_TABLE.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.tr,
      {
        className: "hover:bg-muted/20 transition-fast group",
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06, duration: 0.3 },
        "data-ocid": `analytics.roi.row.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: row.source }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground tabular-nums", children: row.leads }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground tabular-nums", children: [
            "₹",
            row.cost.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-foreground tabular-nums", children: [
            "₹",
            row.revenue.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-[80px] progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "progress-bar-fill",
                style: {
                  width: `${Math.min(row.roi / maxRoi * 100, 100)}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs font-bold tabular-nums ${row.roi > 1e3 ? "text-success" : row.roi > 400 ? "text-warning" : "text-muted-foreground"}`,
                children: [
                  row.roi,
                  "%"
                ]
              }
            ),
            i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] status-active border-0 px-1.5 py-0", children: "Top" })
          ] }) })
        ]
      },
      row.source
    )) })
  ] }) });
}
function ClientPerformance() {
  const maxRevenue = Math.max(...CLIENT_PERFORMANCE.map((c) => c.revenue));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "analytics.clients", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: CLIENT_PERFORMANCE.map((client, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "bg-card border border-border rounded-xl p-4 hover-lift transition-hover",
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08, duration: 0.35 },
        "data-ocid": `analytics.clients.card.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: client.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                client.leads,
                " leads generated"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success text-sm font-bold", children: [
              "↑ ",
              client.growth,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground tabular-nums", children: [
            "₹",
            client.revenue.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Monthly Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "progress-bar-fill",
              style: { width: `${client.revenue / maxRevenue * 100}%` }
            }
          ) })
        ]
      },
      client.name
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-4", children: "Revenue by Client" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: CLIENT_PERFORMANCE,
          margin: { top: 4, right: 4, bottom: 0, left: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "oklch(0 0 0 / 0.05)",
                vertical: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "name",
                tick: { fontSize: 10 },
                axisLine: false,
                tickLine: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tick: { fontSize: 10 },
                axisLine: false,
                tickLine: false,
                tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}K`,
                width: 44
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  borderRadius: 8,
                  border: "1px solid oklch(var(--border))",
                  fontSize: 12
                },
                formatter: (v) => [
                  `₹${v.toLocaleString("en-IN")}`,
                  "Revenue"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "revenue",
                radius: [4, 4, 0, 0],
                animationDuration: 700,
                children: CLIENT_PERFORMANCE.map((client, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Cell,
                  {
                    fill: `oklch(${0.55 + idx * 0.05} 0.22 253)`
                  },
                  `bar-${client.name}`
                ))
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
function WeeklyHeatmap() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "analytics.heatmap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[340px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[28px_repeat(7,1fr)] gap-1.5 mb-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        HEATMAP_DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center text-[10px] font-semibold text-muted-foreground",
            children: d
          },
          d
        ))
      ] }),
      HEATMAP_WEEKS.map((week, wi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-[28px_repeat(7,1fr)] gap-1.5 mb-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center text-[10px] font-semibold text-muted-foreground", children: week }),
            HEATMAP_DATA[wi].map((cell, di) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              HeatCell,
              {
                value: cell.value,
                delay: (wi * 7 + di) * 0.02
              },
              `${week}-${cell.day}`
            ))
          ]
        },
        week
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Less" }),
      [0.08, 0.25, 0.45, 0.65, 0.9].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-4 h-4 rounded",
          style: { background: `oklch(0.6 0.25 253 / ${a})` }
        },
        a
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "More" })
    ] })
  ] });
}
function AnalyticsPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = reactExports.useState("30d");
  const [chartMetric, setChartMetric] = reactExports.useState("revenue");
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const hasAnimated = reactExports.useRef(false);
  const [showCounters, setShowCounters] = reactExports.useState(false);
  const ga4 = useGA4Analytics(90);
  const ga4Data = ga4.data;
  reactExports.useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      const t = setTimeout(() => setShowCounters(true), 200);
      return () => clearTimeout(t);
    }
  }, []);
  const chartData = dateRange === "7d" ? REVENUE_7D : dateRange === "30d" ? REVENUE_30D : REVENUE_90D;
  const ga4Sessions = ga4Data ? Number(ga4Data.totalSessions) : 12480;
  const ga4Users = ga4Data ? Number(ga4Data.totalUsers) : 8934;
  const ga4BounceRate = ga4Data ? ga4Data.avgBounceRate : 42.3;
  const ga4Conversions = ga4Data ? Number(ga4Data.conversions) : 312;
  const SOURCE_COLORS = [
    "oklch(0.6 0.25 253)",
    "oklch(0.64 0.18 170)",
    "oklch(0.74 0.2 86)",
    "oklch(0.7 0.18 40)",
    "oklch(0.78 0.15 300)",
    "oklch(0.68 0.2 200)"
  ];
  const trafficSourcesDisplay = ga4Data && ga4Data.trafficSources.length > 0 ? ga4Data.trafficSources.map(([name, count], i) => ({
    name,
    value: Number(count),
    color: SOURCE_COLORS[i % SOURCE_COLORS.length]
  })) : TRAFFIC_SOURCES;
  const topPagesDisplay = ga4Data && ga4Data.topPages.length > 0 ? ga4Data.topPages : [];
  const totalSourceTraffic = trafficSourcesDisplay.reduce(
    (s, x) => s + x.value,
    0
  );
  const trafficSourcesPct = trafficSourcesDisplay.map((s) => ({
    ...s,
    pct: totalSourceTraffic > 0 ? Math.round(s.value / totalSourceTraffic * 100) : 0
  }));
  const kpis = [
    {
      label: "Sessions",
      target: ga4Sessions,
      display: ga4.isLoading ? "—" : ga4Sessions.toLocaleString("en-IN"),
      change: 12,
      trend: "up",
      gradient: "gradient-kpi",
      isLoading: ga4.isLoading
    },
    {
      label: "Users",
      target: ga4Users,
      display: ga4.isLoading ? "—" : ga4Users.toLocaleString("en-IN"),
      change: 18,
      trend: "up",
      gradient: "gradient-success",
      isLoading: ga4.isLoading
    },
    {
      label: "Bounce Rate",
      target: ga4BounceRate,
      display: ga4.isLoading ? "—" : `${ga4BounceRate.toFixed(1)}%`,
      change: -2.1,
      trend: "up",
      gradient: "",
      isLoading: ga4.isLoading
    },
    {
      label: "Conversions",
      target: ga4Conversions,
      display: ga4.isLoading ? "—" : ga4Conversions.toLocaleString("en-IN"),
      change: 8,
      trend: "up",
      gradient: "gradient-premium",
      isLoading: ga4.isLoading
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "analytics.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Analytics",
        description: "Revenue-first insights for smarter decisions",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap justify-end", children: [
          (ga4Data == null ? void 0 : ga4Data.isLive) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20",
              "data-ocid": "analytics.ga4_live_badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success animate-pulse" }),
                "Live"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/40",
              "data-ocid": "analytics.ga4_demo_badge",
              children: [
                "Demo data ·",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "underline underline-offset-2 hover:text-foreground transition-colors",
                    onClick: () => navigate({ to: "/settings" }),
                    children: "Configure GA4 →"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { value: dateRange, onChange: setDateRange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              type: "button",
              "data-ocid": "analytics.export_button",
              children: "Export CSV"
            }
          )
        ] })
      }
    ),
    ga4.error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/40 text-xs text-muted-foreground",
        "data-ocid": "analytics.ga4_error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-warning text-base", children: "⚠" }),
          "GA4 data unavailable — showing demo data.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/settings",
              className: "text-primary hover:underline font-medium",
              children: "Configure in Settings →"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        initial: "hidden",
        animate: "visible",
        variants: { visible: { transition: { staggerChildren: 0.09 } } },
        children: kpis.map((kpi, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: {
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 }
            },
            transition: { duration: 0.4, ease: "easeOut" },
            "data-ocid": `analytics.kpi.${i + 1}`,
            children: kpi.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              MetricCard,
              {
                label: kpi.label,
                value: kpi.display,
                change: kpi.change,
                trend: kpi.trend,
                gradient: kpi.gradient,
                sparkline: SPARKLINE,
                changeLabel: "vs last period"
              }
            )
          },
          kpi.label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: setActiveTab,
        "data-ocid": "analytics.tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-5 flex-wrap h-auto gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", "data-ocid": "analytics.tab.overview", children: "Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "funnel", "data-ocid": "analytics.tab.funnel", children: "Funnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "sources", "data-ocid": "analytics.tab.sources", children: "Traffic Sources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "toppages", "data-ocid": "analytics.tab.toppages", children: "Top Pages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "roi", "data-ocid": "analytics.tab.roi", children: "Lead ROI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "clients", "data-ocid": "analytics.tab.clients", children: "Clients" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "heatmap", "data-ocid": "analytics.tab.heatmap", children: "Activity" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Performance Trend" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        dateRange === "7d" ? "Last 7 days" : dateRange === "30d" ? "Last 30 days" : "Last 90 days",
                        " ",
                        "· Daily breakdown"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChartToggle, { value: chartMetric, onChange: setChartMetric })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueChart, { data: chartData, metric: chartMetric })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mt-4", children: [
                  {
                    label: "Peak Day Revenue",
                    value: "₹12,400",
                    sub: "15 Jan 2026"
                  },
                  {
                    label: "Best Lead Day",
                    value: "23 leads",
                    sub: "22 Jan 2026"
                  },
                  { label: "Top Conv. Day", value: "7.8%", sub: "8 Jan 2026" }
                ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: stat.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground tabular-nums", children: stat.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.sub })
                ] }, stat.label)) })
              ]
            },
            "overview"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "funnel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Conversion Funnel" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "Visitor to client journey ·",
                      " ",
                      dateRange === "7d" ? "7d" : dateRange === "30d" ? "30d" : "90d",
                      " ",
                      "window"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                    (37 / 12400 * 100).toFixed(2),
                    "% overall"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ConversionFunnel, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border", children: [
                  {
                    label: "Lead Capture Rate",
                    value: "10.1%",
                    color: "text-primary"
                  },
                  {
                    label: "Qualification Rate",
                    value: "39.0%",
                    color: "text-success"
                  },
                  {
                    label: "Proposal Rate",
                    value: "18.3%",
                    color: "text-warning"
                  },
                  {
                    label: "Close Rate",
                    value: "41.6%",
                    color: "text-success"
                  }
                ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-xl font-bold tabular-nums ${m.color}`,
                      children: m.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: m.label })
                ] }, m.label)) })
              ] })
            },
            "funnel"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sources", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Traffic Source Breakdown" }),
                  (ga4Data == null ? void 0 : ga4Data.isLive) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-success font-medium flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success" }),
                    "Live GA4"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 220, height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Pie,
                      {
                        data: trafficSourcesPct,
                        cx: "50%",
                        cy: "50%",
                        innerRadius: 62,
                        outerRadius: 95,
                        paddingAngle: 3,
                        dataKey: "pct",
                        animationBegin: 0,
                        animationDuration: 700,
                        children: trafficSourcesPct.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Cell,
                          {
                            fill: entry.color
                          },
                          `pie-${entry.name}`
                        ))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        formatter: (v) => [`${v}%`, "Share"],
                        contentStyle: {
                          fontSize: 12,
                          borderRadius: 8,
                          border: "1px solid oklch(var(--border))"
                        }
                      }
                    )
                  ] }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full space-y-3", children: trafficSourcesPct.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      className: "flex items-center gap-3",
                      initial: { opacity: 0, x: 12 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: i * 0.08, duration: 0.3 },
                      "data-ocid": `analytics.source.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-2.5 h-2.5 rounded-full shrink-0",
                            style: { background: s.color }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground", children: s.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-[120px] progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "progress-bar-fill",
                            style: {
                              width: `${s.pct}%`,
                              background: s.color
                            }
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            variant: "secondary",
                            className: "text-xs tabular-nums w-10 justify-center",
                            children: [
                              s.pct,
                              "%"
                            ]
                          }
                        )
                      ]
                    },
                    s.name
                  )) })
                ] })
              ] })
            },
            "sources"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "toppages", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Top Pages" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Most visited pages in the selected period" })
                  ] }),
                  (ga4Data == null ? void 0 : ga4Data.isLive) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-success font-medium flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success" }),
                    "Live GA4"
                  ] })
                ] }),
                ga4.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3",
                    "data-ocid": "analytics.toppages.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
                    ]
                  },
                  i
                )) }) : topPagesDisplay.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm text-muted-foreground text-center py-8",
                    "data-ocid": "analytics.toppages.empty_state",
                    children: [
                      "No page data available.",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "/settings",
                          className: "text-primary hover:underline",
                          children: "Configure GA4 →"
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "space-y-2",
                    "data-ocid": "analytics.toppages.list",
                    children: topPagesDisplay.map(([page, count], i) => {
                      const maxCount = Number(topPagesDisplay[0][1]);
                      const pct = maxCount > 0 ? Math.round(Number(count) / maxCount * 100) : 0;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          className: "flex items-center gap-3",
                          initial: { opacity: 0, x: -12 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: i * 0.07, duration: 0.3 },
                          "data-ocid": `analytics.toppages.item.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-5 shrink-0 tabular-nums", children: i + 1 }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground font-mono truncate", children: page }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 progress-bar shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "progress-bar-fill",
                                style: { width: `${pct}%` }
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums text-muted-foreground w-16 text-right shrink-0", children: [
                              Number(count).toLocaleString("en-IN"),
                              " views"
                            ] })
                          ]
                        },
                        page
                      );
                    })
                  }
                )
              ] })
            },
            "toppages"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "roi", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Lead Source ROI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sorted by ROI descending" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      "data-ocid": "analytics.roi.export_button",
                      children: "Export"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RoiTable, {})
              ] })
            },
            "roi"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "clients", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientPerformance, {})
            },
            "clients"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "heatmap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Weekly Activity Heatmap" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Leads contacted + messages sent per day" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Last 4 weeks" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyHeatmap, {})
              ] })
            },
            "heatmap"
          ) }) })
        ]
      }
    ),
    showCounters && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 },
        "data-ocid": "analytics.summary.section",
        children: [
          {
            label: "Total Sessions",
            target: ga4Sessions,
            prefix: "",
            suffix: ""
          },
          {
            label: "Total Users",
            target: ga4Users,
            prefix: "",
            suffix: ""
          },
          {
            label: "Avg. Bounce Rate",
            target: ga4BounceRate,
            prefix: "",
            suffix: "%",
            decimals: 1
          },
          {
            label: "Conversions",
            target: ga4Conversions,
            prefix: "",
            suffix: ""
          }
        ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "p-4 text-center",
            "data-ocid": `analytics.summary.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums font-display", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AnimatedCounter,
                {
                  target: item.target,
                  prefix: item.prefix,
                  suffix: item.suffix,
                  decimals: item.decimals ?? 0
                }
              ) })
            ]
          },
          item.label
        ))
      }
    )
  ] });
}
export {
  AnalyticsPage as default
};
