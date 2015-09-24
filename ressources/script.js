/*
	FCS French Community Script made by WiBla
	Stay updated about the releases and much more on twitter @WiBla7
	For any informations, please go to https://github.com/WiBla/FCS/
	or http://wibla.free.fr
*/

if(!$("#fcs-css")[0]) {
	var fcs = {
		"version": "Alpha 0.3",
		"menu_css": "https://rawgit.com/WiBla/FCS/master/ressources/menu.css",
		"theme_css": "https://rawgit.com/WiBla/FCS/master/ressources/blue.css",
		"smallChat_css": "https://rawgit.com/WiBla/FCS/master/ressources/smallChat.css",
		"settings": {
			"autoVote": true,
			"theme": true,
			"smallChat": true,
			"confirmQuit": true,
		},
		"user": {
			"name": $('.user-info-button span')[0].innerHTML,
			"id": localStorage.getItem('sub-c-2b40f72a-6b59-11e3-ab46-02ee2ddab7feuuid'),
			"image": $('.user-info-button .user-image img').attr('src'),
			"vote": "",
			"playlist": {
				"": ""
			},
			"settings": {
				
			}
		},
		"event": {
			"message": $(this).trigger("fcs:message"),
			"advance": $(this).trigger("fcs:advance"),
			"woot": $(this).trigger("fcs:woot"),
			"meh": $(this).trigger("fcs:meh"),
			"user_join": $(this).trigger("fcs:user_join"),
			"user_leave": $(this).trigger("fcs:user_leave"),
		},
		"items": {
			"script": {
				
			},
			"dubUp": $(".dubup"),
			"dubDown": $(".dubdown")
		},
		// ##### [Functions] #####
		"log": function(msg, type) {
			if (typeof(msg) !== "string") return;
			if (type.length === 0) console.error("You must specify a correct type of message, [log/info/warn/error]");
			switch(type) {
				case "log":case "info":case "warn":case "error":case "broadcast":
					$("#chat .chat-container .chat-main").append($('<li class="fcs-'+type+' user-55ffc26f1564a403003f527e">\
						<div class="stream-item-content">\
							<div class="image_row">\
								<img src="https://api.dubtrack.fm/user/55ffc26f1564a403003f527e/image" alt="wibla" onclick="Dubtrack.helpers.displayUser(\'55ffc26f1564a403003f527e\', this);" class="cursor-pointer" onerror="Dubtrack.helpers.image.imageError(this);">\
							</div>\
							<div class="activity-row">\
								<div class="text"><p><a href="#" class="username">[FCS] </a>'+msg+'</p>\
							</div>\
							<div class="meta-info">\
								<span class="username">wibla </span>\
								<i class="icon-dot"></i>\
								<span class="timeinfo">\
									<time class="timeago" datetime="undefined" title="Creator\'s website"><a target="_blank"href="http://wibla.free.fr">http://wibla.free.fr</a></time>\
								</span>\
							</div></div></div></li>'));
				break;
				
				default:
					console.error("Correct types are: log, info, warn, error.");
			}
		},
		"complete": function(txt) {
			txt = txt.split(" ");
			for (var i = 0; i < txt.length; i++) {
				if (txt[i][0] == "$") {
					switch(txt[i]) {
						case "$version":
							txt[i] = fcs.version;
						break;
						
						default:
							console.error("Unrecognised variable(s)");
					}
				}
			}
			return txt.join(" ");
		},
		"paintGreen": function(e) {
			e[0].className = "on";
		},
		"paintOrange": function(e) {
			e[0].className = "off";
		},
		"getTimeRemaining": function() {
			return $(".min")[0].innerHTML + ":" + $(".sec")[0].innerHTML;
		},
		"getVolume": function() {
			return parseInt($(".volume .ui-slider-handle")[0].style.left);
		},
		"setVolume": function() {},
			// menu
		"autoVote": function() {
			if (fcs.settings.autoVote) {
				var woot = fcs.items.dubUp,
				    meh = fcs.items.dubDown;
				if (!woot.hasClass("voted") || !meh.hasClass("voted")) woot.click();
			}
		},
		"theme": function(){
			if (fcs.user.settings.theme) {
				$("head").append($("<link id='fcs-theme-css' rel='stylesheet' type='text/css' href='"+fcs.theme_css+"'>"));
			} else {
				$("#fcs-theme-css").remove();
			}
		},
		"smallChat": function(){
			if (fcs.user.settings.smallChat) {
				$("head").append($("<link id='fcs-smallChat-css' rel='stylesheet' type='text/css' href='"+fcs.smallChat_css+"'>"));
			} else {
				$("#fcs-smallChat-css").remove();
			}
		},
		"kill": function() {
			if (init(true) === "no problem") return "done";
		}
	};
	
	init();
} else if (fcs.kill() === "done") {
	setTimeout($.getScript("https://rawgit.com/WiBla/FCS/master/ressources/script.js"), 1000);
}

function init(kill) {
	if (!kill) {
		// Loading script's core elements
		$("#header-global .user-info ul > li.user-messages").before(
		$('<li id="fcs-logo">\
				<button id="fcs-button">FCS</button>\
				<ul id="fcs-menu" style="display: none;">\
					<li id="autoVote">Auto-Vote</li>\
					<li id="theme">Theme</li>\
					<li id="smallChat">Small chat</li>\
					<li id="confirmQuit">Confirm on quit</li>\
					<li id="kill">Shutdown</li>\
				</ul>\
			</li>'));
		// Initating custom css
		$("head").append($("<link id='fcs-css' rel='stylesheet' type='text/css' href='"+fcs.menu_css+"'>"));
		// Initating script's element as they cannot be reached until created
		fcs.items.script = {
			"menu": $("#fcs-menu")[0],
		};
		// Getting settings
		if (!localStorage.getItem("fcs-settings")) {
			localStorage.setItem("fcs-settings", JSON.stringify(fcs.settings));
			fcs.user.settings = fcs.settings;
		} else {
			fcs.user.settings = JSON.parse(localStorage.getItem("fcs-settings"));
			var i=0,j=0;
			for (var key in fcs.settings) {
				i++;
				for (var key2 in fcs.user.settings) {
					j++;
				}
				if (i > j) {
					fcs.user.settings[key2] = fcs.settings[key2];
				}
			}
		}
		fcs.autoVote();fcs.theme();fcs.smallChat();

		// ##### [Event Handlers] #####
		// menu's slide
		$("#fcs-logo").on("click", "button", function(){
			var menu = fcs.items.script.menu;
			if (menu.style.display === "none") {
				menu.style.height = "auto";
				setTimeout(function(){menu.style.display = "block";}, 0);
			} else {
				menu.style.height = "0";
				setTimeout(function(){menu.style.display = "none";}, 0);
			}
		});
		// menu selection
		$("#fcs-menu").on("click", "li", function(){
			var settings = fcs.user.settings;
			switch($(this)[0].id) {
				case "autoVote":
					settings.autoVote = !settings.autoVote;
					if (settings.autoVote) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.autoVote();
				break;
				case "theme":
					settings.theme = !settings.theme;
					if (settings.theme) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.theme();
				break;
				case "smallChat":
					settings.smallChat = !settings.smallChat;
					if (settings.smallChat) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.smallChat();
				break;
				case "confirmQuit":
					settings.confirmQuit = !settings.confirmQuit;
					if (settings.confirmQuit) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
				break;
				case "kill":fcs.kill();break;
				
				default: console.error("Hey ! Yeah you WiBla, you f*ed up !");
			}
			localStorage.setItem("fcs-settings", JSON.stringify(settings));
		});
		$(".chat-main").on("DOMSubtreeModified", function() {
		 // si fcs.item.chat.length et inférieur à $(this.length)
			 // si chat.type = fcs-*
				 // > fcs.event.chatLog(msg, type, time)
			 // sinon fcs.event.chat(msg, sender, type, time)
		});
		window.uInt = setInterval(fcs.autoVote, 1000); //this will be way better in the next update
		window.onbeforeunload = function(){
			if (fcs.user.settings.confirmQuit) return "Are you sure you want to quit ?";
		};
		
		fcs.log(fcs.complete("$version loaded !"), "log");
	} else {
		// inversing functions
			// if a function changes the DOM, invert-it to get the more basic dubtrack.fm possible
		// Removing core elements
		$("#fcs-logo").remove();
		$("#fcs-css").remove();
		// Unbinding Event Handlers
		$("#fcs-logo").off();
		$("#fcs-menu").off();
		$(".chat-main").off();
		clearInterval(window.uInt);
		window.onbeforeunload = "";
		// And finaly 
		fcs.log("Aurevoir !", "log"); console.log("Aurevoir !");
		return "no problem"; // needed in case of reload
	}
}
