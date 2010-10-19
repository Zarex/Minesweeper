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

// max is exclusive
function randInt(max) {
	
	return parseInt(Math.random() * max);

}

// Functional programming tools, courtesy of examples at eloquentjavascript.net

function forEach(array, action) {

	for (var i = 0; i < array.length; i++) {
		
		action(array[i]);
		
	}

}

function map(func, array) {

	var result = [];
	
	forEach(array, function (element) {
	
		result.push(func(element));
		
	});
	
	return result;
	
}

function asArray(quasiArray, start) {

	var result = [];
	
	for (var i = (start || 0); i < quasiArray.length; i++) {
	
		result.push(quasiArray[i]);
		
	}
	
	return result;
	
}

function partial(func) {

	var fixedArgs = asArray(arguments, 1);
	
	return function() {
	
		return func.apply(null, fixedArgs.concat(asArray(arguments)));
		
	};
	
}