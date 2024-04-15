function generateColorsHarmony(colorCount, offsetAngle1, offsetAngle2, rangeAngle0, rangeAngle1, rangeAngle2, saturation, luminance) {
    var colors = [];
    var referenceAngle = Math.random() * 360;

    for (var i = 0; i < colorCount; i++) {
        var randomAngle = Math.random() * (rangeAngle0 + rangeAngle1 + rangeAngle2);

        if (randomAngle > rangeAngle0) {
            if (randomAngle < rangeAngle0 + rangeAngle1) {
                randomAngle += offsetAngle1;
            } else {
                randomAngle += offsetAngle2;
            }
        }
        var h = ((referenceAngle + randomAngle) / 360.0) % 1.0;
        var rgb = hlsToRgb(h, luminance, saturation);
        colors.push([Math.round(rgb[0] * 255), Math.round(rgb[1] * 255), Math.round(rgb[2] * 255)]);
    }

    return colors;
}

function hlsToRgb(h, l, s) {
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r, g, b];
}


document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('input');
    var resultColors = generateColorsHarmony(input.value, 30, 60, 30, 60, 90, 0.8, 0.6);
    var container = document.getElementById('content');
    resultColors.forEach(function(color) {
        var div = document.createElement('div');
        var tag = document.createElement('div')
        tag.classList.add('tag');
        tag.innerHTML = 'rgb(' + color.join(',') + ')';
        div.appendChild(tag);
        div.classList.add('item');
        div.style.backgroundColor = 'rgb(' + color.join(',') + ')';
        container.appendChild(div);
    });


    const btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        const resultColors = generateColorsHarmony(input.value, 30, 60, 30, 60, 90, 0.8, 0.6);
        container.innerHTML = '';
        resultColors.forEach(function(resultColor, index) {
            var div = document.createElement('div');
            div.classList.add('item');
            div.style.backgroundColor = 'rgb(' + resultColor.join(',') + ')';
            var tag = document.createElement('div')
            tag.classList.add('tag');
            tag.innerHTML = 'rgb(' + resultColor.join(',') + ')';
            div.appendChild(tag);
            container.appendChild(div);
        });
    });
});