'use strict';
!function(global, factory) {
  if ("object" == typeof module && "object" == typeof module.exports) {
    module.exports = global.document ? factory(global, true) : function(global) {
      if (!global.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(global);
    };
  } else {
    factory(global);
  }
}("undefined" != typeof window ? window : this, function(window, forceWipe) {
  /**
   * @param {?} obj
   * @return {?}
   */
  function isArraylike(obj) {
    var length = obj.length;
    var type = jQuery.type(obj);
    return "function" === type || jQuery.isWindow(obj) ? false : 1 === obj.nodeType && length ? true : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
  }
  /**
   * @param {undefined} a
   * @param {?} value
   * @param {boolean} not
   * @return {?}
   */
  function winnow(a, value, not) {
    if (jQuery.isFunction(value)) {
      return jQuery.grep(a, function(context, i) {
        return !!value.call(context, i, context) !== not;
      });
    }
    if (value.nodeType) {
      return jQuery.grep(a, function(elem) {
        return elem === value !== not;
      });
    }
    if ("string" == typeof value) {
      if (contribRegex.test(value)) {
        return jQuery.filter(value, a, not);
      }
      value = jQuery.filter(value, a);
    }
    return jQuery.grep(a, function(a) {
      return jQuery.inArray(a, value) >= 0 !== not;
    });
  }
  /**
   * @param {!Object} cur
   * @param {string} dir
   * @return {?}
   */
  function sibling(cur, dir) {
    do {
      cur = cur[dir];
    } while (cur && 1 !== cur.nodeType);
    return cur;
  }
  /**
   * @param {!Object} options
   * @return {?}
   */
  function createOptions(options) {
    var b = optionsCache[options] = {};
    return jQuery.each(options.match(rnotwhite) || [], function(a, inFlowOrd) {
      /** @type {boolean} */
      b[inFlowOrd] = true;
    }), b;
  }
  /**
   * @return {undefined}
   */
  function detach() {
    if (document.addEventListener) {
      document.removeEventListener("DOMContentLoaded", contentLoaded, false);
      window.removeEventListener("load", contentLoaded, false);
    } else {
      document.detachEvent("onreadystatechange", contentLoaded);
      window.detachEvent("onload", contentLoaded);
    }
  }
  /**
   * @return {undefined}
   */
  function contentLoaded() {
    if (document.addEventListener || "load" === event.type || "complete" === document.readyState) {
      detach();
      jQuery.ready();
    }
  }
  /**
   * @param {?} elem
   * @param {!Object} key
   * @param {?} data
   * @return {?}
   */
  function dataAttr(elem, key, data) {
    if (void 0 === data && 1 === elem.nodeType) {
      var name = "data-" + key.replace(regAttr, "-$1").toLowerCase();
      if (data = elem.getAttribute(name), "string" == typeof data) {
        try {
          data = "true" === data ? true : "false" === data ? false : "null" === data ? null : +data + "" === data ? +data : JSON_START.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {
        }
        jQuery.data(elem, key, data);
      } else {
        data = void 0;
      }
    }
    return data;
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function isEmptyDataObject(obj) {
    var index;
    for (index in obj) {
      if (("data" !== index || !jQuery.isEmptyObject(obj[index])) && "toJSON" !== index) {
        return false;
      }
    }
    return true;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {?} data
   * @param {string} pvt
   * @return {?}
   */
  function internalData(elem, name, data, pvt) {
    if (jQuery.acceptData(elem)) {
      var val;
      var ret;
      var internalKey = jQuery.expando;
      var isNode = elem.nodeType;
      var cache = isNode ? jQuery.cache : elem;
      var id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
      if (id && cache[id] && (pvt || cache[id].data) || void 0 !== data || "string" != typeof name) {
        return id || (id = isNode ? elem[internalKey] = arr.pop() || jQuery.guid++ : internalKey), cache[id] || (cache[id] = isNode ? {} : {
          toJSON : jQuery.noop
        }), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), ret = cache[id], pvt || (ret.data || (ret.data = {}), ret = ret.data), void 0 !== data && (ret[jQuery.camelCase(name)] = data), "string" == typeof name ? (val = ret[name], null == val && (val = ret[jQuery.camelCase(name)])) : val = ret, val;
      }
    }
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {boolean} pvt
   * @return {undefined}
   */
  function internalRemoveData(elem, name, pvt) {
    if (jQuery.acceptData(elem)) {
      var thisCache;
      var i;
      var isNode = elem.nodeType;
      var cache = isNode ? jQuery.cache : elem;
      var id = isNode ? elem[jQuery.expando] : jQuery.expando;
      if (cache[id]) {
        if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
          if (jQuery.isArray(name)) {
            name = name.concat(jQuery.map(name, jQuery.camelCase));
          } else {
            if (name in thisCache) {
              /** @type {!Array} */
              name = [name];
            } else {
              name = jQuery.camelCase(name);
              name = name in thisCache ? [name] : name.split(" ");
            }
          }
          i = name.length;
          for (; i--;) {
            delete thisCache[name[i]];
          }
          if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
            return;
          }
        }
        if (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) {
          if (isNode) {
            jQuery.cleanData([elem], true);
          } else {
            if (support.deleteExpando || cache != cache.window) {
              delete cache[id];
            } else {
              /** @type {null} */
              cache[id] = null;
            }
          }
        }
      }
    }
  }
  /**
   * @return {?}
   */
  function returnTrue() {
    return true;
  }
  /**
   * @return {?}
   */
  function returnFalse() {
    return false;
  }
  /**
   * @return {?}
   */
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (a) {
    }
  }
  /**
   * @param {!Object} document
   * @return {?}
   */
  function createSafeFragment(document) {
    /** @type {!Array<string>} */
    var deadPool = componentsStr.split("|");
    var safeFrag = document.createDocumentFragment();
    if (safeFrag.createElement) {
      for (; deadPool.length;) {
        safeFrag.createElement(deadPool.pop());
      }
    }
    return safeFrag;
  }
  /**
   * @param {!Object} context
   * @param {number} tag
   * @return {?}
   */
  function getAll(context, tag) {
    var element;
    var elem;
    /** @type {number} */
    var name = 0;
    var f = typeof context.getElementsByTagName !== undefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== undefined ? context.querySelectorAll(tag || "*") : void 0;
    if (!f) {
      /** @type {!Array} */
      f = [];
      element = context.childNodes || context;
      for (; null != (elem = element[name]); name++) {
        if (!tag || jQuery.nodeName(elem, tag)) {
          f.push(elem);
        } else {
          jQuery.merge(f, getAll(elem, tag));
        }
      }
    }
    return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], f) : f;
  }
  /**
   * @param {!Object} elem
   * @return {undefined}
   */
  function fixDefaultChecked(elem) {
    if (reg.test(elem.type)) {
      elem.defaultChecked = elem.checked;
    }
  }
  /**
   * @param {!Object} elem
   * @param {!Element} content
   * @return {?}
   */
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  /**
   * @param {(Object|string)} elem
   * @return {?}
   */
  function disableScript(elem) {
    return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, elem;
  }
  /**
   * @param {!Object} elem
   * @return {?}
   */
  function restoreScript(elem) {
    /** @type {(Array<string>|null)} */
    var match = rscriptTypeMasked.exec(elem.type);
    return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
  }
  /**
   * @param {number} elems
   * @param {!NodeList} refElements
   * @return {undefined}
   */
  function setGlobalEval(elems, refElements) {
    var elem;
    /** @type {number} */
    var i = 0;
    for (; null != (elem = elems[i]); i++) {
      jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
  }
  /**
   * @param {!Object} src
   * @param {!Object} dest
   * @return {undefined}
   */
  function cloneCopyEvent(src, dest) {
    if (1 === dest.nodeType && jQuery.hasData(src)) {
      var type;
      var i;
      var countRep;
      var oldData = jQuery._data(src);
      var curData = jQuery._data(dest, oldData);
      var events = oldData.events;
      if (events) {
        delete curData.handle;
        curData.events = {};
        for (type in events) {
          /** @type {number} */
          i = 0;
          countRep = events[type].length;
          for (; countRep > i; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
      if (curData.data) {
        curData.data = jQuery.extend({}, curData.data);
      }
    }
  }
  /**
   * @param {!Object} src
   * @param {!Object} dest
   * @return {undefined}
   */
  function fixCloneNodeIssues(src, dest) {
    var undefined;
    var type;
    var data;
    if (1 === dest.nodeType) {
      if (undefined = dest.nodeName.toLowerCase(), !support.noCloneEvent && dest[jQuery.expando]) {
        data = jQuery._data(dest);
        for (type in data.events) {
          jQuery.removeEvent(dest, type, data.handle);
        }
        dest.removeAttribute(jQuery.expando);
      }
      if ("script" === undefined && dest.text !== src.text) {
        disableScript(dest).text = src.text;
        restoreScript(dest);
      } else {
        if ("object" === undefined) {
          if (dest.parentNode) {
            dest.outerHTML = src.outerHTML;
          }
          if (support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML)) {
            dest.innerHTML = src.innerHTML;
          }
        } else {
          if ("input" === undefined && reg.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
              dest.value = src.value;
            }
          } else {
            if ("option" === undefined) {
              dest.defaultSelected = dest.selected = src.defaultSelected;
            } else {
              if ("input" === undefined || "textarea" === undefined) {
                dest.defaultValue = src.defaultValue;
              }
            }
          }
        }
      }
    }
  }
  
  /**
   * @param {?} name
   * @param {!Object} doc
   * @return {?}
   */
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body);
    var e = window.getDefaultComputedStyle ? window.getDefaultComputedStyle(elem[0]).display : jQuery.css(elem[0], "display");
    return elem.detach(), e;
  }
  /**
   * @param {?} nodeName
   * @return {?}
   */
  function defaultDisplay(nodeName) {
    var doc = document;
    var display = defaultDisplayMap[nodeName];
    return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), defaultDisplayMap[nodeName] = display), display;
  }
  /**
   * @param {?} conditionFn
   * @param {!Function} hookFn
   * @return {?}
   */
  function addGetHookIf(conditionFn, hookFn) {
    return {
      get : function() {
        var condition = conditionFn();
        if (null != condition) {
          return condition ? void delete this.get : (this.get = hookFn).apply(this, arguments);
        }
      }
    };
  }
  /**
   * @param {!Object} style
   * @param {string} name
   * @return {?}
   */
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var UserSelect = name.charAt(0).toUpperCase() + name.slice(1);
    /** @type {string} */
    var origName = name;
    /** @type {number} */
    var i = prefixes.length;
    for (; i--;) {
      if (name = prefixes[i] + UserSelect, name in style) {
        return name;
      }
    }
    return origName;
  }
  /**
   * @param {!NodeList} elements
   * @param {boolean} show
   * @return {?}
   */
  function showHide(elements, show) {
    var display;
    var elem;
    var hidden;
    /** @type {!Array} */
    var values = [];
    /** @type {number} */
    var index = 0;
    var length = elements.length;
    for (; length > index; index++) {
      elem = elements[index];
      if (elem.style) {
        values[index] = jQuery._data(elem, "olddisplay");
        display = elem.style.display;
        if (show) {
          if (!(values[index] || "none" !== display)) {
            /** @type {string} */
            elem.style.display = "";
          }
          if ("" === elem.style.display && test(elem)) {
            values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
          }
        } else {
          if (!values[index]) {
            hidden = test(elem);
            if (display && "none" !== display || !hidden) {
              jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
            }
          }
        }
      }
    }
    /** @type {number} */
    index = 0;
    for (; length > index; index++) {
      elem = elements[index];
      if (elem.style) {
        if (!(show && "none" !== elem.style.display && "" !== elem.style.display)) {
          elem.style.display = show ? values[index] || "" : "none";
        }
      }
    }
    return elements;
  }
  /**
   * @param {!Object} elem
   * @param {!Object} value
   * @param {string} type
   * @return {?}
   */
  function setPositiveNumber(elem, value, type) {
    /** @type {(Array<string>|null)} */
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (type || 0)) + (matches[2] || "px") : value;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {string} extra
   * @param {boolean} isBorderBox
   * @param {string} styles
   * @return {?}
   */
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    /** @type {number} */
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0;
    /** @type {number} */
    var val = 0;
    for (; 4 > i; i = i + 2) {
      if ("margin" === extra) {
        val = val + jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if ("content" === extra) {
          /** @type {number} */
          val = val - jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if ("margin" !== extra) {
          /** @type {number} */
          val = val - jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val = val + jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if ("padding" !== extra) {
          val = val + jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {!Object} extra
   * @return {?}
   */
  function getWidthOrHeight(elem, name, extra) {
    /** @type {boolean} */
    var valueIsBorderBox = true;
    var val = "width" === name ? elem.offsetWidth : elem.offsetHeight;
    var styles = getStyles(elem);
    var isBorderBox = support.boxSizing() && "border-box" === jQuery.css(elem, "boxSizing", false, styles);
    if (0 >= val || null == val) {
      if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      /** @type {number} */
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
  }
  /**
   * @param {!Array} obj
   * @param {string} key
   * @param {number} object
   * @param {string} end
   * @param {number} easing
   * @return {?}
   */
  function Tween(obj, key, object, end, easing) {
    return new Tween.prototype.init(obj, key, object, end, easing);
  }
  /**
   * @return {?}
   */
  function createFxNow() {
    return setTimeout(function() {
      fxNow = void 0;
    }), fxNow = jQuery.now();
  }
  /**
   * @param {string} type
   * @param {number} includeWidth
   * @return {?}
   */
  function genFx(type, includeWidth) {
    var which;
    var attrs = {
      height : type
    };
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    includeWidth = includeWidth ? 1 : 0;
    for (; 4 > i; i = i + (2 - includeWidth)) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    return includeWidth && (attrs.opacity = attrs.width = type), attrs;
  }
  /**
   * @param {?} value
   * @param {!Object} prop
   * @param {?} animation
   * @return {?}
   */
  function createTween(value, prop, animation) {
    var tween;
    var _ = (tweeners[prop] || []).concat(tweeners["*"]);
    /** @type {number} */
    var t = 0;
    var c = _.length;
    for (; c > t; t++) {
      if (tween = _[t].call(animation, prop, value)) {
        return tween;
      }
    }
  }
  /**
   * @param {?} elem
   * @param {!Object} props
   * @param {!Object} opts
   * @return {undefined}
   */
  function defaultPrefilter(elem, props, opts) {
    var prop;
    var value;
    var matched;
    var tween;
    var hooks;
    var oldfire;
    var display;
    var dDisplay;
    var anim = this;
    var orig = {};
    var style = elem.style;
    var hidden = elem.nodeType && test(elem);
    var dataShow = jQuery._data(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (null == hooks.unqueued) {
        /** @type {number} */
        hooks.unqueued = 0;
        /** @type {function(): undefined} */
        oldfire = hooks.empty.fire;
        /**
         * @return {undefined}
         */
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (1 === elem.nodeType && ("height" in props || "width" in props)) {
      /** @type {!Array} */
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      dDisplay = defaultDisplay(elem.nodeName);
      if ("none" === display) {
        display = dDisplay;
      }
      if ("inline" === display && "none" === jQuery.css(elem, "float")) {
        if (support.inlineBlockNeedsLayout && "inline" !== dDisplay) {
          /** @type {number} */
          style.zoom = 1;
        } else {
          /** @type {string} */
          style.display = "inline-block";
        }
      }
    }
    if (opts.overflow) {
      /** @type {string} */
      style.overflow = "hidden";
      if (!support.shrinkWrapBlocks()) {
        anim.always(function() {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
    }
    for (prop in props) {
      if (value = props[prop], verRe.exec(value)) {
        if (delete props[prop], matched = matched || "toggle" === value, value === (hidden ? "hide" : "show")) {
          if ("show" !== value || !dataShow || void 0 === dataShow[prop]) {
            continue;
          }
          /** @type {boolean} */
          hidden = true;
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = jQuery._data(elem, "fxshow", {});
      }
      if (matched) {
        /** @type {boolean} */
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var p;
        jQuery._removeData(elem, "fxshow");
        for (p in orig) {
          jQuery.style(elem, p, orig[p]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            /** @type {number} */
            tween.start = "width" === prop || "height" === prop ? 1 : 0;
          }
        }
      }
    }
  }
  /**
   * @param {!Array} obj
   * @param {!Array} props
   * @return {undefined}
   */
  function propFilter(obj, props) {
    var key;
    var name;
    var value;
    var data;
    var hooks;
    for (key in obj) {
      if (name = jQuery.camelCase(key), value = props[name], data = obj[key], jQuery.isArray(data) && (value = data[1], data = obj[key] = data[0]), key !== name && (obj[name] = data, delete obj[key]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
        data = hooks.expand(data);
        delete obj[name];
        for (key in data) {
          if (!(key in obj)) {
            obj[key] = data[key];
            props[key] = value;
          }
        }
      } else {
        props[name] = value;
      }
    }
  }
  /**
   * @param {!Object} elem
   * @param {?} properties
   * @param {!Object} options
   * @return {?}
   */
  function Animation(elem, properties, options) {
    var result;
    var e;
    /** @type {number} */
    var index = 0;
    /** @type {number} */
    var length = animationPrefilters.length;
    var deferred = jQuery.Deferred().always(function() {
      delete tick.elem;
    });
    /**
     * @return {?}
     */
    var tick = function() {
      if (e) {
        return false;
      }
      var currentTime = fxNow || createFxNow();
      /** @type {number} */
      var remaining = Math.max(0, animation.startTime + animation.duration - currentTime);
      /** @type {number} */
      var temp = remaining / animation.duration || 0;
      /** @type {number} */
      var percent = 1 - temp;
      /** @type {number} */
      var i = 0;
      var length = animation.tweens.length;
      for (; length > i; i++) {
        animation.tweens[i].run(percent);
      }
      return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), false);
    };
    var animation = deferred.promise({
      elem : elem,
      props : jQuery.extend({}, properties),
      opts : jQuery.extend(true, {
        specialEasing : {}
      }, options),
      originalProperties : properties,
      originalOptions : options,
      startTime : fxNow || createFxNow(),
      duration : options.duration,
      tweens : [],
      createTween : function(prop, end) {
        var result = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
        return animation.tweens.push(result), result;
      },
      stop : function(value) {
        /** @type {number} */
        var i = 0;
        var val = value ? animation.tweens.length : 0;
        if (e) {
          return this;
        }
        /** @type {boolean} */
        e = true;
        for (; val > i; i++) {
          animation.tweens[i].run(1);
        }
        return value ? deferred.resolveWith(elem, [animation, value]) : deferred.rejectWith(elem, [animation, value]), this;
      }
    });
    var props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; length > index; index++) {
      if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) {
        return result;
      }
    }
    return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
      elem : elem,
      anim : animation,
      queue : animation.opts.queue
    })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  /**
   * @param {!Object} structure
   * @return {?}
   */
  function addToPrefiltersOrTransports(structure) {
    return function(a, c) {
      if ("string" != typeof a) {
        /** @type {string} */
        c = a;
        /** @type {string} */
        a = "*";
      }
      var type;
      /** @type {number} */
      var callbackCount = 0;
      var callbackVals = a.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(c)) {
        for (; type = callbackVals[callbackCount++];) {
          if ("+" === type.charAt(0)) {
            type = type.slice(1) || "*";
            (structure[type] = structure[type] || []).unshift(c);
          } else {
            (structure[type] = structure[type] || []).push(c);
          }
        }
      }
    };
  }
  /**
   * @param {!Object} structure
   * @param {?} options
   * @param {!Object} originalOptions
   * @param {?} jqXHR
   * @return {?}
   */
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    /**
     * @param {string} type
     * @return {?}
     */
    function inspect(type) {
      var selected;
      return nodedescriptions[type] = true, jQuery.each(structure[type] || [], function(a, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        return "string" != typeof dataTypeOrTransport || seekingTransport || nodedescriptions[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), false);
      }), selected;
    }
    var nodedescriptions = {};
    /** @type {boolean} */
    var seekingTransport = structure === transports;
    return inspect(options.dataTypes[0]) || !nodedescriptions["*"] && inspect("*");
  }
  /**
   * @param {?} target
   * @param {?} opts
   * @return {?}
   */
  function ajaxExtend(target, opts) {
    var deep;
    var key;
    var flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in opts) {
      if (void 0 !== opts[key]) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = opts[key];
      }
    }
    return deep && jQuery.extend(true, target, deep), target;
  }
  /**
   * @param {!Object} s
   * @param {!XMLHttpRequest} jqXHR
   * @param {!Array} responses
   * @return {?}
   */
  function ajaxHandleResponses(s, jqXHR, responses) {
    var firstDataType;
    var ct;
    var finalDataType;
    var type;
    var contents = s.contents;
    var dataTypes = s.dataTypes;
    for (; "*" === dataTypes[0];) {
      dataTypes.shift();
      if (void 0 === ct) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          /** @type {string} */
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          /** @type {string} */
          firstDataType = type;
        }
      }
      /** @type {(string|undefined)} */
      finalDataType = finalDataType || firstDataType;
    }
    return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0;
  }
  /**
   * @param {!Object} s
   * @param {!Object} response
   * @param {?} jqXHR
   * @param {number} isSuccess
   * @return {?}
   */
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2;
    var current;
    var conv;
    var tmp;
    var prev;
    var converters = {};
    var deps = s.dataTypes.slice();
    if (deps[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = deps.shift();
    for (; current;) {
      if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = deps.shift()) {
        if ("*" === current) {
          current = prev;
        } else {
          if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) {
              for (conv2 in converters) {
                if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else {
                    if (converters[conv2] !== true) {
                      /** @type {string} */
                      current = tmp[0];
                      deps.unshift(tmp[1]);
                    }
                  }
                  break;
                }
              }
            }
            if (conv !== true) {
              if (conv && s["throws"]) {
                response = conv(response);
              } else {
                try {
                  response = conv(response);
                } catch (e) {
                  return {
                    state : "parsererror",
                    error : conv ? e : "No conversion from " + prev + " to " + current
                  };
                }
              }
            }
          }
        }
      }
    }
    return {
      state : "success",
      data : response
    };
  }
  /**
   * @param {string} key
   * @param {?} object
   * @param {string} name
   * @param {!Function} cb
   * @return {undefined}
   */
  function set(key, object, name, cb) {
    var i;
    if (jQuery.isArray(object)) {
      jQuery.each(object, function(object, value) {
        if (name || VALID_IDENTIFIER_EXPR.test(key)) {
          cb(key, value);
        } else {
          set(key + "[" + ("object" == typeof value ? object : "") + "]", value, name, cb);
        }
      });
    } else {
      if (name || "object" !== jQuery.type(object)) {
        cb(key, object);
      } else {
        for (i in object) {
          set(key + "[" + i + "]", object[i], name, cb);
        }
      }
    }
  }
  /**
   * @return {?}
   */
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest;
    } catch (b) {
    }
  }
  /**
   * @return {?}
   */
  function getNewXmlHttpRequest() {
    try {
      return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch (b) {
    }
  }
  /**
   * @param {!Object} elem
   * @return {?}
   */
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : false;
  }
  /** @type {!Array} */
  var arr = [];
  /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
  var slice = arr.slice;
  /** @type {function(this:*, ...*): !Array<?>} */
  var concat = arr.concat;
  /** @type {function(this:IArrayLike<T>, ...T): number} */
  var push = arr.push;
  /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
  var indexOf = arr.indexOf;
  var class2type = {};
  /** @type {function(this:*): string} */
  var toString = class2type.toString;
  /** @type {function(this:Object, *): boolean} */
  var hasOwn = class2type.hasOwnProperty;
  /** @type {function(this:string): string} */
  var trim = "".trim;
  var support = {};
  /** @type {string} */
  var core_version = "1.11.0";
  /**
   * @param {!Array} selector
   * @param {string} context
   * @return {?}
   */
  var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context);
  };
  /** @type {!RegExp} */
  var REGEX_ESCAPE_EXPR = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  /** @type {!RegExp} */
  var _kerningNamesHash_escapeEscape = /^-ms-/;
  /** @type {!RegExp} */
  var regPlaceholder = /-([\da-z])/gi;
  /**
   * @param {?} all
   * @param {string} letter
   * @return {?}
   */
  var camelCaseHandler = function(all, letter) {
    return letter.toUpperCase();
  };
  jQuery.fn = jQuery.prototype = {
    jquery : core_version,
    constructor : jQuery,
    selector : "",
    length : 0,
    toArray : function() {
      return slice.call(this);
    },
    get : function(from) {
      return null != from ? 0 > from ? this[from + this.length] : this[from] : slice.call(this);
    },
    pushStack : function(a) {
      var ret = jQuery.merge(this.constructor(), a);
      return ret.prevObject = this, ret.context = this.context, ret;
    },
    each : function(fn, callback) {
      return jQuery.each(this, fn, callback);
    },
    map : function(options) {
      return this.pushStack(jQuery.map(this, function(y, newOptions) {
        return options.call(y, newOptions, y);
      }));
    },
    slice : function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first : function() {
      return this.eq(0);
    },
    last : function() {
      return this.eq(-1);
    },
    eq : function(i) {
      var index = this.length;
      var thisIndex = +i + (0 > i ? index : 0);
      return this.pushStack(thisIndex >= 0 && index > thisIndex ? [this[thisIndex]] : []);
    },
    end : function() {
      return this.prevObject || this.constructor(null);
    },
    push : push,
    sort : arr.sort,
    splice : arr.splice
  };
  /** @type {function(): ?} */
  jQuery.extend = jQuery.fn.extend = function() {
    var src;
    var copyIsArray;
    var copy;
    var name;
    var options;
    var clone;
    var target = arguments[0] || {};
    /** @type {number} */
    var i = 1;
    /** @type {number} */
    var l = arguments.length;
    /** @type {boolean} */
    var deep = false;
    if ("boolean" == typeof target) {
      /** @type {boolean} */
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (!("object" == typeof target || jQuery.isFunction(target))) {
      target = {};
    }
    if (i === l) {
      target = this;
      i--;
    }
    for (; l > i; i++) {
      if (null != (options = arguments[i])) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target !== copy) {
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if (copyIsArray) {
                /** @type {boolean} */
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];
              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }
              target[name] = jQuery.extend(deep, clone, copy);
            } else {
              if (void 0 !== copy) {
                target[name] = copy;
              }
            }
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando : "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
    isReady : true,
    error : function(a) {
      throw new Error(a);
    },
    noop : function() {
    },
    isFunction : function(obj) {
      return "function" === jQuery.type(obj);
    },
    isArray : Array.isArray || function(type) {
      return "array" === jQuery.type(type);
    },
    isWindow : function(obj) {
      return null != obj && obj == obj.window;
    },
    isNumeric : function(obj) {
      return obj - parseFloat(obj) >= 0;
    },
    isEmptyObject : function(obj) {
      var key;
      for (key in obj) {
        return false;
      }
      return true;
    },
    isPlainObject : function(o) {
      var key;
      if (!o || "object" !== jQuery.type(o) || o.nodeType || jQuery.isWindow(o)) {
        return false;
      }
      try {
        if (o.constructor && !hasOwn.call(o, "constructor") && !hasOwn.call(o.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (c) {
        return false;
      }
      if (support.ownLast) {
        for (key in o) {
          return hasOwn.call(o, key);
        }
      }
      for (key in o) {
      }
      return void 0 === key || hasOwn.call(o, key);
    },
    type : function(obj) {
      return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval : function(data) {
      if (data && jQuery.trim(data)) {
        (window.execScript || function(aNetChannelMessage) {
          window.eval.call(window, aNetChannelMessage);
        })(data);
      }
    },
    camelCase : function(str) {
      return str.replace(_kerningNamesHash_escapeEscape, "ms-").replace(regPlaceholder, camelCaseHandler);
    },
    nodeName : function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each : function(obj, callback, args) {
      var result;
      /** @type {number} */
      var i = 0;
      var length = obj.length;
      var isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (; length > i; i++) {
            if (result = callback.apply(obj[i], args), result === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (result = callback.apply(obj[i], args), result === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; length > i; i++) {
            if (result = callback.call(obj[i], i, obj[i]), result === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (result = callback.call(obj[i], i, obj[i]), result === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim : trim && !trim.call("\ufeff\u00a0") ? function(text) {
      return null == text ? "" : trim.call(text);
    } : function(text) {
      return null == text ? "" : (text + "").replace(REGEX_ESCAPE_EXPR, "");
    },
    makeArray : function(arr, data) {
      var obj = data || [];
      return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(obj, "string" == typeof arr ? [arr] : arr) : push.call(obj, arr)), obj;
    },
    inArray : function(value, array, i) {
      var length;
      if (array) {
        if (indexOf) {
          return indexOf.call(array, value, i);
        }
        length = array.length;
        i = i ? 0 > i ? Math.max(0, length + i) : i : 0;
        for (; length > i; i++) {
          if (i in array && array[i] === value) {
            return i;
          }
        }
      }
      return -1;
    },
    merge : function(path, keys) {
      /** @type {number} */
      var length = +keys.length;
      /** @type {number} */
      var i = 0;
      var j = path.length;
      for (; length > i;) {
        path[j++] = keys[i++];
      }
      if (length !== length) {
        for (; void 0 !== keys[i];) {
          path[j++] = keys[i++];
        }
      }
      return path.length = j, path;
    },
    grep : function(array, callback, a) {
      var editItemKey;
      /** @type {!Array} */
      var ret = [];
      /** @type {number} */
      var i = 0;
      var length = array.length;
      /** @type {boolean} */
      var booA = !a;
      for (; length > i; i++) {
        /** @type {boolean} */
        editItemKey = !callback(array[i], i);
        if (editItemKey !== booA) {
          ret.push(array[i]);
        }
      }
      return ret;
    },
    map : function(obj, callback, type) {
      var value;
      /** @type {number} */
      var i = 0;
      var length = obj.length;
      var isArray = isArraylike(obj);
      /** @type {!Array} */
      var stack = [];
      if (isArray) {
        for (; length > i; i++) {
          value = callback(obj[i], i, type);
          if (null != value) {
            stack.push(value);
          }
        }
      } else {
        for (i in obj) {
          value = callback(obj[i], i, type);
          if (null != value) {
            stack.push(value);
          }
        }
      }
      return concat.apply([], stack);
    },
    guid : 1,
    proxy : function(message, state) {
      var headArgs;
      var ret;
      var result;
      return "string" == typeof state && (result = message[state], state = message, message = result), jQuery.isFunction(message) ? (headArgs = slice.call(arguments, 2), ret = function() {
        return message.apply(state || this, headArgs.concat(slice.call(arguments)));
      }, ret.guid = message.guid = message.guid || jQuery.guid++, ret) : void 0;
    },
    now : function() {
      return +new Date;
    },
    support : support
  });
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, p_Interval) {
    class2type["[object " + p_Interval + "]"] = p_Interval.toLowerCase();
  });
  var Sizzle = function(window) {
    /**
     * @param {string} selector
     * @param {!Object} context
     * @param {!Array} results
     * @param {!Array} seed
     * @return {?}
     */
    function Sizzle(selector, context, results, seed) {
      var match;
      var elem;
      var m;
      var nodeType;
      var i;
      var groups;
      var old;
      var nid;
      var newContext;
      var newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) {
        return results;
      }
      if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) {
        return [];
      }
      if (documentIsHTML && !seed) {
        if (match = customSelectorReg.exec(selector)) {
          if (m = match[1]) {
            if (9 === nodeType) {
              if (elem = context.getElementById(m), !elem || !elem.parentNode) {
                return results;
              }
              if (elem.id === m) {
                return results.push(elem), results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                return results.push(elem), results;
              }
            }
          } else {
            if (match[2]) {
              return push.apply(results, context.getElementsByTagName(selector)), results;
            }
            if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              return push.apply(results, context.getElementsByClassName(m)), results;
            }
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
            groups = tokenize(selector);
            if (old = context.getAttribute("id")) {
              nid = old.replace(rescape, "\\$&");
            } else {
              context.setAttribute("id", nid);
            }
            /** @type {string} */
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            for (; i--;) {
              /** @type {string} */
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = $.test(selector) && testContext(context.parentNode) || context;
            newSelector = groups.join(",");
          }
          if (newSelector) {
            try {
              return push.apply(results, newContext.querySelectorAll(newSelector)), results;
            } catch (w) {
            } finally {
              if (!old) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
     * @return {?}
     */
    function createCache() {
      /**
       * @param {string} key
       * @param {?} service
       * @return {?}
       */
      function cache(key, service) {
        return buf.push(key + " ") > Expr.cacheLength && delete cache[buf.shift()], cache[key + " "] = service;
      }
      /** @type {!Array} */
      var buf = [];
      return cache;
    }
    /**
     * @param {!Function} fn
     * @return {?}
     */
    function markFunction(fn) {
      return fn[expando] = true, fn;
    }
    /**
     * @param {!Function} doSubs
     * @return {?}
     */
    function assert(doSubs) {
      var uiElem = document.createElement("div");
      try {
        return !!doSubs(uiElem);
      } catch (c) {
        return false;
      } finally {
        if (uiElem.parentNode) {
          uiElem.parentNode.removeChild(uiElem);
        }
        /** @type {null} */
        uiElem = null;
      }
    }
    /**
     * @param {string} attrs
     * @param {!Function} handler
     * @return {undefined}
     */
    function addHandle(attrs, handler) {
      var arr = attrs.split("|");
      var i = attrs.length;
      for (; i--;) {
        /** @type {!Function} */
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * @param {!Object} a
     * @param {!Element} b
     * @return {?}
     */
    function siblingCheck(a, b) {
      var cur = b && a;
      var num_const = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || B) - (~a.sourceIndex || B);
      if (num_const) {
        return num_const;
      }
      if (cur) {
        for (; cur = cur.nextSibling;) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    /**
     * @param {!Object} type
     * @return {?}
     */
    function jQuerify(type) {
      return function(section) {
        var id = section.nodeName.toLowerCase();
        return "input" === id && section.type === type;
      };
    }
    /**
     * @param {!Object} type
     * @return {?}
     */
    function createButtonPseudo(type) {
      return function(section) {
        var undefined = section.nodeName.toLowerCase();
        return ("input" === undefined || "button" === undefined) && section.type === type;
      };
    }
    /**
     * @param {!Function} fn
     * @return {?}
     */
    function createPositionalPseudo(fn) {
      return markFunction(function(left) {
        return left = +left, markFunction(function(a, b) {
          var i;
          var f = fn([], a.length, left);
          var j = f.length;
          for (; j--;) {
            if (a[i = f[j]]) {
              /** @type {boolean} */
              a[i] = !(b[i] = a[i]);
            }
          }
        });
      });
    }
    /**
     * @param {!Node} context
     * @return {?}
     */
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== strundefined && context;
    }
    /**
     * @return {undefined}
     */
    function setFilters() {
    }
    /**
     * @param {?} selector
     * @param {number} parseOnly
     * @return {?}
     */
    function tokenize(selector, parseOnly) {
      var matched;
      var match;
      var tokens;
      var type;
      var soFar;
      var groups;
      var preFilters;
      var cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      /** @type {!Array} */
      groups = [];
      preFilters = Expr.preFilter;
      for (; soFar;) {
        if (!matched || (match = chunker.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        /** @type {boolean} */
        matched = false;
        if (match = rcomma.exec(soFar)) {
          /** @type {string} */
          matched = match.shift();
          tokens.push({
            value : matched,
            type : match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if (!(!(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value : matched,
              type : type,
              matches : match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }
    /**
     * @param {!Array} text
     * @return {?}
     */
    function toSelector(text) {
      /** @type {number} */
      var i = 0;
      var l = text.length;
      /** @type {string} */
      var selector = "";
      for (; l > i; i++) {
        /** @type {string} */
        selector = selector + text[i].value;
      }
      return selector;
    }
    /**
     * @param {!Function} matcher
     * @param {!Object} combinator
     * @param {string} base
     * @return {?}
     */
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir;
      var checkNonElements = base && "parentNode" === dir;
      /** @type {number} */
      var doneName = done++;
      return combinator.first ? function(elem, stat, context) {
        for (; elem = elem[dir];) {
          if (1 === elem.nodeType || checkNonElements) {
            return matcher(elem, stat, context);
          }
        }
      } : function(elem, context, xml) {
        var oldCache;
        var outerCache;
        /** @type {!Array} */
        var newCache = [dirruns, doneName];
        if (xml) {
          for (; elem = elem[dir];) {
            if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) {
              return true;
            }
          }
        } else {
          for (; elem = elem[dir];) {
            if (1 === elem.nodeType || checkNonElements) {
              if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return newCache[2] = oldCache[2];
              }
              if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        }
      };
    }
    /**
     * @param {!Object} matchers
     * @return {?}
     */
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        for (; i--;) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    /**
     * @param {!Array} body
     * @param {!Object} selector
     * @param {!Object} filter
     * @param {!Object} value
     * @param {?} i
     * @return {?}
     */
    function get(body, selector, filter, value, i) {
      var item;
      /** @type {!Array} */
      var obj = [];
      /** @type {number} */
      var index = 0;
      var count = body.length;
      /** @type {boolean} */
      var isDrawLayerVisibled = null != selector;
      for (; count > index; index++) {
        if ((item = body[index]) && (!filter || filter(item, value, i))) {
          obj.push(item);
          if (isDrawLayerVisibled) {
            selector.push(index);
          }
        }
      }
      return obj;
    }
    /**
     * @param {!Object} options
     * @param {string} selector
     * @param {string} callback
     * @param {!Object} e
     * @param {string} fn
     * @param {string} data
     * @return {?}
     */
    function init(options, selector, callback, e, fn, data) {
      return e && !e[expando] && (e = init(e)), fn && !fn[expando] && (fn = init(fn, data)), markFunction(function(seed, object, context, text) {
        var key;
        var i;
        var item;
        /** @type {!Array} */
        var response = [];
        /** @type {!Array} */
        var res = [];
        var a = object.length;
        var data = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []);
        var value = !options || !seed && selector ? data : get(data, response, options, context, text);
        var result = callback ? fn || (seed ? options : a || e) ? [] : object : value;
        if (callback && callback(value, result, context, text), e) {
          key = get(result, res);
          e(key, [], context, text);
          i = key.length;
          for (; i--;) {
            if (item = key[i]) {
              /** @type {boolean} */
              result[res[i]] = !(value[res[i]] = item);
            }
          }
        }
        if (seed) {
          if (fn || options) {
            if (fn) {
              /** @type {!Array} */
              key = [];
              i = result.length;
              for (; i--;) {
                if (item = result[i]) {
                  key.push(value[i] = item);
                }
              }
              fn(null, result = [], key, text);
            }
            i = result.length;
            for (; i--;) {
              if ((item = result[i]) && (key = fn ? indexOf.call(seed, item) : response[i]) > -1) {
                /** @type {boolean} */
                seed[key] = !(object[key] = item);
              }
            }
          }
        } else {
          result = get(result === object ? result.splice(a, result.length) : result);
          if (fn) {
            fn(null, object, result, text);
          } else {
            push.apply(object, result);
          }
        }
      });
    }
    /**
     * @param {!Array} tokens
     * @return {?}
     */
    function matcherFromTokens(tokens) {
      var checkContext;
      var matcher;
      var j;
      var length = tokens.length;
      var leadingRelative = Expr.relative[tokens[0].type];
      var implicitRelative = leadingRelative || Expr.relative[" "];
      /** @type {number} */
      var i = leadingRelative ? 1 : 0;
      var matchContext = addCombinator(function(elem) {
        return elem === checkContext;
      }, implicitRelative, true);
      var matchAnyContext = addCombinator(function(name) {
        return indexOf.call(checkContext, name) > -1;
      }, implicitRelative, true);
      /** @type {!Array} */
      var matchers = [function(elem, context, xml) {
        return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
      }];
      for (; length > i; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          /** @type {!Array} */
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
            /** @type {number} */
            j = ++i;
            for (; length > j; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return init(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
              value : " " === tokens[i - 2].type ? "*" : ""
            })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), length > j && matcherFromTokens(tokens = tokens.slice(j)), length > j && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    /**
     * @param {!Array} elementMatchers
     * @param {!Array} setMatchers
     * @return {?}
     */
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      /** @type {boolean} */
      var bySet = setMatchers.length > 0;
      /** @type {boolean} */
      var byElement = elementMatchers.length > 0;
      /**
       * @param {!Function} seed
       * @param {string} context
       * @param {?} xml
       * @param {!Array} results
       * @param {!Object} outermost
       * @return {?}
       */
      var superMatcher = function(seed, context, xml, results, outermost) {
        var elem;
        var j;
        var matcher;
        /** @type {number} */
        var matchedCount = 0;
        /** @type {string} */
        var i = "0";
        var unmatched = seed && [];
        /** @type {!Array} */
        var data = [];
        var contextBackup = outermostContext;
        var obj = seed || byElement && Expr.find.TAG("*", outermost);
        var dirrunsUnique = dirruns = dirruns + (null == contextBackup ? 1 : Math.random() || .1);
        var x = obj.length;
        if (outermost) {
          outermostContext = context !== document && context;
        }
        for (; i !== x && null != (elem = obj[i]); i++) {
          if (byElement && elem) {
            /** @type {number} */
            j = 0;
            for (; matcher = elementMatchers[j++];) {
              if (matcher(elem, context, xml)) {
                results.push(elem);
                break;
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
            }
          }
          if (bySet) {
            if (elem = !matcher && elem) {
              matchedCount--;
            }
            if (seed) {
              unmatched.push(elem);
            }
          }
        }
        if (matchedCount = matchedCount + i, bySet && i !== matchedCount) {
          /** @type {number} */
          j = 0;
          for (; matcher = setMatchers[j++];) {
            matcher(unmatched, data, context, xml);
          }
          if (seed) {
            if (matchedCount > 0) {
              for (; i--;) {
                if (!(unmatched[i] || data[i])) {
                  data[i] = pop.call(results);
                }
              }
            }
            data = get(data);
          }
          push.apply(results, data);
          if (outermost && !seed && data.length > 0 && matchedCount + setMatchers.length > 1) {
            Sizzle.uniqueSort(results);
          }
        }
        return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched;
      };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    /**
     * @param {string} selector
     * @param {!NodeList} contexts
     * @param {!Array} results
     * @return {?}
     */
    function multipleContexts(selector, contexts, results) {
      /** @type {number} */
      var i = 0;
      var len = contexts.length;
      for (; len > i; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    /**
     * @param {!Array} selector
     * @param {!Object} context
     * @param {!Object} results
     * @param {!Array} seed
     * @return {?}
     */
    function select(selector, context, results, seed) {
      var i;
      var tokens;
      var token;
      var type;
      var f;
      var match = tokenize(selector);
      if (!seed && 1 === match.length) {
        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
          if (context = (Expr.find.ID(token.matches[0].replace(value, data), context) || [])[0], !context) {
            return results;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        for (; i--;) {
          if (token = tokens[i], Expr.relative[type = token.type]) {
            break;
          }
          if ((f = Expr.find[type]) && (seed = f(token.matches[0].replace(value, data), $.test(tokens[0].type) && testContext(context.parentNode) || context))) {
            if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) {
              return push.apply(results, seed), results;
            }
            break;
          }
        }
      }
      return compile(selector, match)(seed, context, !documentIsHTML, results, $.test(selector) && testContext(context.parentNode) || context), results;
    }
    var i;
    var support;
    var Expr;
    var isElement;
    var isNative;
    var compile;
    var outermostContext;
    var sortInput;
    var n;
    var setDocument;
    var document;
    var docElem;
    var documentIsHTML;
    var rbuggyQSA;
    var rbuggyMatches;
    var matches;
    var contains;
    /** @type {string} */
    var expando = "sizzle" + -new Date;
    var preferredDoc = window.document;
    /** @type {number} */
    var dirruns = 0;
    /** @type {number} */
    var done = 0;
    var classCache = createCache();
    var tokenCache = createCache();
    var compilerCache = createCache();
    /**
     * @param {?} r
     * @param {?} z
     * @return {?}
     */
    var p = function(r, z) {
      return r === z && (n = true), 0;
    };
    /** @type {string} */
    var strundefined = "undefined";
    /** @type {number} */
    var B = 1 << 31;
    /** @type {function(this:Object, *): boolean} */
    var hasOwn = {}.hasOwnProperty;
    /** @type {!Array} */
    var arr = [];
    /** @type {function(this:IArrayLike<T>): T} */
    var pop = arr.pop;
    /** @type {function(this:IArrayLike<T>, ...T): number} */
    var push_native = arr.push;
    /** @type {function(this:IArrayLike<T>, ...T): number} */
    var push = arr.push;
    /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
    var slice = arr.slice;
    /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
    var indexOf = arr.indexOf || function(item) {
      /** @type {number} */
      var l = 0;
      var i = this.length;
      for (; i > l; l++) {
        if (this[l] === item) {
          return l;
        }
      }
      return -1;
    };
    /** @type {string} */
    var booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
    /** @type {string} */
    var _$rw$ = "[\\x20\\t\\r\\n\\f]";
    /** @type {string} */
    var characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+";
    /** @type {string} */
    var identifier = characterEncoding.replace("w", "w#");
    /** @type {string} */
    var modifiedFilter = "\\[" + _$rw$ + "*(" + characterEncoding + ")" + _$rw$ + "*(?:([*^$|!~]?=)" + _$rw$ + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + _$rw$ + "*\\]";
    /** @type {string} */
    var pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + modifiedFilter.replace(3, 8) + ")*)|.*)\\)|)";
    /** @type {!RegExp} */
    var rtrim = new RegExp("^" + _$rw$ + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _$rw$ + "+$", "g");
    /** @type {!RegExp} */
    var chunker = new RegExp("^" + _$rw$ + "*," + _$rw$ + "*");
    /** @type {!RegExp} */
    var rcomma = new RegExp("^" + _$rw$ + "*([>+~]|" + _$rw$ + ")" + _$rw$ + "*");
    /** @type {!RegExp} */
    var rattributeQuotes = new RegExp("=" + _$rw$ + "*([^\\]'\"]*?)" + _$rw$ + "*\\]", "g");
    /** @type {!RegExp} */
    var rpseudo = new RegExp(pseudos);
    /** @type {!RegExp} */
    var ridentifier = new RegExp("^" + identifier + "$");
    var matchExpr = {
      ID : new RegExp("^#(" + characterEncoding + ")"),
      CLASS : new RegExp("^\\.(" + characterEncoding + ")"),
      TAG : new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
      ATTR : new RegExp("^" + modifiedFilter),
      PSEUDO : new RegExp("^" + pseudos),
      CHILD : new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _$rw$ + "*(even|odd|(([+-]|)(\\d*)n|)" + _$rw$ + "*(?:([+-]|)" + _$rw$ + "*(\\d+)|))" + _$rw$ + "*\\)|)", "i"),
      bool : new RegExp("^(?:" + booleans + ")$", "i"),
      needsContext : new RegExp("^" + _$rw$ + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _$rw$ + "*((?:-\\d)?\\d*)" + _$rw$ + "*\\)|)(?=[^-]|$)", "i")
    };
    /** @type {!RegExp} */
    var inputNodeNames = /^(?:input|select|textarea|button)$/i;
    /** @type {!RegExp} */
    var rnoType = /^h\d$/i;
    /** @type {!RegExp} */
    var rnative = /^[^{]+\{\s*\[native \w/;
    /** @type {!RegExp} */
    var customSelectorReg = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    /** @type {!RegExp} */
    var $ = /[+~]/;
    /** @type {!RegExp} */
    var rescape = /'|\\/g;
    /** @type {!RegExp} */
    var value = new RegExp("\\\\([\\da-f]{1,6}" + _$rw$ + "?|(" + _$rw$ + ")|.)", "ig");
    /**
     * @param {?} match
     * @param {string} escaped
     * @param {boolean} escapedWhitespace
     * @return {?}
     */
    var data = function(match, escaped, escapedWhitespace) {
      /** @type {number} */
      var high = "0x" + escaped - 65536;
      return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
    };
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (cb) {
      push = {
        apply : arr.length ? function(target, array) {
          push_native.apply(target, slice.call(array));
        } : function(obj, b) {
          var i = obj.length;
          /** @type {number} */
          var bi = 0;
          for (; obj[i++] = b[bi++];) {
          }
          /** @type {number} */
          obj.length = i - 1;
        }
      };
    }
    support = Sizzle.support = {};
    /** @type {function(!Object): ?} */
    isNative = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? "HTML" !== documentElement.nodeName : false;
    };
    /** @type {function(!Object): ?} */
    setDocument = Sizzle.setDocument = function(node) {
      var b;
      var doc = node ? node.ownerDocument || node : preferredDoc;
      var win = doc.defaultView;
      return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsHTML = !isNative(doc), win && win !== win.top && (win.addEventListener ? win.addEventListener("unload", function() {
        setDocument();
      }, false) : win.attachEvent && win.attachEvent("onunload", function() {
        setDocument();
      })), support.attributes = assert(function(elm) {
        return elm.className = "i", !elm.getAttribute("className");
      }), support.getElementsByTagName = assert(function(testee) {
        return testee.appendChild(doc.createComment("")), !testee.getElementsByTagName("*").length;
      }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(testee) {
        return testee.innerHTML = "<div class='a'></div><div class='a i'></div>", testee.firstChild.className = "i", 2 === testee.getElementsByClassName("i").length;
      }), support.getById = assert(function(body) {
        return docElem.appendChild(body).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
      }), support.getById ? (Expr.find.ID = function(elem, context) {
        if (typeof context.getElementById !== strundefined && documentIsHTML) {
          var style = context.getElementById(elem);
          return style && style.parentNode ? [style] : [];
        }
      }, Expr.filter.ID = function(context) {
        var match = context.replace(value, data);
        return function(a) {
          return a.getAttribute("id") === match;
        };
      }) : (delete Expr.find.ID, Expr.filter.ID = function(context) {
        var content = context.replace(value, data);
        return function(elem) {
          var token = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
          return token && token.value === content;
        };
      }), Expr.find.TAG = support.getElementsByTagName ? function(s_elt, document) {
        return typeof document.getElementsByTagName !== strundefined ? document.getElementsByTagName(s_elt) : void 0;
      } : function(selector, document) {
        var elem;
        /** @type {!Array} */
        var results = [];
        /** @type {number} */
        var j = 0;
        var tmp = document.getElementsByTagName(selector);
        if ("*" === selector) {
          for (; elem = tmp[j++];) {
            if (1 === elem.nodeType) {
              results.push(elem);
            }
          }
          return results;
        }
        return tmp;
      }, Expr.find.CLASS = support.getElementsByClassName && function(l, docDom) {
        return typeof docDom.getElementsByClassName !== strundefined && documentIsHTML ? docDom.getElementsByClassName(l) : void 0;
      }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(elementRoot) {
        /** @type {string} */
        elementRoot.innerHTML = "<select t=''><option selected=''></option></select>";
        if (elementRoot.querySelectorAll("[t^='']").length) {
          rbuggyQSA.push("[*^$]=" + _$rw$ + "*(?:''|\"\")");
        }
        if (!elementRoot.querySelectorAll("[selected]").length) {
          rbuggyQSA.push("\\[" + _$rw$ + "*(?:value|" + booleans + ")");
        }
        if (!elementRoot.querySelectorAll(":checked").length) {
          rbuggyQSA.push(":checked");
        }
      }), assert(function(a) {
        var element = doc.createElement("input");
        element.setAttribute("type", "hidden");
        a.appendChild(element).setAttribute("name", "D");
        if (a.querySelectorAll("[name=d]").length) {
          rbuggyQSA.push("name" + _$rw$ + "*[*^$|!~]?=");
        }
        if (!a.querySelectorAll(":enabled").length) {
          rbuggyQSA.push(":enabled", ":disabled");
        }
        a.querySelectorAll("*,:x");
        rbuggyQSA.push(",.*:");
      })), (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(el) {
        support.disconnectedMatch = matches.call(el, "div");
        matches.call(el, "[s!='']:x");
        rbuggyMatches.push("!=", pseudos);
      }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), b = rnative.test(docElem.compareDocumentPosition), contains = b || rnative.test(docElem.contains) ? function(a, b) {
        var adown = 9 === a.nodeType ? a.documentElement : a;
        var bup = b && b.parentNode;
        return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
      } : function(a, b) {
        if (b) {
          for (; b = b.parentNode;) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      }, p = b ? function(a, b) {
        if (a === b) {
          return n = true, 0;
        }
        /** @type {number} */
        var idx = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return idx ? idx : (idx = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & idx || !support.sortDetached && b.compareDocumentPosition(a) === idx ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & idx ? -1 : 1);
      } : function(a, b) {
        if (a === b) {
          return n = true, 0;
        }
        var cur;
        /** @type {number} */
        var i = 0;
        var aup = a.parentNode;
        var bup = b.parentNode;
        /** @type {!Array} */
        var ap = [a];
        /** @type {!Array} */
        var bp = [b];
        if (!aup || !bup) {
          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
        }
        if (aup === bup) {
          return siblingCheck(a, b);
        }
        /** @type {!HTMLElement} */
        cur = a;
        for (; cur = cur.parentNode;) {
          ap.unshift(cur);
        }
        /** @type {!HTMLElement} */
        cur = b;
        for (; cur = cur.parentNode;) {
          bp.unshift(cur);
        }
        for (; ap[i] === bp[i];) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      }, doc) : document;
    };
    /**
     * @param {!Function} expr
     * @param {!Array} set
     * @return {?}
     */
    Sizzle.matches = function(expr, set) {
      return Sizzle(expr, null, null, set);
    };
    /**
     * @param {!Element} elem
     * @param {?} expr
     * @return {?}
     */
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) {
            return ret;
          }
        } catch (e) {
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    /**
     * @param {!Object} context
     * @param {!Object} item
     * @return {?}
     */
    Sizzle.contains = function(context, item) {
      return (context.ownerDocument || context) !== document && setDocument(context), contains(context, item);
    };
    /**
     * @param {!Object} elem
     * @param {string} name
     * @return {?}
     */
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()];
      var val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
      return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    /**
     * @param {(!Function|string)} obj
     * @return {?}
     */
    Sizzle.error = function(obj) {
      throw new Error("Syntax error, unrecognized expression: " + obj);
    };
    /**
     * @param {!Array} results
     * @return {?}
     */
    Sizzle.uniqueSort = function(results) {
      var elem;
      /** @type {!Array} */
      var dups = [];
      /** @type {number} */
      var k = 0;
      /** @type {number} */
      var i = 0;
      if (n = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(p), n) {
        for (; elem = results[i++];) {
          if (elem === results[i]) {
            /** @type {number} */
            k = dups.push(i);
          }
        }
        for (; k--;) {
          results.splice(dups[k], 1);
        }
      }
      return sortInput = null, results;
    };
    /** @type {function(!Object): ?} */
    isElement = Sizzle.getText = function(obj) {
      var item;
      /** @type {string} */
      var ret = "";
      /** @type {number} */
      var objCursor = 0;
      var type = obj.nodeType;
      if (type) {
        if (1 === type || 9 === type || 11 === type) {
          if ("string" == typeof obj.textContent) {
            return obj.textContent;
          }
          obj = obj.firstChild;
          for (; obj; obj = obj.nextSibling) {
            ret = ret + isElement(obj);
          }
        } else {
          if (3 === type || 4 === type) {
            return obj.nodeValue;
          }
        }
      } else {
        for (; item = obj[objCursor++];) {
          ret = ret + isElement(item);
        }
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength : 50,
      createPseudo : markFunction,
      match : matchExpr,
      attrHandle : {},
      find : {},
      relative : {
        ">" : {
          dir : "parentNode",
          first : true
        },
        " " : {
          dir : "parentNode"
        },
        "+" : {
          dir : "previousSibling",
          first : true
        },
        "~" : {
          dir : "previousSibling"
        }
      },
      preFilter : {
        ATTR : function(result) {
          return result[1] = result[1].replace(value, data), result[3] = (result[4] || result[5] || "").replace(value, data), "~=" === result[2] && (result[3] = " " + result[3] + " "), result.slice(0, 4);
        },
        CHILD : function(match) {
          return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match;
        },
        PSEUDO : function(match) {
          var excess;
          var unquoted = !match[5] && match[2];
          return matchExpr.CHILD.test(match[0]) ? null : (match[3] && void 0 !== match[4] ? match[2] = match[4] : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
        }
      },
      filter : {
        TAG : function(context) {
          var nodeName = context.replace(value, data).toLowerCase();
          return "*" === context ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        CLASS : function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + _$rw$ + ")" + className + "(" + _$rw$ + "|$)")) && classCache(className, function(a) {
            return pattern.test("string" == typeof a.className && a.className || typeof a.getAttribute !== strundefined && a.getAttribute("class") || "");
          });
        },
        ATTR : function(name, string, value) {
          return function(elem) {
            var key = Sizzle.attr(elem, name);
            return null == key ? "!=" === string : string ? (key = key + "", "=" === string ? key === value : "!=" === string ? key !== value : "^=" === string ? value && 0 === key.indexOf(value) : "*=" === string ? value && key.indexOf(value) > -1 : "$=" === string ? value && key.slice(-value.length) === value : "~=" === string ? (" " + key + " ").indexOf(value) > -1 : "|=" === string ? key === value || key.slice(0, value.length + 1) === value + "-" : false) : true;
          };
        },
        CHILD : function(type, what, argument, first, last) {
          /** @type {boolean} */
          var simple = "nth" !== type.slice(0, 3);
          /** @type {boolean} */
          var forward = "last" !== type.slice(-4);
          /** @type {boolean} */
          var ofType = "of-type" === what;
          return 1 === first && 0 === last ? function(tplDiv) {
            return !!tplDiv.parentNode;
          } : function(elem, canCreateDiscussions, xml) {
            var cache;
            var outerCache;
            var node;
            var diff;
            var nodeIndex;
            var start;
            /** @type {string} */
            var dir = simple !== forward ? "nextSibling" : "previousSibling";
            var parent = elem.parentNode;
            var name = ofType && elem.nodeName.toLowerCase();
            /** @type {boolean} */
            var useCache = !xml && !ofType;
            if (parent) {
              if (simple) {
                for (; dir;) {
                  /** @type {!Object} */
                  node = elem;
                  for (; node = node[dir];) {
                    if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) {
                      return false;
                    }
                  }
                  /** @type {(boolean|string)} */
                  start = dir = "only" === type && !start && "nextSibling";
                }
                return true;
              }
              if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                for (; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();) {
                  if (1 === node.nodeType && ++diff && node === elem) {
                    /** @type {!Array} */
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                  diff = cache[1];
                } else {
                  for (; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) && ++diff && (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node === elem)) {
                      break;
                    }
                  }
                }
              }
              return diff = diff - last, diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        PSEUDO : function(pseudo, argument) {
          var args;
          var fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(that, result) {
            var name;
            var matched = fn(that, argument);
            var i = matched.length;
            for (; i--;) {
              /** @type {number} */
              name = indexOf.call(that, matched[i]);
              /** @type {boolean} */
              that[name] = !(result[name] = matched[i]);
            }
          }) : function(responce) {
            return fn(responce, 0, args);
          }) : fn;
        }
      },
      pseudos : {
        not : markFunction(function(selector) {
          /** @type {!Array} */
          var a = [];
          /** @type {!Array} */
          var results = [];
          var matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(a, _table, canCreateDiscussions, context) {
            var v;
            var actual = matcher(a, null, context, []);
            var i = a.length;
            for (; i--;) {
              if (v = actual[i]) {
                /** @type {boolean} */
                a[i] = !(_table[i] = v);
              }
            }
          }) : function(sNewObjName, canCreateDiscussions, context) {
            return a[0] = sNewObjName, matcher(a, null, context, results), !results.pop();
          };
        }),
        has : markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        contains : markFunction(function(propScope) {
          return function(elem) {
            return (elem.textContent || elem.innerText || isElement(elem)).indexOf(propScope) > -1;
          };
        }),
        lang : markFunction(function(lang) {
          return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(value, data).toLowerCase(), function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-");
              }
            } while ((elem = elem.parentNode) && 1 === elem.nodeType);
            return false;
          };
        }),
        target : function(elem) {
          var charListNotLatin = window.location && window.location.hash;
          return charListNotLatin && charListNotLatin.slice(1) === elem.id;
        },
        root : function(elem) {
          return elem === docElem;
        },
        focus : function(target) {
          return target === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(target.type || target.href || ~target.tabIndex);
        },
        enabled : function(elem) {
          return elem.disabled === false;
        },
        disabled : function(elem) {
          return elem.disabled === true;
        },
        checked : function(elem) {
          var custom = elem.nodeName.toLowerCase();
          return "input" === custom && !!elem.checked || "option" === custom && !!elem.selected;
        },
        selected : function(elem) {
          return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === true;
        },
        empty : function(elem) {
          elem = elem.firstChild;
          for (; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        parent : function(type) {
          return !Expr.pseudos.empty(type);
        },
        header : function(elem) {
          return rnoType.test(elem.nodeName);
        },
        input : function(target) {
          return inputNodeNames.test(target.nodeName);
        },
        button : function(elem) {
          var left = elem.nodeName.toLowerCase();
          return "input" === left && "button" === elem.type || "button" === left;
        },
        text : function(a) {
          var EXT;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (EXT = a.getAttribute("type")) || "text" === EXT.toLowerCase());
        },
        first : createPositionalPseudo(function() {
          return [0];
        }),
        last : createPositionalPseudo(function(a, b) {
          return [b - 1];
        }),
        eq : createPositionalPseudo(function(a, dt, max) {
          return [0 > max ? max + dt : max];
        }),
        even : createPositionalPseudo(function(timelineCanvas, b) {
          /** @type {number} */
          var g = 0;
          for (; b > g; g = g + 2) {
            timelineCanvas.push(g);
          }
          return timelineCanvas;
        }),
        odd : createPositionalPseudo(function(timelineCanvas, b) {
          /** @type {number} */
          var g = 1;
          for (; b > g; g = g + 2) {
            timelineCanvas.push(g);
          }
          return timelineCanvas;
        }),
        lt : createPositionalPseudo(function(newNodeLists, dt, max) {
          var itemNodeList = 0 > max ? max + dt : max;
          for (; --itemNodeList >= 0;) {
            newNodeLists.push(itemNodeList);
          }
          return newNodeLists;
        }),
        gt : createPositionalPseudo(function(newNodeLists, dt, max) {
          var itemNodeList = 0 > max ? max + dt : max;
          for (; ++itemNodeList < dt;) {
            newNodeLists.push(itemNodeList);
          }
          return newNodeLists;
        })
      }
    };
    Expr.pseudos.nth = Expr.pseudos.eq;
    for (i in{
      radio : true,
      checkbox : true,
      file : true,
      password : true,
      image : true
    }) {
      Expr.pseudos[i] = jQuerify(i);
    }
    for (i in{
      submit : true,
      reset : true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters;
    /** @type {function((Array|string), !Array): ?} */
    compile = Sizzle.compile = function(selector, group) {
      var i;
      /** @type {!Array} */
      var setMatchers = [];
      /** @type {!Array} */
      var elementMatchers = [];
      var cached = compilerCache[selector + " "];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        for (; i--;) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
      }
      return cached;
    };
    return support.sortStable = expando.split("").sort(p).join("") === expando, support.detectDuplicates = !!n, setDocument(), support.sortDetached = assert(function(div1) {
      return 1 & div1.compareDocumentPosition(document.createElement("div"));
    }), assert(function(aItem) {
      return aItem.innerHTML = "<a href='#'></a>", "#" === aItem.firstChild.getAttribute("href");
    }) || addHandle("type|href|height|width", function(a, b, asymmetrical) {
      return asymmetrical ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
    }), support.attributes && assert(function(aItem) {
      return aItem.innerHTML = "<input/>", aItem.firstChild.setAttribute("value", ""), "" === aItem.firstChild.getAttribute("value");
    }) || addHandle("value", function(object, b, directory) {
      return directory || "input" !== object.nodeName.toLowerCase() ? void 0 : object.defaultValue;
    }), assert(function(a) {
      return null == a.getAttribute("disabled");
    }) || addHandle(booleans, function(elem, name, canCreateDiscussions) {
      var val;
      return canCreateDiscussions ? void 0 : elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    }), Sizzle;
  }(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var rneedsContext = jQuery.expr.match.needsContext;
  /** @type {!RegExp} */
  var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
  /** @type {!RegExp} */
  var contribRegex = /^.[^:#\[\.,]*$/;
  /**
   * @param {(!Function|string)} obj
   * @param {!Object} data
   * @param {boolean} id
   * @return {?}
   */
  jQuery.filter = function(obj, data, id) {
    var elem = data[0];
    return id && (obj = ":not(" + obj + ")"), 1 === data.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, obj) ? [elem] : [] : jQuery.find.matches(obj, jQuery.grep(data, function(nodeToInspect) {
      return 1 === nodeToInspect.nodeType;
    }));
  };
  jQuery.fn.extend({
    find : function(selector) {
      var i;
      /** @type {!Array} */
      var ret = [];
      var self = this;
      var len = self.length;
      if ("string" != typeof selector) {
        return this.pushStack(jQuery(selector).filter(function() {
          /** @type {number} */
          i = 0;
          for (; len > i; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      /** @type {number} */
      i = 0;
      for (; len > i; i++) {
        jQuery.find(selector, self[i], ret);
      }
      return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret;
    },
    filter : function(obj) {
      return this.pushStack(winnow(this, obj || [], false));
    },
    not : function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is : function(selector) {
      return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery;
  var document = window.document;
  /** @type {!RegExp} */
  var customSelectorReg = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  /** @type {function(string, !Object): ?} */
  var init = jQuery.fn.init = function(selector, context) {
    var match;
    var elem;
    if (!selector) {
      return this;
    }
    if ("string" == typeof selector) {
      if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null, selector, null] : customSelectorReg.exec(selector), !match || !match[1] && context) {
        return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
      }
      if (match[1]) {
        if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
          for (match in context) {
            if (jQuery.isFunction(this[match])) {
              this[match](context[match]);
            } else {
              this.attr(match, context[match]);
            }
          }
        }
        return this;
      }
      if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
        if (elem.id !== match[2]) {
          return rootjQuery.find(selector);
        }
        /** @type {number} */
        this.length = 1;
        this[0] = elem;
      }
      return this.context = document, this.selector = selector, this;
    }
    return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this));
  };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  /** @type {!RegExp} */
  var testRxp = /^(?:parents|prev(?:Until|All))/;
  var guaranteedUnique = {
    children : true,
    contents : true,
    next : true,
    prev : true
  };
  jQuery.extend({
    dir : function(elem, dir, item) {
      /** @type {!Array} */
      var matched = [];
      var cur = elem[dir];
      for (; cur && 9 !== cur.nodeType && (void 0 === item || 1 !== cur.nodeType || !jQuery(cur).is(item));) {
        if (1 === cur.nodeType) {
          matched.push(cur);
        }
        cur = cur[dir];
      }
      return matched;
    },
    sibling : function(n, elem) {
      /** @type {!Array} */
      var r = [];
      for (; n; n = n.nextSibling) {
        if (1 === n.nodeType && n !== elem) {
          r.push(n);
        }
      }
      return r;
    }
  });
  jQuery.fn.extend({
    has : function(select) {
      var i;
      var obj = jQuery(select, this);
      var length = obj.length;
      return this.filter(function() {
        /** @type {number} */
        i = 0;
        for (; length > i; i++) {
          if (jQuery.contains(this, obj[i])) {
            return true;
          }
        }
      });
    },
    closest : function(selector, context) {
      var node;
      /** @type {number} */
      var offset = 0;
      var count = this.length;
      /** @type {!Array} */
      var ret = [];
      var g = rneedsContext.test(selector) || "string" != typeof selector ? jQuery(selector, context || this.context) : 0;
      for (; count > offset; offset++) {
        node = this[offset];
        for (; node && node !== context; node = node.parentNode) {
          if (node.nodeType < 11 && (g ? g.index(node) > -1 : 1 === node.nodeType && jQuery.find.matchesSelector(node, selector))) {
            ret.push(node);
            break;
          }
        }
      }
      return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
    },
    index : function(elem) {
      return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add : function(selector, context) {
      return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack : function(selector) {
      return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  jQuery.each({
    parent : function(p) {
      var level = p.parentNode;
      return level && 11 !== level.nodeType ? level : null;
    },
    parents : function(elem) {
      return jQuery.dir(elem, "parentNode");
    },
    parentsUntil : function(target, i, elem) {
      return jQuery.dir(target, "parentNode", elem);
    },
    next : function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev : function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll : function(elem) {
      return jQuery.dir(elem, "nextSibling");
    },
    prevAll : function(elem) {
      return jQuery.dir(elem, "previousSibling");
    },
    nextUntil : function(elem, selector, context) {
      return jQuery.dir(elem, "nextSibling", context);
    },
    prevUntil : function(elem, i, start) {
      return jQuery.dir(elem, "previousSibling", start);
    },
    siblings : function(elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children : function(elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents : function(elem) {
      return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
    }
  }, function(name, b) {
    /**
     * @param {?} callback
     * @param {?} fn
     * @return {?}
     */
    jQuery.fn[name] = function(callback, fn) {
      var ret = jQuery.map(this, b, callback);
      return "Until" !== name.slice(-5) && (fn = callback), fn && "string" == typeof fn && (ret = jQuery.filter(fn, ret)), this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), testRxp.test(name) && (ret = ret.reverse())), this.pushStack(ret);
    };
  });
  /** @type {!RegExp} */
  var rnotwhite = /\S+/g;
  var optionsCache = {};
  /**
   * @param {!Object} options
   * @return {?}
   */
  jQuery.Callbacks = function(options) {
    options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var serializer;
    var memory;
    var process;
    var n;
    var i;
    var validationVM;
    /** @type {!Array} */
    var val = [];
    /** @type {(Array|boolean)} */
    var list = !options.once && [];
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    var fire = function(data) {
      memory = options.memory && data;
      /** @type {boolean} */
      process = true;
      i = validationVM || 0;
      /** @type {number} */
      validationVM = 0;
      n = val.length;
      /** @type {boolean} */
      serializer = true;
      for (; val && n > i; i++) {
        if (val[i].apply(data[0], data[1]) === false && options.stopOnFalse) {
          /** @type {boolean} */
          memory = false;
          break;
        }
      }
      /** @type {boolean} */
      serializer = false;
      if (val) {
        if (list) {
          if (list.length) {
            fire(list.shift());
          }
        } else {
          if (memory) {
            /** @type {!Array} */
            val = [];
          } else {
            self.disable();
          }
        }
      }
    };
    var self = {
      add : function() {
        if (val) {
          var v = val.length;
          !function add(values) {
            jQuery.each(values, function(b, element) {
              var id = jQuery.type(element);
              if ("function" === id) {
                if (!(options.unique && self.has(element))) {
                  val.push(element);
                }
              } else {
                if (element && element.length && "string" !== id) {
                  add(element);
                }
              }
            });
          }(arguments);
          if (serializer) {
            n = val.length;
          } else {
            if (memory) {
              validationVM = v;
              fire(memory);
            }
          }
        }
        return this;
      },
      remove : function() {
        return val && jQuery.each(arguments, function(a, c) {
          var index;
          for (; (index = jQuery.inArray(c, val, index)) > -1;) {
            val.splice(index, 1);
            if (serializer) {
              if (n >= index) {
                n--;
              }
              if (i >= index) {
                i--;
              }
            }
          }
        }), this;
      },
      has : function(className) {
        return className ? jQuery.inArray(className, val) > -1 : !(!val || !val.length);
      },
      empty : function() {
        return val = [], n = 0, this;
      },
      disable : function() {
        return val = list = memory = void 0, this;
      },
      disabled : function() {
        return !val;
      },
      lock : function() {
        return list = void 0, memory || self.disable(), this;
      },
      locked : function() {
        return !list;
      },
      fireWith : function(context, args) {
        return !val || process && !list || (args = args || [], args = [context, args.slice ? args.slice() : args], serializer ? list.push(args) : fire(args)), this;
      },
      fire : function() {
        return self.fireWith(this, arguments), this;
      },
      fired : function() {
        return !!process;
      }
    };
    return self;
  };
  jQuery.extend({
    Deferred : function(func) {
      /** @type {!Array} */
      var d = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]];
      /** @type {string} */
      var state = "pending";
      var promise = {
        state : function() {
          return state;
        },
        always : function() {
          return deferred.done(arguments).fail(arguments), this;
        },
        then : function() {
          /** @type {!Arguments} */
          var args = arguments;
          return jQuery.Deferred(function(newDefer) {
            jQuery.each(d, function(match, tuple) {
              var fn = jQuery.isFunction(args[match]) && args[match];
              deferred[tuple[1]](function() {
                var returned = fn && fn.apply(this, arguments);
                if (returned && jQuery.isFunction(returned.promise)) {
                  returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                } else {
                  newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                }
              });
            });
            /** @type {null} */
            args = null;
          }).promise();
        },
        promise : function(context) {
          return null != context ? jQuery.extend(context, promise) : promise;
        }
      };
      var deferred = {};
      return promise.pipe = promise.then, jQuery.each(d, function(x2, tuple) {
        var list = tuple[2];
        var stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, d[1 ^ x2][2].disable, d[2][2].lock);
        }
        /**
         * @return {?}
         */
        deferred[tuple[0]] = function() {
          return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
    },
    when : function(subordinate) {
      /** @type {number} */
      var i = 0;
      /** @type {!Array<?>} */
      var resolveValues = slice.call(arguments);
      /** @type {number} */
      var length = resolveValues.length;
      /** @type {number} */
      var index = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0;
      var deferred = 1 === index ? subordinate : jQuery.Deferred();
      /**
       * @param {number} i
       * @param {number} ctx
       * @param {number} val
       * @return {?}
       */
      var updateFn = function(i, ctx, val) {
        return function(value) {
          ctx[i] = this;
          val[i] = arguments.length > 1 ? slice.call(arguments) : value;
          if (val === progressValues) {
            deferred.notifyWith(ctx, val);
          } else {
            if (!--index) {
              deferred.resolveWith(ctx, val);
            }
          }
        };
      };
      var progressValues;
      var progressContexts;
      var resolveContexts;
      if (length > 1) {
        /** @type {!Array} */
        progressValues = new Array(length);
        /** @type {!Array} */
        progressContexts = new Array(length);
        /** @type {!Array} */
        resolveContexts = new Array(length);
        for (; length > i; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFn(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFn(i, progressContexts, progressValues));
          } else {
            --index;
          }
        }
      }
      return index || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
    }
  });
  var readyList;
  /**
   * @param {?} fn
   * @return {?}
   */
  jQuery.fn.ready = function(fn) {
    return jQuery.ready.promise().done(fn), this;
  };
  jQuery.extend({
    isReady : false,
    readyWait : 1,
    holdReady : function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready : function(user) {
      if (user === true ? !--jQuery.readyWait : !jQuery.isReady) {
        if (!document.body) {
          return setTimeout(jQuery.ready);
        }
        /** @type {boolean} */
        jQuery.isReady = true;
        if (!(user !== true && --jQuery.readyWait > 0)) {
          readyList.resolveWith(document, [jQuery]);
          if (jQuery.fn.trigger) {
            jQuery(document).trigger("ready").off("ready");
          }
        }
      }
    }
  });
  /**
   * @param {number} obj
   * @return {?}
   */
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      if (readyList = jQuery.Deferred(), "complete" === document.readyState) {
        setTimeout(jQuery.ready);
      } else {
        if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", contentLoaded, false);
          window.addEventListener("load", contentLoaded, false);
        } else {
          document.attachEvent("onreadystatechange", contentLoaded);
          window.attachEvent("onload", contentLoaded);
          /** @type {boolean} */
          var docElement = false;
          try {
            docElement = null == window.frameElement && document.documentElement;
          } catch (d) {
          }
          if (docElement && docElement.doScroll) {
            !function doScrollCheck() {
              if (!jQuery.isReady) {
                try {
                  docElement.doScroll("left");
                } catch (a) {
                  return setTimeout(doScrollCheck, 50);
                }
                detach();
                jQuery.ready();
              }
            }();
          }
        }
      }
    }
    return readyList.promise(obj);
  };
  /** @type {string} */
  var undefined = "undefined";
  var i;
  for (i in jQuery(support)) {
    break;
  }
  /** @type {boolean} */
  support.ownLast = "0" !== i;
  /** @type {boolean} */
  support.inlineBlockNeedsLayout = false;
  jQuery(function() {
    var div;
    var container;
    var ui = document.getElementsByTagName("body")[0];
    if (ui) {
      div = document.createElement("div");
      /** @type {string} */
      div.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
      container = document.createElement("div");
      ui.appendChild(div).appendChild(container);
      if (typeof container.style.zoom !== undefined) {
        /** @type {string} */
        container.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";
        if (support.inlineBlockNeedsLayout = 3 === container.offsetWidth) {
          /** @type {number} */
          ui.style.zoom = 1;
        }
      }
      ui.removeChild(div);
      /** @type {null} */
      div = container = null;
    }
  });
  (function() {
    var a = document.createElement("div");
    if (null == support.deleteExpando) {
      /** @type {boolean} */
      support.deleteExpando = true;
      try {
        delete a.test;
      } catch (b) {
        /** @type {boolean} */
        support.deleteExpando = false;
      }
    }
    /** @type {null} */
    a = null;
  })();
  /**
   * @param {!Object} elem
   * @return {?}
   */
  jQuery.acceptData = function(elem) {
    var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()];
    /** @type {number} */
    var undefinedType = +elem.nodeType || 1;
    return 1 !== undefinedType && 9 !== undefinedType ? false : !noData || noData !== true && elem.getAttribute("classid") === noData;
  };
  /** @type {!RegExp} */
  var JSON_START = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
  /** @type {!RegExp} */
  var regAttr = /([A-Z])/g;
  jQuery.extend({
    cache : {},
    noData : {
      "applet " : true,
      "embed " : true,
      "object " : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData : function(elem) {
      return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], !!elem && !isEmptyDataObject(elem);
    },
    data : function(obj, name, data) {
      return internalData(obj, name, data);
    },
    removeData : function(elem, name) {
      return internalRemoveData(elem, name);
    },
    _data : function(elem, name, data) {
      return internalData(elem, name, data, true);
    },
    _removeData : function(elem, name) {
      return internalRemoveData(elem, name, true);
    }
  });
  jQuery.fn.extend({
    data : function(key, params) {
      var i;
      var name;
      var data;
      var elem = this[0];
      var attrs = elem && elem.attributes;
      if (void 0 === key) {
        if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
          i = attrs.length;
          for (; i--;) {
            name = attrs[i].name;
            if (0 === name.indexOf("data-")) {
              name = jQuery.camelCase(name.slice(5));
              dataAttr(elem, name, data[name]);
            }
          }
          jQuery._data(elem, "parsedAttrs", true);
        }
        return data;
      }
      return "object" == typeof key ? this.each(function() {
        jQuery.data(this, key);
      }) : arguments.length > 1 ? this.each(function() {
        jQuery.data(this, key, params);
      }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : void 0;
    },
    removeData : function(key) {
      return this.each(function() {
        jQuery.removeData(this, key);
      });
    }
  });
  jQuery.extend({
    queue : function(elem, type, data) {
      var q;
      return elem ? (type = (type || "fx") + "queue", q = jQuery._data(elem, type), data && (!q || jQuery.isArray(data) ? q = jQuery._data(elem, type, jQuery.makeArray(data)) : q.push(data)), q || []) : void 0;
    },
    dequeue : function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type);
      var i = queue.length;
      var e = queue.shift();
      var context = jQuery._queueHooks(elem, type);
      /**
       * @return {undefined}
       */
      var fn = function() {
        jQuery.dequeue(elem, type);
      };
      if ("inprogress" === e) {
        e = queue.shift();
        i--;
      }
      if (e) {
        if ("fx" === type) {
          queue.unshift("inprogress");
        }
        delete context.stop;
        e.call(elem, fn, context);
      }
      if (!i && context) {
        context.empty.fire();
      }
    },
    _queueHooks : function(elem, type) {
      /** @type {string} */
      var key = type + "queueHooks";
      return jQuery._data(elem, key) || jQuery._data(elem, key, {
        empty : jQuery.Callbacks("once memory").add(function() {
          jQuery._removeData(elem, type + "queue");
          jQuery._removeData(elem, key);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue : function(type, data) {
      /** @type {number} */
      var setter = 2;
      return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if ("fx" === type && "inprogress" !== queue[0]) {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue : function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue : function(type) {
      return this.queue(type || "fx", []);
    },
    promise : function(type, result) {
      var tmp;
      /** @type {number} */
      var d = 1;
      var deferred = jQuery.Deferred();
      var self = this;
      var i = this.length;
      /**
       * @return {undefined}
       */
      var resolve = function() {
        if (!--d) {
          deferred.resolveWith(self, [self]);
        }
      };
      if ("string" != typeof type) {
        /** @type {number} */
        result = type;
        type = void 0;
      }
      type = type || "fx";
      for (; i--;) {
        tmp = jQuery._data(self[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          d++;
          tmp.empty.add(resolve);
        }
      }
      return resolve(), deferred.promise(result);
    }
  });
  /** @type {string} */
  var FSSource = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  /** @type {!Array} */
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  /**
   * @param {!Object} element
   * @param {!Object} component
   * @return {?}
   */
  var test = function(element, component) {
    return element = component || element, "none" === jQuery.css(element, "display") || !jQuery.contains(element.ownerDocument, element);
  };
  /** @type {function(string, !Function, ?, ?, number, string, boolean): ?} */
  var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    /** @type {number} */
    var i = 0;
    var len = elems.length;
    /** @type {boolean} */
    var bulk = null == key;
    if ("object" === jQuery.type(key)) {
      /** @type {boolean} */
      chainable = true;
      for (i in key) {
        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else {
      if (void 0 !== value && (chainable = true, jQuery.isFunction(value) || (raw = true), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, fn, value) {
        return bulk.call(jQuery(elem), value);
      })), fn)) {
        for (; len > i; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  /** @type {!RegExp} */
  var reg = /^(?:checkbox|radio)$/i;
  
  /*****------FORM JAVASCRIPT-------********* */
  !function() {
    var fragment = document.createDocumentFragment();
    var div = document.createElement("div");
    var input = document.createElement("input");
    if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a>", support.leadingWhitespace = 3 === div.firstChild.nodeType, support.tbody = !div.getElementsByTagName("tbody").length, support.htmlSerialize = !!div.getElementsByTagName("link").length, support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(true).outerHTML, input.type = "checkbox", input.checked = true, fragment.appendChild(input), support.appendChecked = input.checked, 
    div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue, fragment.appendChild(div), div.innerHTML = "<input type='radio' checked='checked' name='t'/>", support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked, support.noCloneEvent = true, div.attachEvent && (div.attachEvent("onclick", function() {
      /** @type {boolean} */
      support.noCloneEvent = false;
    }), div.cloneNode(true).click()), null == support.deleteExpando) {
      /** @type {boolean} */
      support.deleteExpando = true;
      try {
        delete div.test;
      } catch (d) {
        /** @type {boolean} */
        support.deleteExpando = false;
      }
    }
    /** @type {null} */
    fragment = div = input = null;
  }();
  (function() {
    var i;
    var eventName;
    var b = document.createElement("div");
    for (i in{
      submit : true,
      change : true,
      focusin : true
    }) {
      /** @type {string} */
      eventName = "on" + i;
      if (!(support[i + "Bubbles"] = eventName in window)) {
        b.setAttribute(eventName, "t");
        /** @type {boolean} */
        support[i + "Bubbles"] = b.attributes[eventName].expando === false;
      }
    }
    /** @type {null} */
    b = null;
  })();
  /** @type {!RegExp} */
  var rformElems = /^(?:input|select|textarea)$/i;
  /** @type {!RegExp} */
  var SIG_PATTERN = /^key/;
  /** @type {!RegExp} */
  var RE_TEXT_INPUTS = /^(?:mouse|contextmenu)|click/;
  /** @type {!RegExp} */
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  /** @type {!RegExp} */
  var rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  jQuery.event = {
    global : {},
    add : function(elem, types, handler, data, selector) {
      var tmp;
      var events;
      var t;
      var handleObjIn;
      var special;
      var eventHandle;
      var handleObj;
      var handlers;
      var type;
      var p;
      var origType;
      var elemData = jQuery._data(elem);
      if (elemData) {
        if (handler.handler) {
          /** @type {!Object} */
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        if (!handler.guid) {
          /** @type {number} */
          handler.guid = jQuery.guid++;
        }
        if (!(events = elemData.events)) {
          events = elemData.events = {};
        }
        if (!(eventHandle = elemData.handle)) {
          /** @type {function(string): ?} */
          eventHandle = elemData.handle = function(tag) {
            return typeof jQuery === undefined || tag && jQuery.event.triggered === tag.type ? void 0 : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
          };
          /** @type {!Object} */
          eventHandle.elem = elem;
        }
        types = (types || "").match(rnotwhite) || [""];
        t = types.length;
        for (; t--;) {
          /** @type {!Array} */
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          p = (tmp[2] || "").split(".").sort();
          if (type) {
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            special = jQuery.event.special[type] || {};
            handleObj = jQuery.extend({
              type : type,
              origType : origType,
              data : data,
              handler : handler,
              guid : handler.guid,
              selector : selector,
              needsContext : selector && jQuery.expr.match.needsContext.test(selector),
              namespace : p.join(".")
            }, handleObjIn);
            if (!(handlers = events[type])) {
              /** @type {!Array} */
              handlers = events[type] = [];
              /** @type {number} */
              handlers.delegateCount = 0;
              if (!(special.setup && special.setup.call(elem, data, p, eventHandle) !== false)) {
                if (elem.addEventListener) {
                  elem.addEventListener(type, eventHandle, false);
                } else {
                  if (elem.attachEvent) {
                    elem.attachEvent("on" + type, eventHandle);
                  }
                }
              }
            }
            if (special.add) {
              special.add.call(elem, handleObj);
              if (!handleObj.handler.guid) {
                handleObj.handler.guid = handler.guid;
              }
            }
            if (selector) {
              handlers.splice(handlers.delegateCount++, 0, handleObj);
            } else {
              handlers.push(handleObj);
            }
            /** @type {boolean} */
            jQuery.event.global[type] = true;
          }
        }
        /** @type {null} */
        elem = null;
      }
    },
    remove : function(elem, types, handler, selector, mappedTypes) {
      var j;
      var handleObj;
      var tmp;
      var origCount;
      var t;
      var events;
      var special;
      var handlers;
      var type;
      var p;
      var origType;
      var elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (elemData && (events = elemData.events)) {
        types = (types || "").match(rnotwhite) || [""];
        t = types.length;
        for (; t--;) {
          if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], p = (tmp[2] || "").split(".").sort(), type) {
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)");
            origCount = j = handlers.length;
            for (; j--;) {
              handleObj = handlers[j];
              if (!(!mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector))) {
                handlers.splice(j, 1);
                if (handleObj.selector) {
                  handlers.delegateCount--;
                }
                if (special.remove) {
                  special.remove.call(elem, handleObj);
                }
              }
            }
            if (origCount && !handlers.length) {
              if (!(special.teardown && special.teardown.call(elem, p, elemData.handle) !== false)) {
                jQuery.removeEvent(elem, type, elemData.handle);
              }
              delete events[type];
            }
          } else {
            for (type in events) {
              jQuery.event.remove(elem, type + types[t], handler, selector, true);
            }
          }
        }
        if (jQuery.isEmptyObject(events)) {
          delete elemData.handle;
          jQuery._removeData(elem, "events");
        }
      }
    },
    trigger : function(event, value, elem, onlyHandlers) {
      var handle;
      var ontype;
      var cur;
      var bubbleType;
      var special;
      var tmp;
      var i;
      /** @type {!Array} */
      var eventPath = [elem || document];
      var type = hasOwn.call(event, "type") ? event.type : event;
      var q = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (q = type.split("."), type = q.shift(), q.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = q.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + 
      q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), value = null == value ? [event] : jQuery.makeArray(value, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, value) !== false)) {
        if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          if (tmp === (elem.ownerDocument || document)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
          }
        }
        /** @type {number} */
        i = 0;
        for (; (cur = eventPath[i++]) && !event.isPropagationStopped();) {
          event.type = i > 1 ? bubbleType : special.bindType || type;
          handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
          if (handle) {
            handle.apply(cur, value);
          }
          handle = ontype && cur[ontype];
          if (handle && handle.apply && jQuery.acceptData(cur)) {
            event.result = handle.apply(cur, value);
            if (event.result === false) {
              event.preventDefault();
            }
          }
        }
        if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), value) === false) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
          tmp = elem[ontype];
          if (tmp) {
            /** @type {null} */
            elem[ontype] = null;
          }
          jQuery.event.triggered = type;
          try {
            elem[type]();
          } catch (r) {
          }
          jQuery.event.triggered = void 0;
          if (tmp) {
            elem[ontype] = tmp;
          }
        }
        return event.result;
      }
    },
    dispatch : function(event) {
      event = jQuery.event.fix(event);
      var i;
      var context;
      var handleObj;
      var matched;
      var j;
      /** @type {!Array} */
      var handlerQueue = [];
      /** @type {!Array<?>} */
      var properties = slice.call(arguments);
      var handlers = (jQuery._data(this, "events") || {})[event.type] || [];
      var special = jQuery.event.special[event.type] || {};
      if (properties[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== false) {
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);
        /** @type {number} */
        i = 0;
        for (; (matched = handlerQueue[i++]) && !event.isPropagationStopped();) {
          event.currentTarget = matched.elem;
          /** @type {number} */
          j = 0;
          for (; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) {
            if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              context = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, properties);
              if (void 0 !== context && (event.result = context) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
        return special.postDispatch && special.postDispatch.call(this, event), event.result;
      }
    },
    handlers : function(event, handlers) {
      var selector;
      var handleObj;
      var matches;
      var j;
      /** @type {!Array} */
      var handlerQueue = [];
      var delegateCount = handlers.delegateCount;
      var cur = event.target;
      if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) {
        for (; cur != this; cur = cur.parentNode || this) {
          if (1 === cur.nodeType && (cur.disabled !== true || "click" !== event.type)) {
            /** @type {!Array} */
            matches = [];
            /** @type {number} */
            j = 0;
            for (; delegateCount > j; j++) {
              handleObj = handlers[j];
              /** @type {string} */
              selector = handleObj.selector + " ";
              if (void 0 === matches[selector]) {
                matches[selector] = handleObj.needsContext ? jQuery(selector, this).index(cur) >= 0 : jQuery.find(selector, this, null, [cur]).length;
              }
              if (matches[selector]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem : cur,
                handlers : matches
              });
            }
          }
        }
      }
      return delegateCount < handlers.length && handlerQueue.push({
        elem : this,
        handlers : handlers.slice(delegateCount)
      }), handlerQueue;
    },
    fix : function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i;
      var prop;
      var copy;
      var type = event.type;
      /** @type {string} */
      var originalEvent = event;
      var fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = RE_TEXT_INPUTS.test(type) ? this.mouseHooks : SIG_PATTERN.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      for (; i--;) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    props : "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks : {},
    keyHooks : {
      props : "char charCode key keyCode".split(" "),
      filter : function(event, params) {
        return null == event.which && (event.which = null != params.charCode ? params.charCode : params.keyCode), event;
      }
    },
    mouseHooks : {
      props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter : function(event, e) {
        var body;
        var eventDoc;
        var doc;
        var button = e.button;
        var fromElement = e.fromElement;
        return null == event.pageX && null != e.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = e.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), !event.relatedTarget && fromElement && (event.relatedTarget = 
        fromElement === event.target ? e.toElement : fromElement), event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event;
      }
    },
    special : {
      load : {
        noBubble : true
      },
      focus : {
        trigger : function() {
          if (this !== safeActiveElement() && this.focus) {
            try {
              return this.focus(), false;
            } catch (a) {
            }
          }
        },
        delegateType : "focusin"
      },
      blur : {
        trigger : function() {
          return this === safeActiveElement() && this.blur ? (this.blur(), false) : void 0;
        },
        delegateType : "focusout"
      },
      click : {
        trigger : function() {
          return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), false) : void 0;
        },
        _default : function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload : {
        postDispatch : function(event) {
          if (void 0 !== event.result) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    simulate : function(type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event, event, {
        type : type,
        isSimulated : true,
        originalEvent : {}
      });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  /** @type {function(!Object, !Object, ?): undefined} */
  jQuery.removeEvent = document.removeEventListener ? function(elem, type, c) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, c, false);
    }
  } : function(el, type, PFnc) {
    /** @type {string} */
    var eventName = "on" + type;
    if (el.detachEvent) {
      if (typeof el[eventName] === undefined) {
        /** @type {null} */
        el[eventName] = null;
      }
      el.detachEvent(eventName, PFnc);
    }
  };
  /**
   * @param {(Object|string)} src
   * @param {boolean} event
   * @return {?}
   */
  jQuery.Event = function(src, event) {
    return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && (src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse) : this.type = src, event && jQuery.extend(this, event), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = true)) : new jQuery.Event(src, event);
  };
  jQuery.Event.prototype = {
    isDefaultPrevented : returnFalse,
    isPropagationStopped : returnFalse,
    isImmediatePropagationStopped : returnFalse,
    preventDefault : function() {
      var e = this.originalEvent;
      /** @type {function(): ?} */
      this.isDefaultPrevented = returnTrue;
      if (e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          /** @type {boolean} */
          e.returnValue = false;
        }
      }
    },
    stopPropagation : function() {
      var e = this.originalEvent;
      /** @type {function(): ?} */
      this.isPropagationStopped = returnTrue;
      if (e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        /** @type {boolean} */
        e.cancelBubble = true;
      }
    },
    stopImmediatePropagation : function() {
      /** @type {function(): ?} */
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter : "mouseover",
    mouseleave : "mouseout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType : fix,
      bindType : fix,
      handle : function(event) {
        var _ref12;
        var elem = this;
        var related = event.relatedTarget;
        var handleObj = event.handleObj;
        return (!related || related !== elem && !jQuery.contains(elem, related)) && (event.type = handleObj.origType, _ref12 = handleObj.handler.apply(this, arguments), event.type = fix), _ref12;
      }
    };
  });
  if (!support.submitBubbles) {
    jQuery.event.special.submit = {
      setup : function() {
        return jQuery.nodeName(this, "form") ? false : void jQuery.event.add(this, "click._submit keypress._submit", function(options) {
          var elem = options.target;
          var data = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : void 0;
          if (data && !jQuery._data(data, "submitBubbles")) {
            jQuery.event.add(data, "submit._submit", function(event) {
              /** @type {boolean} */
              event._submit_bubble = true;
            });
            jQuery._data(data, "submitBubbles", true);
          }
        });
      },
      postDispatch : function(event) {
        if (event._submit_bubble) {
          delete event._submit_bubble;
          if (this.parentNode && !event.isTrigger) {
            jQuery.event.simulate("submit", this.parentNode, event, true);
          }
        }
      },
      teardown : function() {
        return jQuery.nodeName(this, "form") ? false : void jQuery.event.remove(this, "._submit");
      }
    };
  }
  if (!support.changeBubbles) {
    jQuery.event.special.change = {
      setup : function() {
        return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
          if ("checked" === event.originalEvent.propertyName) {
            /** @type {boolean} */
            this._just_changed = true;
          }
        }), jQuery.event.add(this, "click._change", function(event) {
          if (this._just_changed && !event.isTrigger) {
            /** @type {boolean} */
            this._just_changed = false;
          }
          jQuery.event.simulate("change", this, event, true);
        })), false) : void jQuery.event.add(this, "beforeactivate._change", function(options) {
          var elem = options.target;
          if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
            jQuery.event.add(elem, "change._change", function(event) {
              if (!(!this.parentNode || event.isSimulated || event.isTrigger)) {
                jQuery.event.simulate("change", this.parentNode, event, true);
              }
            });
            jQuery._data(elem, "changeBubbles", true);
          }
        });
      },
      handle : function(event) {
        var elem = event.target;
        return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0;
      },
      teardown : function() {
        return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
      }
    };
  }
  if (!support.focusinBubbles) {
    jQuery.each({
      focus : "focusin",
      blur : "focusout"
    }, function(orig, fix) {
      /**
       * @param {(Object|string)} event
       * @return {undefined}
       */
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
      };
      jQuery.event.special[fix] = {
        setup : function() {
          var doc = this.ownerDocument || this;
          var attaches = jQuery._data(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          jQuery._data(doc, fix, (attaches || 0) + 1);
        },
        teardown : function() {
          var doc = this.ownerDocument || this;
          /** @type {number} */
          var display = jQuery._data(doc, fix) - 1;
          if (display) {
            jQuery._data(doc, fix, display);
          } else {
            doc.removeEventListener(orig, handler, true);
            jQuery._removeData(doc, fix);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on : function(object, value, name, callback, one) {
      var type;
      var handler;
      if ("object" == typeof object) {
        if ("string" != typeof value) {
          name = name || value;
          value = void 0;
        }
        for (type in object) {
          this.on(type, value, name, object[type], one);
        }
        return this;
      }
      if (null == name && null == callback ? (callback = value, name = value = void 0) : null == callback && ("string" == typeof value ? (callback = name, name = void 0) : (callback = name, name = value, value = void 0)), callback === false) {
        /** @type {function(): ?} */
        callback = returnFalse;
      } else {
        if (!callback) {
          return this;
        }
      }
      return 1 === one && (handler = callback, callback = function(type) {
        return jQuery().off(type), handler.apply(this, arguments);
      }, callback.guid = handler.guid || (handler.guid = jQuery.guid++)), this.each(function() {
        jQuery.event.add(this, object, callback, name, value);
      });
    },
    one : function(name, data, id, fn) {
      return this.on(name, data, id, fn, 1);
    },
    off : function(types, callback, handler) {
      var handleObj;
      var type;
      if (types && types.preventDefault && types.handleObj) {
        return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
      }
      if ("object" == typeof types) {
        for (type in types) {
          this.off(type, callback, types[type]);
        }
        return this;
      }
      return (callback === false || "function" == typeof callback) && (handler = callback, callback = void 0), handler === false && (handler = returnFalse), this.each(function() {
        jQuery.event.remove(this, types, handler, callback);
      });
    },
    trigger : function(event, type) {
      return this.each(function() {
        jQuery.event.trigger(event, type, this);
      });
    },
    triggerHandler : function(type, callback) {
      var value = this[0];
      return value ? jQuery.event.trigger(type, callback, value, true) : void 0;
    }
  });
  /** @type {string} */
  var componentsStr = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video";
  /** @type {!RegExp} */
  var rvolatile = / jQuery\d+="(?:null|\d+)"/g;
  /** @type {!RegExp} */
  var exactRegExp = new RegExp("<(?:" + componentsStr + ")[\\s/>]", "i");
  /** @type {!RegExp} */
  var v = /^\s+/;
  /** @type {!RegExp} */
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
  /** @type {!RegExp} */
  var GoogleImageLayout = /<([\w:]+)/;
  /** @type {!RegExp} */
  var reKeyword = /<tbody/i;
  /** @type {!RegExp} */
  var re_commas = /<|&#?\w+;/;
  /** @type {!RegExp} */
  var trueRE = /<(?:script|style|link)/i;
  /** @type {!RegExp} */
  var reValidName = /checked\s*(?:[^=]|=\s*.checked.)/i;
  /** @type {!RegExp} */
  var opacityRe = /^$|\/(?:java|ecma)script/i;
  /** @type {!RegExp} */
  var rscriptTypeMasked = /^true\/(.*)/;
  /** @type {!RegExp} */
  var rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  var wrapMap = {
    option : [1, "<select multiple='multiple'>", "</select>"],
    legend : [1, "<fieldset>", "</fieldset>"],
    area : [1, "<map>", "</map>"],
    param : [1, "<object>", "</object>"],
    thead : [1, "<table>", "</table>"],
    tr : [2, "<table><tbody>", "</tbody></table>"],
    col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default : support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
  };
  var safeFragment = createSafeFragment(document);
  var fragmentDiv = safeFragment.appendChild(document.createElement("div"));
  /** @type {!Array} */
  wrapMap.optgroup = wrapMap.option;
  /** @type {!Array} */
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  /** @type {!Array} */
  wrapMap.th = wrapMap.td;
  jQuery.extend({
    clone : function(elem, v, c) {
      var destElements;
      var node;
      var clone;
      var i;
      var srcElements;
      var inPage = jQuery.contains(elem.ownerDocument, elem);
      if (support.html5Clone || jQuery.isXMLDoc(elem) || !exactRegExp.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(true) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(support.noCloneEvent && support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        /** @type {number} */
        i = 0;
        for (; null != (node = srcElements[i]); ++i) {
          if (destElements[i]) {
            fixCloneNodeIssues(node, destElements[i]);
          }
        }
      }
      if (v) {
        if (c) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          /** @type {number} */
          i = 0;
          for (; null != (node = srcElements[i]); i++) {
            cloneCopyEvent(node, destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), destElements = srcElements = node = null, clone;
    },
    buildFragment : function(elems, context, scripts, selection) {
      var j;
      var elem;
      var ret;
      var tmp;
      var tag;
      var tbody;
      var wrap;
      var length = elems.length;
      var safe = createSafeFragment(context);
      /** @type {!Array} */
      var nodes = [];
      /** @type {number} */
      var i = 0;
      for (; length > i; i++) {
        if (elem = elems[i], elem || 0 === elem) {
          if ("object" === jQuery.type(elem)) {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else {
            if (re_commas.test(elem)) {
              tmp = tmp || safe.appendChild(context.createElement("div"));
              tag = (GoogleImageLayout.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
              j = wrap[0];
              for (; j--;) {
                tmp = tmp.lastChild;
              }
              if (!support.leadingWhitespace && v.test(elem) && nodes.push(context.createTextNode(v.exec(elem)[0])), !support.tbody) {
                elem = "table" !== tag || reKeyword.test(elem) ? "<table>" !== wrap[1] || reKeyword.test(elem) ? 0 : tmp : tmp.firstChild;
                j = elem && elem.childNodes.length;
                for (; j--;) {
                  if (jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length) {
                    elem.removeChild(tbody);
                  }
                }
              }
              jQuery.merge(nodes, tmp.childNodes);
              /** @type {string} */
              tmp.textContent = "";
              for (; tmp.firstChild;) {
                tmp.removeChild(tmp.firstChild);
              }
              tmp = safe.lastChild;
            } else {
              nodes.push(context.createTextNode(elem));
            }
          }
        }
      }
      if (tmp) {
        safe.removeChild(tmp);
      }
      if (!support.appendChecked) {
        jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
      }
      /** @type {number} */
      i = 0;
      for (; elem = nodes[i++];) {
        if ((!selection || -1 === jQuery.inArray(elem, selection)) && (ret = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(safe.appendChild(elem), "script"), ret && setGlobalEval(tmp), scripts)) {
          /** @type {number} */
          j = 0;
          for (; elem = tmp[j++];) {
            if (opacityRe.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
      return tmp = null, safe;
    },
    cleanData : function(elems, type) {
      var elem;
      var type;
      var id;
      var data;
      /** @type {number} */
      var i = 0;
      var internalKey = jQuery.expando;
      var cache = jQuery.cache;
      /** @type {boolean} */
      var deleteExpando = support.deleteExpando;
      var special = jQuery.event.special;
      for (; null != (elem = elems[i]); i++) {
        if ((type || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
          if (data.events) {
            for (type in data.events) {
              if (special[type]) {
                jQuery.event.remove(elem, type);
              } else {
                jQuery.removeEvent(elem, type, data.handle);
              }
            }
          }
          if (cache[id]) {
            delete cache[id];
            if (deleteExpando) {
              delete elem[internalKey];
            } else {
              if (typeof elem.removeAttribute !== undefined) {
                elem.removeAttribute(internalKey);
              } else {
                /** @type {null} */
                elem[internalKey] = null;
              }
            }
            arr.push(id);
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    text : function(value) {
      return access(this, function(a) {
        return void 0 === a ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(a));
      }, null, value, arguments.length);
    },
    append : function() {
      return this.domManip(arguments, function(elem) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend : function() {
      return this.domManip(arguments, function(elem) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before : function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after : function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove : function(selector, keepData) {
      var elem;
      var elems = selector ? jQuery.filter(selector, this) : this;
      /** @type {number} */
      var i = 0;
      for (; null != (elem = elems[i]); i++) {
        if (!(keepData || 1 !== elem.nodeType)) {
          jQuery.cleanData(getAll(elem));
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, "script"));
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    empty : function() {
      var elem;
      /** @type {number} */
      var i = 0;
      for (; null != (elem = this[i]); i++) {
        if (1 === elem.nodeType) {
          jQuery.cleanData(getAll(elem, false));
        }
        for (; elem.firstChild;) {
          elem.removeChild(elem.firstChild);
        }
        if (elem.options && jQuery.nodeName(elem, "select")) {
          /** @type {number} */
          elem.options.length = 0;
        }
      }
      return this;
    },
    clone : function(e, c) {
      return e = null == e ? false : e, c = null == c ? e : c, this.map(function() {
        return jQuery.clone(this, e, c);
      });
    },
    html : function(value) {
      return access(this, function(value) {
        var elem = this[0] || {};
        /** @type {number} */
        var endIdx = 0;
        var i = this.length;
        if (void 0 === value) {
          return 1 === elem.nodeType ? elem.innerHTML.replace(rvolatile, "") : void 0;
        }
        if (!("string" != typeof value || trueRE.test(value) || !support.htmlSerialize && exactRegExp.test(value) || !support.leadingWhitespace && v.test(value) || wrapMap[(GoogleImageLayout.exec(value) || ["", ""])[1].toLowerCase()])) {
          /** @type {string} */
          value = value.replace(rxhtmlTag, "<$1></$2>");
          try {
            for (; i > endIdx; endIdx++) {
              elem = this[endIdx] || {};
              if (1 === elem.nodeType) {
                jQuery.cleanData(getAll(elem, false));
                /** @type {string} */
                elem.innerHTML = value;
              }
            }
            /** @type {number} */
            elem = 0;
          } catch (e) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith : function() {
      var arg = arguments[0];
      return this.domManip(arguments, function(o) {
        arg = this.parentNode;
        jQuery.cleanData(getAll(this));
        if (arg) {
          arg.replaceChild(o, this);
        }
      }), arg && (arg.length || arg.nodeType) ? this : this.remove();
    },
    detach : function(selector) {
      return this.remove(selector, true);
    },
    domManip : function(args, callback) {
      /** @type {!Array<?>} */
      args = concat.apply([], args);
      var first;
      var node;
      var len;
      var scripts;
      var elem;
      var fragment;
      /** @type {number} */
      var i = 0;
      var l = this.length;
      var $contentCols = this;
      /** @type {number} */
      var iNoClone = l - 1;
      var fn = args[0];
      var rewriteFn = jQuery.isFunction(fn);
      if (rewriteFn || l > 1 && "string" == typeof fn && !support.checkClone && reValidName.test(fn)) {
        return this.each(function(index) {
          var self = $contentCols.eq(index);
          if (rewriteFn) {
            args[0] = fn.call(this, index, self.html());
          }
          self.domManip(args, callback);
        });
      }
      if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        len = scripts.length;
        for (; l > i; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (len) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(this[i], node, i);
        }
        if (len) {
          elem = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          /** @type {number} */
          i = 0;
          for (; len > i; i++) {
            node = scripts[i];
            if (opacityRe.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(elem, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
              }
            }
          }
        }
        /** @type {null} */
        fragment = first = null;
      }
      return this;
    }
  });
  jQuery.each({
    appendTo : "append",
    prependTo : "prepend",
    insertBefore : "before",
    insertAfter : "after",
    replaceAll : "replaceWith"
  }, function(original, method) {
    /**
     * @param {!Array} selector
     * @return {?}
     */
    jQuery.fn[original] = function(selector) {
      var newTrack;
      /** @type {number} */
      var i = 0;
      /** @type {!Array} */
      var ret = [];
      var insert = jQuery(selector);
      /** @type {number} */
      var last = insert.length - 1;
      for (; last >= i; i++) {
        newTrack = i === last ? this : this.clone(true);
        jQuery(insert[i])[method](newTrack);
        push.apply(ret, newTrack.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe;
  var defaultDisplayMap = {};
  !function() {
    var container;
    var shrinkWrapBlocksVal;
    var div = document.createElement("div");
    /** @type {string} */
    var css = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
    /** @type {string} */
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    container = div.getElementsByTagName("a")[0];
    /** @type {string} */
    container.style.cssText = "float:left;opacity:.5";
    /** @type {boolean} */
    support.opacity = /^0.5/.test(container.style.opacity);
    /** @type {boolean} */
    support.cssFloat = !!container.style.cssFloat;
    /** @type {string} */
    div.style.backgroundClip = "content-box";
    /** @type {string} */
    div.cloneNode(true).style.backgroundClip = "";
    /** @type {boolean} */
    support.clearCloneStyle = "content-box" === div.style.backgroundClip;
    /** @type {null} */
    container = div = null;
    /**
     * @return {?}
     */
    support.shrinkWrapBlocks = function() {
      var a;
      var div;
      var container;
      var f;
      if (null == shrinkWrapBlocksVal) {
        if (a = document.getElementsByTagName("body")[0], !a) {
          return;
        }
        /** @type {string} */
        f = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
        div = document.createElement("div");
        container = document.createElement("div");
        a.appendChild(div).appendChild(container);
        /** @type {boolean} */
        shrinkWrapBlocksVal = false;
        if (typeof container.style.zoom !== undefined) {
          /** @type {string} */
          container.style.cssText = css + ";width:1px;padding:1px;zoom:1";
          /** @type {string} */
          container.innerHTML = "<div></div>";
          /** @type {string} */
          container.firstChild.style.width = "5px";
          /** @type {boolean} */
          shrinkWrapBlocksVal = 3 !== container.offsetWidth;
        }
        a.removeChild(div);
        /** @type {null} */
        a = div = container = null;
      }
      return shrinkWrapBlocksVal;
    };
  }();
  /** @type {!RegExp} */
  var namespaces = /^margin/;
  /** @type {!RegExp} */
  var rnumnonpx = new RegExp("^(" + FSSource + ")(?!px)[a-z%]+$", "i");
  var getStyles;
  var curCSS;
  /** @type {!RegExp} */
  var DEFERRED_PREFIX = /^(top|right|bottom|left)$/;
  if (window.getComputedStyle) {
    /**
     * @param {!Object} elem
     * @return {?}
     */
    getStyles = function(elem) {
      return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
    };
    /**
     * @param {?} elem
     * @param {!Object} name
     * @param {!Object} computed
     * @return {?}
     */
    curCSS = function(elem, name, computed) {
      var minWidth;
      var width;
      var maxWidth;
      var ret;
      var style = elem.style;
      return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0, computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && namespaces.test(name) && (minWidth = style.width, width = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = minWidth, style.minWidth = width, style.maxWidth = maxWidth)), 
      void 0 === ret ? ret : ret + "";
    };
  } else {
    if (document.documentElement.currentStyle) {
      /**
       * @param {!Object} elem
       * @return {?}
       */
      getStyles = function(elem) {
        return elem.currentStyle;
      };
      /**
       * @param {!HTMLElement} elem
       * @param {string} name
       * @param {string} computed
       * @return {?}
       */
      curCSS = function(elem, name, computed) {
        var left;
        var rs;
        var rsLeft;
        var ret;
        var style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed[name] : void 0, null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !DEFERRED_PREFIX.test(name) && (left = style.left, rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, rsLeft && (rs.left = rsLeft)), void 0 === ret ? ret : ret + "" || "auto";
      };
    }
  }
  !function() {
    /**
     * @return {undefined}
     */
    function computeStyleTests() {
      var container;
      var div;
      var body = document.getElementsByTagName("body")[0];
      if (body) {
        container = document.createElement("div");
        div = document.createElement("div");
        /** @type {string} */
        container.style.cssText = shrinkChildStyle;
        body.appendChild(container).appendChild(div);
        /** @type {string} */
        div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%";
        jQuery.swap(body, null != body.style.zoom ? {
          zoom : 1
        } : {}, function() {
          /** @type {boolean} */
          d = 4 === div.offsetWidth;
        });
        /** @type {boolean} */
        e = true;
        /** @type {boolean} */
        f = false;
        /** @type {boolean} */
        reliableMarginRightVal = true;
        if (window.getComputedStyle) {
          /** @type {boolean} */
          f = "1%" !== (window.getComputedStyle(div, null) || {}).top;
          /** @type {boolean} */
          e = "4px" === (window.getComputedStyle(div, null) || {
            width : "4px"
          }).width;
        }
        body.removeChild(container);
        /** @type {null} */
        div = body = null;
      }
    }
    var container;
    var reliableHiddenOffsetsVal;
    var d;
    var e;
    var f;
    var reliableMarginRightVal;
    var div = document.createElement("div");
    /** @type {string} */
    var shrinkChildStyle = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
    /** @type {string} */
    var divReset = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
    /** @type {string} */
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    container = div.getElementsByTagName("a")[0];
    /** @type {string} */
    container.style.cssText = "float:left;opacity:.5";
    /** @type {boolean} */
    support.opacity = /^0.5/.test(container.style.opacity);
    /** @type {boolean} */
    support.cssFloat = !!container.style.cssFloat;
    /** @type {string} */
    div.style.backgroundClip = "content-box";
    /** @type {string} */
    div.cloneNode(true).style.backgroundClip = "";
    /** @type {boolean} */
    support.clearCloneStyle = "content-box" === div.style.backgroundClip;
    /** @type {null} */
    container = div = null;
    jQuery.extend(support, {
      reliableHiddenOffsets : function() {
        if (null != reliableHiddenOffsetsVal) {
          return reliableHiddenOffsetsVal;
        }
        var parent;
        var contents;
        var isSupported;
        var div = document.createElement("div");
        var node = document.getElementsByTagName("body")[0];
        if (node) {
          return div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", parent = document.createElement("div"), parent.style.cssText = shrinkChildStyle, node.appendChild(parent).appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", contents = div.getElementsByTagName("td"), contents[0].style.cssText = "padding:0;margin:0;border:0;display:none", isSupported = 0 === contents[0].offsetHeight, contents[0].style.display = 
          "", contents[1].style.display = "none", reliableHiddenOffsetsVal = isSupported && 0 === contents[0].offsetHeight, node.removeChild(parent), div = node = null, reliableHiddenOffsetsVal;
        }
      },
      boxSizing : function() {
        return null == d && computeStyleTests(), d;
      },
      boxSizingReliable : function() {
        return null == e && computeStyleTests(), e;
      },
      pixelPosition : function() {
        return null == f && computeStyleTests(), f;
      },
      reliableMarginRight : function() {
        var b;
        var container;
        var mapDiv;
        var marginDiv;
        if (null == reliableMarginRightVal && window.getComputedStyle) {
          if (b = document.getElementsByTagName("body")[0], !b) {
            return;
          }
          container = document.createElement("div");
          mapDiv = document.createElement("div");
          /** @type {string} */
          container.style.cssText = shrinkChildStyle;
          b.appendChild(container).appendChild(mapDiv);
          marginDiv = mapDiv.appendChild(document.createElement("div"));
          /** @type {string} */
          marginDiv.style.cssText = mapDiv.style.cssText = divReset;
          /** @type {string} */
          marginDiv.style.marginRight = marginDiv.style.width = "0";
          /** @type {string} */
          mapDiv.style.width = "1px";
          /** @type {boolean} */
          reliableMarginRightVal = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
          b.removeChild(container);
        }
        return reliableMarginRightVal;
      }
    });
  }();
  /**
   * @param {!Object} elem
   * @param {!Array} options
   * @param {!Function} value
   * @param {!Array} params
   * @return {?}
   */
  jQuery.swap = function(elem, options, value, params) {
    var ret;
    var prop;
    var originObject = {};
    for (prop in options) {
      originObject[prop] = elem.style[prop];
      elem.style[prop] = options[prop];
    }
    ret = value.apply(elem, params || []);
    for (prop in options) {
      elem.style[prop] = originObject[prop];
    }
    return ret;
  };
  /** @type {!RegExp} */
  var _classStateQualifierRegExp = /alpha\([^)]*\)/i;
  /** @type {!RegExp} */
  var flashFilenameRegex = /opacity\s*=\s*([^)]*)/;
  /** @type {!RegExp} */
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
  /** @type {!RegExp} */
  var rnumsplit = new RegExp("^(" + FSSource + ")(.*)$", "i");
  /** @type {!RegExp} */
  var startsWithSo = new RegExp("^([+-])=(" + FSSource + ")", "i");
  var props = {
    position : "absolute",
    visibility : "hidden",
    display : "block"
  };
  var cssNormalTransform = {
    letterSpacing : 0,
    fontWeight : 400
  };
  /** @type {!Array} */
  var prefixes = ["Webkit", "O", "Moz", "ms"];
  jQuery.extend({
    cssHooks : {
      opacity : {
        get : function(el, k) {
          if (k) {
            var val = curCSS(el, "opacity");
            return "" === val ? "1" : val;
          }
        }
      }
    },
    cssNumber : {
      columnCount : true,
      fillOpacity : true,
      fontWeight : true,
      lineHeight : true,
      opacity : true,
      order : true,
      orphans : true,
      widows : true,
      zIndex : true,
      zoom : true
    },
    cssProps : {
      "float" : support.cssFloat ? "cssFloat" : "styleFloat"
    },
    style : function(value, name, val, extra) {
      if (value && 3 !== value.nodeType && 8 !== value.nodeType && value.style) {
        var ret;
        var type;
        var hooks;
        var origName = jQuery.camelCase(name);
        var style = value.style;
        if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === val) {
          return hooks && "get" in hooks && void 0 !== (ret = hooks.get(value, false, extra)) ? ret : style[name];
        }
        if (type = typeof val, "string" === type && (ret = startsWithSo.exec(val)) && (val = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(value, name)), type = "number"), null != val && val === val && ("number" !== type || jQuery.cssNumber[origName] || (val = val + "px"), support.clearCloneStyle || "" !== val || 0 !== name.indexOf("background") || (style[name] = "inherit"), !(hooks && "set" in hooks && void 0 === (val = hooks.set(value, val, extra))))) {
          try {
            /** @type {string} */
            style[name] = "";
            /** @type {string} */
            style[name] = val;
          } catch (j) {
          }
        }
      }
    },
    css : function(elem, name, value, styles) {
      var data;
      var val;
      var hooks;
      var origName = jQuery.camelCase(name);
      return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, true, value)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === value || value ? (data = parseFloat(val), value === true || jQuery.isNumeric(data) ? data || 0 : val) : val;
    }
  });
  jQuery.each(["height", "width"], function(a, name) {
    jQuery.cssHooks[name] = {
      get : function(elem, prop, view) {
        return prop ? 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, props, function() {
          return getWidthOrHeight(elem, name, view);
        }) : getWidthOrHeight(elem, name, view) : void 0;
      },
      set : function(elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing() && "border-box" === jQuery.css(elem, "boxSizing", false, styles), styles) : 0);
      }
    };
  });
  if (!support.opacity) {
    jQuery.cssHooks.opacity = {
      get : function(elem, filter) {
        return flashFilenameRegex.test((filter && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : filter ? "1" : "";
      },
      set : function(elem, value) {
        var style = elem.style;
        var currentStyle = elem.currentStyle;
        /** @type {string} */
        var _newClassStateQualifier = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "";
        var _oldClass = currentStyle && currentStyle.filter || style.filter || "";
        /** @type {number} */
        style.zoom = 1;
        if (!((value >= 1 || "" === value) && "" === jQuery.trim(_oldClass.replace(_classStateQualifierRegExp, "")) && style.removeAttribute && (style.removeAttribute("filter"), "" === value || currentStyle && !currentStyle.filter))) {
          style.filter = _classStateQualifierRegExp.test(_oldClass) ? _oldClass.replace(_classStateQualifierRegExp, _newClassStateQualifier) : _oldClass + " " + _newClassStateQualifier;
        }
      }
    };
  }
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, extra) {
    return extra ? jQuery.swap(elem, {
      display : "inline-block"
    }, curCSS, [elem, "marginRight"]) : void 0;
  });
  jQuery.each({
    margin : "",
    padding : "",
    border : "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand : function(data) {
        /** @type {number} */
        var i = 0;
        var expanded = {};
        /** @type {!Array} */
        var stops = "string" == typeof data ? data.split(" ") : [data];
        for (; 4 > i; i++) {
          expanded[prefix + cssExpand[i] + suffix] = stops[i] || stops[i - 2] || stops[0];
        }
        return expanded;
      }
    };
    if (!namespaces.test(prefix)) {
      /** @type {function(!Object, !Object, string): ?} */
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css : function(name, value) {
      return access(this, function(elem, name, undefined) {
        var styles;
        var l;
        var map = {};
        /** @type {number} */
        var i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          l = name.length;
          for (; l > i; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return void 0 !== undefined ? jQuery.style(elem, name, undefined) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show : function() {
      return showHide(this, true);
    },
    hide : function() {
      return showHide(this);
    },
    toggle : function(state) {
      return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
        if (test(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  /** @type {function(!Array, string, number, string, number): ?} */
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor : Tween,
    init : function(domElem, options, prop, end, easing, unit) {
      /** @type {!Element} */
      this.elem = domElem;
      /** @type {!Object} */
      this.prop = prop;
      this.easing = easing || "swing";
      /** @type {!Object} */
      this.options = options;
      this.start = this.now = this.cur();
      /** @type {number} */
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur : function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run : function(percent) {
      var eased;
      var hooks = Tween.propHooks[this.prop];
      return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default : {
      get : function(data) {
        var node;
        return null == data.elem[data.prop] || data.elem.style && null != data.elem.style[data.prop] ? (node = jQuery.css(data.elem, data.prop, ""), node && "auto" !== node ? node : 0) : data.elem[data.prop];
      },
      set : function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else {
          if (tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop])) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
          } else {
            tween.elem[tween.prop] = tween.now;
          }
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set : function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.easing = {
    linear : function(p) {
      return p;
    },
    swing : function(p) {
      return .5 - Math.cos(p * Math.PI) / 2;
    }
  };
  /** @type {function(!Element, !Object, !Object, number, string, string): undefined} */
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow;
  var initializeCheckTimer;
  /** @type {!RegExp} */
  var verRe = /^(?:toggle|show|hide)$/;
  /** @type {!RegExp} */
  var rfxnum = new RegExp("^(?:([+-])=|)(" + FSSource + ")([a-z%]*)$", "i");
  /** @type {!RegExp} */
  var rrun = /queueHooks$/;
  /** @type {!Array} */
  var animationPrefilters = [defaultPrefilter];
  var tweeners = {
    "*" : [function(prop, value) {
      var tween = this.createTween(prop, value);
      var target = tween.cur();
      /** @type {(Array<string>|null)} */
      var parts = rfxnum.exec(value);
      /** @type {string} */
      var unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
      var start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop));
      /** @type {number} */
      var scale = 1;
      /** @type {number} */
      var i = 20;
      if (start && start[3] !== unit) {
        unit = unit || start[3];
        /** @type {!Array} */
        parts = parts || [];
        /** @type {number} */
        start = +target || 1;
        do {
          /** @type {(number|string)} */
          scale = scale || ".5";
          /** @type {number} */
          start = start / scale;
          jQuery.style(tween.elem, prop, start + unit);
        } while (scale !== (scale = tween.cur() / target) && 1 !== scale && --i);
      }
      return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
    }]
  };
  jQuery.Animation = jQuery.extend(Animation, {
    tweener : function(props, callback) {
      if (jQuery.isFunction(props)) {
        /** @type {!Object} */
        callback = props;
        /** @type {!Array} */
        props = ["*"];
      } else {
        props = props.split(" ");
      }
      var prop;
      /** @type {number} */
      var length = 0;
      var x = props.length;
      for (; x > length; length++) {
        prop = props[length];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter : function(callback, options) {
      if (options) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  /**
   * @param {string} speed
   * @param {string} easing
   * @param {string} fn
   * @return {?}
   */
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
      complete : fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration : speed,
      easing : fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === true) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    }, opt;
  };
  jQuery.fn.extend({
    fadeTo : function(speed, to, callback, context) {
      return this.filter(test).css("opacity", 0).show().end().animate({
        opacity : to
      }, speed, callback, context);
    },
    animate : function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop);
      var optall = jQuery.speed(speed, easing, callback);
      /**
       * @return {undefined}
       */
      var doAnimation = function() {
        var anim = Animation(this, jQuery.extend({}, prop), optall);
        if (empty || jQuery._data(this, "finish")) {
          anim.stop(true);
        }
      };
      return doAnimation.finish = doAnimation, empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop : function(type, value, options) {
      /**
       * @param {!Object} hooks
       * @return {undefined}
       */
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(options);
      };
      return "string" != typeof type && (options = value, value = type, type = void 0), value && type !== false && this.queue(type || "fx", []), this.each(function() {
        /** @type {boolean} */
        var cflag = true;
        /** @type {(boolean|string)} */
        var index = null != type && type + "queueHooks";
        /** @type {!Array} */
        var timers = jQuery.timers;
        var data = jQuery._data(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        /** @type {number} */
        index = timers.length;
        for (; index--;) {
          if (!(timers[index].elem !== this || null != type && timers[index].queue !== type)) {
            timers[index].anim.stop(options);
            /** @type {boolean} */
            cflag = false;
            timers.splice(index, 1);
          }
        }
        if (cflag || !options) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish : function(type) {
      return type !== false && (type = type || "fx"), this.each(function() {
        var index;
        var data = jQuery._data(this);
        var queue = data[type + "queue"];
        var hooks = data[type + "queueHooks"];
        /** @type {!Array} */
        var timers = jQuery.timers;
        var length = queue ? queue.length : 0;
        /** @type {boolean} */
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        /** @type {number} */
        index = timers.length;
        for (; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        /** @type {number} */
        index = 0;
        for (; length > index; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(a, name) {
    var cssFn = jQuery.fn[name];
    /**
     * @param {string} x
     * @param {string} callback
     * @param {string} options
     * @return {?}
     */
    jQuery.fn[name] = function(x, callback, options) {
      return null == x || "boolean" == typeof x ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), x, callback, options);
    };
  });
  jQuery.each({
    slideDown : genFx("show"),
    slideUp : genFx("hide"),
    slideToggle : genFx("toggle"),
    fadeIn : {
      opacity : "show"
    },
    fadeOut : {
      opacity : "hide"
    },
    fadeToggle : {
      opacity : "toggle"
    }
  }, function(original, props) {
    /**
     * @param {string} speed
     * @param {string} callback
     * @param {string} options
     * @return {?}
     */
    jQuery.fn[original] = function(speed, callback, options) {
      return this.animate(props, speed, callback, options);
    };
  });
  /** @type {!Array} */
  jQuery.timers = [];
  /**
   * @return {undefined}
   */
  jQuery.fx.tick = function() {
    var timer;
    /** @type {!Array} */
    var timers = jQuery.timers;
    /** @type {number} */
    var i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!(timer() || timers[i] !== timer)) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = void 0;
  };
  /**
   * @param {?} timer
   * @return {undefined}
   */
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  /** @type {number} */
  jQuery.fx.interval = 13;
  /**
   * @return {undefined}
   */
  jQuery.fx.start = function() {
    if (!initializeCheckTimer) {
      /** @type {number} */
      initializeCheckTimer = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  /**
   * @return {undefined}
   */
  jQuery.fx.stop = function() {
    clearInterval(initializeCheckTimer);
    /** @type {null} */
    initializeCheckTimer = null;
  };
  jQuery.fx.speeds = {
    slow : 600,
    fast : 200,
    _default : 400
  };
  /**
   * @param {string} time
   * @param {string} type
   * @return {?}
   */
  jQuery.fn.delay = function(time, type) {
    return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(fn, incoming_item) {
      /** @type {number} */
      var timer = setTimeout(fn, time);
      /**
       * @return {undefined}
       */
      incoming_item.stop = function() {
        clearTimeout(timer);
      };
    });
  };
  (function() {
    var wrapper;
    var element;
    var select;
    var opt;
    var div = document.createElement("div");
    div.setAttribute("className", "t");
    /** @type {string} */
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    wrapper = div.getElementsByTagName("a")[0];
    select = document.createElement("select");
    opt = select.appendChild(document.createElement("option"));
    element = div.getElementsByTagName("input")[0];
    /** @type {string} */
    wrapper.style.cssText = "top:1px";
    /** @type {boolean} */
    support.getSetAttribute = "t" !== div.className;
    /** @type {boolean} */
    support.style = /top/.test(wrapper.getAttribute("style"));
    /** @type {boolean} */
    support.hrefNormalized = "/a" === wrapper.getAttribute("href");
    /** @type {boolean} */
    support.checkOn = !!element.value;
    support.optSelected = opt.selected;
    /** @type {boolean} */
    support.enctype = !!document.createElement("form").enctype;
    /** @type {boolean} */
    select.disabled = true;
    /** @type {boolean} */
    support.optDisabled = !opt.disabled;
    element = document.createElement("input");
    element.setAttribute("value", "");
    /** @type {boolean} */
    support.input = "" === element.getAttribute("value");
    /** @type {string} */
    element.value = "t";
    element.setAttribute("type", "radio");
    /** @type {boolean} */
    support.radioValue = "t" === element.value;
    /** @type {null} */
    wrapper = element = select = opt = div = null;
  })();
  /** @type {!RegExp} */
  var n = /\r/g;
  jQuery.fn.extend({
    val : function(v) {
      var hooks;
      var value;
      var obj;
      var elem = this[0];
      {
        if (arguments.length) {
          return obj = jQuery.isFunction(v), this.each(function(key) {
            var value;
            if (1 === this.nodeType) {
              value = obj ? v.call(this, key, jQuery(this).val()) : v;
              if (null == value) {
                /** @type {string} */
                value = "";
              } else {
                if ("number" == typeof value) {
                  /** @type {string} */
                  value = value + "";
                } else {
                  if (jQuery.isArray(value)) {
                    value = jQuery.map(value, function(value) {
                      return null == value ? "" : value + "";
                    });
                  }
                }
              }
              hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
              if (!(hooks && "set" in hooks && void 0 !== hooks.set(this, value, "value"))) {
                this.value = value;
              }
            }
          });
        }
        if (elem) {
          return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (value = hooks.get(elem, "value")) ? value : (value = elem.value, "string" == typeof value ? value.replace(n, "") : null == value ? "" : value);
        }
      }
    }
  });
  jQuery.extend({
    valHooks : {
      option : {
        get : function(key) {
          var isInvalid = jQuery.find.attr(key, "value");
          return null != isInvalid ? isInvalid : jQuery.text(key);
        }
      },
      select : {
        get : function(instance) {
          var b;
          var option;
          var options = instance.options;
          var position = instance.selectedIndex;
          /** @type {boolean} */
          var after = "select-one" === instance.type || 0 > position;
          /** @type {(Array|null)} */
          var index = after ? null : [];
          var item = after ? position + 1 : options.length;
          var name = 0 > position ? item : after ? position : 0;
          for (; item > name; name++) {
            if (option = options[name], !(!option.selected && name !== position || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
              if (b = jQuery(option).val(), after) {
                return b;
              }
              index.push(b);
            }
          }
          return index;
        },
        set : function(elem, value) {
          var outputFn;
          var node;
          var result = elem.options;
          var optionalDivisorsKeys = jQuery.makeArray(value);
          var index = result.length;
          for (; index--;) {
            if (node = result[index], jQuery.inArray(jQuery.valHooks.option.get(node), optionalDivisorsKeys) >= 0) {
              try {
                /** @type {boolean} */
                node.selected = outputFn = true;
              } catch (h) {
                node.scrollHeight;
              }
            } else {
              /** @type {boolean} */
              node.selected = false;
            }
          }
          return outputFn || (elem.selectedIndex = -1), result;
        }
      }
    }
  });
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {
      set : function(elem, keys) {
        return jQuery.isArray(keys) ? elem.checked = jQuery.inArray(jQuery(elem).val(), keys) >= 0 : void 0;
      }
    };
    if (!support.checkOn) {
      /**
       * @param {!Object} elem
       * @return {?}
       */
      jQuery.valHooks[this].get = function(elem) {
        return null === elem.getAttribute("value") ? "on" : elem.value;
      };
    }
  });
  var nodeHook;
  var boolHook;
  var attrHandle = jQuery.expr.attrHandle;
  /** @type {!RegExp} */
  var reBlockName = /^(?:checked|selected)$/i;
  var getSetAttribute = support.getSetAttribute;
  var getSetInput = support.input;
  jQuery.fn.extend({
    attr : function(type, value) {
      return access(this, jQuery.attr, type, value, arguments.length > 1);
    },
    removeAttr : function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr : function(elem, name, value) {
      var hooks;
      var message;
      var type = elem.nodeType;
      if (elem && 3 !== type && 8 !== type && 2 !== type) {
        return typeof elem.getAttribute === undefined ? jQuery.prop(elem, name, value) : (1 === type && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), void 0 === value ? hooks && "get" in hooks && null !== (message = hooks.get(elem, name)) ? message : (message = jQuery.find.attr(elem, name), null == message ? void 0 : message) : null !== value ? hooks && "set" in hooks && void 0 !== (message = hooks.set(elem, 
        value, name)) ? message : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name));
      }
    },
    removeAttr : function(elem, value) {
      var name;
      var propName;
      /** @type {number} */
      var fpt = 0;
      var f = value && value.match(rnotwhite);
      if (f && 1 === elem.nodeType) {
        for (; name = f[fpt++];) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            if (getSetInput && getSetAttribute || !reBlockName.test(name)) {
              /** @type {boolean} */
              elem[propName] = false;
            } else {
              /** @type {boolean} */
              elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
            }
          } else {
            jQuery.attr(elem, name, "");
          }
          elem.removeAttribute(getSetAttribute ? name : propName);
        }
      }
    },
    attrHooks : {
      type : {
        set : function(a, type) {
          if (!support.radioValue && "radio" === type && jQuery.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", type), c && (a.value = c), type;
          }
        }
      }
    }
  });
  boolHook = {
    set : function(elem, value, name) {
      return value === false ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !reBlockName.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = true, name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(a, name) {
    var clearClassCycle = attrHandle[name] || jQuery.find.attr;
    /** @type {function(?, string, !Array): ?} */
    attrHandle[name] = getSetInput && getSetAttribute || !reBlockName.test(name) ? function(me, name, childCompute) {
      var ret;
      var handle;
      return childCompute || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != clearClassCycle(me, name, childCompute) ? name.toLowerCase() : null, attrHandle[name] = handle), ret;
    } : function(a, name, canCreateDiscussions) {
      return canCreateDiscussions ? void 0 : a[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
    };
  });
  if (!(getSetInput && getSetAttribute)) {
    jQuery.attrHooks.value = {
      set : function(elem, value, name) {
        return jQuery.nodeName(elem, "input") ? void(elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name);
      }
    };
  }
  if (!getSetAttribute) {
    nodeHook = {
      set : function(elem, value, name) {
        var ret = elem.getAttributeNode(name);
        return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), ret.value = value = value + "", "value" === name || value === elem.getAttribute(name) ? value : void 0;
      }
    };
    /** @type {function(!Element, ?, boolean): ?} */
    attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, res) {
      var cfg;
      return res ? void 0 : (cfg = elem.getAttributeNode(name)) && "" !== cfg.value ? cfg.value : null;
    };
    jQuery.valHooks.button = {
      get : function(elem, name) {
        var attributeNode = elem.getAttributeNode(name);
        return attributeNode && attributeNode.specified ? attributeNode.value : void 0;
      },
      set : nodeHook.set
    };
    jQuery.attrHooks.contenteditable = {
      set : function(elem, value, name) {
        nodeHook.set(elem, "" === value ? false : value, name);
      }
    };
    jQuery.each(["width", "height"], function(a, name) {
      jQuery.attrHooks[name] = {
        set : function(elem, value) {
          return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0;
        }
      };
    });
  }
  if (!support.style) {
    jQuery.attrHooks.style = {
      get : function(elem) {
        return elem.style.cssText || void 0;
      },
      set : function(elem, value) {
        return elem.style.cssText = value + "";
      }
    };
  }
  /** @type {!RegExp} */
  var inputNodeNames = /^(?:input|select|textarea|button|object)$/i;
  /** @type {!RegExp} */
  var srsRegex = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop : function(type, value) {
      return access(this, jQuery.prop, type, value, arguments.length > 1);
    },
    removeProp : function(name) {
      return name = jQuery.propFix[name] || name, this.each(function() {
        try {
          this[name] = void 0;
          delete this[name];
        } catch (b) {
        }
      });
    }
  });
  jQuery.extend({
    propFix : {
      "for" : "htmlFor",
      "class" : "className"
    },
    prop : function(elem, name, value) {
      var ret;
      var hooks;
      var f;
      var type = elem.nodeType;
      if (elem && 3 !== type && 8 !== type && 2 !== type) {
        return f = 1 !== type || !jQuery.isXMLDoc(elem), f && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
      }
    },
    propHooks : {
      tabIndex : {
        get : function(target) {
          var b = jQuery.find.attr(target, "tabindex");
          return b ? parseInt(b, 10) : inputNodeNames.test(target.nodeName) || srsRegex.test(target.nodeName) && target.href ? 0 : -1;
        }
      }
    }
  });
  if (!support.hrefNormalized) {
    jQuery.each(["href", "src"], function(a, name) {
      jQuery.propHooks[name] = {
        get : function(elem) {
          return elem.getAttribute(name, 4);
        }
      };
    });
  }
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get : function(elem) {
        var parent = elem.parentNode;
        return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), null;
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  if (!support.enctype) {
    /** @type {string} */
    jQuery.propFix.enctype = "encoding";
  }
  /** @type {!RegExp} */
  var rclass = /[\t\r\n\f]/g;
  jQuery.fn.extend({
    addClass : function(value) {
      var features;
      var elem;
      var cur;
      var clazz;
      var iFeature;
      var finalValue;
      /** @type {number} */
      var l = 0;
      var i = this.length;
      /** @type {(boolean|string)} */
      var proceed = "string" == typeof value && value;
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).addClass(value.call(this, i, this.className));
        });
      }
      if (proceed) {
        features = (value || "").match(rnotwhite) || [];
        for (; i > l; l++) {
          if (elem = this[l], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
            /** @type {number} */
            iFeature = 0;
            for (; clazz = features[iFeature++];) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                /** @type {string} */
                cur = cur + (clazz + " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    removeClass : function(value) {
      var zeroSizeMaxes;
      var elem;
      var cur;
      var zeroSizeMax;
      var callbackCount;
      var finalValue;
      /** @type {number} */
      var l = 0;
      var i = this.length;
      /** @type {(boolean|string)} */
      var j = 0 === arguments.length || "string" == typeof value && value;
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).removeClass(value.call(this, i, this.className));
        });
      }
      if (j) {
        zeroSizeMaxes = (value || "").match(rnotwhite) || [];
        for (; i > l; l++) {
          if (elem = this[l], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
            /** @type {number} */
            callbackCount = 0;
            for (; zeroSizeMax = zeroSizeMaxes[callbackCount++];) {
              for (; cur.indexOf(" " + zeroSizeMax + " ") >= 0;) {
                /** @type {string} */
                cur = cur.replace(" " + zeroSizeMax + " ", " ");
              }
            }
            finalValue = value ? jQuery.trim(cur) : "";
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    toggleClass : function(value, stateVal) {
      /** @type {string} */
      var type = typeof value;
      return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
      } : function() {
        if ("string" === type) {
          var p;
          /** @type {number} */
          var cnt = 0;
          var e = jQuery(this);
          var a = value.match(rnotwhite) || [];
          for (; p = a[cnt++];) {
            if (e.hasClass(p)) {
              e.removeClass(p);
            } else {
              e.addClass(p);
            }
          }
        } else {
          if (type === undefined || "boolean" === type) {
            if (this.className) {
              jQuery._data(this, "__className__", this.className);
            }
            this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
          }
        }
      });
    },
    hasClass : function(name) {
      /** @type {string} */
      var b = " " + name + " ";
      /** @type {number} */
      var i = 0;
      var l = this.length;
      for (; l > i; i++) {
        if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(b) >= 0) {
          return true;
        }
      }
      return false;
    }
  });
  jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, name) {
    /**
     * @param {!Object} settings
     * @param {!Object} callback
     * @return {?}
     */
    jQuery.fn[name] = function(settings, callback) {
      return arguments.length > 0 ? this.on(name, null, settings, callback) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover : function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    bind : function(type, fn, callback) {
      return this.on(type, null, fn, callback);
    },
    unbind : function(type, fn) {
      return this.off(type, null, fn);
    },
    delegate : function(event, selector, callback, context) {
      return this.on(selector, event, callback, context);
    },
    undelegate : function(selector, event, fn) {
      return 1 === arguments.length ? this.off(selector, "**") : this.off(event, selector || "**", fn);
    }
  });
  var widgetUniqueIDIndex = jQuery.now();
  /** @type {!RegExp} */
  var rquery = /\?/;
  /** @type {!RegExp} */
  var re = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  /**
   * @param {string} data
   * @return {?}
   */
  jQuery.parseJSON = function(data) {
    if (window.JSON && window.JSON.parse) {
      return window.JSON.parse(data + "");
    }
    var b;
    /** @type {null} */
    var string = null;
    var name = jQuery.trim(data + "");
    return name && !jQuery.trim(name.replace(re, function(objOrTsid, a, p, boardManager) {
      return b && a && (string = 0), 0 === string ? objOrTsid : (b = p || a, string = string + (!boardManager - !p), "");
    })) ? Function("return " + name)() : jQuery.error("Invalid JSON: " + data);
  };
  /**
   * @param {string} data
   * @return {?}
   */
  jQuery.parseXML = function(data) {
    var doc;
    var parser;
    if (!data || "string" != typeof data) {
      return null;
    }
    try {
      if (window.DOMParser) {
        /** @type {!DOMParser} */
        parser = new DOMParser;
        /** @type {(Document|null)} */
        doc = parser.parseFromString(data, "text/xml");
      } else {
        doc = new ActiveXObject("Microsoft.XMLDOM");
        /** @type {string} */
        doc.async = "false";
        doc.loadXML(data);
      }
    } catch (e) {
      doc = void 0;
    }
    return doc && doc.documentElement && !doc.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), doc;
  };
  var d;
  var ajaxLocation;
  /** @type {!RegExp} */
  var s_ESCAPE_REGEX = /#.*$/;
  /** @type {!RegExp} */
  var rts = /([?&])_=[^&]*/;
  /** @type {!RegExp} */
  var multipartRegExp = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm;
  /** @type {!RegExp} */
  var timeFormat = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
  /** @type {!RegExp} */
  var loader = /^(?:GET|HEAD)$/;
  /** @type {!RegExp} */
  var jsre = /^\/\//;
  /** @type {!RegExp} */
  var moveRegex = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/;
  var prefilters = {};
  var transports = {};
  /** @type {string} */
  var Kc = "*/".concat("*");
  try {
    /** @type {string} */
    ajaxLocation = location.href;
  } catch (Lc) {
    ajaxLocation = document.createElement("a");
    /** @type {string} */
    ajaxLocation.href = "";
    /** @type {string} */
    ajaxLocation = ajaxLocation.href;
  }
  /** @type {!Array} */
  d = moveRegex.exec(ajaxLocation.toLowerCase()) || [];
  jQuery.extend({
    active : 0,
    lastModified : {},
    etag : {},
    ajaxSettings : {
      url : ajaxLocation,
      type : "GET",
      isLocal : timeFormat.test(d[1]),
      global : true,
      processData : true,
      async : true,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      accepts : {
        "*" : Kc,
        text : "text/plain",
        html : "text/html",
        xml : "application/xml, text/xml",
        json : "application/json, text/javascript"
      },
      contents : {
        xml : /xml/,
        html : /html/,
        json : /json/
      },
      responseFields : {
        xml : "responseXML",
        text : "responseText",
        json : "responseJSON"
      },
      converters : {
        "* text" : String,
        "text html" : true,
        "text json" : jQuery.parseJSON,
        "text xml" : jQuery.parseXML
      },
      flatOptions : {
        url : true,
        context : true
      }
    },
    ajaxSetup : function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter : addToPrefiltersOrTransports(prefilters),
    ajaxTransport : addToPrefiltersOrTransports(transports),
    ajax : function(url, options) {
      /**
       * @param {number} status
       * @param {string} nativeStatusText
       * @param {!Array} responses
       * @param {string} result
       * @return {undefined}
       */
      function done(status, nativeStatusText, responses, result) {
        var isSuccess;
        var success;
        var error;
        var response;
        var modified;
        /** @type {string} */
        var statusText = nativeStatusText;
        if (2 !== ARRAY) {
          /** @type {number} */
          ARRAY = 2;
          if (_takingTooLongTimeout) {
            clearTimeout(_takingTooLongTimeout);
          }
          transport = void 0;
          data = result || "";
          /** @type {number} */
          jqXHR.readyState = status > 0 ? 4 : 0;
          /** @type {boolean} */
          isSuccess = status >= 200 && 300 > status || 304 === status;
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }
          response = ajaxConvert(s, response, jqXHR, isSuccess);
          if (isSuccess) {
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }
            if (204 === status || "HEAD" === s.type) {
              /** @type {string} */
              statusText = "nocontent";
            } else {
              if (304 === status) {
                /** @type {string} */
                statusText = "notmodified";
              } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                /** @type {boolean} */
                isSuccess = !error;
              }
            }
          } else {
            error = statusText;
            if (status || !statusText) {
              /** @type {string} */
              statusText = "error";
              if (0 > status) {
                /** @type {number} */
                status = 0;
              }
            }
          }
          /** @type {number} */
          jqXHR.status = status;
          /** @type {string} */
          jqXHR.statusText = (nativeStatusText || statusText) + "";
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (g) {
            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
          }
          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
          if (g) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            if (!--jQuery.active) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }
      }
      if ("object" == typeof url) {
        /** @type {string} */
        options = url;
        url = void 0;
      }
      options = options || {};
      var m;
      var i;
      var cacheURL;
      var data;
      var _takingTooLongTimeout;
      var g;
      var transport;
      var r;
      var s = jQuery.ajaxSetup({}, options);
      var callbackContext = s.context || s;
      var globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event;
      var deferred = jQuery.Deferred();
      var completeDeferred = jQuery.Callbacks("once memory");
      var statusCode = s.statusCode || {};
      var p = {};
      var requestHeadersNames = {};
      /** @type {number} */
      var ARRAY = 0;
      /** @type {string} */
      var status = "canceled";
      var jqXHR = {
        readyState : 0,
        getResponseHeader : function(header) {
          var a;
          if (2 === ARRAY) {
            if (!r) {
              r = {};
              for (; a = multipartRegExp.exec(data);) {
                /** @type {string} */
                r[a[1].toLowerCase()] = a[2];
              }
            }
            a = r[header.toLowerCase()];
          }
          return null == a ? null : a;
        },
        getAllResponseHeaders : function() {
          return 2 === ARRAY ? data : null;
        },
        setRequestHeader : function(name, value) {
          var lname = name.toLowerCase();
          return ARRAY || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, p[name] = value), this;
        },
        overrideMimeType : function(type) {
          return ARRAY || (s.mimeType = type), this;
        },
        statusCode : function(map) {
          var tmp;
          if (map) {
            if (2 > ARRAY) {
              for (tmp in map) {
                /** @type {!Array} */
                statusCode[tmp] = [statusCode[tmp], map[tmp]];
              }
            } else {
              jqXHR.always(map[jqXHR.status]);
            }
          }
          return this;
        },
        abort : function(type) {
          var statusText = type || status;
          return transport && transport.abort(statusText), done(0, statusText), this;
        }
      };
      if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(s_ESCAPE_REGEX, "").replace(jsre, d[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain && (m = moveRegex.exec(s.url.toLowerCase()), s.crossDomain = !(!m || m[1] === d[1] && m[2] === d[2] && (m[3] || 
      ("http:" === m[1] ? "80" : "443")) === (d[3] || ("http:" === d[1] ? "80" : "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === ARRAY) {
        return jqXHR;
      }
      g = s.global;
      if (g && 0 === jQuery.active++) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      /** @type {boolean} */
      s.hasContent = !loader.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          /** @type {string} */
          cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + widgetUniqueIDIndex++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + widgetUniqueIDIndex++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + Kc + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || 2 === ARRAY)) {
        return jqXHR.abort();
      }
      /** @type {string} */
      status = "abort";
      for (i in{
        success : 1,
        error : 1,
        complete : 1
      }) {
        jqXHR[i](s[i]);
      }
      if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
        /** @type {number} */
        jqXHR.readyState = 1;
        if (g) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (s.async && s.timeout > 0) {
          /** @type {number} */
          _takingTooLongTimeout = setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          /** @type {number} */
          ARRAY = 1;
          transport.send(p, done);
        } catch (success) {
          if (!(2 > ARRAY)) {
            throw success;
          }
          done(-1, success);
        }
      } else {
        done(-1, "No Transport");
      }
      return jqXHR;
    },
    getJSON : function(fn, data, name) {
      return jQuery.get(fn, data, name, "json");
    },
    getScript : function(type, callback) {
      return jQuery.get(type, void 0, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(a, method) {
    /**
     * @param {string} logErrorUrl
     * @param {!Object} data
     * @param {!Function} d
     * @param {string} referrer
     * @return {?}
     */
    jQuery[method] = function(logErrorUrl, data, d, referrer) {
      return jQuery.isFunction(data) && (referrer = referrer || d, d = data, data = void 0), jQuery.ajax({
        url : logErrorUrl,
        type : method,
        dataType : referrer,
        data : data,
        success : d
      });
    };
  });
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, name) {
    /**
     * @param {!Object} leaveFunction
     * @return {?}
     */
    jQuery.fn[name] = function(leaveFunction) {
      return this.on(name, leaveFunction);
    };
  });
  /**
   * @param {string} url
   * @return {?}
   */
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url : url,
      type : "GET",
      dataType : "script",
      async : false,
      global : false,
      "throws" : true
    });
  };
  jQuery.fn.extend({
    wrapAll : function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        var b = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          b.insertBefore(this[0]);
        }
        b.map(function() {
          var elem = this;
          for (; elem.firstChild && 1 === elem.firstChild.nodeType;) {
            elem = elem.firstChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner : function(html) {
      return this.each(jQuery.isFunction(html) ? function(i) {
        jQuery(this).wrapInner(html.call(this, i));
      } : function() {
        var b = jQuery(this);
        var contents = b.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          b.append(html);
        }
      });
    },
    wrap : function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap : function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  /**
   * @param {!Object} elem
   * @return {?}
   */
  jQuery.expr.filters.hidden = function(elem) {
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !support.reliableHiddenOffsets() && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"));
  };
  /**
   * @param {undefined} elem
   * @return {?}
   */
  jQuery.expr.filters.visible = function(elem) {
    return !jQuery.expr.filters.hidden(elem);
  };
  /** @type {!RegExp} */
  var regNewline = /%20/g;
  /** @type {!RegExp} */
  var VALID_IDENTIFIER_EXPR = /\[\]$/;
  /** @type {!RegExp} */
  var reVowels = /\r?\n/g;
  /** @type {!RegExp} */
  var reHasHexPrefix = /^(?:submit|button|image|reset|file)$/i;
  /** @type {!RegExp} */
  var rsubmittable = /^(?:input|select|textarea|keygen)/i;
  /**
   * @param {?} object
   * @param {string} name
   * @return {?}
   */
  jQuery.param = function(object, name) {
    var i;
    /** @type {!Array} */
    var displayUsedBy = [];
    /**
     * @param {?} a
     * @param {string} value
     * @return {undefined}
     */
    var add = function(a, value) {
      value = jQuery.isFunction(value) ? value() : null == value ? "" : value;
      /** @type {string} */
      displayUsedBy[displayUsedBy.length] = encodeURIComponent(a) + "=" + encodeURIComponent(value);
    };
    if (void 0 === name && (name = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(object) || object.jquery && !jQuery.isPlainObject(object)) {
      jQuery.each(object, function() {
        add(this.name, this.value);
      });
    } else {
      for (i in object) {
        set(i, object[i], name, add);
      }
    }
    return displayUsedBy.join("&").replace(regNewline, "+");
  };
  jQuery.fn.extend({
    serialize : function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray : function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var string = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !reHasHexPrefix.test(string) && (this.checked || !reg.test(string));
      }).map(function(a, ctlParams) {
        var val = jQuery(this).val();
        return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name : ctlParams.name,
            value : val.replace(reVowels, "\r\n")
          };
        }) : {
          name : ctlParams.name,
          value : val.replace(reVowels, "\r\n")
        };
      }).get();
    }
  });
  /** @type {function(): ?} */
  jQuery.ajaxSettings.xhr = void 0 !== window.ActiveXObject ? function() {
    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || getNewXmlHttpRequest();
  } : createStandardXHR;
  /** @type {number} */
  var syncTaskCounter = 0;
  var args = {};
  var xmlHttp = jQuery.ajaxSettings.xhr();
  if (window.ActiveXObject) {
    jQuery(window).on("unload", function() {
      var arg;
      for (arg in args) {
        args[arg](void 0, true);
      }
    });
  }
  /** @type {boolean} */
  support.cors = !!xmlHttp && "withCredentials" in xmlHttp;
  /** @type {boolean} */
  xmlHttp = support.ajax = !!xmlHttp;
  if (xmlHttp) {
    jQuery.ajaxTransport(function(s) {
      if (!s.crossDomain || support.cors) {
        var callback;
        return {
          send : function(headers, callback) {
            var i;
            var xhr = s.xhr();
            /** @type {number} */
            var asyncCbParam = ++syncTaskCounter;
            if (xhr.open(s.type, s.url, s.async, s.username, s.password), s.xhrFields) {
              for (i in s.xhrFields) {
                xhr[i] = s.xhrFields[i];
              }
            }
            if (s.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(s.mimeType);
            }
            if (!(s.crossDomain || headers["X-Requested-With"])) {
              /** @type {string} */
              headers["X-Requested-With"] = "XMLHttpRequest";
            }
            for (i in headers) {
              if (void 0 !== headers[i]) {
                xhr.setRequestHeader(i, headers[i] + "");
              }
            }
            xhr.send(s.hasContent && s.data || null);
            /**
             * @param {!Object} _
             * @param {string} isAbort
             * @return {undefined}
             */
            callback = function(_, isAbort) {
              var _name;
              var statusText;
              var responses;
              if (callback && (isAbort || 4 === xhr.readyState)) {
                if (delete args[asyncCbParam], callback = void 0, xhr.onreadystatechange = jQuery.noop, isAbort) {
                  if (4 !== xhr.readyState) {
                    xhr.abort();
                  }
                } else {
                  responses = {};
                  _name = xhr.status;
                  if ("string" == typeof xhr.responseText) {
                    /** @type {string} */
                    responses.text = xhr.responseText;
                  }
                  try {
                    statusText = xhr.statusText;
                  } catch (k) {
                    /** @type {string} */
                    statusText = "";
                  }
                  if (_name || !s.isLocal || s.crossDomain) {
                    if (1223 === _name) {
                      /** @type {number} */
                      _name = 204;
                    }
                  } else {
                    /** @type {number} */
                    _name = responses.text ? 200 : 404;
                  }
                }
              }
              if (responses) {
                callback(_name, statusText, responses, xhr.getAllResponseHeaders());
              }
            };
            if (s.async) {
              if (4 === xhr.readyState) {
                setTimeout(callback);
              } else {
                /** @type {function(!Object, string): undefined} */
                xhr.onreadystatechange = args[asyncCbParam] = callback;
              }
            } else {
              callback();
            }
          },
          abort : function() {
            if (callback) {
              callback(void 0, true);
            }
          }
        };
      }
    });
  }
  jQuery.ajaxSetup({
    accepts : {
      script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents : {
      script : /(?:java|ecma)script/
    },
    converters : {
      "text script" : function(value) {
        return jQuery.globalEval(value), value;
      }
    }
  });
  jQuery.ajaxPrefilter("script", function(settings) {
    if (void 0 === settings.cache) {
      /** @type {boolean} */
      settings.cache = false;
    }
    if (settings.crossDomain) {
      /** @type {string} */
      settings.type = "GET";
      /** @type {boolean} */
      settings.global = false;
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script;
      var head = document.head || jQuery("head")[0] || document.documentElement;
      return {
        send : function(name, callback) {
          script = document.createElement("script");
          /** @type {boolean} */
          script.async = true;
          if (s.scriptCharset) {
            script.charset = s.scriptCharset;
          }
          script.src = s.url;
          /** @type {function(?, string): undefined} */
          script.onload = script.onreadystatechange = function(event, data) {
            if (data || !script.readyState || /loaded|complete/.test(script.readyState)) {
              /** @type {null} */
              script.onload = script.onreadystatechange = null;
              if (script.parentNode) {
                script.parentNode.removeChild(script);
              }
              /** @type {null} */
              script = null;
              if (!data) {
                callback(200, "success");
              }
            }
          };
          head.insertBefore(script, head.firstChild);
        },
        abort : function() {
          if (script) {
            script.onload(void 0, true);
          }
        }
      };
    }
  });
  /** @type {!Array} */
  var oldCallbacks = [];
  /** @type {!RegExp} */
  var rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp : "callback",
    jsonpCallback : function() {
      var indexLookupKey = oldCallbacks.pop() || jQuery.expando + "_" + widgetUniqueIDIndex++;
      return this[indexLookupKey] = true, indexLookupKey;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, scanners) {
    var callbackName;
    var overwritten;
    var responseContainer;
    /** @type {(boolean|string)} */
    var jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
    return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== false && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
      return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
    }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
      /** @type {!Arguments} */
      responseContainer = arguments;
    }, scanners.always(function() {
      window[callbackName] = overwritten;
      if (s[callbackName]) {
        s.jsonpCallback = originalSettings.jsonpCallback;
        oldCallbacks.push(callbackName);
      }
      if (responseContainer && jQuery.isFunction(overwritten)) {
        overwritten(responseContainer[0]);
      }
      responseContainer = overwritten = void 0;
    }), "script") : void 0;
  });
  /**
   * @param {string} data
   * @param {!Object} context
   * @param {!Function} keepScripts
   * @return {?}
   */
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || "string" != typeof data) {
      return null;
    }
    if ("boolean" == typeof context) {
      /** @type {!Object} */
      keepScripts = context;
      /** @type {boolean} */
      context = false;
    }
    context = context || document;
    /** @type {(Array<string>|null)} */
    var parsed = rsingleTag.exec(data);
    /** @type {(Array|boolean)} */
    var scripts = !keepScripts && [];
    return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
  };
  /** @type {function(string, !Object, !Object): ?} */
  var proxyStoreLoad = jQuery.fn.load;
  /**
   * @param {string} url
   * @param {!Object} t
   * @param {!Object} n
   * @return {?}
   */
  jQuery.fn.load = function(url, t, n) {
    if ("string" != typeof url && proxyStoreLoad) {
      return proxyStoreLoad.apply(this, arguments);
    }
    var selector;
    var response;
    var type;
    var self = this;
    var pos = url.indexOf(" ");
    return pos >= 0 && (selector = url.slice(pos, url.length), url = url.slice(0, pos)), jQuery.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (type = "POST"), self.length > 0 && jQuery.ajax({
      url : url,
      type : type,
      dataType : "html",
      data : t
    }).done(function(responseText) {
      /** @type {!Arguments} */
      response = arguments;
      self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
    }).complete(n && function(obj, src) {
      self.each(n, response || [obj.responseText, src, obj]);
    }), this;
  };
  /**
   * @param {?} elem
   * @return {?}
   */
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  var docElem = window.document.documentElement;
  jQuery.offset = {
    setOffset : function(element, options, x) {
      var parent;
      var curLeft;
      var curCSSTop;
      var top;
      var curOffset;
      var curCSSLeft;
      var j;
      var propertyName = jQuery.css(element, "position");
      var l = jQuery(element);
      var m = {};
      if ("static" === propertyName) {
        /** @type {string} */
        element.style.position = "relative";
      }
      curOffset = l.offset();
      curCSSTop = jQuery.css(element, "top");
      curCSSLeft = jQuery.css(element, "left");
      /** @type {boolean} */
      j = ("absolute" === propertyName || "fixed" === propertyName) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
      if (j) {
        parent = l.position();
        top = parent.top;
        curLeft = parent.left;
      } else {
        /** @type {number} */
        top = parseFloat(curCSSTop) || 0;
        /** @type {number} */
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(element, x, curOffset);
      }
      if (null != options.top) {
        /** @type {number} */
        m.top = options.top - curOffset.top + top;
      }
      if (null != options.left) {
        /** @type {number} */
        m.left = options.left - curOffset.left + curLeft;
      }
      if ("using" in options) {
        options.using.call(element, m);
      } else {
        l.css(m);
      }
    }
  };
  jQuery.fn.extend({
    offset : function(y) {
      if (arguments.length) {
        return void 0 === y ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, y, i);
        });
      }
      var doc;
      var win;
      var result = {
        top : 0,
        left : 0
      };
      var node = this[0];
      var elem = node && node.ownerDocument;
      if (elem) {
        return doc = elem.documentElement, jQuery.contains(doc, node) ? (typeof node.getBoundingClientRect !== undefined && (result = node.getBoundingClientRect()), win = getWindow(elem), {
          top : result.top + (win.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
          left : result.left + (win.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
        }) : result;
      }
    },
    position : function() {
      if (this[0]) {
        var offsetParent;
        var offset;
        var parentOffset = {
          top : 0,
          left : 0
        };
        var d = this[0];
        return "fixed" === jQuery.css(d, "position") ? offset = d.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)), {
          top : offset.top - parentOffset.top - jQuery.css(d, "marginTop", true),
          left : offset.left - parentOffset.left - jQuery.css(d, "marginLeft", true)
        };
      }
    },
    offsetParent : function() {
      return this.map(function() {
        var offsetParent = this.offsetParent || docElem;
        for (; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({
    scrollLeft : "pageXOffset",
    scrollTop : "pageYOffset"
  }, function(type, prop) {
    /** @type {boolean} */
    var top = /Y/.test(prop);
    /**
     * @param {?} value
     * @return {?}
     */
    jQuery.fn[type] = function(value) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        return void 0 === val ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void(win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val);
      }, type, value, arguments.length, null);
    };
  });
  jQuery.each(["top", "left"], function(a, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(parent, val) {
      return val ? (val = curCSS(parent, prop), rnumnonpx.test(val) ? jQuery(parent).position()[prop] + "px" : val) : void 0;
    });
  });
  jQuery.each({
    Height : "height",
    Width : "width"
  }, function(name, type) {
    jQuery.each({
      padding : "inner" + name,
      content : type,
      "" : "outer" + name
    }, function(defaultExtra, original) {
      /**
       * @param {!Object} margin
       * @param {boolean} value
       * @return {?}
       */
      jQuery.fn[original] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin);
        var extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, undefined) {
          var doc;
          return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, undefined, extra);
        }, type, chainable ? margin : void 0, chainable, null);
      };
    });
  });
  /**
   * @return {?}
   */
  jQuery.fn.size = function() {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if ("function" == typeof define && define.amd) {
    define("jquery", [], function() {
      return jQuery;
    });
  }
  var _jQuery = window.jQuery;
  var old$ = window.$;
  return jQuery.noConflict = function(deep) {
    return window.$ === jQuery && (window.$ = old$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery;
  }, typeof forceWipe === undefined && (window.jQuery = window.$ = jQuery), jQuery;
});
