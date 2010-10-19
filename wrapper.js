// Wrapping browser incompatibilities.
function addEvent(object, event, effect) {
	if (typeof object == "string") {object = $(object);}
	if (object.addEventListener) {
		object.addEventListener(event, effect, false);
	}
	else {
		object.attachEvent("on" + event, effect);
	}
}

ie = (navigator.appName == "Microsoft Internet Explorer" ? true : false);
if (ie) {
	Object.prototype.indexOf = function(sought) { //Because IE has no indexOf...
		for (var i = 0; i < this.length; i++) {
			if (this[i] == sought) return i;
		}
		return -1;
	}
}

// Helper functions.

function $(id) {
	return document.getElementById(id);
}

function stopEvent(event) {
	if (ie) {
		event.returnValue = false;
	}
	else {
		event.preventDefault();
	}
}

function setCookie(cookie_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = cookie_name + "=" + esc(value) +
	((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

function getCookie(cookie_name) {
	if (document.cookie.length > 0) {
	  cookie_start = document.cookie.indexOf(cookie_name + "=");
		if (cookie_start != -1) {
			cookie_start = cookie_start + cookie_name.length + 1;
			cookie_end = document.cookie.indexOf(";", cookie_start);
			if (cookie_end == -1) cookie_end = document.cookie.length;
			return unescape(document.cookie.substring(cookie_start,cookie_end));
		}
	}
	return "";
}