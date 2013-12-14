A stupid jQuery plugin for easily making single-service webpages. Here is an example usage:
```html
<!doctype html>
<html>
<head>
	<title>Is X Prime?</title>
	<link rel="stylesheet" href="softserve.css" />
	<script type="text/javascript" src="jquery-1.10.2.min.js"/></script>
	<script type="text/javascript" src="jquery.placeholder.js"/></script>
	<script type="text/javascript" src="jquery.numeric.js"/></script>
	<script type="text/javascript" src="softserve.js"/></script>
</head>
<body>
	<script type="text/javascript">
		// Yay coffeescript! https://gist.github.com/rahatarmanahmed/7921007
		var isPrime = function (n) {
		    var r, _i, _ref;
		    if (n !== ~~n || n <= 1 || n % 2 === 0 && n !== 2) {
		        return "No.";
		    }
		    for (r = _i = 3, _ref = Math.ceil(Math.sqrt(n)); _i <= _ref; r = _i += 2) {
		        if (n % r === 0) {
		            return "No.";
		        }
		    }
		    return "Yes.";
		};
		// Use softserve on the element you want to contain
		// the content
		$(document.body).softserve({
			// Input parameters in the query are prefixed with :
			// followed by a valid JS identifier (no special characters, though)
			// These are passed to the answer function in the params
			// object as shown.
			query: "Is :x prime?",
			answer: function(params) { 
				return isPrime(+params.x); },
			// Optional support for placeholders.
			// Must include placeholder polyfill if you
			// use them.
			// placeholders: {x: "x"}
		});
	</script>
</body>
</html>
```