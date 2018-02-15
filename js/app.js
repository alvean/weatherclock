(function() {
	'use strict';

	/*
	 * BEGIN CONFIG VARIABLES
	 */

	var accuweather_id = 'PQ50CT1melGWDC45CBxrXvDmV3mxtDJS';

	// Yahoo! query interval (milliseconds)
	var waitBetweenWeatherQueries = 900000;

	// Default zoom level. Transitions from 0.9 to 1.1 (90% to 110%)
	var zoom = 1.0;

	/*
	 * END CONFIG VARIABLES
	 */

	function queryWeather2() {
		$.ajax({
			type: 'GET',
			url: 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/167747?apikey=PQ50CT1melGWDC45CBxrXvDmV3mxtDJS&metric=true',
			dataType: 'json'
		}).done(function (result) {
			var current = result[0];
			var forecast = result[6];

			populate2(current);
			populate2(forecast);
		});
	}


	function dummyQueryWeather() {
		var jsonresult = '[{"DateTime":"2018-02-15T21:00:00+01:00","EpochDateTime":1518724800,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":1.1,"Unit":"C","UnitType":17},"PrecipitationProbability":47,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=21&unit=c&lang=en-us"},{"DateTime":"2018-02-15T22:00:00+01:00","EpochDateTime":1518728400,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":44,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=22&unit=c&lang=en-us"},{"DateTime":"2018-02-15T23:00:00+01:00","EpochDateTime":1518732000,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":1.1,"Unit":"C","UnitType":17},"PrecipitationProbability":48,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=23&unit=c&lang=en-us"},{"DateTime":"2018-02-16T00:00:00+01:00","EpochDateTime":1518735600,"WeatherIcon":18,"IconPhrase":"Rain","IsDaylight":false,"Temperature":{"Value":1.6,"Unit":"C","UnitType":17},"PrecipitationProbability":51,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=0&unit=c&lang=en-us"},{"DateTime":"2018-02-16T01:00:00+01:00","EpochDateTime":1518739200,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":1.8,"Unit":"C","UnitType":17},"PrecipitationProbability":25,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=1&unit=c&lang=en-us"},{"DateTime":"2018-02-16T02:00:00+01:00","EpochDateTime":1518742800,"WeatherIcon":38,"IconPhrase":"Mostly cloudy","IsDaylight":false,"Temperature":{"Value":2.3,"Unit":"C","UnitType":17},"PrecipitationProbability":20,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=2&unit=c&lang=en-us"},{"DateTime":"2018-02-16T03:00:00+01:00","EpochDateTime":1518746400,"WeatherIcon":36,"IconPhrase":"Intermittent clouds","IsDaylight":false,"Temperature":{"Value":2.4,"Unit":"C","UnitType":17},"PrecipitationProbability":20,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=3&unit=c&lang=en-us"},{"DateTime":"2018-02-16T04:00:00+01:00","EpochDateTime":1518750000,"WeatherIcon":36,"IconPhrase":"Intermittent clouds","IsDaylight":false,"Temperature":{"Value":2.5,"Unit":"C","UnitType":17},"PrecipitationProbability":20,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=4&unit=c&lang=en-us"},{"DateTime":"2018-02-16T05:00:00+01:00","EpochDateTime":1518753600,"WeatherIcon":35,"IconPhrase":"Partly cloudy","IsDaylight":false,"Temperature":{"Value":1.8,"Unit":"C","UnitType":17},"PrecipitationProbability":20,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=5&unit=c&lang=en-us"},{"DateTime":"2018-02-16T06:00:00+01:00","EpochDateTime":1518757200,"WeatherIcon":35,"IconPhrase":"Partly cloudy","IsDaylight":false,"Temperature":{"Value":2.1,"Unit":"C","UnitType":17},"PrecipitationProbability":13,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=6&unit=c&lang=en-us"},{"DateTime":"2018-02-16T07:00:00+01:00","EpochDateTime":1518760800,"WeatherIcon":33,"IconPhrase":"Clear","IsDaylight":false,"Temperature":{"Value":1.8,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=7&unit=c&lang=en-us"},{"DateTime":"2018-02-16T08:00:00+01:00","EpochDateTime":1518764400,"WeatherIcon":1,"IconPhrase":"Sunny","IsDaylight":true,"Temperature":{"Value":1.8,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=8&unit=c&lang=en-us"}]';
		var result = JSON.parse(jsonresult);

		var current = result[0];
		var forecast = result[5];

		populate2(current, "current");
		populate2(forecast, "forecast");
	}


	function populate2(current, div) {
		var icon = $('#' + div + ' .icon');
		var desc = $('#' + div + ' .desc');
		var temp = $('#' + div + ' .temp');


		if (icon.length)
			icon.html(icons[current.WeatherIcon]);

		if (desc.length)
			desc.html(current.IconPhrase);

		if (temp.length)
			temp.html(current.Temperature.Value);
	}



	$(window).load(function() {

		if ($('#time').length)
			$('#time').html(moment().format('HH:mm'));

		if ($('#date').length)
			$('#date').html(moment().format('dddd, MMM Do'));

		//queryWeather2();
		dummyQueryWeather();

		setInterval(function() {
			if ($('#time').length)
				$('#time').html(moment().format('HH:mm'));

			if ($('#date').length)
				$('#date').html(moment().format('dddd, MMM Do'));
		}, 1000);

		setInterval(function() {
			//queryWeather2();
			dummyQueryWeather();
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
