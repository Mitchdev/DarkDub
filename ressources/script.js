/*
	FCS French Community Script made by WiBla
	Stay updated about the releases and much more on twitter @WiBla7
	For any informations, please go to https://github.com/WiBla/FCS/
	or http://wibla.free.fr/FCS/
*/

if(!$("#fcs-css")[0]) {
	var fcs = {
		"version": "Alpha 0.4",
		"menu_css": "https://rawgit.com/WiBla/FCS/master/ressources/menu.css",
		"theme_css": "https://rawgit.com/WiBla/FCS/master/ressources/blue.css",
		"smallChat_css": "https://rawgit.com/WiBla/FCS/master/ressources/smallChat.css",
		"settings": {
			"autoVote": false,
			"theme": false,
			"smallChat": false,
			"confirmQuit": false,
		},
		"room": {
			"name": "",
			"type": "",
			"url": "",
			"background": "",
			"DJ": "",
			"audience": {}
		},
		"user": {
			"name": $('.user-info-button span')[0].innerHTML,
			"id": localStorage.getItem('sub-c-2b40f72a-6b59-11e3-ab46-02ee2ddab7feuuid'),
			"image": $('.user-info-button .user-image img').attr('src'),
			"vote": "",
			"role": "",
			"playlists": {
				"": ""
			},
			"settings": {}
		},
		"events": {
			"chat": function(){$(this).trigger("fcs:chat");},
			"advance": function(){$(this).trigger("fcs:advance");},
			"woot": function(){$(this).trigger("fcs:woot");},
			"meh": function(){$(this).trigger("fcs:meh");},
			"user_join": function(){$(this).trigger("fcs:user_join");},
			"user_leave": function(){$(this).trigger("fcs:user_leave");}
		},
		"items": {
			"script": {},
			"dubUp": $(".dubup"),
			"dubDown": $(".dubdown")
		},
		// ##### [Functions] #####
		"log": function(msg, type) {
			if (type === undefined || typeof msg !== "string") return;
			switch(type) {
				case "info":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/information_source.png" title=":information_source:" alt=":information_source:" align="absmiddle"></img> ' + msg;
				break;
				case "warn":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/warning.png" title=":warning:" alt=":warning:" align="absmiddle"></img> ' + msg;
				break;
				case "error":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/bangbang.png" title=":bangbang:" alt=":bangbang:" align="absmiddle"></img> ' + msg;
				break;
				case "broadcast":
					msg = "" + msg;
				break;
			}
			$("#chat .chat-container .chat-main").append($(
				'<li class="fcs-'+type+' user-55ffc26f1564a403003f527e">\
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
		},
		"sendChat": function(msg) {
			if (typeof msg == "string" && msg.length > 0) {
				$("#chat-txt-message").val(msg);
				$(".pusher-chat-widget-send-btn").click();
			}
		},
		"autoComplete": function(txt) {
			txt = txt.split(" ");
			for (var i = 0; i < txt.length; i++) {
				if (txt[i][0] == "$") {
					switch(txt[i]) {
						case "$version":
							txt[i] = fcs.version;
						break;
						
						default:
							console.error("[FCS] Unrecognised variable(s)");
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
			return ($(".min")[0].innerHTML*60) + parseInt($(".sec")[0].innerHTML);
		},
		"getVolume": function() {
			return parseInt($(".volume .ui-slider-handle")[0].style.left);
		},
		"setVolume": function() {},
			// menu
		"autoVote": function() {
			if (fcs.user.settings.autoVote) {
				var woot = fcs.items.dubUp,
				meh = fcs.items.dubDown;
				if (!woot.hasClass("voted") || !meh.hasClass("voted")) woot[0].click();
				
			} else if (typeof uInt !== "undefined") clearInterval(uInt);
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
		"importPlaylists": function(){
			// Playlist Import init
			
			var i, 
				key,
				keys,
				PL = {},
				f = $("#importPlaylists")[0];
			
			function importPL(obj) {
				key = 0;
				while (key < PL.playlists[keys[i]].length) {
					type = PL.playlists[keys[i]][key].type === 1 ? "youtube" : "soundcloud"; 
					if (key < PL.playlists[keys[i]].length - 1)
						$.post("https://api.dubtrack.fm/playlist/" + obj.data._id + "/songs",{fkid: PL.playlists[keys[i]][key].id, type: type});
					else
						$.post("https://api.dubtrack.fm/playlist/" + obj.data._id + "/songs",{fkid: PL.playlists[keys[i]][key].id, type: type}, pLFinished);
					key++;
				}
			}
			
			function pLFinished() {
				i++;
				if (i === keys.length) {
					fcs.log("Finished Playlists's import !", "log");
					return false;
				} else {
					fcs.log("Starting import of: \"" + keys[i] + "\".", "log");
					$.post("https://api.dubtrack.fm/playlist/",{name: keys[i]} , importPL);
				}
			}
			
			f.onchange = function() {
				var file = f.files[0],
				    fr = new FileReader();
				
				fr.onerror = function() {fcs.log("An error occured, please try again.", "error");};
				fr.onload = function() {
					fcs.log("File successfuly loaded, initiating import...", "info");
					// Is the file a text file ?
					if (typeof fr.result !== "string") {
						fcs.log("Choose a correct JSON file. Aborting import.", "error");
					} // Is the file JSON compatible ?
					else try {JSON.parse(fr.result);} catch(e) {return fcs.log("File is not JSON compatible. Aborting import.", "error");}
					
					PL = JSON.parse(fr.result);
					// Is the file PYE compatible ?
					if ((PL.is_plugdj_playlist === true)){
							i = 0;
							keys = Object.keys(PL.playlists);
							fcs.log("Starting import of: \"" + keys[i] + "\".", "info");
							$.post("https://api.dubtrack.fm/playlist/", {name: keys[i]}, importPL);
					} else {
						fcs.log("File is not PYE compatible. Aborting import.", "error");
						fcs.log("Other files will be supported in the near futur.", "info");
					}
				};
				fr.readAsText(file);
			};
		},
		"confirmQuit": function() {
			if (fcs.user.settings.confirmQuit) {
				window.onbeforeunload = function(){
					return "Are you sure you want to quit ?";
				};
			} else window.onbeforeunload = "";
		},
		"kill": function() {
			if (init(true)) return "done";
			else fcs.log("Could not reload/shutdown"); console.log("[FCS] Could not reload/shutdown");
		}
	};
	
	init();
} else if (fcs.kill() === "done") {
	setTimeout(function(){$.getScript("https://rawgit.com/WiBla/FCS/master/ressources/script.js");}, 1000);
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
					<input id="importPlaylists" type="file">\
					<li id="importPlaylists">Import Playlist</li>\
					<li id="confirmQuit">Confirm on quit</li>\
					<li id="kill">Shutdown</li>\
					<li id="undefined">'+fcs.version+'</li>\
				</ul>\
			</li>'));
		// Initating custom css
		$("head").append($("<link id='fcs-css' rel='stylesheet' type='text/css' href='"+fcs.menu_css+"'>"));
		// Clear chat button
		$(".chatSound").after(
			$("<a id='clearChat'>Clear\
				<img class='emoji' src='https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/no_entry_sign.png' title=':no_entry_sign:' alt=':no_entry_sign:' align='absmiddle'></a>"));
		$("#clearChat").on("click", function(){$(".chat-main").empty();});
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
		// Coloring the items as they should be (active or inactive)
		$.each($("#fcs-menu li"), function(i, elm){
			if (fcs.user.settings[elm.id]) {
				fcs.paintGreen($("#" + elm.id));
				fcs[elm.id]();
			} else fcs.paintOrange($("#" + elm.id));
		});
		// ##### [Event Handlers] #####
		// menu's slide
		$("#fcs-logo").on("click", "button", function(){
			var menu = fcs.items.script.menu;
			if (menu.style.display === "none") {
				menu.style.display = "block";
			} else {
				menu.style.display = "none";
			}
		});
		// menu's selection
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
				case "importPlaylists":fcs.confirmQuit();break;
				case "confirmQuit":
					settings.confirmQuit = !settings.confirmQuit;
					if (settings.confirmQuit) fcs.paintGreen($(this));
					else fcs.paintOrange($(this));
					fcs.confirmQuit();
				break;
				case "kill":fcs.kill();break;
				case "undefined":break;
				
				default: console.error("[FCS] unrecognised menu item.");
			}
			localStorage.setItem("fcs-settings", JSON.stringify(settings));
		});
		window.uInt = setInterval(fcs.autoVote, 1000); //this will be way better in the next update
		fcs.importPlaylists();
		
		fcs.log(fcs.autoComplete("$version loaded !"), "log");
	} else {
		// Saving settings
		localStorage.setItem("fcs-settings", JSON.stringify(fcs.user.settings)); // Just in case something has gone wrong
		// inversing functions (if a function changes the DOM, invert-it to get the more basic dubtrack.fm possible)
		clearInterval(window.uInt);
		// Removing core elements
		$("#fcs-logo").remove();
		$("#fcs-css").remove();
		$("#clearChat").remove();
		// Unbinding Event Handlers
		$("#fcs-logo").off();
		$("#fcs-menu").off();
		$(".chat-main").off();
		window.onbeforeunload = "";
		// And finaly 
		fcs.log("Aurevoir !", "log"); console.log("[FCS] Aurevoir !");
		return true; // needed in case of reload
	}
}
