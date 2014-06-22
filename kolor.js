(function(define) {

    // ## Config
    //
    // Global configuraiton. See `kolor.config` for more details.

    var config = {
        cssPrecision: 'auto'
    };

    // ## Utilities

    var utils = {
        // ### Object utils

        // Checks if the given value is a number.
        isNumber: function(value) {
            return '[object Number]' == Object.prototype.toString.call(value) && isFinite(value);
        },

        // Checks if the given value is a string.
        isString: function(value) {
            return '[object String]' == Object.prototype.toString.call(value);
        },

        // Retrieves the type of the given value.
        //
        // Return value can be 'String', 'Number', 'Object', 'Array', ...
        //
        // *Result might be different among browsers.*
        typeOf: function(value) {
            return Object.prototype.toString.call(value).slice(8, -1);
        },

        // Shorthand method for Object.prototype.hasOwnProperty.
        has: function(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        },


        // ### Array utils

        // Slices any array-ish object.
        slice: function(arrayish, begin, end) {
            return Array.prototype.slice.call(arrayish, begin, end);
        },

        // Swaps two array elements.
        swap: function(items, i, j) {
            var k = items[i];
            items[i] = items[j];
            items[j] = k;
        },

        // Shuffles the given array using
        // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
        shuffle: function(items) {
            var i, j, l = items.length;
    
            for (i = l - 1; i > 0; i --) {
                j = Math.floor(Math.random() * (i + 1));
                utils.swap(items, i, j);
            }
        },

        // Iterates through the given array and produces a new array by mapping each value through
        // a given function.
        map: function(source, callback, opt_this) {
            var results = [],
                l = source.length,
                i = l;
            while (i--) {
                results[i] = callback.call(opt_this || source, source[i], i);
            }
            return results;
        },


        // ### Number utils

        // Clamps a number to a given range.
        clamp: function(value, min, max) {
            if (min > max) {
                max = min + max;
                min = max - min;
                max = max - min;
            }
            return Math.min(max, Math.max(min, value));
        },

        // Wraps a number inside a given range with modulo operation.
        wrap: function(value, min, max) {
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
        zeroFill: function(number, width) {
            number += '';
            width -= number.length;
            if (width > 0) {
                return new Array(width + 1).join('0') + number;
            }
            return number + '';
        },

        // Generates a random number in a given range.
        random: function(min, max) {
            if (min === max) {
                return min;
            }
            return Math.random() * (max - min) + min;
        }
    };


    // ## Preparation

    // ### Color name-hex map
    //
    // see [Extended color keywords, CSS Color Module Level 3](http://www.w3.org/TR/css3-color/#svg-color)
    var COLOR_MAP = {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkgrey": "#a9a9a9",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkslategrey": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dimgrey": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "grey": "#808080",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgray": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightgrey": "#d3d3d3",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightslategrey": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370db",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#db7093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "slategrey": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32",
        "rebeccapurple": "#663399" // not in CSS spec yet
    };


    // ### Color value data type flags
    //
    // Uses powers of 2 in order to easily define several data types for one data field.
    //
    // * INTEGER: 0, 128, 255, ...
    // * NUMBER: 0, 0.5, 0.75, ...
    // * PERCENT: 10%, 87.53%, ...
    var INTEGER = 1,
        NUMBER = 2,
        PERCENT = 4;

    // ### Utils for each data type
    //
    // * *parse* - gets valid value from various types of input.
    // * *stringify* - produces string value according to actual data value.
    var DATATYPES = {
            1: {
                flag: INTEGER,
                parse: function(value) {
                    switch (utils.typeOf(value)) {
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
                stringify: function(value) {
                    return Math.round(value) + '';
                }
            },
            2: {
                flag: NUMBER,
                parse: function(value) {
                    switch (utils.typeOf(value)) {
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
                stringify: function(value) {
                    var precision = config.cssPrecision;
                    return precision === 'auto'
                        ? value + ''
                        : parseFloat(value.toFixed(precision)) + '';
                }
            },
            4: {
                flag: PERCENT,
                parse: function(value) {
                    switch (utils.typeOf(value)) {
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
                stringify: function(value) {
                    var precision = config.cssPrecision;
                    return precision === 'auto'
                        ? value * 100 + '%'
                        : parseFloat((value * 100).toFixed(precision)) + '%';
                }
            }
        };

    // ### Value filters
    function CLAMP(value) {
        return utils.clamp(value, this.range[0], this.range[1]);
    }


    function MOD(value) {
        return utils.wrap(value, this.range[0], this.range[1]);
    }

    // ### Color format configurations
    var FORMATS = {
        RGB: {
            channels: [
                { name: 'red', shorthand: 'r', dataType: INTEGER|PERCENT, cssType: INTEGER, range: [0, 255], filter: CLAMP, initial: 255 },
                { name: 'green', shorthand: 'g', dataType: INTEGER|PERCENT, cssType: INTEGER, range: [0, 255], filter: CLAMP, initial: 255 },
                { name: 'blue', shorthand: 'b', dataType: INTEGER|PERCENT, cssType: INTEGER, range: [0, 255], filter: CLAMP, initial: 255 }
            ],
            pattern: /rgb\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i,
            converters: {
                RGBA: ADD_ALPHA,
                HSL: function() { return this.rgba().hsla().hsl(); },
                HSLA: function() { return this.rgba().hsla(); },
                HSV: function() { return this.rgba().hsva().hsv(); },
                HSVA: function() { return this.rgba().hsva(); }
            }
        },
        RGBA: {
            channels: [
                { name: 'red', shorthand: 'r', dataType: INTEGER|PERCENT, cssType: INTEGER, range: [0, 255], filter: CLAMP, initial: 255 },
                { name: 'green', shorthand: 'g', dataType: INTEGER|PERCENT, cssType: INTEGER, range: [0, 255], filter: CLAMP, initial: 255 },
                { name: 'blue', shorthand: 'b', dataType: INTEGER|PERCENT, cssType: INTEGER, range: [0, 255], filter: CLAMP, initial: 255 },
                { name: 'alpha', shorthand: 'a', dataType: NUMBER|PERCENT, cssType: NUMBER, range: [0, 1], filter: CLAMP, initial: 1 }
            ],
            pattern: /rgba\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i,
            converters: {
                RGB: REMOVE_ALPHA,
                HSL: function() { return this.hsla().hsl(); },
                HSLA: RGBA_TO_HSLA,
                HSV: function() { return this.hsva().hsv(); },
                HSVA: RGBA_TO_HSVA
            }
        },
        HSL: {
            channels: [
                { name: 'hue', shorthand: 'h', dataType: NUMBER, cssType: NUMBER, range: [0, 360], filter: MOD, initial: 0 },
                { name: 'saturation', shorthand: 's', dataType: NUMBER|PERCENT, cssType: PERCENT, range: [0, 1], filter: CLAMP, initial: 0 },
                { name: 'lightness', shorthand: 'l', dataType: NUMBER|PERCENT, cssType: PERCENT, range: [0, 1], filter: CLAMP, initial: 0 }
            ],
            pattern: /hsl\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i,
            converters: {
                RGB: function() { return this.hsla().rgba().rgb(); },
                RGBA: function() { return this.hsla().rgba(); },
                HSLA: ADD_ALPHA,
                HSV: function() {  return this.hsla().rgba().hsva().hsv(); },
                HSVA: function() {  return this.hsla().rgba().hsva(); }
            }
        },
        HSLA: {
            channels: [
                { name: 'hue', shorthand: 'h', dataType: NUMBER, cssType: NUMBER, range: [0, 360], filter: MOD, initial: 0 },
                { name: 'saturation', shorthand: 's', dataType: NUMBER|PERCENT, cssType: PERCENT, range: [0, 1], filter: CLAMP, initial: 0 },
                { name: 'lightness', shorthand: 'l', dataType: NUMBER|PERCENT, cssType: PERCENT, range: [0, 1], filter: CLAMP, initial: 0 },
                { name: 'alpha', shorthand: 'a', dataType: NUMBER|PERCENT, cssType: NUMBER, range: [0, 1], filter: CLAMP, initial: 1 }
            ],
            pattern: /hsla\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i,
            converters: {
                RGB: function() { return this.rgba().rgb(); },
                RGBA: HSLA_TO_RGBA,
                HSL: REMOVE_ALPHA,
                HSV: function() { return this.rgba().hsva().hsv(); },
                HSVA: function() { return this.rgba().hsva(); }
            }
        },
        HSV: {
            channels: [
                { name: 'hue', shorthand: 'h', dataType: NUMBER, cssType: NUMBER, range: [0, 360], filter: MOD, initial: 0 },
                { name: 'saturation', shorthand: 's', dataType: NUMBER|PERCENT, cssType: PERCENT, range: [0, 1], filter: CLAMP, initial: 0 },
                { name: 'value', shorthand: 'v', dataType: NUMBER|PERCENT, cssType: PERCENT, range: [0, 1], filter: CLAMP, initial: 0 }
            ],
            pattern: /hsv\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i,
            converters: {
                RGB: function() { return this.hsva().rgba().rgb(); },
                RGBA: function() { return this.hsva().rgba(); },
                HSL: function() { return this.hsva().rgba().hsla().hsl(); },
                HSLA: function() { return this.hsva().rgba().hsla(); },
                HSVA: ADD_ALPHA
            }
        },
        HSVA: {
            channels: [
                { name: 'hue', shorthand: 'h', dataType: NUMBER, cssType: NUMBER, range: [0, 360], filter: MOD, initial: 0 },
                { name: 'saturation', shorthand: 's', dataType: NUMBER|PERCENT, cssType: PERCENT, range: [0, 1], filter: CLAMP, initial: 0 },
                { name: 'value', shorthand: 'v', dataType: NUMBER|PERCENT, cssType: PERCENT, range: [0, 1], filter: CLAMP, initial: 0 },
                { name: 'alpha', shorthand: 'a', dataType: NUMBER|PERCENT, cssType: NUMBER, range: [0, 1], filter: CLAMP, initial: 1 }
            ],
            pattern: /hsva\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^\)]+?)\s*\)/i,
            converters: {
                RGB: function() { return this.rgba().rgb(); },
                RGBA: HSVA_TO_RGBA,
                HSL: function() { return this.rgba().hsla().hsl(); },
                HSLA: function() { return this.rgba().hsla(); },
                HSV: REMOVE_ALPHA
            }
        }
    };

    // ### Format converter algorithms

    // Clones a color object in the same format.
    function CLONE() {
        return kolor(this);
    }

    // Produces a new color object by adding alpha channel to the old one.
    function ADD_ALPHA() {
        var format = this.format(),
            channels = FORMATS[format].channels,
            l = channels.length,
            result = [];

        for (var i = 0; i < l; i++) {
            result.push(this[channels[i].name]());
        }
        result.push(1);
        return new kolor[format + 'A'](result);
    }

    // Produces a new color object by removing alpha channel from the old one.
    function REMOVE_ALPHA() {
        var format = this.format(),
            channels = FORMATS[format].channels,
            l = channels.length,
            result = [];

        for (var i = 0; i < l - 1; i++) {
            result.push(this[channels[i].name]());
        }
        return new kolor[format.slice(0, -1)](result);
    }

    // Converts RGBA color to HSLA.
    function RGBA_TO_HSLA() {
        var r = this.r() / 255,
            g = this.g() / 255,
            b = this.b() / 255,
            a = this.a(),
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            diff = max - min,
            sum = max + min,
            h, s, l;

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * (g - b) / diff + 0;
        } else if (max === r && g < b) {
            h = 60 * (g - b) / diff + 360;
        } else if (max === g) {
            h = 60 * (b - r) / diff + 120;
        } else { //max === b
            h = 60 * (r - g) / diff + 240;
        }

        l = sum / 2;

        if (l === 0 || max === min) {
            s = 0;
        } else if (0 < l && l <= 0.5) {
            s = diff / sum;
        } else { //l > 0.5
            s = diff / (2 - sum);
        }

        return kolor.hsla(h, s, l, a);
    }

    // Converts RGBA color to HSVA.
    function RGBA_TO_HSVA() {
        var r = this.r() / 255,
            g = this.g() / 255,
            b = this.b() / 255,
            a = this.a(),
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            diff = max - min,
            h, s, l;

        if (max === min) {
            h = 0;
        } else if (max === r && g >= b) {
            h = 60 * (g - b) / diff + 0;
        } else if (max === r && g < b) {
            h = 60 * (g - b) / diff + 360;
        } else if (max === g) {
            h = 60 * (b - r) / diff + 120;
        } else { //max === b
            h = 60 * (r - g) / diff + 240;
        }

        if (max === 0) {
            s = 0;
        } else {
            s = diff / max;
        }

        v = max;

        return kolor.hsva(h, s, v, a);
    }

    // Converts HSLA color to RGBA.
    function HSLA_TO_RGBA() {
        var h = this.h(),
            s = this.s(),
            l = this.l(),
            a = this.a(),
            q = l < 0.5 ? l * (1 + s) : l + s - l * s,
            p = 2 * l - q,
            hk = h / 360,
            t = {},
            rgb = {};

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
            } else { //t[c] >= 2 / 3
                rgb[c] = p;
            }
            rgb[c] *= 255;
        }

        return kolor.rgba(rgb.r, rgb.g, rgb.b, a);
    }

    // Converts HSVA color to RGBA.
    function HSVA_TO_RGBA() {
        var h = this.h(),
            s = this.s(),
            v = this.v(),
            a = this.a(),
            hi = Math.floor(h / 60),
            f = h / 60 - hi,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            rgba;

        switch(hi) {
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

        for (var i = rgba.length; i--;) {
            rgba[i] *= 255;
        }

        return kolor.rgba(rgba);
    }

    // Filters input value according to data type definitions and color format configurations.
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
    //        * A color name defined in `COLOR_MAP`.
    //        * A hex value like `#FF0000`, `#F00`, or even `ff0000`, `F00`, etc.
    //        * A CSS-style color expression like `rgba(255, 0, 0, 1)`, `hsl(120, 50%, 25%)`, etc.
    //
    // ##### Return values
    //
    // Returns a color object in a certain format decided by the given expression. Color names and hex values
    // result in RGB colors, while CSS-style expressions specify the output format themselves.
    var kolor = function(exp) {

        // Check if the input is another color object by checking the private attribute `_format`.
        if (exp._format && utils.has(kolor, exp._format)) {
            return new kolor[exp._format](exp.toArray());
        }

        // Check if the input is a predefined color name and create again using hex value on success.
        if (utils.has(COLOR_MAP, exp)) {
            return kolor(COLOR_MAP[exp.toLowerCase()]);
        }

        // Try to match hex values, return RGB color on success.
        var matches = /^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i.exec(exp),
            hex, rgb = [];
        if (matches) {
            hex = matches[1];
            if (hex.length === 3) {
                hex = [hex.charAt(0), hex.charAt(0), hex.charAt(1), hex.charAt(1), hex.charAt(2), hex.charAt(2)].join('');
            }
            for (var i = 0; i < 3; i++) {
                rgb.push(parseInt(hex.substring(i * 2, i * 2 + 2), 16));
            }
            return new kolor.RGB(rgb);
        }

        // Recognize specific format with pattern mathing and return color object in corresponding format.
        for (var key in FORMATS) {
            matches = FORMATS[key].pattern.exec(exp);
            if (matches) {
                var args = matches.slice(1);
                return new kolor[key](args);
            }
        }

        // Return false if fail to parse the input expression.
        return false;
    };

    for (var key in FORMATS) {

        // ### Factory methods for each color format

        // #### kolor.*format*(*values*)
        //
        // Creates a color object using a format name defined in `FORMATS`.
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
        kolor[key.toLowerCase()] = (function(key) {
            return function() {
                var args = utils.slice(arguments, 0),
                    type = utils.typeOf(args[0]);
                if (type === 'Array' || type === 'Object') {
                    args = args[0];
                }
                return new kolor[key](args);
            };
        }(key));

        var format = FORMATS[key],
            channels = format.channels,
            converters = format.converters;
     
        // ### Constructor
        //
        // When `kolor` is used as a factory method, it will call these constructors.
        kolor[key] = (function(key) {
            return function(args) {
                var channels = FORMATS[key].channels,
                    l = channels.length;
                args = args == null ? [] : args;
                this._format = key;
                for (var i = l; i--;) {
                    var channel = channels[i],
                        name = channel.name,
                        shorthand = channel.shorthand,
                        param;
                    if (args[i] != null) {
                        param = args[i];
                    } else if (utils.has(args, name)) {
                        param = args[name];
                    } else if (utils.has(args, shorthand)) {
                        param = args[shorthand];
                    } else {
                        param = channel.initial;
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
        // Different color formats have different accessors, for example
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
            var channel = channels[i],
                shorthand = channel.shorthand;

            kolor[key].prototype[channel.name] = kolor[key].prototype[shorthand] = function(i) {
                var channel = channels[i],
                    prop = '_' + channel.shorthand;
                return function(value) {
                    if (value != null) {
                        this[prop] = this[i] = filterValue(value, channel);
                        return this;
                    } else {
                        return this[prop];
                    }
                };
            }(i);
        }

        // #### .format()
        //
        // A getter for the format of the color object.
        //
        // ##### Return values
        //
        // Returns the format string in all caps such as `RGBA`, `HSV`, etc.
        kolor[key].prototype.format = function() {
            return this._format;
        };

        // ### Converters
        //
        // #### .*converter*()
        //
        // Converts the color to the specified format. Converter names are lower-cased format names.
        //
        // ##### Return values
        //
        // Returns a new color object in target format, if target format is the same as the original
        // one, a new color object will be cloned and returned.
        for (var c in converters) {
            kolor[key].prototype[c.toLowerCase()] = converters[c];
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
        kolor[key].prototype.toArray = function() {
            return utils.slice(this, 0);
        };

        // #### .css(), .toString()
        // Outputs color channel values as a CSS-style string.
        //
        // ##### Return values
        // Returns the CSS-style string for the color object.
        //
        // By CSS-style string we mean something like `rgba(255, 0, 0, 0.5)`, `hsl(30, 80%, 100%)`, etc.
        kolor[key].prototype.css = kolor[key].prototype.toString = function() {
            var channels = FORMATS[this.format()].channels,
                l = channels.length,
                channel,
                values = [];
            for (var i = 0; i < l; i++) {
                channel = channels[i];
                values.push(DATATYPES[channel.cssType].stringify(this[channel.name]()));
            }
            return this.format().toLowerCase() + '(' + values.join(', ') + ')';
        };

        // #### .hex()
        // Outputs color channels as a hex string.
        //
        // ##### Return values
        // Returns a hex string corresponds to the RGB format of the color,
        // which means the color is converted to RGB first and the hex value is produced
        // by its RGB channels.
        kolor[key].prototype.hex = function() {
            var color = this;
            if (this.format() !== 'RGB') {
                color = this.rgb();
            }
            function toHex(n) {
                return utils.zeroFill(Math.round(n).toString(16), 2);
            }
            return ['#', toHex(color.r()), toHex(color.g()), toHex(color.b())].join('');
        };

        // #### .copyFrom(*color*)
        // Converts channel values of another color to the same format as the current one and
        // copies them to the current color.
        //
        // ##### Parameters
        // * *color* - the color to be copied from.
        kolor[key].prototype.copyFrom = function(color) {
            var format = this.format(),
                channels = FORMATS[format].channels,
                i, accessor;
            if (color.format() !== format) {
                color = color[format.toLowerCase()]();
            }
            for (i = channels.length; i--;) {
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
        // Returns a new color object in the same format as the original one.
        kolor[key].prototype.mix = function(color, proportion) {
            var dest = this.rgba(),
                src = color.rgba(),
                p = proportion == null ? 0.5 : proportion,
                w = p * 2 - 1,
                a = dest.a() - src.a(),
                w1 = (((w * a === -1) ? w : (w + a)/(1 + w * a)) + 1) / 2,
                w2 = 1 - w1;
            dest.r(dest.r() * w1 + src.r() * w2);
            dest.g(dest.g() * w1 + src.g() * w2);
            dest.b(dest.b() * w1 + src.b() * w2);
            dest.a(dest.a() * p + src.a() * (1 - p));
            return dest[this.format().toLowerCase()]();
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
        // Returns a new color object after spinning in the original format.
        kolor[key].prototype.spin = function(value) {
            var color = this.hsla();
            color.h((color.h() + value) % 360);
            return color[this.format().toLowerCase()]();
        };

        // #### .saturate(*value*)
        //
        // Increases saturation value. Saturation channel here defined by HSL model, not HSV.
        //
        // ##### Parameters
        // * *value* - the amount that the saturation value will increase.
        //
        // ##### Return values
        // Returns a new color object after increasing saturation in the original format.
        kolor[key].prototype.saturate = function(value) {
            var color = this.hsla();
            color.s((color.s() + value));
            return color[this.format().toLowerCase()]();
        };

        // #### .desaturate(*value*)
        //
        // Decreases saturation value. Saturation channel here defined by HSL model, not HSV.
        //
        // ##### Parameters
        // * *value* - the amount that the saturation value will decrease.
        //
        // ##### Return values
        // Returns a new color object after decreasing saturation in the original format.
        kolor[key].prototype.desaturate = function(value) {
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
        // Returns a new color object after increasing lightness in the original format.
        kolor[key].prototype.lighten = function(value) {
            var color = this.hsla();
            color.l((color.l() + value));
            return color[this.format().toLowerCase()]();
        };

        // #### .darken(*value*)
        //
        // Decreases lightness value.
        //
        // ##### Parameters
        // * *value* - the amount that the lightness value will the decrease.
        //
        // ##### Return values
        // Returns a new color object after decreasing lightness in the original format.
        kolor[key].prototype.darken = function(value) {
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
        // Returns a new color object after increasing alpha in the original format.
        kolor[key].prototype.fadeIn = function(value) {
            var format = this.a ? this.format() : this.format() + 'A',
                color = this[format.toLowerCase()]();
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
        // Returns a new color object after decreasing alpha in the original format.
        kolor[key].prototype.fadeOut = function(value) {
            return this.fadeIn(0 - value);
        };

        // #### .grayscale()
        //
        // Returns the grayscale color by decreasing saturation(HSL) of the current color to 0.
        //
        // ##### Return values
        // Returns a new grayscaled color object in the original format.
        kolor[key].prototype.grayscale = function() {
            return this.desaturate(1);
        };

        // #### .complement()
        //
        // Returns the complement of the current color by spinning the color wheel for 180 degrees.
        //
        // ##### Return values
        // Returns a new complement color object the original format.
        kolor[key].prototype.complement = function() {
            return this.spin(180);
        };

        // #### .luminance()
        //
        // Returns the luminance of a color which indicates how bright the reflecting surface will
        // appear. See [relative luminance, Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20/#relativeluminancedef).
        //
        // ##### Return values
        // The calculated luminance value.
        kolor[key].prototype.luminance = function() {
            function convert(value) {
                value /= 255;
                return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
            }
            
            var color = this.rgb(),
                R = convert(color.r()),
                G = convert(color.g()),
                B = convert(color.b());

            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
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
    kolor.config = function(key, value) {
        config[key] = value;
    }

    // #### kolor.random(*options*) [unstable API]
    //
    // Generates a random color or color set. Colors are generated in HSL format
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
    // * *format* - String, `"hex"` by default.
    //
    //     The output format for the generated color(s). Available values include
    //
    //     `hex`, `css` and format names defined in `FORMATS`, which are
    //     case-insensitive.
    //
    // * *shuffle* - Boolean, `true` by default.
    //
    //     If the output array should be shuffled.
    //
    // ##### Return values
    // If size is undefined or 1, returns a random color in the specified format.
    // Otherwise, returns an array such colors.
    kolor.random = function(options) {
        options = options || {};

        function getValue(value, defaultValue) {
            return value != null ? value : defaultValue;
        }

        var size = options.size || 1,
            h = getValue(options.h, [0, 360]),
            interval = Math.floor(((360 + (h[1] - h[0])) % 360 || 360) / size),
            offset = Math.random() * interval,
            s = getValue(options.s, [0, 1]),
            l = getValue(options.l, [0, 1]),
            a = getValue(options.a, 1),
            shuffle = getValue(options.shuffle, true),
            format = (options.format || 'hex').toLowerCase(),
            colors = [],
            color, i;

        if (interval === 0) {
            throw new Error('To many colors for this hue range!');
        }

        for (i = 0; i < size; i++) {
            color = kolor.hsla(
                (360 + h[0] + interval * i + offset) % 360,
                s.length ? utils.random(s[0], s[1]) : s,
                l.length ? utils.random(l[0], l[1]) : l,
                a.length ? utils.random(a[0], a[1]) : a
            );
            if (format == 'hex') {
                color = color.hex();
            } else if (format == 'css') {
                color = color.css();
            } else if (utils.has(FORMATS, format.toUpperCase())) {
                color = color[format]();
            }
            colors.push(color);
        }

        if (size === 1) {
            return colors[0];
        }

        shuffle && utils.shuffle(colors);
        return colors;
    };

    // Everything is ready, export the whole module
    define("kolor", function(require, exports, module) {
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

        factory(function(value) {
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
