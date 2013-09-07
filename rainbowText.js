//     RainbowText.js 0.0.1

//     (c) 2013 Dmitry Semigradsky.
//     RainbowText may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/Semigradsky/RainbowText

(function() {
	var root = this;

	var RainbowText = root.RainbowText = function(element) {
		var newContent = '';
		for (var i = 0, l = element.innerText.length; i < l; i++) {
			var char = element.innerText.charAt(i);
			if (!~" \n\r".indexOf(char)) {
				newContent += "<span>" + char + "</span>";
			} else {
				newContent += char;
			}
		}
		element.innerHTML = newContent;
		
		var chars = element.getElementsByTagName("span");

		return {
			Randomize: function() {
				for (var i = 0, l = chars.length; i < l; i++) {
					var char = chars[i];
					char.style.color = getRandomColor();
				}
			},
			SetColors: function(from, to) {
				for (var i = 0, l = element.innerText.length; i < l; i++) {
					var char = chars[i];
					if (char == undefined) continue;

					var percent = (char.offsetLeft - element.offsetLeft + 1) / element.offsetWidth;
					char.style.color = getColor(
						Math.ceil( percent * (to.h - from.h) + from.h ),
						Math.ceil( percent * (to.s - from.s) + from.s ),
						Math.ceil( percent * (to.l - from.l) + from.l )
					);
				}
			}
		}
	};

	RainbowText.VERSION = '0.0.1';

	function getRandomColor() {
		return getColor(getRandom(0, 358), getRandom(50, 100), getRandom(20, 50));
	}

	function getColor(h, s, l) {
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

		return "rgb(" + Math.ceil(r*255) + ", " + Math.ceil(g*255) + ", " + Math.ceil(b*255) + ")";
	}

	function getRandom(min, max) {
		return Math.ceil(Math.random() * max + min)
	}

	// Take input from [0, n] and return it as [0, 1]
	function bound01(n, max) {
		var processPercent = isPercentage(n);
		n = Math.min(max, Math.max(0, parseFloat(n)));

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

	// Check to see if string passed in is a percentage
	function isPercentage(n) {
		return typeof n === "string" && n.indexOf('%') != -1;
	}

}).call(this);