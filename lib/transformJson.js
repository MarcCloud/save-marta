function transformJson(rawData = []) {
	return rawData.map((rawRoute) => {
		const { ROUTE, TIMEPOINT, LATITUDE, LONGITUDE } = rawRoute;
		return {
			lat: LATITUDE,
			long: LONGITUDE,
			route: ROUTE,
			timepoint: TIMEPOINT
		};
	});
}

module.exports = transformJson