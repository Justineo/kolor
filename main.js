function $(id) {
    return document.getElementById(id);
}

function sync(color) {

    color = color || kolor(input.value);

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
var action = $('action');
var menu = $('menu');
var param = $('param');
var go = $('go');

var formats = ['rgb', 'hsv', 'hsl', 'hex'];
var outputs = {};
var actionType = 'fadeIn';
var actionParam = {
    spin: '30',
    lighten: '0.1',
    darken: '0.1',
    fadeIn: '0.1',
    fadeOut: '0.1'
};

formats.forEach(function(format) {
    outputs[format] = $(format);
});

input.onfocus = function () { this.select(); };
input.oninput = function () {
    clearTimeout(autoPlay);
    sync();
};
sync();

action.onclick = function () {
    menu.classList.add('active');
};

menu.onclick = function (e) {
    var target = e.target;
    if (target.classList.contains('menu-item')) {
        menu.classList.remove('active');
        actionType = target.innerHTML;
        action.innerHTML = action.dataset.type = actionType;
        param.value = actionParam[actionType];
    }
};

go.onclick = function () {
    color = kolor(input.value);
    var mod = color[action.dataset.type](parseFloat(param.value));
    input.value = mod.toString();
    sync(mod);
};

setTimeout(function() {
    converter.style.transition = 'all 1s';
}, 0);

var cases = [
    'rebeccapurple',
    'rgba(64, 128, 255, 0.5)',
    'hsv(54, 40%, 95%)',
    'hsl(114, 75%, 75%)',
    '#8cf0e6'
];
var ticks = 0;
var autoPlay = setInterval(function () {
    input.value = cases[(ticks++) % cases.length];
    sync();
}, 5000);
