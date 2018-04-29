// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({10:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(_x, _y, _w, _h) {
    var _ref = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
        _ref$colour = _ref.colour,
        _col = _ref$colour === undefined ? 'black' : _ref$colour,
        _ref$label = _ref.label,
        _lab = _ref$label === undefined ? 'none' : _ref$label;

    _classCallCheck(this, Entity);

    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.colour = _col;
    this.label = _lab;
    this.remove = false;
    this.depth = 0;
  }

  _createClass(Entity, [{
    key: 'update',
    value: function update(entities) {}
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }]);

  return Entity;
}();

module.exports = Entity;
},{}],8:[function(require,module,exports) {
"use strict";

var rectangleObjectsOverlap = function rectangleObjectsOverlap(_ref, _ref2) {
  var ax = _ref.x,
      ay = _ref.y,
      aw = _ref.w,
      ah = _ref.h;
  var bx = _ref2.x,
      by = _ref2.y,
      bw = _ref2.w,
      bh = _ref2.h;
  return rectanglesOverlap(ax, ay, aw, ah, bx, by, bw, bh);
};

var rectanglesOverlap = function rectanglesOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax <= bx + bw && bx <= ax + aw && ay <= by + bh && by <= ay + ah;
};

var lerp = function lerp(a, b, t) {
  return a + (b - a) * t;
};

var least = function least(f) {
  return function (acc, val) {
    return f(val) < f(acc) ? val : acc;
  };
};
var most = function most(f) {
  return function (acc, val) {
    return f(val) > f(acc) ? val : acc;
  };
};

module.exports = {
  rectanglesOverlap: rectanglesOverlap,
  rectangleObjectsOverlap: rectangleObjectsOverlap,
  lerp: lerp,
  least: least,
  most: most
};
},{}],9:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = require('./entity');

var _require = require('./util'),
    rectanglesOverlap = _require.rectanglesOverlap;

var wouldCollide = function wouldCollide(me, them, xd, yd) {
  var ax = me.x,
      ay = me.y,
      aw = me.w,
      ah = me.h;
  var bx = them.x,
      by = them.y,
      bw = them.w,
      bh = them.h;

  return rectanglesOverlap(ax + xd, ay + yd, aw, ah, bx, by, bw, bh);
};

var willCollide = function willCollide(entities, me, xd, yd) {
  return entities.some(function (e) {
    return wouldCollide(me, e, xd, yd);
  });
};

var PhysicsEntity = function (_Entity) {
  _inherits(PhysicsEntity, _Entity);

  function PhysicsEntity(_x, _y, _w, _h) {
    var _opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _classCallCheck(this, PhysicsEntity);

    var _this = _possibleConstructorReturn(this, (PhysicsEntity.__proto__ || Object.getPrototypeOf(PhysicsEntity)).call(this, _x, _y, _w, _h, _opts));

    var _opts$gravity = _opts.gravity,
        _grav = _opts$gravity === undefined ? 0.5 : _opts$gravity,
        _opts$kinematic = _opts.kinematic,
        _kin = _opts$kinematic === undefined ? false : _opts$kinematic,
        _opts$ethereal = _opts.ethereal,
        _ether = _opts$ethereal === undefined ? false : _opts$ethereal,
        _opts$dontCollide = _opts.dontCollide,
        _dc = _opts$dontCollide === undefined ? false : _opts$dontCollide;

    _this.gravity = _grav;
    _this.kinematic = _kin;
    _this.ethereal = _ether;
    _this.dontCollide = _dc;
    _this.vx = 0;
    _this.vy = 0;
    return _this;
  }

  _createClass(PhysicsEntity, [{
    key: 'willIntersect',
    value: function willIntersect(entities, dx, dy) {
      // Only collide with 'real' entities
      var colliders = entities.filter(function (e) {
        return !(e.ethereal || false);
      });

      // Return result
      return willCollide(colliders, this, dx, dy);
    }
  }, {
    key: 'willIntersectWith',
    value: function willIntersectWith(entity, dx, dy) {
      return wouldCollide(this, entity, dx, dy);
    }
  }, {
    key: 'update',
    value: function update(entities) {
      // Accelerate due to Gravity
      if (!(this.kinematic || false)) {
        this.vy += this.gravity;
      }

      // Only collide with 'real' entities
      var colliders = entities.filter(function (e) {
        return !(e.ethereal || false);
      });

      // If dont collide then just displace and be done with it
      if (this.dontCollide) {
        this.x += this.vx;
        this.y += this.vy;
        return;
      }

      // No need to check displacement if kinematic
      if (this.kinematic) {
        return;
      }

      // Horizontal Displacement
      if (!willCollide(colliders, this, this.vx, 0)) {
        this.x += this.vx;
      } else {
        var a = 0;
        while (!willCollide(colliders, this, Math.sign(this.vx), 0) && a < 100) {
          a++;
          this.x += Math.sign(this.vx);
        }
        this.vx = 0;
      }

      // Vertical Displacement
      if (!willCollide(colliders, this, 0, this.vy)) {
        this.y += this.vy;
      } else {
        var _a = 0;
        while (!willCollide(colliders, this, 0, Math.sign(this.vy)) && _a < 100) {
          _a++;
          this.y += Math.sign(this.vy);
        }
        this.vy = 0;
      }
    }
  }]);

  return PhysicsEntity;
}(Entity);

module.exports = PhysicsEntity;
},{"./entity":10,"./util":8}],16:[function(require,module,exports) {
// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if (typeof module !== "undefined" && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (typeof define === 'function' && define.amd) {
    define(function () {return tinycolor;});
}
// Browser: Expose to window
else {
    window.tinycolor = tinycolor;
}

})(Math);

},{}],15:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = require('./entity');
var tc = require('tinycolor2');

var SplatterEntity = function (_Entity) {
  _inherits(SplatterEntity, _Entity);

  function SplatterEntity() {
    var _ref;

    _classCallCheck(this, SplatterEntity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // fade out
    var _this = _possibleConstructorReturn(this, (_ref = SplatterEntity.__proto__ || Object.getPrototypeOf(SplatterEntity)).call.apply(_ref, [this].concat(args)));

    _this.alpha = 1;
    _this.time = -30;
    _this.fadeTime = 30;
    _this.depth = -0.5;

    _this.ethereal = true;
    return _this;
  }

  _createClass(SplatterEntity, [{
    key: 'update',
    value: function update(entities) {
      // Keep track of time and calculate alpha
      this.time++;
      this.alpha = 1 - this.time / this.fadeTime;

      // die when timer up
      if (this.time >= this.fadeTime) {
        this.remove = true;
      }

      // Call super
      _get(SplatterEntity.prototype.__proto__ || Object.getPrototypeOf(SplatterEntity.prototype), 'update', this).call(this, entities);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      // Only draw-atop existing
      ctx.globalCompositeOperation = 'lighten';

      // Manipulate colour with alpha
      var c = tc(this.colour);
      c.setAlpha(this.alpha);
      ctx.fillStyle = c.toRgbString();

      // Draw us
      ctx.beginPath();
      ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
      ctx.fill();
      // ctx.drawImage(splatterImg, this.x, this.y)

      // reset operation
      ctx.globalCompositeOperation = 'source-over';
    }
  }]);

  return SplatterEntity;
}(Entity);

module.exports = SplatterEntity;
},{"./entity":10,"tinycolor2":16}],13:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhysicsEntity = require('./physicsEntity');
var SplatterEntity = require('./splatterEntity');
var force = 25;

var ParticleEntity = function (_PhysicsEntity) {
  _inherits(ParticleEntity, _PhysicsEntity);

  function ParticleEntity(_x, _y, _r) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, ParticleEntity);

    var _this = _possibleConstructorReturn(this, (ParticleEntity.__proto__ || Object.getPrototypeOf(ParticleEntity)).call(this, _x, _y, 0, 0, opts));

    _this.radius = _r;
    _this.dontCollide = true;
    _this.ethereal = true;
    _this.vx = Math.random() * force - force / 2;
    _this.vy = -Math.abs(Math.random() * force - force / 2);
    _this.depth = -1.5;
    return _this;
  }

  _createClass(ParticleEntity, [{
    key: 'update',
    value: function update(entities, _ref) {
      var addEntity = _ref.addEntity;

      // Only collide with obstacle entities
      var obstacles = entities.filter(function (e) {
        return e.label === 'obstacle';
      });
      if (this.willIntersect(obstacles, this.vx, this.vy) || this.willIntersect(obstacles, 0, 0)) {
        // Remove me
        this.remove = true;

        // Create Splat effect
        addEntity(new SplatterEntity(this.x, this.y, 0, 0, { colour: this.colour }));
      }

      // Remove when outside of level
      if (this.x < 0 || this.x > window.size[0] || this.y < 0 || this.y > window.size[1]) {
        this.remove = true;
      }

      // Update like normal, (basically just move)
      _get(ParticleEntity.prototype.__proto__ || Object.getPrototypeOf(ParticleEntity.prototype), 'update', this).call(this, entities);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.colour;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }]);

  return ParticleEntity;
}(PhysicsEntity);

module.exports = ParticleEntity;
},{"./physicsEntity":9,"./splatterEntity":15}],11:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = require('./entity.js');

var ScoreParticleEntity = function (_Entity) {
  _inherits(ScoreParticleEntity, _Entity);

  function ScoreParticleEntity() {
    var _ref;

    _classCallCheck(this, ScoreParticleEntity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = ScoreParticleEntity.__proto__ || Object.getPrototypeOf(ScoreParticleEntity)).call.apply(_ref, [this].concat(args)));
    // Call Super and get opts


    var opts = args[4];

    // Get options

    var _opts$number = opts.number,
        _num = _opts$number === undefined ? 1 : _opts$number,
        _opts$range = opts.range,
        _rng = _opts$range === undefined ? 50 : _opts$range;

    _this.number = _num;
    _this.range = _rng;
    _this.ethereal = true;
    _this.fadeTime = 15;
    _this.fade = _this.fadeTime + 50;
    _this.ease = Math.random() * 0.4 + 0.1;
    _this.depth = -4;
    return _this;
  }

  _createClass(ScoreParticleEntity, [{
    key: 'update',
    value: function update(entities) {
      // Fade out
      this.fade--;
      if (this.fade < 0) {
        this.remove = true;
      }

      /* // Find Player
      const player = entities.find(e => e.isPlayer && e.colour === this.colour)
      if (player) {
        // Find Distance to player from us
        const dist = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2)
         // If outside of range, snap to edge of range
        if (dist > this.range) {
          const dir = Math.atan2(this.y - player.y, this.x - player.x)
          const x = player.x + Math.cos(dir) * this.range
          const y = player.y + Math.sin(dir) * this.range
          this.x = lerp(this.x, x, this.ease)
          this.y = lerp(this.y, y, this.ease)
        }
      } */
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      // Draw circle for now
      ctx.fillStyle = this.colour;
      ctx.globalAlpha = Math.max(0, this.fade / this.fadeTime);
      // ctx.beginPath()
      // ctx.arc(this.x, this.y, 15, 0, Math.PI * 2)
      // ctx.fill()
      ctx.font = '40px "Lato"';
      ctx.fillText(this.number, this.x, this.y);
      ctx.globalAlpha = 1;
    }
  }]);

  return ScoreParticleEntity;
}(Entity);

module.exports = ScoreParticleEntity;
},{"./entity.js":10}],12:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = require('./entity');
var tc = require('tinycolor2');

var _require = require('./util'),
    lerp = _require.lerp;

var interp = function interp(x) {
  return Math.max(0, 0.5 * x + Math.pow(1.8 * x - 1, 3));
};

var CorpseEntity = function (_Entity) {
  _inherits(CorpseEntity, _Entity);

  function CorpseEntity() {
    var _ref;

    _classCallCheck(this, CorpseEntity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // fade out
    var _this = _possibleConstructorReturn(this, (_ref = CorpseEntity.__proto__ || Object.getPrototypeOf(CorpseEntity)).call.apply(_ref, [this].concat(args)));
    // Has the same constructor signature


    _this.alpha = 1;
    _this.time = 0;
    _this.fadeTime = 20;

    // no physics
    _this.ethereal = true;
    return _this;
  }

  _createClass(CorpseEntity, [{
    key: 'update',
    value: function update(entities) {
      // Keep track of time and calculate alpha
      this.time++;
      this.alpha = 1 - this.time / this.fadeTime;

      // die when timer up
      if (this.time >= this.fadeTime) {
        this.remove = true;
      }

      // Call super
      _get(CorpseEntity.prototype.__proto__ || Object.getPrototypeOf(CorpseEntity.prototype), 'update', this).call(this, entities);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      // Manipulate colour with alpha
      var a = interp(this.alpha);
      var c = tc(this.colour);
      c.setAlpha(a);
      ctx.fillStyle = c.toRgbString();

      // Calculate pos and size for squish effect
      var w = this.w;
      var h = lerp(this.h, 0, 1 - a);
      var x = this.x + this.w / 2;
      var y = this.y;

      // Draw us
      ctx.fillRect(x - w / 2, y + (this.h - h), w, h);
    }
  }]);

  return CorpseEntity;
}(Entity);

module.exports = CorpseEntity;
},{"./entity":10,"tinycolor2":16,"./util":8}],14:[function(require,module,exports) {
'use strict';

var _require = require('./util'),
    least = _require.least;

function botBrain(players) {
  var _this = this;

  var closestPlayer = players.reduce(least(function (p) {
    return Math.sqrt(Math.pow(p.x - _this.x, 2) + Math.pow(p.y - _this.y, 2));
  }));

  var hInp = 0;
  var jInp = 0;
  var dInp = 0;

  // Semirandom jumping
  if ((Math.random() < 0.05 || this.bouncy && Math.random() < 0.3) && (this.onGround || this.vy > 2)) {
    jInp = 1;
  }

  // Moving
  if (Math.random() < 0.8) {
    if (closestPlayer.y < this.y) {
      // Above me, watch out the way
      var dirToClosest = Math.sign(closestPlayer.x - this.x);
      hInp = -dirToClosest;
    } else {
      // Im above them, get them!
      var _dirToClosest = Math.sign(closestPlayer.x - this.x);
      hInp = _dirToClosest;
    }
  }

  // Ground Pound
  if (!this.onGround) {
    if (players.find(function (p) {
      return Math.abs(p.x - _this.x) < 40 && p.y > _this.y;
    })) {
      dInp = 1;
      jInp = 0;
    }
  }

  // Crap!
  if (this.x < 130 || this.x > 810) {
    if (this.y < 600) {
      if (!this.isStupid) {
        // Above lowest platform
        var dirToCenter = Math.sign(450 - this.x);
        hInp = dirToCenter;
      }
    } else {
      hInp = 0;
      jInp = 1;
    }
  }

  return {
    hInp: hInp * 0.75,
    jInp: jInp,
    dInp: dInp
  };
}

module.exports = botBrain;
},{"./util":8}],4:[function(require,module,exports) {
'use strict';

var orientationInputRamp = function orientationInputRamp(x) {
  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Math.pow(0.6 * x, 6) + Math.abs(x) * Math.sign(x) * s;
};

var setup = function setup(_) {
  // Keyboard
  window.keys = {};
  window.orientationInput = {};
  window.touches = {};
  window.onkeydown = function (e) {
    if (e.repeat) {
      window.keys[e.key] = 1;
    } else {
      window.keys[e.key] = 2;
    }
  };
  window.onkeyup = function (e) {
    window.keys[e.key] = 0;
    if (e.key === ' ') {
      e.preventDefault();
    }
  };
  window.ontouchstart = function (e) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = e.targetTouches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var touch = _step.value;

        var side = touch.clientX < window.innerWidth / 2 ? 'left' : 'right';
        window.touches[side] = 2;
        e.preventDefault();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
  window.ontouchend = function (e) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = e.changedTouches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var touch = _step2.value;

        var side = touch.clientX < window.innerWidth / 2 ? 'left' : 'right';
        window.touches[side] = 0;
        e.preventDefault();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };
  window.ondeviceorientation = function (e) {
    var x = e.beta;
    var y = e.gamma;
    var z = e.alpha;

    z = (z - 180) / 180;
    y = y / 90;
    x = x / 180;

    var s = 2;
    x = orientationInputRamp(x, s);
    y = orientationInputRamp(y, s);
    z = orientationInputRamp(z, s);

    window.orientationInput['x'] = x;
    window.orientationInput['y'] = y;
    window.orientationInput['z'] = z;
  };
};

var isDown = function isDown(inputs, name) {
  var input = inputs[name];
  var checks = Array.isArray(input) ? input : [input];
  return checks.map(function (i) {
    switch (i.type) {
      case 'keyboard':
        var r = window.keys[i.key] || 0;
        if (r > 0) {
          window.keys[i.key] = 1;
        }
        return r > 0;
      case 'orientation':
        var o = window.orientationInput[i.index];
        if (Math.sign(i.sign) === Math.sign(o)) {
          return Math.abs(o);
        } else {
          return 0;
        }
      case 'touch':
        var t = window.touches[i.side] || 0;
        if (t > 0) {
          window.touches[i.side] = 1;
        }
        return t > 0;
    }
  }).find(function (i) {
    return i !== 0 && i !== false;
  }) || 0;
};

var isPressed = function isPressed(inputs, name) {
  var input = inputs[name];
  var checks = Array.isArray(input) ? input : [input];
  return checks.map(function (i) {
    switch (i.type) {
      case 'keyboard':
        var r = window.keys[i.key] || 0;
        if (r > 0) {
          window.keys[i.key] = 1;
        }
        return r === 2;
      case 'touch':
        var t = window.touches[i.side] || 0;
        if (t > 0) {
          window.touches[i.side] = 1;
        }
        return t === 2;
    }
  }).find(function (i) {
    return i !== 0 && i !== false;
  }) || 0;
};

var inputs = [{
  left: [{
    type: 'keyboard',
    key: 'a'
  }, {
    type: 'orientation',
    sign: -1,
    index: 'y'
  }],
  right: [{
    type: 'keyboard',
    key: 'd'
  }, {
    type: 'orientation',
    sign: 1,
    index: 'y'
  }],
  jump: [{
    type: 'keyboard',
    key: 'w'
  }, {
    type: 'touch',
    side: 'left'
  }],
  slam: [{
    type: 'keyboard',
    key: 's'
  }, {
    type: 'touch',
    side: 'right'
  }]
}, {
  left: {
    type: 'keyboard',
    key: 'ArrowLeft'
  },
  right: {
    type: 'keyboard',
    key: 'ArrowRight'
  },
  jump: {
    type: 'keyboard',
    key: 'ArrowUp'
  },
  slam: {
    type: 'keyboard',
    key: 'ArrowDown'
  }
}, {
  left: {
    type: 'keyboard',
    key: 'j'
  },
  right: {
    type: 'keyboard',
    key: 'l'
  },
  jump: {
    type: 'keyboard',
    key: 'i'
  },
  slam: {
    type: 'keyboard',
    key: 'k'
  }
}, {
  left: {
    type: 'keyboard',
    key: 'f'
  },
  right: {
    type: 'keyboard',
    key: 'h'
  },
  jump: {
    type: 'keyboard',
    key: 't'
  },
  slam: {
    type: 'keyboard',
    key: 'g'
  }
}];

module.exports = {
  setup: setup,
  inputs: inputs,
  isDown: isDown,
  isPressed: isPressed
};
},{}],7:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhysicsEntity = require('./physicsEntity');
var ParticleEntity = require('./particleEntity');
var ScoreParticleEntity = require('./scoreParticleEntity');
var CorpseEntity = require('./corpseEntity');
var botBrain = require('./botBrain');
var tc = require('tinycolor2');

var _require = require('./util'),
    lerp = _require.lerp;

var _require2 = require('./input'),
    isDown = _require2.isDown,
    isPressed = _require2.isPressed;

var particleNum = 30;

var PlayerEntity = function (_PhysicsEntity) {
  _inherits(PlayerEntity, _PhysicsEntity);

  function PlayerEntity(_x, _y, _w, _h) {
    var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _classCallCheck(this, PlayerEntity);

    var _this = _possibleConstructorReturn(this, (PlayerEntity.__proto__ || Object.getPrototypeOf(PlayerEntity)).call(this, _x, _y, _w, _h, opts));

    var _inps = opts.inputs,
        _opts$speed = opts.speed,
        _hspd = _opts$speed === undefined ? 2.3 : _opts$speed,
        _opts$jumpHeight = opts.jumpHeight,
        _jmph = _opts$jumpHeight === undefined ? 14 : _opts$jumpHeight,
        _opts$slamHeight = opts.slamHeight,
        _slmh = _opts$slamHeight === undefined ? 3 : _opts$slamHeight,
        _opts$verticalFrictio = opts.verticalFriction,
        _vfric = _opts$verticalFrictio === undefined ? 0.01 : _opts$verticalFrictio,
        _opts$horizontalFrict = opts.horizontalFriction,
        _hfric = _opts$horizontalFrict === undefined ? 0.2 : _opts$horizontalFrict,
        _spwnp = opts.spawnPlayer,
        _n = opts.number,
        _opts$kills = opts.kills,
        _klls = _opts$kills === undefined ? 0 : _opts$kills,
        _opts$isBot = opts.isBot,
        _isbt = _opts$isBot === undefined ? true : _opts$isBot;

    _this.inputs = _inps;
    _this.hSpd = _hspd;
    _this.jmpHght = _jmph;
    _this.slmHght = _slmh;
    _this.hFric = _hfric;
    _this.vFric = _vfric;
    _this.jumps = 1;
    _this.jumpsMax = 2;
    _this.isPlayer = true;
    _this.spawnPlayer = _spwnp;
    _this.number = _n;
    _this.stretch = 1;
    _this.squeeze = 1;
    _this.depth = -1;
    _this.kills = _klls;

    // Bot Stuff
    _this.timeSinceLastInput = 0;
    _this.becomeBotTimeout = 450;
    _this.isBot = _isbt;
    _this.onGround = false;
    _this.isStupid = Math.random() < 0.3;
    _this.bouncy = Math.random() < 0.2;
    return _this;
  }

  _createClass(PlayerEntity, [{
    key: 'die',
    value: function die(addEntity) {
      // Remove Player
      this.remove = true;

      // Spawn Corpse
      addEntity(new CorpseEntity(this.x, this.y, this.w, this.h, { colour: this.getColour() }));

      // Spawn particles
      for (var i = 0; i < particleNum; i++) {
        var x = this.x + this.w / 2;
        var y = this.y + this.h / 2;
        var particle = new ParticleEntity(x, y, 7, { colour: this.getColour() });
        addEntity(particle);
      }

      // Spawn new player
      this.spawnPlayer(this.number, { isBot: this.isBot, kills: this.kills });
    }
  }, {
    key: 'getInput',
    value: function getInput(entities) {
      var _this2 = this;

      var hInp = +isDown(this.inputs, 'right') - +isDown(this.inputs, 'left');
      var jInp = isPressed(this.inputs, 'jump');
      var dInp = isDown(this.inputs, 'slam');

      if (hInp === 0 && !jInp && !dInp) {
        this.timeSinceLastInput += 1;
        if (this.timeSinceLastInput > this.becomeBotTimeout) {
          this.isBot = true;
          this.timeSinceLastInput = 0;
        }
      } else {
        this.timeSinceLastInput = 0;
        this.isBot = false;
      }

      if (!this.isBot) {
        return {
          hInp: hInp,
          jInp: jInp,
          dInp: dInp
        };
      } else {
        // Get players
        var players = entities.filter(function (e) {
          return e.isPlayer && e !== _this2 && !e.remove;
        });

        // Are there any?
        if (players.length === 0) {
          return { hInp: 0, jInp: 0, dInp: 0 };
        }

        // Use botbrain
        return botBrain.bind(this)(players);
      }
    }
  }, {
    key: 'update',
    value: function update(entities, _ref) {
      var _this3 = this;

      var addEntity = _ref.addEntity;

      // Get player input
      var _getInput = this.getInput(entities),
          hInp = _getInput.hInp,
          jInp = _getInput.jInp,
          dInp = _getInput.dInp;

      // Slight Dash


      if (Math.sign(this.vx) !== hInp && hInp === 0) {
        this.vx += hInp * this.hSpd * 2.4;
      }

      // Horizontal Movement
      this.vx += hInp * this.hSpd;

      // Apply friction (damping)
      this.vx = lerp(this.vx, 0, this.hFric);
      this.vy = lerp(this.vy, 0, this.vFric);

      // Jumping
      if (this.jumps > 1 && jInp) {
        if (this.vy > 0) {
          this.vy = -this.jmpHght * 0.75;
        } else {
          if (this.vy === 0) {
            this.vy -= this.jmpHght;
          } else {
            this.vy -= this.jmpHght * 0.7;
          }
        }
        this.jumps--;
        this.stretch = 0.7;
        this.squeeze = 1.3;
      }

      // Reset stretch and squeeze
      this.stretch = lerp(this.stretch, 1, 0.1);
      this.squeeze = lerp(this.squeeze, 1, 0.1);

      // Slamming
      if (dInp) {
        this.vy += this.slmHght;
      }

      // Regain jumps & make splats
      if (this.willIntersect(entities, 0, 1)) {
        /*
        // Create Splats
        let x = this.x + this.w / 2
        let y = this.y + this.h
        let splatter = new SplatterEntity(x, y, 0, 0, { colour: this.colour })
        addEntity(splatter)
        */

        // Squishing and stuff
        if (dInp) {
          this.stretch = lerp(this.stretch, 1.3, 0.4);
          this.squeeze = lerp(this.squeeze, 0.7, 0.4);
        } else {
          this.stretch = lerp(this.stretch, 1.1, 0.2);
          this.squeeze = lerp(this.squeeze, 0.9, 0.2);
        }

        // reset jumps & gripTime
        this.jumps = this.jumpsMax;
        this.gripTime = this.gripTimeMax;

        // For bot
        this.onGround = true;
      } else {
        this.stretch = lerp(this.stretch, 0.8, 0.2);
        this.squeeze = lerp(this.squeeze, 1.2, 0.2);

        // For bot
        this.onGround = false;
      }

      // Kill other players
      var players = entities.filter(function (e) {
        return e.isPlayer && e !== _this3 && !e.remove;
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = players[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var player = _step.value;

          if (this.willIntersectWith(player, 0, 1)) {
            // Jump Effect
            if (!dInp) {
              this.vy = -this.jmpHght * 0.9;
              this.jumps = 2;
              this.stretch = 0.7;
              this.squeeze = 1.3;
              player.squeeze = 0.7;
              player.stretch = 1.3;
            } else {
              // Increment kills
              this.kills++;

              // Kill Player
              player.die(addEntity);

              // Spawn score particle
              addEntity(new ScoreParticleEntity(this.x, this.y - 10, 0, 0, { colour: this.getColour(), number: this.kills }));
            }
          }
        }

        // Fall out of world
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this.y - this.h > window.size[1]) {
        this.die(addEntity);
      }

      // Loop round world
      if (!this.isBot && this.y < 650 || this.isBot && this.y < 550) {
        if (this.x > window.size[0]) {
          this.x = -this.w;
        }
        if (this.x + this.w < 0) {
          this.x = window.size[0];
        }
      }

      // Push down
      if (this.y < 0) {
        this.vy += 1;
      }

      // Update Physics
      _get(PlayerEntity.prototype.__proto__ || Object.getPrototypeOf(PlayerEntity.prototype), 'update', this).call(this, entities);
    }
  }, {
    key: 'getColour',
    value: function getColour() {
      var c = tc(this.colour);
      if (this.isBot) {
        c.lighten(20);
      }
      return c.toRgbString();
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.getColour();
      var w = this.w * this.stretch;
      var h = this.h * this.squeeze;
      var x = this.x + (1 - this.stretch) * this.w / 2;
      var y = this.y + (1 - this.squeeze) * this.h;
      ctx.fillRect(x, y, w, h);
    }
  }]);

  return PlayerEntity;
}(PhysicsEntity);

module.exports = PlayerEntity;
},{"./physicsEntity":9,"./particleEntity":13,"./scoreParticleEntity":11,"./corpseEntity":12,"./botBrain":14,"tinycolor2":16,"./util":8,"./input":4}],6:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = require('./entity');
var PlayerEntity = require('./playerEntity');
var tc = require('tinycolor2');

var _require = require('./util'),
    lerp = _require.lerp;

var interp = function interp(x) {
  return Math.max(0, 0.5 * x + Math.pow(1.8 * x - 1, 3));
};

var BirthEntity = function (_Entity) {
  _inherits(BirthEntity, _Entity);

  function BirthEntity() {
    var _ref;

    _classCallCheck(this, BirthEntity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // Get spawn object
    var _this = _possibleConstructorReturn(this, (_ref = BirthEntity.__proto__ || Object.getPrototypeOf(BirthEntity)).call.apply(_ref, [this].concat(args)));
    // Has the same constructor signature


    var opts = args[4];
    _this.spawn = opts.spawn;

    // fade out
    _this.alpha = 0;
    _this.time = 0;
    _this.fadeTime = 80;

    // no physics
    _this.ethereal = true;
    return _this;
  }

  _createClass(BirthEntity, [{
    key: 'update',
    value: function update(entities, _ref2) {
      var _this2 = this;

      var addEntity = _ref2.addEntity;

      // Keep track of time and calculate alpha
      this.time++;
      this.alpha = this.time / this.fadeTime;

      // die when timer up
      if (this.time >= this.fadeTime) {
        // Remove in the way
        entities.filter(function (e) {
          return e instanceof PlayerEntity;
        }).forEach(function (p) {
          if (p.willIntersectWith(_this2, 0, 0)) {
            p.die(addEntity);
          }
        });

        // Remove me and create spawn
        this.remove = true;
        if (this.spawn) {
          addEntity(this.spawn);
        }
      }

      // Call super
      _get(BirthEntity.prototype.__proto__ || Object.getPrototypeOf(BirthEntity.prototype), 'update', this).call(this, entities);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      // Manipulate colour with alpha
      var a = interp(this.alpha);
      var c = tc(this.colour);
      c.setAlpha(a);
      ctx.fillStyle = c.toRgbString();
      var w = lerp(this.w, 0, 1 - a);
      var h = lerp(this.h, 0, 1 - a);
      var x = this.x + this.w / 2;
      var y = this.y + this.h / 2;
      ctx.fillRect(x - w / 2, y - h / 2, w, h);
    }
  }]);

  return BirthEntity;
}(Entity);

module.exports = BirthEntity;
},{"./entity":10,"./playerEntity":7,"tinycolor2":16,"./util":8}],3:[function(require,module,exports) {
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PhysicsEntity = require('./physicsEntity');
var PlayerEntity = require('./playerEntity');
var BirthEntity = require('./birthEntity');

var _require = require('./input'),
    inputs = _require.inputs;

var _require2 = require('./util'),
    least = _require2.least,
    most = _require2.most;

var entities = [];

var playerColours = ['#5468fe', '#fe4c55', '#ff9800', '#4caf50'];
var playerSpawns = [[275, 290], [675, 290], [300, 490], [650, 490], [200, 60], [700, 60]];

var spawnPlayer = function spawnPlayer(n, opts) {
  var players = entities.filter(function (e) {
    return e.isPlayer || e.label === 'birth';
  });
  var spawn = playerSpawns[Math.round(Math.random() * (playerSpawns.length - 1))];
  if (players.length) {
    var dist = function dist(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          ax = _ref2[0],
          ay = _ref2[1];

      return function (_ref3) {
        var bx = _ref3.x,
            by = _ref3.y;
        return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
      };
    };
    var distToNearestPlayer = function distToNearestPlayer(spawn) {
      return dist(spawn)(players.reduce(least(dist(spawn))));
    };
    spawn = playerSpawns.reduce(most(distToNearestPlayer));
  }
  var playerOpts = { number: n, colour: playerColours[n], inputs: inputs[n], spawnPlayer: spawnPlayer };
  var player = new (Function.prototype.bind.apply(PlayerEntity, [null].concat(_toConsumableArray(spawn), [50, 50, _extends({}, playerOpts, opts)])))();
  entities.push(new (Function.prototype.bind.apply(BirthEntity, [null].concat(_toConsumableArray(spawn), [50, 50, { number: n, colour: player.getColour(), spawn: player, label: 'birth' }])))());
};

spawnPlayer(0);
// spawnPlayer(1)
// spawnPlayer(2)
// spawnPlayer(3)

entities.push(new PhysicsEntity(150, 600, 700, 60, { colour: '#313131', kinematic: true, label: 'obstacle' }));
entities.push(new PhysicsEntity(200, 400, 200, 20, { colour: '#313131', kinematic: true, label: 'obstacle' }));
entities.push(new PhysicsEntity(600, 400, 200, 20, { colour: '#313131', kinematic: true, label: 'obstacle' }));

var addEntity = function addEntity(entity) {
  return entities.push(entity);
};

var byDepth = function byDepth(a, b) {
  return b.depth - a.depth;
};

var main = function main(ctx) {
  entities.sort(byDepth).forEach(function (ent) {
    ent.update(entities.filter(function (e) {
      return e !== ent;
    }), { addEntity: addEntity });
    ent.draw(ctx);
  });
  entities = entities.filter(function (e) {
    return !e.remove;
  });
};

module.exports = main;
},{"./physicsEntity":9,"./playerEntity":7,"./birthEntity":6,"./input":4,"./util":8}],5:[function(require,module,exports) {
'use strict';

var create = function create(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  window.document.body.appendChild(canvas);
  var context = canvas.getContext('2d');
  return context;
};

module.exports = create;
},{}],2:[function(require,module,exports) {
'use strict';

var size = [1000, 800];
var main = require('./main');
var context = require('./canvas')(size[0], size[1]);
require('./input').setup();
var backgroundColour = '#FFF';

window.size = size;

var loop = function loop(_) {
  context.fillStyle = backgroundColour;
  context.fillRect(0, 0, size[0], size[1]);
  main(context);
  window.requestAnimationFrame(loop);
};

loop();
},{"./main":3,"./canvas":5,"./input":4}],22:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '49352' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[22,2])
//# sourceMappingURL=/dist/47b48e2b997c95a2b35156a24cc21a9f.map