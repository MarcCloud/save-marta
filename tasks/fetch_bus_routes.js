const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const MARTA_URL = 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus';

function transformJson(rawData = []) {
	return rawData.map((rawRoute) => {
		const { ROUTE, TIMEPOINT, LATITUDE, LONGITUDE } = rawRoute;
		return {
			lat       : LATITUDE,
			long      : LONGITUDE,
			route     : ROUTE,
			timepoint : TIMEPOINT
		};
	});
}

function saveToData(busRoutes = []) {
	try {
		const content = JSON.stringify(busRoutes);
		fs.writeFile('data/latest_bus_locations.json', content, (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Bus Routes Data Saved:', content);
		});
	} catch (err) {
		console.error(err);
	}
}

fetch(MARTA_URL).then((res) => res.json()).then((rawData) => transformJson(rawData)).then(saveToData);
