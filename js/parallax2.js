'use strict';
!function($, window, selector, undefined) {
  /**
   * @param {?} element
   * @param {!Object} options
   * @return {?}
   */
  function Parallax(element, options) {
    var self = this;
    if ("object" == typeof options) {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }
    this.$element = $(element);
    if (!this.imageSrc && this.$element.is("img")) {
      this.imageSrc = this.$element.attr("src");
    }
    /** @type {!Array} */
    var positions = (this.position + "").toLowerCase().match(/\S+/g) || [];
    if (positions.length < 1 && positions.push("center"), 1 == positions.length && positions.push(positions[0]), ("top" == positions[0] || "bottom" == positions[0] || "left" == positions[1] || "right" == positions[1]) && (positions = [positions[1], positions[0]]), this.positionX != undefined && (positions[0] = this.positionX.toLowerCase()), this.positionY != undefined && (positions[1] = this.positionY.toLowerCase()), self.positionX = positions[0], self.positionY = positions[1], "left" != this.positionX && 
    "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({
        backgroundImage : "url(" + this.imageSrc + ")",
        backgroundSize : "cover",
        backgroundPosition : this.position
      }), this;
    }
    if (navigator.userAgent.match(/(Android)/)) {
      return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({
        backgroundImage : "url(" + this.imageSrc + ")",
        backgroundSize : "cover",
        backgroundPosition : this.position
      }), this;
    }
    this.$mirror = $("<div />").prependTo("body");
    var slider = this.$element.find(">.parallax-slider");
    /** @type {boolean} */
    var n = false;
    if (0 == slider.length) {
      this.$slider = $("<img />").prependTo(this.$mirror);
    } else {
      this.$slider = slider.prependTo(this.$mirror);
      /** @type {boolean} */
      n = true;
    }
    this.$mirror.addClass("parallax-mirror").css({
      visibility : "hidden",
      zIndex : this.zIndex,
      position : "fixed",
      top : 0,
      left : 0,
      overflow : "hidden"
    });
    this.$slider.addClass("parallax-slider").one("load", function() {
      if (!(self.naturalHeight && self.naturalWidth)) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth = this.naturalWidth || this.width || 1;
      }
      /** @type {number} */
      self.aspectRatio = self.naturalWidth / self.naturalHeight;
      if (!Parallax.isSetup) {
        Parallax.setup();
      }
      Parallax.sliders.push(self);
      /** @type {boolean} */
      Parallax.isFresh = false;
      Parallax.requestRender();
    });
    if (!n) {
      this.$slider[0].src = this.imageSrc;
    }
    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
      this.$slider.trigger("load");
    }
  }
  /**
   * @param {string} opts
   * @return {?}
   */
  function Plugin(opts) {
    return this.each(function() {
      var $this = $(this);
      var options = "object" == typeof opts && opts;
      if (this == window || this == selector || $this.is("body")) {
        Parallax.configure(options);
      } else {
        if ($this.data("px.parallax")) {
          if ("object" == typeof opts) {
            $.extend($this.data("px.parallax"), options);
          }
        } else {
          options = $.extend({}, $this.data(), options);
          $this.data("px.parallax", new Parallax(this, options));
        }
      }
      if ("string" == typeof opts) {
        if ("destroy" == opts) {
          Parallax.destroy(this);
        } else {
          Parallax[opts]();
        }
      }
    });
  }
  !function() {
    /** @type {number} */
    var bytes = 0;
    /** @type {!Array} */
    var vendors = ["ms", "moz", "webkit", "o"];
    /** @type {number} */
    var i = 0;
    for (; i < vendors.length && !window.requestAnimationFrame; ++i) {
      window.requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) {
      /**
       * @param {!Function} callback
       * @return {?}
       */
      window.requestAnimationFrame = function(callback) {
        /** @type {number} */
        var i = (new Date).getTime();
        /** @type {number} */
        var start = Math.max(0, 16 - (i - bytes));
        var childStartView2 = window.setTimeout(function() {
          callback(i + start);
        }, start);
        return bytes = i + start, childStartView2;
      };
    }
    if (!window.cancelAnimationFrame) {
      /**
       * @param {?} id
       * @return {undefined}
       */
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }();
  $.extend(Parallax.prototype, {
    speed : .2,
    bleed : 0,
    zIndex : -100,
    iosFix : true,
    androidFix : true,
    position : "center",
    overScrollFix : false,
    refresh : function() {
      this.boxWidth = this.$element.outerWidth();
      this.boxHeight = this.$element.outerHeight() + 2 * this.bleed;
      /** @type {number} */
      this.boxOffsetTop = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      /** @type {number} */
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      /** @type {number} */
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      /** @type {number} */
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      /** @type {number} */
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;
      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        /** @type {number} */
        this.imageWidth = imageHeightMin * this.aspectRatio | 0;
        /** @type {number} */
        this.imageHeight = imageHeightMin;
        /** @type {number} */
        this.offsetBaseTop = imageOffsetMin;
        /** @type {number} */
        var margin = this.imageWidth - this.boxWidth;
        /** @type {number} */
        this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -margin : isNaN(this.positionX) ? -margin / 2 | 0 : Math.max(this.positionX, -margin);
      } else {
        this.imageWidth = this.boxWidth;
        /** @type {number} */
        this.imageHeight = this.boxWidth / this.aspectRatio | 0;
        /** @type {number} */
        this.offsetLeft = 0;
        /** @type {number} */
        margin = this.imageHeight - imageHeightMin;
        /** @type {number} */
        this.offsetBaseTop = "top" == this.positionY ? imageOffsetMin : "bottom" == this.positionY ? imageOffsetMin - margin : isNaN(this.positionY) ? imageOffsetMin - margin / 2 | 0 : imageOffsetMin + Math.max(this.positionY, -margin);
      }
    },
    render : function() {
      var scrollTop = Parallax.scrollTop;
      var scrollLeft = Parallax.scrollLeft;
      var overScroll = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;
      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
        /** @type {string} */
        this.visibility = "visible";
        /** @type {number} */
        this.mirrorTop = this.boxOffsetTop - scrollTop;
        /** @type {number} */
        this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
        /** @type {number} */
        this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
      } else {
        /** @type {string} */
        this.visibility = "hidden";
      }
      this.$mirror.css({
        transform : "translate3d(0px, 0px, 0px)",
        visibility : this.visibility,
        top : this.mirrorTop - overScroll,
        left : this.mirrorLeft,
        height : this.boxHeight,
        width : this.boxWidth
      });
      this.$slider.css({
        transform : "translate3d(0px, 0px, 0px)",
        position : "absolute",
        top : this.offsetTop,
        left : this.offsetLeft,
        height : this.imageHeight,
        width : this.imageWidth,
        maxWidth : "none"
      });
    }
  });
  $.extend(Parallax, {
    scrollTop : 0,
    scrollLeft : 0,
    winHeight : 0,
    winWidth : 0,
    docHeight : 1 << 30,
    docWidth : 1 << 30,
    sliders : [],
    isReady : false,
    isFresh : false,
    isBusy : false,
    setup : function() {
      if (!this.isReady) {
        var $slides = $(selector);
        var $W = $(window);
        /**
         * @return {undefined}
         */
        var loadDimensions = function() {
          Parallax.winHeight = $W.height();
          Parallax.winWidth = $W.width();
          Parallax.docHeight = $slides.height();
          Parallax.docWidth = $slides.width();
        };
        /**
         * @return {undefined}
         */
        var loadScrollPosition = function() {
          var winScrollTop = $W.scrollTop();
          /** @type {number} */
          var scrollTopMax = Parallax.docHeight - Parallax.winHeight;
          /** @type {number} */
          var cmMaxHeight = Parallax.docWidth - Parallax.winWidth;
          /** @type {number} */
          Parallax.scrollTop = Math.max(0, Math.min(scrollTopMax, winScrollTop));
          /** @type {number} */
          Parallax.scrollLeft = Math.max(0, Math.min(cmMaxHeight, $W.scrollLeft()));
          /** @type {number} */
          Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
        };
        $W.on("resize.px.parallax load.px.parallax", function() {
          loadDimensions();
          /** @type {boolean} */
          Parallax.isFresh = false;
          Parallax.requestRender();
        }).on("scroll.px.parallax load.px.parallax", function() {
          loadScrollPosition();
          Parallax.requestRender();
        });
        loadDimensions();
        loadScrollPosition();
        /** @type {boolean} */
        this.isReady = true;
      }
    },
    configure : function(obj) {
      if ("object" == typeof obj) {
        delete obj.refresh;
        delete obj.render;
        $.extend(this.prototype, obj);
      }
    },
    refresh : function() {
      $.each(this.sliders, function() {
        this.refresh();
      });
      /** @type {boolean} */
      this.isFresh = true;
    },
    render : function() {
      if (!this.isFresh) {
        this.refresh();
      }
      $.each(this.sliders, function() {
        this.render();
      });
    },
    requestRender : function() {
      var container = this;
      if (!this.isBusy) {
        /** @type {boolean} */
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          container.render();
          /** @type {boolean} */
          container.isBusy = false;
        });
      }
    },
    destroy : function(e) {
      var i;
      var parallaxElement = $(e).data("px.parallax");
      parallaxElement.$mirror.remove();
      /** @type {number} */
      i = 0;
      for (; i < this.sliders.length; i = i + 1) {
        if (this.sliders[i] == parallaxElement) {
          this.sliders.splice(i, 1);
        }
      }
      $(e).data("px.parallax", false);
      if (0 === this.sliders.length) {
        $(window).off("scroll.px.parallax resize.px.parallax load.px.parallax");
        /** @type {boolean} */
        this.isReady = false;
        /** @type {boolean} */
        Parallax.isSetup = false;
      }
    }
  });
  var old = $.fn.parallax;
  /** @type {function(string): ?} */
  $.fn.parallax = Plugin;
  /** @type {function(?, !Object): ?} */
  $.fn.parallax.Constructor = Parallax;
  /**
   * @return {?}
   */
  $.fn.parallax.noConflict = function() {
    return $.fn.parallax = old, this;
  };
  $(selector).on("ready.px.parallax.data-api", function() {
    $('[data-parallax="scroll"]').parallax();
  });
}(jQuery, window, document);
