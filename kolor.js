/**
 * @file Kolor.js
 * @author Justineo(justice360@gmail.com)
 */
(function (define) {

    // Global namespace
    var kolor;

    // ## Config
    //
    // Global configuraiton. See `kolor.config` for more details.

    var config = {
        cssPrecision: 'auto'
    };

    // ## Utilities

    var util = {
        // ### Object utils

        // Checks if the given value is a number.
        isNumber: function (value) {
            return '[object Number]' === Object.prototype.toString.call(value) && isFinite(value);
        },

        // Checks if the given value is a string.
        isString: function (value) {
            return '[object String]' === Object.prototype.toString.call(value);
        },

        // Retrieves the type of the given value.
        //
        // Return value can be 'String', 'Number', 'Object', 'Array', ...
        //
        // *Result might be different among browsers.*
        typeOf: function (value) {
            return Object.prototype.toString.call(value).slice(8, -1);
        },

        // Shorthand method for Object.prototype.hasOwnProperty.
        has: function (obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        },


        // ### Array utils

        // Slices any array-ish object.
        slice: function (arrayish, begin, end) {
            return Array.prototype.slice.call(arrayish, begin, end);
        },

        // Swaps two array elements.
        swap: function (items, i, j) {
            var k = items[i];
            items[i] = items[j];
            items[j] = k;
        },

        // Shuffles the given array using
        // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
        shuffle: function (items) {
            for (var i = items.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                util.swap(items, i, j);
            }
        },

        // Iterates through the given array and produces a new array by mapping each value through
        // a given function.
        map: function (source, callback, context) {
            var results = [];
            var i = source.length;
            while (i--) {
                results[i] = callback.call(context || source, source[i], i);
            }
            return results;
        },


        // ### Number utils

        // Clamps a number to a given range.
        clamp: function (value, min, max) {
            if (min > max) {
                max = min + max;
                min = max - min;
                max = max - min;
            }
            return Math.min(max, Math.max(min, value));
        },

        // Wraps a number inside a given range with modulo operation.
        wrap: function (value, min, max) {
            var interval;
            if (min > max) {
                max = min + max;
                min = max - min;
                max = max - min;
            }
            interval = max - min;
            return min + ((value % interval) + interval) % interval;
        },

        // Fills leading zeros for a number to make sure it has a fixed width.
        zeroFill: function (number, width) {
            number += '';
            width -= number.length;
            if (width > 0) {
                return new Array(width + 1).join('0') + number;
            }
            return number + '';
        },

        // Generates a random number in a given range.
        random: function (min, max) {
            if (min === max) {
                return min;
            }
            return Math.random() * (max - min) + min;
        },

        // Extend the destination object from a source object.
        extend: function (dest, source) {
            for (var key in source) {
                dest[key] = source[key];
            }
            return dest;
        }
    };


    // ## Preparation

    // ### Color name-hex map
    //
    // see [Named Colors, CSS Color Module Level 4](http://dev.w3.org/csswg/css-color/#named-colors)
    var NAMED_COLORS = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        red: '#ff0000',
        rebeccapurple: '#663399',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32',

        transparent: 'rgba(0, 0, 0, 0)' // CSS keyword
    };

    // ### Named hues
    //
    // see [Simple Named Hues: the <named-hue> term, CSS Color Module Level 4](http://dev.w3.org/csswg/css-color/#simple-hues)
    //
    // #### Base hues
    var BASE_HUE = {
        red: 0,
        orange: 30,
        yellow: 60,
        green: 120,
        blue: 240,
        purple: 300
    };

    // #### Splash hues
    var SPLASH_HUE = {
        reddish: 0,
        orangish: 30,
        yellowish: 60,
        greenish: 120,
        bluish: 240,
        purplish: 300
    };

    // Sorted base hues in array
    var NAMED_HUE_INDEX = {
        0: 0,
        30: 1,
        60: 2,
        120: 3,
        240: 4,
        300: 5
    };

    // 0 -> 360 in some circumstances for correct calculation
    function fixHues(h1, h2) {
        var diff = Math.abs(NAMED_HUE_INDEX[h1] - NAMED_HUE_INDEX[h2]);
        if (diff !== 1 && diff !== 5) {
            return false;
        }

        var result = {
            h1: h1,
            h2: h2
        };
        if (h1 === 0 && h2 === 300) {
            result.h1 = 360;
        } else if (h2 === 0 && h1 === 300) {
            result.h2 = 360;
        }
        return result;
    }

    // Parses simple named hues
    function parseNamedHues(value) {
        var tokens = value.split(/\s+/);
        var l = tokens.length;

        if (l < 1 || l > 2) {
            return false;
        }

        var t1 = tokens[l - 1].toLowerCase();

        if (!(t1 in BASE_HUE)) {
            return false;
        }

        var h1 = BASE_HUE[t1];

        // single-value syntax
        if (l === 1) {
            return h1;
        }

        // double-value syntax
        var h2;
        var t2 = tokens[0].toLowerCase();
        var hues;
        if (t2 in BASE_HUE) {
            h2 = BASE_HUE[t2];
            hues = fixHues(h1, h2);
            return hues ? (hues.h1 + hues.h2) / 2 : false;
        } else if (t2 in SPLASH_HUE) {
            h2 = SPLASH_HUE[t2];
            hues = fixHues(h1, h2);
            return hues ? (hues.h1 + (hues.h2 - hues.h1) / 4) : false;
        } else {
            var found = t2.match(/(\w+)\(\s*([^\)]+)\s*\)/i);
            if (!found) {
                return false;
            }
            t2 = found[1];
            if (t2 in SPLASH_HUE) {
                h2 = SPLASH_HUE[t2];
                hues = fixHues(h1, h2);
                var percent = DATATYPES[PERCENT].parse(found[2]);
                if (percent === false) {
                    return percent;
                }
                return hues ? (hues.h1 + (hues.h2 - hues.h1) * percent) : false;
            }
        }

        return false;
    }

    // ### Color value data type flags
    //
    // Uses powers of 2 in order to easily define several data types for one data field.
    //
    // * INTEGER: 0, 128, 255, ...
    // * NUMBER: 0, 0.5, 0.75, ...
    // * PERCENT: 10%, 87.53%, ...
    var INTEGER = 1;
    var NUMBER = 2;
    var PERCENT = 4;
    var HUE = 8;

    // ### Utils for each data type
    //
    // * *parse* - gets valid value from various types of input.
    // * *stringify* - produces string value according to actual data value.
    var DATATYPES = {
        1: {
            flag: INTEGER,
            parse: function (value) {
                switch (util.typeOf(value)) {
                    case 'Number':
                        value = Math.round(value);
                        break;
                    case 'String':
                        if (value.match(/^[\-+]?\d+$/i)) {
                            value = parseInt(value, 10);
                        } else {
                            value = false;
                        }
                        break;
                    default:
                        value = false;
                }
                return value;
            },
            stringify: function (value) {
                return Math.round(value) + '';
            }
        },
        2: {
            flag: NUMBER,
            parse: function (value) {
                switch (util.typeOf(value)) {
                    case 'Number':
                        break;
                    case 'String':
                        if (value.match(/^[\-+]?\d+(?:\.\d+)?$|^[\-+]?\.\d+$/i)) {
                            value = parseFloat(value);
                        } else {
                            value = false;
                        }
                        break;
                    default:
                        value = false;
                }
                return value;
            },
            stringify: function (value) {
                var precision = config.cssPrecision;
                return precision === 'auto'
                    ? value + ''
                    : parseFloat(value.toFixed(precision)) + '';
            }
        },
        4: {
            flag: PERCENT,
            parse: function (value) {
                switch (util.typeOf(value)) {
                    case 'String':
                        if (value.match(/^[\-+]?\d+(?:\.\d+)?%$|^[\-+]?\.\d+%$/i)) {
                            value = parseFloat(value) / 100;
                        } else {
                            value = false;
                        }
                        break;
                    default:
                        value = false;
                }
                return value;
            },
            stringify: function (value) {
                var precision = config.cssPrecision;
                return precision === 'auto'
                    ? value * 100 + '%'
                    : parseFloat((value * 100).toFixed(precision)) + '%';
            }
        },
        8: {
            flag: HUE,
            parse: function (value) {
                switch (util.typeOf(value)) {
                    case 'String':
                        if (value.match(/^[\-+]?\d+(?:\.\d+)?deg$|^[\-+]?\.\d+deg$/i)) {
                            value = parseFloat(value);
                        } else if (value = parseNamedHues(value)) {
                            // do nothing
                        } else {
                            value = false;
                        }
                        break;
                    default:
                        value = false;
                }
                return value;
            },
            stringify: function (value) {
                var precision = config.cssPrecision;
                return precision === 'auto'
                    ? value + 'deg'
                    : parseFloat(value.toFixed(precision)) + 'deg';
            }
        }
    };

    // ### Value filters
    function CLAMP(value) {
        return util.clamp(value, this.range[0], this.range[1]);
    }


    function MOD(value) {
        return util.wrap(value, this.range[0], this.range[1]);
    }

    // ### Color channels
    //
    function Channel(options) {
        this.optional = false;
        util.extend(this, options);
    }

    // #### Channel.create(*type*, *name*, *alias*[, *options*])
    //
    // Create a color channel.
    //
    // ##### Parameters
    // * *type* - the channel type.
    // * *name* - the name of the channel.
    // * *alias* - the alias of the channel.
    // * *options* - additional options of the channel.
    //
    // ##### Return values
    // Returns the created channel object.
    Channel.create = function (type, name, alias, options) {
        return new type(util.extend(options || {}, {
            name: name,
            alias: alias
        }));
    };

    // Constructor for 0~255 integer or percentage.
    function Octet() {
        Channel.apply(this, arguments);
        this.dataType = INTEGER | PERCENT;
        this.cssType = INTEGER;
        this.range = [0, 255];
        this.filter = CLAMP;
        this.initial = 255;
    }
    Octet.prototype = new Channel();
    Octet.prototype.constructor = Octet;

    // Constructor for channel can be number from 0~1 or percentage.
    function Ratio() {
        Channel.apply(this, arguments);
        this.dataType = NUMBER | PERCENT;
        this.cssType = NUMBER;
        this.range = [0, 1];
        this.filter = CLAMP;
        this.initial = 1;
    }
    Ratio.prototype = new Channel();
    Ratio.prototype.constructor = Ratio;

    // Constructor for ratios which output percent values.
    function Percent() {
        Ratio.apply(this, arguments);
        this.cssType = PERCENT;
    }
    Percent.prototype = new Ratio();
    Percent.prototype.constructor = Percent;

    // Constructor for those channel can be .
    function Hue() {
        Channel.apply(this, arguments);
        this.dataType = NUMBER | HUE;
        this.cssType = NUMBER;
        this.range = [0, 360];
        this.filter = MOD;
        this.initial = 0;
    }
    Hue.prototype = new Channel();
    Hue.prototype.constructor = Hue;

    // ### Color space configurations
    var SPACES = {
        RGB: {
            channels: [
                Channel.create(Octet, 'red', 'r'),
                Channel.create(Octet, 'green', 'g'),
                Channel.create(Octet, 'blue', 'b')
            ],
            pattern: /rgb\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        RGBA: {
            channels: [
                Channel.create(Octet, 'red', 'r'),
                Channel.create(Octet, 'green', 'g'),
                Channel.create(Octet, 'blue', 'b'),
                Channel.create(Ratio, 'alpha', 'a')
            ],
            pattern: /rgba\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HSL: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'saturation', 's'),
                Channel.create(Percent, 'lightness', 'l')
            ],
            pattern: /hsl\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HSLA: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'saturation', 's'),
                Channel.create(Percent, 'lightness', 'l'),
                Channel.create(Ratio, 'alpha', 'a')
            ],
            pattern: /hsla\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HSV: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'saturation', 's'),
                Channel.create(Percent, 'value', 'v')
            ],
            pattern: /hsv\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HSVA: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'saturation', 's'),
                Channel.create(Percent, 'value', 'v'),
                Channel.create(Ratio, 'alpha', 'a')
            ],
            pattern: /hsva\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i
        },
        HWB: {
            channels: [
                Channel.create(Hue, 'hue', 'h'),
                Channel.create(Percent, 'whiteness', 'w'),
                Channel.create(Percent, 'blackness', 'b'),
                Channel.create(Ratio, 'alpha', 'a', {optional: true})
            ],
            pattern: /hwb\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,\)]+?)(?:\s*,\s*([^\)]+?))?\s*\)/i
        },
        GRAY: {
            channels: [
                Channel.create(Octet, 'shade', 's'),
                Channel.create(Ratio, 'alpha', 'a')
            ],
            pattern: /gray\(\s*([^,\)]+?)(?:\s*,\s*([^\)]+?))?\s*\)/i
        },
        CMYK: {
            channels: [
                Channel.create(Ratio, 'cyan', 'c'),
                Channel.create(Ratio, 'magenta', 'm'),
                Channel.create(Ratio, 'yellow', 'y'),
                Channel.create(Ratio, 'black', ['b', 'k']),
                Channel.create(Ratio, 'alpha', 'a', {optional: true})
            ],
            pattern: /(?:device-)?cmyk\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)(?:\s*,\s*([^\)]+?))?\s*\)/i
        }
    };

    // ### Space converting algorithms

    // Clones a color object in the same space.
    function CLONE() {
        return kolor(this);
    }

    // Produces a new color object by adding alpha channel to the old one.
    function ADD_ALPHA() {
        var space = this.space();
        var channels = SPACES[space].channels;
        var result = [];

        var l = channels.length;
        for (var i = 0; i < l; i++) {
            result.push(this[channels[i].name]());
        }
        result.push(1);
        return new kolor[space + 'A'](result);
    }

    // Produces a new color object by removing alpha channel from the old one.
    function REMOVE_ALPHA() {
        var space = this.space();
        var channels = SPACES[space].channels;
        var result = [];

        var l = channels.length;
        for (var i = 0; i < l - 1; i++) {
            result.push(this[channels[i].name]());
        }
        return new kolor[space.slice(0, -1)](result);
    }

    // Naively converts RGBA color to CMYK
    function RGBA_TO_CMYK() {
        var r = this.r() / 255;
        var g = this.g() / 255;
        var b = this.b() / 255;
        var black = 1 - Math.max(r, g, b);

        if (black === 0) {
            return kolor.cmyk(0, 0, 0, 0);
        }

        var c = (1 - r - black) / (1 - black);
        var m = (1 - g - black) / (1 - black);
        var y = (1 - b - black) / (1 - black);
        return kolor.cmyk(c, m, y, black, this.a());
    }

    // Converts RGBA color to HSLA.
    function RGBA_TO_HSLA() {
        var r = this.r() / 255;
        var g = this.g() / 255;
        var b = this.b() / 255;
        var a = this.a();
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var diff = max - min;
        var sum = max + min;
        var h;
        var s;
        var l;

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * (g - b) / diff + 0;
        } else if (max === r && g < b) {
            h = 60 * (g - b) / diff + 360;
        } else if (max === g) {
            h = 60 * (b - r) / diff + 120;
        } else { // max === b
            h = 60 * (r - g) / diff + 240;
        }

        l = sum / 2;

        if (l === 0 || max === min) {
            s = 0;
        } else if (0 < l && l <= 0.5) {
            s = diff / sum;
        } else { // l > 0.5
            s = diff / (2 - sum);
        }

        return kolor.hsla(h, s, l, a);
    }

    // Converts RGBA color to HSVA.
    function RGBA_TO_HSVA() {
        var r = this.r() / 255;
        var g = this.g() / 255;
        var b = this.b() / 255;
        var a = this.a();
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var diff = max - min;
        var h;
        var s;

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * (g - b) / diff + 0;
        } else if (max === r && g < b) {
            h = 60 * (g - b) / diff + 360;
        } else if (max === g) {
            h = 60 * (b - r) / diff + 120;
        } else { // max === b
            h = 60 * (r - g) / diff + 240;
        }

        if (max === 0) {
            s = 0;
        } else {
            s = diff / max;
        }

        var v = max;
        return kolor.hsva(h, s, v, a);
    }

    // Converts RGBA color to GRAY
    function RGBA_TO_GRAY() {
        return this.grayscale();
    }

    // Converts HSLA color to RGBA.
    function HSLA_TO_RGBA() {
        var h = this.h();
        var s = this.s();
        var l = this.l();
        var a = this.a();
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        var hk = h / 360;
        var t = {};
        var rgb = {};

        t.r = hk + 1 / 3;
        t.g = hk;
        t.b = hk - 1 / 3;

        var c;

        for (c in t) {
            t[c] < 0 && t[c] ++;
            t[c] > 1 && t[c] --;
        }

        for (c in t) {
            if (t[c] < 1 / 6) {
                rgb[c] = p + ((q - p) * 6 * t[c]);
            } else if (1 / 6 <= t[c] && t[c] < 0.5) {
                rgb[c] = q;
            } else if (0.5 <= t[c] && t[c] < 2 / 3) {
                rgb[c] = p + ((q - p) * 6 * (2 / 3 - t[c]));
            } else { // t[c] >= 2 / 3
                rgb[c] = p;
            }
            rgb[c] *= 255;
        }

        return kolor.rgba(rgb.r, rgb.g, rgb.b, a);
    }

    // Converts HSLA color to HSVA.
    function HSLA_TO_HSVA() {
        var h = this.h();
        var s = this.s();
        var l = this.l();
        var a = this.a();

        l *= 2;
        s *= (l <= 1) ? l : 2 - l;
        var v = (l + s) / 2;
        var sv = (2 * s) / (l + s);
        return kolor.hsva(h, sv, v, a);
    }

    // Converts HSVA color to RGBA.
    function HSVA_TO_RGBA() {
        var h = this.h();
        var s = this.s();
        var v = this.v();
        var a = this.a();
        var hi = Math.floor(h / 60);
        var f = h / 60 - hi;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        var rgba;

        switch (hi) {
            case 0:
                rgba = [v, t, p, a]; break;
            case 1:
                rgba = [q, v, p, a]; break;
            case 2:
                rgba = [p, v, t, a]; break;
            case 3:
                rgba = [p, q, v, a]; break;
            case 4:
                rgba = [t, p, v, a]; break;
            case 5:
                rgba = [v, p, q, a]; break;
            default:
                rgba = [0, 0, 0, a];
        }

        for (var i = rgba.length - 1; i--;) {
            rgba[i] *= 255;
        }

        return kolor.rgba(rgba);
    }

    // Converts HSVA color to HSLA.
    function HSVA_TO_HSLA() {
        var h = this.h();
        var s = this.s();
        var v = this.v();
        var a = this.a();

        var l = (2 - s) * v;
        var sl = s * v;
        sl /= (l <= 1) ? l : 2 - l;
        sl = sl || 0;
        l /= 2;
        return kolor.hsla(h, sl, l, a);
    }

    // Converts HSVA color to HWB.
    function HSVA_TO_HWB() {
        var h = this.h();
        var s = this.s();
        var v = this.v();
        var a = this.a();
        return kolor.hwb(h, (1 - s) * v, 1 - v, a);
    }

    // Converts HWB color to HSVA.
    function HWB_TO_HSVA() {
        var h = this.h();
        var w = this.w();
        var b = this.b();
        var a = this.a();
        return kolor.hsva(h, 1 - w / (1 - b), 1 - b, a);
    }

    // Converts GRAY color to RGBA.
    function GRAY_TO_RGBA() {
        var s = this.s();
        var a = this.a();

        return kolor.rgba(s, s, s, a);
    }

    // Naively converts CMYK color to RGBA.
    function CMYK_TO_RGBA() {
        var c = this.c();
        var m = this.m();
        var y = this.y();
        var black = this.b();

        var r = 1 - Math.min(1, c * (1 - black) + black);
        var g = 1 - Math.min(1, m * (1 - black) + black);
        var b = 1 - Math.min(1, y * (1 - black) + black);
        return kolor.rgba(r * 255, g * 255, b * 255, this.a());
    }

    var CONVERTERS = {
        RGB: {
            RGBA: ADD_ALPHA
        },
        RGBA: {
            RGB: REMOVE_ALPHA,
            HSLA: RGBA_TO_HSLA,
            HSVA: RGBA_TO_HSVA,
            GRAY: RGBA_TO_GRAY,
            CMYK: RGBA_TO_CMYK
        },
        HSL: {
            HSLA: ADD_ALPHA
        },
        HSLA: {
            HSL: REMOVE_ALPHA,
            HSVA: HSLA_TO_HSVA,
            RGBA: HSLA_TO_RGBA
        },
        HSV: {
            HSVA: ADD_ALPHA
        },
        HSVA: {
            HSV: REMOVE_ALPHA,
            RGBA: HSVA_TO_RGBA,
            HSLA: HSVA_TO_HSLA,
            HWB: HSVA_TO_HWB
        },
        HWB: {
            HSVA: HWB_TO_HSVA
        },
        GRAY: {
            RGBA: GRAY_TO_RGBA
        },
        CMYK: {
            RGBA: CMYK_TO_RGBA
        }
    };

    // Breadth-first search to find the conversion path
    function getConverters(from, to) {
        if (from === to) {
            return [];
        }

        if (CONVERTERS[from][to]) {
            return [to];
        }

        var queue = [from];
        var path = {};
        path[from] = [];

        while (queue.length) {
            var v = queue.shift();
            for (var w in CONVERTERS[v]) {
                if (!path[w]) {
                    queue.push(w);
                    path[w] = path[v].concat([w]);
                    if (w === to) {
                        return path[w];
                    }
                }
            }
        }

        return null;
    }


    // Filters input value according to data type definitions and color space configurations.
    function filterValue(value, channel) {
        var type;
        for (var key in DATATYPES) {
            type = DATATYPES[key];
            if (type.flag & channel.dataType) {
                var val = type.parse(value);
                if (val !== false) {
                    if (type.flag === PERCENT) {
                        val *= Math.abs(channel.range[1] - channel.range[0]);
                    }
                    return channel.filter(val);
                }
            }
        }
        return channel.initial;
    }


    // ## kolor API

    // #### kolor(*exp*)
    //
    // `kolor` as a function is used as a factory method to parse given expressions into color objects.
    //
    // ##### Parameters
    //
    // * *exp* - the expression to be parsed. If *exp* is another color object, the factory method clones and
    // returns it as the result. If *exp* is a string, it can be any of the following types:
    //        * A color name defined in `NAMED_COLORS`.
    //        * A hex value like `#FF0000`, `#F00`, or even `ff0000`, `F00`, etc.
    //        * A CSS-style color expression like `rgba(255, 0, 0, 1)`, `hsl(120, 50%, 25%)`, etc.
    //
    // ##### Return values
    //
    // Returns a color object in a certain space decided by the given expression. Color names and hex values
    // result in RGB colors, while CSS-style expressions specify the output space themselves.
    kolor = function (exp) {

        // Check if the input is another color object by checking the private attribute `_space`.
        if (exp._space && util.has(kolor, exp._space)) {
            return new kolor[exp._space](exp.toArray());
        }

        // Check if the input is a predefined color name and create again using hex value on success.
        if (util.has(NAMED_COLORS, exp)) {
            return kolor(NAMED_COLORS[exp.toLowerCase()]);
        }

        // Try to match hex values, return RGB/RGBA color on success.
        var pattern = /^\s*#?([0-9a-f]{3}[0-9a-f]?|[0-9a-f]{6}(?:[0-9a-f]{2})?)\s*$/i;
        var match;
        if (match = exp.match(pattern)) {
            var hex = match[1];

            if (hex.length <= 4) {
                hex = util.map(hex.split(''), function (ch) {
                    return ch + ch;
                }).join('');
            }

            var channels = util.map(hex.match(/\w{2}/g), function (val, i) {
                var decimal = parseInt(val, 16);
                return i === 3 ? decimal * 100 / 255 + '%' : decimal;
            });

            var space = channels.length === 4 ? 'RGBA' : 'RGB';
            return new kolor[space](channels);
        }

        // Recognize specific space with pattern mathing and return color object in corresponding space.
        for (var key in SPACES) {
            match = exp.match(SPACES[key].pattern);
            if (match) {
                var args = match.slice(1);
                return new kolor[key](args);
            }
        }

        // Return false if fail to parse the input expression.
        return false;
    };

    for (var key in SPACES) {

        // ### Factory methods for each color space

        // #### kolor.*space*(*values*)
        //
        // Creates a color object using a space name defined in `SPACES`.
        //
        // ##### Parameters
        //
        // * *values* - the expression carries channel values of the color. It can be separate values,
        // an array or an object containing specific key-value pairs.
        //
        //    For example,
        //
        //    * kolor.rgb(255, 0, 0)
        //    * kolor.rgb([255, 0, 0])
        //    * kolor.rgb({ r: 255, g: 0, b: 0 })
        kolor[key.toLowerCase()] = (function (key) {
            return function () {
                var args = util.slice(arguments, 0);
                var type = util.typeOf(args[0]);
                if (type === 'Array' || type === 'Object') {
                    args = args[0];
                }
                return new kolor[key](args);
            };
        }(key));

        var space = SPACES[key];
        var channels = space.channels;

        // ### Constructor
        //
        // When `kolor` is used as a factory method, it will call these constructors.
        kolor[key] = (function (key) {
            return function (args) {
                var channels = SPACES[key].channels;
                var l = channels.length;
                args = args == null ? [] : args;
                this._space = key;
                for (var i = l; i--;) {
                    var channel = channels[i];
                    var name = channel.name;
                    var alias = channel.alias;
                    var param;

                    if (args[i] != null) {
                        param = args[i];
                    } else if (util.has(args, name)) {
                        param = args[name];
                    } else {
                        alias = util.isString(alias) ? [alias] : alias;
                        for (var j = 0, k = alias.length; j < k; j++) {
                            if (util.has(args, alias[j])) {
                                param = args[alias[j]];
                                break;
                            }
                        }
                        if (!param) {
                            param = channel.initial;
                        }
                    }
                    this[name](param);
                }
                this.length = l;
            };
        })(key);

        // ### Accessors
        //
        // #### .*accessor*([*value*])
        //
        // kolor uses jQuery-like accessors.
        //
        // Different color spaces have different accessors, for example
        //
        // * for RGB colors `color.red()` retrieves channel value and `color.red(100)` sets it;
        // * for HSL we've got `color.hue()` and `color.hue(120)`
        //
        // Shorthand accessors like `color.r()`, `color.h()` are also available.
        //
        // ##### Parameters
        //
        // * *value* - if not null, sets the specified channel to the given value, or returns the value
        // of the specified channel.
        //
        // ##### Return values
        //
        // Returns the channel value when used as a getter, or the color object itself when used as a
        // getter.
        for (var i = channels.length; i--;) {
            var channel = channels[i];
            var alias = channel.alias;

            kolor[key].prototype[channel.name] = function (i) {
                var channel = channels[i];
                var prop = '_' + channel.alias;
                return function (value) {
                    if (value != null) {
                        this[prop] = this[i] = filterValue(value, channel);
                        return this;
                    } else {
                        return this[prop];
                    }
                };
            }(i);

            if (util.typeOf(alias) === 'String') {
                alias = [alias];
            }
            for (var j = alias.length; j--;) {
                kolor[key].prototype[alias[j]] = kolor[key].prototype[channel.name];
            }
        }

        // #### .space()
        //
        // A getter for the space of the color object.
        //
        // ##### Return values
        //
        // Returns the space string in all caps such as `RGBA`, `HSV`, etc.
        kolor[key].prototype.space = function () {
            return this._space;
        };

        // #### .format()
        //
        // Deprecated. Same as `.space()` and preserved just for backward compatibility.
        //
        // ##### Return values
        //
        // Returns the space string in all caps such as `RGBA`, `HSV`, etc.
        kolor[key].prototype.format = function () {
            return this.space();
        };

        // ### Converters
        //
        // #### .*converter*()
        //
        // Converts the color to the specified space. Converter names are lower-cased space names.
        //
        // ##### Return values
        //
        // Returns a new color object in target space, if target space is the same as the original
        // one, a new color object will be cloned and returned.
        for (var target in SPACES) {
            if (key === target) {
                continue;
            }

            // array or null
            var converters = getConverters(key, target);

            kolor[key].prototype[target.toLowerCase()] = (function (key, converters) {
                return function () {
                    if (converters === null) {
                        throw new Error('Can\'t convert ' + key + ' colors into ' + target + '.');
                    }
                    var from = key;
                    var result = this;
                    for (var i = 0, j = converters.length; i < j; i++) {
                        var current = converters[i];
                        var converter = CONVERTERS[from][current];
                        result = converter.call(result);
                        from = current;
                    }
                    return result;
                };
            })(key, converters);
        }
        kolor[key].prototype[key.toLowerCase()] = CLONE;

        // ### Common methods

        // #### .toArray()
        // Produces an array carrying channel values. Because the channel values are stored both in
        // private attribute such as `_red` or `_alpha`, and integer keys start from `0`, the color
        // objects can use some array methods like `slice`.
        //
        // ##### Return values
        // Returns an array consists of the color's channel values.
        //
        // For `rgba(255, 0, 0, 1)`, the return value is `[255, 0, 0, 1]`.
        kolor[key].prototype.toArray = function () {
            return util.slice(this, 0);
        };

        // #### .css(), .toString()
        // Outputs color channel values as a CSS-style string.
        //
        // ##### Return values
        // Returns the CSS-style string for the color object.
        //
        // By CSS-style string we mean something like `rgba(255, 0, 0, 0.5)`, `hsl(30, 80%, 100%)`, etc.
        kolor[key].prototype.css = kolor[key].prototype.toString = function () {
            var channels = SPACES[this.space()].channels;
            var l = channels.length;
            var channel;
            var value;
            var values = [];
            for (var i = 0; i < l; i++) {
                channel = channels[i];
                value = this[channel.name]();
                if (value === channel.initial && channel.optional) {
                    continue;
                }
                values.push(DATATYPES[channel.cssType].stringify(value));
            }
            return this.space().toLowerCase() + '(' + values.join(', ') + ')';
        };

        // #### .hex()
        // Outputs color channels as a hex string.
        //
        // #### Parameters
        // * *keepAlpha* a boolean value that determines if the result should keep the possible
        // alpha channel. `false` by default.
        //
        // ##### Return values
        // Returns a hex string corresponds to the RGB space of the color,
        // which means the color is converted to RGB first and the hex value is produced
        // by its RGB channels.
        kolor[key].prototype.hex = function (keepAlpha) {
            function toHex(n) {
                return util.zeroFill(Math.round(n).toString(16), 2);
            }

            var rgb = this;
            if (this.space() !== 'RGB') {
                rgb = this.rgb();
            }

            var parts = ['#', toHex(rgb.r()), toHex(rgb.g()), toHex(rgb.b())];

            // has alpha channel
            if (keepAlpha && this.a) {
                parts.push(toHex(this.a() * 255));
            }
            return parts.join('');
        };

        // #### .copyFrom(*color*)
        // Converts channel values of another color to the same space as the current one and
        // copies them to the current color.
        //
        // ##### Parameters
        // * *color* - the color to be copied from.
        kolor[key].prototype.copyFrom = function (color) {
            var space = this.space();
            var channels = SPACES[space].channels;
            if (color.space() !== space) {
                color = color[space.toLowerCase()]();
            }
            for (var i = channels.length; i--;) {
                var accessor;
                accessor = channels[i].name;
                this[accessor](color[accessor]());
            }
        };

        // ### LESS/SASS-like APIs

        // #### .mix(*color* [, *proportion* = 0.5])
        // Mixes with another color using additive mixing.
        //
        // Algorithm taken from
        // [SASS source code](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#mix-instance_method)
        //
        // ##### Parameters
        // * *color* - a color object to mix with the current one
        // * *proportion* - the proportion of the other color, ranging from 0 to 1.
        //
        // ##### Return values
        // Returns a new color object in the same space as the original one.
        kolor[key].prototype.mix = function (color, proportion) {
            var dest = this.rgba();
            var src = color.rgba();
            var p = proportion == null ? 0.5 : proportion;
            var w = p * 2 - 1;
            var a = dest.a() - src.a();
            var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2;
            var w2 = 1 - w1;
            dest.r(dest.r() * w1 + src.r() * w2);
            dest.g(dest.g() * w1 + src.g() * w2);
            dest.b(dest.b() * w1 + src.b() * w2);
            dest.a(dest.a() * p + src.a() * (1 - p));
            return dest[this.space().toLowerCase()]();
        };

        // #### .spin(*value*)
        //
        // Increases hue value (decreases if value is less than zero) or say spins the color wheel
        // clockwise by a given degree.
        //
        // ##### Parameters
        // * *value* - the value that the color wheel will spin, in degree.
        //
        // ##### Return values
        // Returns a new color object after spinning in the original space.
        kolor[key].prototype.spin = function (value) {
            var color = this.hsla();
            color.h((color.h() + value) % 360);
            return color[this.space().toLowerCase()]();
        };

        // #### .saturate(*value*)
        //
        // Increases saturation value. Saturation channel here defined by HSL model, not HSV.
        //
        // ##### Parameters
        // * *value* - the amount that the saturation value will increase.
        //
        // ##### Return values
        // Returns a new color object after increasing saturation in the original space.
        kolor[key].prototype.saturate = function (value) {
            var color = this.hsla();
            color.s((color.s() + value));
            return color[this.space().toLowerCase()]();
        };

        // #### .desaturate(*value*)
        //
        // Decreases saturation value. Saturation channel here defined by HSL model, not HSV.
        //
        // ##### Parameters
        // * *value* - the amount that the saturation value will decrease.
        //
        // ##### Return values
        // Returns a new color object after decreasing saturation in the original space.
        kolor[key].prototype.desaturate = function (value) {
            return this.saturate(0 - value);
        };

        // #### .lighten(*value*)
        //
        // Increases lightness value.
        //
        // ##### Parameters
        // * *value* - the amount that the lightness value will the increase.
        //
        // ##### Return values
        // Returns a new color object after increasing lightness in the original space.
        kolor[key].prototype.lighten = function (value) {
            var color = this.hsla();
            color.l((color.l() + value));
            return color[this.space().toLowerCase()]();
        };

        // #### .darken(*value*)
        //
        // Decreases lightness value.
        //
        // ##### Parameters
        // * *value* - the amount that the lightness value will the decrease.
        //
        // ##### Return values
        // Returns a new color object after decreasing lightness in the original space.
        kolor[key].prototype.darken = function (value) {
            return this.lighten(0 - value);
        };

        // #### .fadeIn(*value*)
        //
        // Increases alpha value, will add alpha channel to those don't have it.
        //
        // ##### Parameters
        // * *value* - the amount that the alpha value will the increase.
        //
        // ##### Return values
        // Returns a new color object after increasing alpha in the original space adding
        // an alpha channel.
        // If the original space dosen't have an alpha version, the color will be converted
        // into RGBA.
        kolor[key].prototype.fadeIn = function (value) {
            var space = this.a ? this.space() : this.space() + 'A';
            var color;

            if (util.has(SPACES, space)) {
                color = this[space.toLowerCase()]();
            } else {
                color = this.rgba();
            }
            return color.a(color.a() + value);
        };

        // #### .fadeOut(*value*)
        //
        // Decreases alpha value, will add alpha channel to those don't have it.
        //
        // ##### Parameters
        // * *value* - the amount that the alpha value will the decrease.
        //
        // ##### Return values
        // Returns a new color object after decreasing alpha in the original space.
        kolor[key].prototype.fadeOut = function (value) {
            return this.fadeIn(0 - value);
        };

        // #### .grayscale()
        //
        // Returns the grayscale color by decreasing saturation(HSL) of the current color to 0.
        //
        // ##### Return values
        // Returns a new grayscaled color object in the original space.
        kolor[key].prototype.grayscale = function () {
            return this.desaturate(1);
        };

        // #### .complement()
        //
        // Returns the complement of the current color by spinning the color wheel for 180 degrees.
        //
        // ##### Return values
        // Returns a new complement color object the original space.
        kolor[key].prototype.complement = function () {
            return this.spin(180);
        };

        // #### .luminance()
        //
        // Returns the luminance of a color which indicates how bright the reflecting surface will
        // appear. See [relative luminance, Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20/#relativeluminancedef).
        //
        // ##### Return values
        // The calculated luminance value.
        kolor[key].prototype.luminance = function () {
            function convert(value) {
                value /= 255;
                return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
            }

            var color = this.rgb();
            var r = convert(color.r());
            var g = convert(color.g());
            var b = convert(color.b());

            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };

        // #### .contrastRatio()
        //
        // Returns the contrast ratio of two colors.
        // See [Contrast ratio, CSS Color Module Level 4](http://dev.w3.org/csswg/css-color/#contrast-ratio).
        //
        // ##### Parameters
        // * *color* - the color object to be compared to.
        //
        // ##### Return values
        // The calculated contrast ratio.
        kolor[key].prototype.contrastRatio = function (color) {
            var l1 = this.luminance();
            var l2 = color.luminance();
            return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        };
    }

    // ### kolor utilities
    // #### kolor.config(*key*, *value*)
    //
    // Global config for kolor.
    //
    // ##### Parameters
    // *key* - the name of the config item.
    // *value* - the config value is to be used.
    //
    // Only one available *key* now:
    //
    // * `cssPrecision` - if set to an integer, kolor keeps at most this number
    //   of digits after the period when outputing CSS expressions using `.css()`
    //   or `.toString()`. `auto` by default, means kolor won't handle precision
    //   when making the output.
    kolor.config = function (key, value) {
        config[key] = value;
    };

    // #### kolor.random(*options*) [unstable API]
    //
    // Generates a random color or color set. Colors are generated in HSL space
    // and different colors will have different hue values and these colors are
    // distributed uniformly across the specified hue range.
    //
    // ##### Parameters
    // *options* - a map consists of the options for the random procedure.
    //
    // * *size* - Number, `1` by default.
    //
    //     The number of colors to generate.
    //
    // * *h* - Array, `[0, 360]` by default.
    //
    //     The range of hue value.
    //
    // * *s* - Number | Array, `[0, 1]` by default.
    //
    //     The range of saturation. If set to a number, use this fixed value.
    //
    // * *l* - Number | Array, `[0, 1]` by default.
    //
    //     The range of lightness. If set to a number, use this fixed value.
    //
    // * *space* - String, `"hex"` by default.
    //
    //     The output space for the generated color(s). Available values include
    //
    //     `hex`, `css` and space names defined in `SPACES`, which are
    //     case-insensitive.
    //
    // * *shuffle* - Boolean, `true` by default.
    //
    //     If the output array should be shuffled.
    //
    // ##### Return values
    // If size is undefined or 1, returns a random color in the specified space.
    // Otherwise, returns an array such colors.
    kolor.random = function (options) {
        options = options || {};

        function getValue(value, defaultValue) {
            return value != null ? value : defaultValue;
        }

        var size = options.size || 1;
        var h = getValue(options.h, [0, 360]);
        var interval = Math.floor(((360 + (h[1] - h[0])) % 360 || 360) / size);
        var offset = Math.random() * interval;
        var s = getValue(options.s, [0, 1]);
        var l = getValue(options.l, [0, 1]);
        var a = getValue(options.a, 1);
        var shuffle = getValue(options.shuffle, true);
        var space = (options.space || 'hex').toLowerCase();
        var colors = [];

        if (interval === 0) {
            throw new Error('To many colors for this hue range!');
        }

        for (var i = 0; i < size; i++) {
            var color = kolor.hsla(
                (360 + h[0] + interval * i + offset) % 360,
                s.length ? util.random(s[0], s[1]) : s,
                l.length ? util.random(l[0], l[1]) : l,
                a.length ? util.random(a[0], a[1]) : a
            );
            if (space === 'hex') {
                color = color.hex();
            } else if (space === 'css') {
                color = color.css();
            } else if (util.has(SPACES, space.toUpperCase())) {
                color = color[space]();
            }
            colors.push(color);
        }

        if (size === 1) {
            return colors[0];
        }

        shuffle && util.shuffle(colors);
        return colors;
    };

    // Everything is ready, export the whole module
    define('kolor', function (require, exports, module) {
        module.exports = kolor;
    });

}(typeof define === 'function' && define.amd ? define : function (id, factory) {

    //
    // Define it the UMD way

    if (typeof exports !== 'undefined') {
        factory(require, exports, module);
    } else {
        var mod = {};
        var exp = {};

        factory(function (value) {
            return window[value];
        }, exp, mod);

        if (mod.exports) {
            // Defining output using `module.exports`
            window[id] = mod.exports;
        } else {
            // Defining output using `exports.*`
            window[id] = exp;
        }
    }
}));
