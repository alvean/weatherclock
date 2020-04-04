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

			populate(current, "current");
			populate(forecast, "forecast");
		});
	}


	function dummyQueryWeather() {
		//var jsonresult = '[{"DateTime":"2018-02-16T20:00:00+01:00","EpochDateTime":1518807600,"WeatherIcon":33,"IconPhrase":"Clear","IsDaylight":false,"Temperature":{"Value":1.1,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=20&unit=c&lang=en-us"},{"DateTime":"2018-02-16T21:00:00+01:00","EpochDateTime":1518811200,"WeatherIcon":33,"IconPhrase":"Clear","IsDaylight":false,"Temperature":{"Value":1.1,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=21&unit=c&lang=en-us"},{"DateTime":"2018-02-16T22:00:00+01:00","EpochDateTime":1518814800,"WeatherIcon":33,"IconPhrase":"Clear","IsDaylight":false,"Temperature":{"Value":0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=22&unit=c&lang=en-us"},{"DateTime":"2018-02-16T23:00:00+01:00","EpochDateTime":1518818400,"WeatherIcon":35,"IconPhrase":"Partly cloudy","IsDaylight":false,"Temperature":{"Value":0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=1&hbhhour=23&unit=c&lang=en-us"},{"DateTime":"2018-02-17T00:00:00+01:00","EpochDateTime":1518822000,"WeatherIcon":36,"IconPhrase":"Intermittent clouds","IsDaylight":false,"Temperature":{"Value":0.0,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=0&unit=c&lang=en-us"},{"DateTime":"2018-02-17T01:00:00+01:00","EpochDateTime":1518825600,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":0.0,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=1&unit=c&lang=en-us"},{"DateTime":"2018-02-17T02:00:00+01:00","EpochDateTime":1518829200,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":0.0,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=2&unit=c&lang=en-us"},{"DateTime":"2018-02-17T03:00:00+01:00","EpochDateTime":1518832800,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=3&unit=c&lang=en-us"},{"DateTime":"2018-02-17T04:00:00+01:00","EpochDateTime":1518836400,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=4&unit=c&lang=en-us"},{"DateTime":"2018-02-17T05:00:00+01:00","EpochDateTime":1518840000,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":1,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=5&unit=c&lang=en-us"},{"DateTime":"2018-02-17T06:00:00+01:00","EpochDateTime":1518843600,"WeatherIcon":7,"IconPhrase":"Cloudy","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":3,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=6&unit=c&lang=en-us"},{"DateTime":"2018-02-17T07:00:00+01:00","EpochDateTime":1518847200,"WeatherIcon":36,"IconPhrase":"Intermittent clouds","IsDaylight":false,"Temperature":{"Value":-0.6,"Unit":"C","UnitType":17},"PrecipitationProbability":7,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10243/hourly-weather-forecast/167747?day=2&hbhhour=7&unit=c&lang=en-us"}]'; 
		var jsonresult ='[{"DateTime":"2020-04-04T17:00:00+02:00","EpochDateTime":1586012400,"WeatherIcon":3,"IconPhrase":"Partly sunny","HasPrecipitation":false,"IsDaylight":true,"Temperature":{"Value":11.7,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=17&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=17&unit=c&lang=en-us"},{"DateTime":"2020-04-04T18:00:00+02:00","EpochDateTime":1586016000,"WeatherIcon":3,"IconPhrase":"Partly sunny","HasPrecipitation":false,"IsDaylight":true,"Temperature":{"Value":11.1,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=18&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=18&unit=c&lang=en-us"},{"DateTime":"2020-04-04T19:00:00+02:00","EpochDateTime":1586019600,"WeatherIcon":3,"IconPhrase":"Partly sunny","HasPrecipitation":false,"IsDaylight":true,"Temperature":{"Value":10.0,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=19&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=19&unit=c&lang=en-us"},{"DateTime":"2020-04-04T20:00:00+02:00","EpochDateTime":1586023200,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":8.3,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=20&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=20&unit=c&lang=en-us"},{"DateTime":"2020-04-04T21:00:00+02:00","EpochDateTime":1586026800,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":7.2,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=21&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=21&unit=c&lang=en-us"},{"DateTime":"2020-04-04T22:00:00+02:00","EpochDateTime":1586030400,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":6.1,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=22&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=22&unit=c&lang=en-us"},{"DateTime":"2020-04-04T23:00:00+02:00","EpochDateTime":1586034000,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":5.0,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=23&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=1&hbhhour=23&unit=c&lang=en-us"},{"DateTime":"2020-04-05T00:00:00+02:00","EpochDateTime":1586037600,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":4.4,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=0&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=0&unit=c&lang=en-us"},{"DateTime":"2020-04-05T01:00:00+02:00","EpochDateTime":1586041200,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":3.9,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=1&unit=c&lang=en-us"},{"DateTime":"2020-04-05T02:00:00+02:00","EpochDateTime":1586044800,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":3.3,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=2&unit=c&lang=en-us"},{"DateTime":"2020-04-05T03:00:00+02:00","EpochDateTime":1586048400,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":2.8,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=3&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=3&unit=c&lang=en-us"},{"DateTime":"2020-04-05T04:00:00+02:00","EpochDateTime":1586052000,"WeatherIcon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false,"IsDaylight":false,"Temperature":{"Value":2.2,"Unit":"C","UnitType":17},"PrecipitationProbability":0,"MobileLink":"http://m.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=4&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/de/friedrichshain/10245/hourly-weather-forecast/167747?day=2&hbhhour=4&unit=c&lang=en-us"}]';
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
