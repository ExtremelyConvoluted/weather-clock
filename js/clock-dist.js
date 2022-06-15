//  Put API keys here!
const NEWSKEY = 'enter your key for the Guardian API here';
const WEATHERKEY = 'enter your key for the OpenWeatherMap API here';

// For longitude and latitude, use the website https://www.latlong.net/
const latitude = 0.00;
const longitude = 0.00;

// This runs forever.
document.observe('dom:loaded', function() { // eslint-disable-line no-undef
	// The comment eslint-disable-line no-undef removes the false undeclared variable warnings from the eslint linter.
	updateClock();
	updateNews();
	updateWeather();
});

function updateClock() {
	// Gets the date
	const date = new Date();

	// Updates the div element called date using this criteria.
	// The results will be like Monday 1 January 2000.
	$('date').update(date.toLocaleDateString(navigator.language, { // eslint-disable-line no-undef
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}));

	// Updates elements with the names hour and minute with the hours and minutes
	$('hour').update(fmtTimePart(date.getHours()));
	$('minute').update(fmtTimePart(date.getMinutes()));

	// Delays this function from happening until the next second
	updateClock.delay(1);
}

// Formats the time part so that it is always two digits (e.g. 00:1 -> 00:01)
function fmtTimePart(part) {
	return ('0' + part).slice(-2);
}

function updateNews() {
	// For options to add to the URL to filter the query e.g. by topic
	// More information can be found on https://open-platform.theguardian.com/documentation/
	const newsFilter = '';

	// Guardian API link
	const newsApi = `https://content.guardianapis.com/search?${
		newsFilter}&api-key=${NEWSKEY}`;

	// Queries the server at the link for the API, then only gets the JSON file
	fetch(newsApi).then(response => { // eslint-disable-line no-undef
		return response.json();

	// With the JSON file, do this:
	}).then(data => {
		// Gets the results of the query
		const results = data.response.results;
		// Chooses a random result from that query
		const index = Math.floor(Math.random() * results.length);
		// Gets the content with the index: the news stories are a list
		const result = results[index];
		// Gets the title of the story as seen on the website
		const webTitle = result.webTitle;

		$('news').update(`${webTitle}`);
	});

	updateNews.delay(10);
}

function updateWeather() {
	const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${
		latitude}&lon=${longitude}&appid=${WEATHERKEY}`;


	fetch(weatherApi).then(response => { // eslint-disable-line no-undef
		return response.json();
	}).then(data => {
		const forecasts = data.list;

		const times = [];
		const icons = [];
		// The query consists of forecasts every 3 hours (00:00, 03:00, 06:00 etc.).
		// These start from the time closest to the current time.
		// (it would be 12:00 for 12:34, or 15:00 for 14:34).

		// For every number in 12 (only the first 12 hours of weather is necessary)
		for (let i = 0; i < 13; i++) {
			// If it is an odd number:
			// (this will make it every 6 hours to save space)
			if (i % 2 === 0) {
				// Gets the ith date from the list of data called forecasts
				// then splits it to get the time,
				// then splits it by the colon to just get the hour.
				const time = ' ' + forecasts[
					i].dt_txt.split(' ')[1].split(':')[0];
				// Returns a code which corresponds to an image in the img folder
				const picture = forecasts[i].weather[0].icon;

				// Puts a time like 03:00 into the array times to be displayed
				times.push(' ' + time + ':00');
				// Puts the HTML link for an image into the array icons to be displayed
				icons.push('<img src="img/' + picture + '@2x.png" alt="Weather Icon">');
			}
		}

		// Displays list of times (elements separated by commas)
		$('weatherTime').update(times);
		// Displays list of icons (HTML links separated by spaces)
		$('weatherIcon').update(icons.join(' '));
	});

	updateWeather.delay(10);
}