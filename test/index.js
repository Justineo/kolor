var test = require('tape');
var kolor = require('../kolor');

test('RGB values', function (t) {
    var rgb = kolor('rgb(32, 64, 128)');
    t.equal(rgb.r(), 32, 'should parse red channel correctly');
    t.equal(rgb.g(), 64, 'should parse green channel correctly');
    t.equal(rgb.b(), 128, 'should parse blue channel correctly');
    t.equal(rgb.css(), 'rgb(32, 64, 128)', 'should be serialized into CSS correctly');
    t.equal(rgb.hex(), '#204080', 'should be serialized into hex format correctly');
    t.equal(rgb.rgba().css(), 'rgba(32, 64, 128, 1)', 'should be converted into RGBA correctly');
    t.equal(kolor.rgb({r: 0, g: 0, b: 0}).hex(), '#000000', 'should be initialized correctly with channel objects');
    t.end();
});


test('Named hue should be parsed correctly', function (t) {
    t.end();
});
