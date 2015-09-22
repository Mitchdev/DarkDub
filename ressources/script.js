//For any informations, please go to https://github.com/WiBla/FCS/

if(!$("#fcs-style.css")[0]) {
	var version = "Alpha 0.1";
  // Initating custom css
	var css = "https://rawgit.com/WiBla/FCS/master/ressources/style.css";
	$("head").append($("<link id='fcs-style.css' rel='stylesheet' type='text/css' href='"+css+"'>"));
	// Chat "log" loading complete
	var loadedLog = $('<li class="user-55ffc26f1564a403003f527e">\
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
					<time class="timeago" datetime="2015-09-22T10:30:35.825Z" title="22/9/2015 12:30:35">1 minutes ago</time>\
				</span>\
			</div></div></div></li>');
	$("#chat .chat-container .chat-main").append(loadedLog);
}
