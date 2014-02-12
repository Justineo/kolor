function $(id) {
    return document.getElementById(id);
}

function sync() {

    var color = kolor(input.value);

    formats.forEach(function(format) {
        outputs[format].value = color ? color[format]() : '-';
        if (color) {
            converter.style.backgroundColor = color;
        }
    });
    if (color) {
        readme.style.backgroundColor = color.fadeOut(0.7);
    }
};

kolor.config('cssPrecision', 2);

var converter = $('converter');
var readme = $('readme');
var input = $('exp');

var formats = ['rgb', 'hsv', 'hsl', 'hex'];
var outputs = {};
formats.forEach(function(format) {
    outputs[format] = $(format);
});

input.oninput = sync;
sync();
setTimeout(function() {
    converter.style.transition = 'all 1s';
}, 0);

