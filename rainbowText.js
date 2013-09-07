//     RainbowText.js 0.1.1

//     (c) 2013 Dmitry Semigradsky.
//     RainbowText may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/Semigradsky/RainbowText
//
//     Used TinyColor from https://github.com/bgrins/TinyColor

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
				from = from.toHsl();
				to = to.toHsl();
				for (var i = 0, l = element.innerText.length; i < l; i++) {
					var char = chars[i];
					if (char == undefined) continue;

					var percent = (char.offsetLeft - element.offsetLeft + 1) / element.offsetWidth;
					char.style.color = getColor(
						Math.ceil( percent * (to.h - from.h) + from.h ),
						percent * (to.s - from.s) + from.s,
						percent * (to.l - from.l) + from.l
					);
				}
			}
		}
	};

	RainbowText.VERSION = '0.1.1';

	function getRandomColor() {
		return getColor(getRandom(0, 358), getRandom(50, 100), getRandom(20, 50));
	}

	function getColor(h, s, l) {
		return tinycolor({ h: h, s: s, l: l }).toHexString();
	}

	function getRandom(min, max) {
		return Math.ceil(Math.random() * max + min)
	}

}).call(this);