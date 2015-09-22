//For any informations, please go to https://github.com/WiBla/FCS/

if(!$("#fcs-css")[0]) {
	var version = "Alpha 0.2";
  // Initating custom css
	var css = "https://rawgit.com/WiBla/FCS/master/ressources/style.css";
	$("head").append($("<link id='fcs-css' rel='stylesheet' type='text/css' href='"+css+"'>"));
	// Auto-Vote
	var woot = $(".dubup");
	var uInt = setInterval(function() {
		if (!woot.hasClass("voted")) woot.click();
	}, 5000)
	// Chat "log" loading complete
	var loadedLog = $('<li class="fcs-log user-55ffc26f1564a403003f527e">\
		<div class="stream-item-content">\
			<div class="image_row">\
				<img src="https://api.dubtrack.fm/user/55ffc26f1564a403003f527e/image" alt="wibla" onclick="Dubtrack.helpers.displayUser(\'55ffc26f1564a403003f527e\', this);" class="cursor-pointer" onerror="Dubtrack.helpers.image.imageError(this);">\
			</div>\
			<div class="activity-row">\
				<div class="text"><p><a href="#" class="username">wibla:</a> FCS '+version+' loaded !</p>\
			</div>\
			<div class="meta-info">\
				<span class="username">wibla </span>\
				<i class="icon-dot"></i>\
				<span class="timeinfo">\
					<time class="timeago" datetime="unedfined" title="undefined"><a href="http://wibla.free.fr">http://wibla.free.fr</a></time>\
				</span>\
			</div></div></div></li>');
	$("#chat .chat-container .chat-main").append(loadedLog);
}
