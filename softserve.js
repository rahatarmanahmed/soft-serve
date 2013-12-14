(function($) {

	var paramRegex = /:([$_a-zA-z][$_a-zA-z0-9]*)/g;
	$.fn.softserve = function(opt) {
		var root = this;
		// Escaping newlines is bad? F THE POLICE
		root.append(
			"<div class='ss-container'>\
				<div class='ss-query-container'>\
					<span class='ss-query'></span>\
				</div>\
				<div class='ss-answer-container'>\
					<span class='ss-answer'></span>\
				</div>\
			</div>"
		);

		var query = opt.query || "What is :love? Baby don't #hurt me.";
		var answer = opt.answer || function(params) {return params.love + " " + params.hurt;};
		var onEvent = opt.onEvent || "keyup";
		var placeholders = opt.placeholders || {};
		var fadeDuration = opt.fadeDuration || 400;
		var allowUndefined = opt.allowUndefined || false;


		query = query.replace(paramRegex, "<input class='ss-input' type='text' name='$1' />");
		root.find('.ss-query').append(query);

		var values = {};
		var names = [];

		root.find('.ss-input').on(onEvent, function() {
			values[this.name] = this.value;
			if(this.value === "")
				values[this.name] = undefined;
			root.find(".ss-answer").fadeOut(fadeDuration/2, function() {
				for(var k=0; k<names.length; k++)
					if(values[names[k]] === undefined && !allowUndefined)
						return;
				$(this).html(answer(values)).fadeIn(fadeDuration/2);
			});
		});

		$('.ss-input').each(function() {
			names.push(this.name);
			var value = getUrlVar(this.name);
			if(value !== undefined)
			{				
				this.value = value;
				values[this.name] = value;
				$(this).trigger(onEvent);
			}
			if(placeholders[this.name] !== undefined)
				$(this).attr('placeholder', placeholders[this.name]);
		});
		return this;
	};

	function getUrlVar(key){
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
		return result && decodeURI(result[1]) || undefined; 
	}
}(jQuery));