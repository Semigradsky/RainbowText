window.onload = function() {

	var container = document.getElementById("container");
	var rainbowText = new RainbowText(container);
	// rainbowText.Randomize();
	rainbowText.SetColors({	h: 0, s: 100, l: 50 }, { h: 320, s: 100, l: 50 });
};