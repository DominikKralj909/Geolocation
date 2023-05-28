const h1 = document.querySelector('h1');
console.log(h1)

const apiKey = 'AIzaSyB3dlE4DVHTz1Ma-rE4H8yHJTTkyT3Z4VU';

const errorCallback = (error) => console.error('Geolocation error:', error); 

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
	console.log('Geolocation is not supported by this browser.');
}

function successCallback(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

	(function fetchGeolocation() {
		fetch(geocodingApiUrl)
			.then(response => response.json())
			.then(data => {
				const countryComponent = data.results[0].address_components.find(component =>component.types.includes('country'));
				const countryName = countryComponent.long_name;
				localStorage.setItem('Country', countryName);

				h1.textContent = `Country name: ${countryName}`;
			})
			.catch(error => {
				console.log('Error:', error);
			});
	})();
};

