window.onload = function() {

	var container = document.getElementById("container");
	var rainbowText = new RainbowText(container);
	// rainbowText.Randomize();
	rainbowText.SetColors(
		tinycolor({ h: 0, s: 1, l: 0.5 }),
		tinycolor({ h: 320, s: 1, l: 0.5 })
	);
};