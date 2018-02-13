(function() {
	'use strict';

	/*
	 * BEGIN CONFIG VARIABLES
	 */

	// Yahoo WOEID code
	// Find your WOEID code at http://zourbuth.com/tools/woeid/
	var woeid = 26821877;
	
	// Your temperature unit measurement
	// 'c' for Celcius, and 'f' for Fahrenheit
	var tempunit = 'c';

	// Yahoo! query interval (milliseconds)
	var waitBetweenWeatherQueries = 900000;

	// Bitcoin price query interval (milliseconds)
	//var waitBetweenBitcoinPriceQueries = 300000;

	// Default zoom level. Transitions from 0.9 to 1.1 (90% to 110%)
	var zoom = 1.0;

	/*
	 * END CONFIG VARIABLES
	 */

	function populateCurrent(current) {
		var icon = $('#current .icon');
		var desc = $('#current .desc');
		var temp = $('#current .temp');

		if (icon.length)
			icon.html(icons[current.code]);

		if (desc.length)
			desc.html(current.text);

		if (temp.length)
			temp.html(current.temp);
	}

	function populateForecast(day, forecast) {
		var forecastElem = '#forecast' + day + ' ';
		var day = $(forecastElem + '.day');
		var icon = $(forecastElem + '.icon');
		var desc = $(forecastElem + '.desc');
		var high = $(forecastElem + '.high');
		var low = $(forecastElem + '.low');

		if (day.length) {
			if (day === 1)
				day.html('Today');
			else
				day.html(forecast.day);
		}

		if (icon.length)
			icon.html(icons[forecast.code]);

		if (desc.length)
			desc.html(forecast.text);

		if (high.length)
			high.html(forecast.high);

		if (low.length)
			low.html(forecast.low);
	}

	function queryWeather() {
		$.ajax({
			type: 'GET',
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D' + woeid + '%20and%20u=%27'+ tempunit +'%27%20&format=json',
			dataType: 'json'
		}).done(function (result) {
			result = result.query.results.channel.item;

			populateCurrent(result.condition);
			populateForecast(1, result.forecast[0]);
			populateForecast(2, result.forecast[1]);
			populateForecast(3, result.forecast[2]);
			populateForecast(4, result.forecast[3]);
			populateForecast(5, result.forecast[4]);
		});
	}

	$(window).load(function() {

		if ($('#time').length)
			$('#time').html(moment().format('HH:mm'));

		if ($('#date').length)
			$('#date').html(moment().format('dddd, MMM Do'));

		queryWeather();

		setInterval(function() {
			if ($('#time').length)
				$('#time').html(moment().format('HH:mm'));

			if ($('#date').length)
				$('#date').html(moment().format('dddd, MMM Do'));
		}, 1000);

		setInterval(function() {
			queryWeather();
		}, waitBetweenWeatherQueries);

		setInterval(function() {
			if (zoom == 1.0)
				zoom = 1.1;
			else if (zoom == 1.1)
				zoom = 0.9;
			else
				zoom = 1.0;
			$('#display').css('zoom', zoom);
		}, 300000);
	});
}());
