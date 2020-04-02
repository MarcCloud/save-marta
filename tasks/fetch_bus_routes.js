const fetch = require('isomorphic-unfetch');
const fs = require('fs');
const transformJson = require('../lib/transformJson');
const MARTA_URL = 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus';



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
