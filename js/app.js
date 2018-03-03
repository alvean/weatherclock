(function() {
	'use strict';

	/*
	 * BEGIN CONFIG VARIABLES
	 */

	var accuweather_id = 'PQ50CT1melGWDC45CBxrXvDmV3mxtDJS';

	// Weather query interval (milliseconds)
	var waitBetweenWeatherQueries = 1800000; //30min

	// Default zoom level. Transitions from 0.9 to 1.1 (90% to 110%)
	var zoom = 1.0;

	/*
	 * END CONFIG VARIABLES
	 */

	function queryWeather() {
		$.ajax({
			type: 'GET',
			url: 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/167747?apikey=PQ50CT1melGWDC45CBxrXvDmV3mxtDJS&metric=true',
			dataType: 'json'
		}).done(function (result) {
			var current = result[0];
			var forecast = result[6];

			populate(current);
			populate(forecast);
		});
	}


	function dummyQueryWeather() {
		var jsonresult = '[{"DateTime":"2018-02-16T20:00:00+01:00","EpochDateTime":1518807600,"WeatherIcon":33,"IconPhrase":"Clear","IsDaylight":false,"Temperature":{"Value":1.1,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=20&unit=c&lang=en-us"},{"DateTime":"2018-02-16T21:00:00+01:00","EpochDateTime":1518811200,"WeatherIcon":33,"IconPhrase":"Clear","IsDaylight":false,"Temperature":{"Value":1.1,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=21&unit=c&lang=en-us"},{"DateTime":"2018-02-16T22:00:00+01:00","EpochDateTime":1518814800,"WeatherIcon":33,"IconPhrase":"Clear","IsDaylight":false,"Temperature":{"Value":0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=22&unit=c&lang=en-us"},{"DateTime":"2018-02-16T23:00:00+01:00","EpochDateTime":1518818400,"WeatherIcon":35,"IconPhrase":"Partly cloudy","IsDaylight":false,"Temperature":{"Value":0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=23&unit=c&lang=en-us"},{"DateTime":"2018-02-17T00:00:00+01:00","EpochDateTime":1518822000,"WeatherIcon":36,"IconPhrase":"Intermittent clouds","IsDaylight":false,"Temperature":{"Value":0.0,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=0&unit=c&lang=en-us"},{"DateTime":"2018-02-17T01:00:00+01:00","EpochDateTime":1518825600,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":0.0,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=1&unit=c&lang=en-us"},{"DateTime":"2018-02-17T02:00:00+01:00","EpochDateTime":1518829200,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":0.0,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=2&unit=c&lang=en-us"},{"DateTime":"2018-02-17T03:00:00+01:00","EpochDateTime":1518832800,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=3&unit=c&lang=en-us"},{"DateTime":"2018-02-17T04:00:00+01:00","EpochDateTime":1518836400,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=4&unit=c&lang=en-us"},{"DateTime":"2018-02-17T05:00:00+01:00","EpochDateTime":1518840000,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=5&unit=c&lang=en-us"},{"DateTime":"2018-02-17T06:00:00+01:00","EpochDateTime":1518843600,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":3,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=6&unit=c&lang=en-us"},{"DateTime":"2018-02-17T07:00:00+01:00","EpochDateTime":1518847200,"WeatherIcon":36,"IconPhrase":"Intermittent clouds","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":7,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=7&unit=c&lang=en-us"}]'; 
		var result = JSON.parse(jsonresult);

		var current = result[0];
		var forecast = result[5];

		populate(current, "current");
		populate(forecast, "forecast");
	}


	function populate(current, div) {
		var icon = $('#' + div + ' .icon');
		var desc = $('#' + div + ' .desc');
		var temp = $('#' + div + ' .temp');
		var feeltemp = $('#' + div + ' .feeltemp');


		if (icon.length)
			icon.html(icons[current.WeatherIcon]);

		if (desc.length)
			desc.html(current.IconPhrase);

		if (temp.length)
			temp.html(Math.round(current.Temperature.Value));

		if (feeltemp.length)
			feeltemp.html(current.RealFeelTemperature.Value);
	}



	$(window).load(function() {

		if ($('#time').length)
			$('#time').html(moment().format('HH:mm'));

		if ($('#date').length)
			$('#date').html(moment().format('dddd, MMM Do'));

		//queryWeather();
		dummyQueryWeather();

		setInterval(function() {
			if ($('#time').length)
				$('#time').html(moment().format('HH:mm'));

			if ($('#date').length)
				$('#date').html(moment().format('dddd, MMM Do'));
		}, 10000);

		setInterval(function() {
			//queryWeather();
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
