import fetch from 'isomorphic-unfetch';
import routesData from '../../../data/routes.json';
import {Bus} from '../../../types';

const resolvers = {
	Query: {
		getBusRoutes: () => {
			return routesData.map((route) => ({
				id: route.route_id,
				number: route.route_short_name,
				name: route.route_long_name,
				color: route.route_color
			}));
		},
		//@ts-ignore
		getBuses: (_, { route }: { route: string }) => {
			return fetch(`http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetBusByRoute/${route}`)
				.then((res) => res.json())
				.then((buses) => {
					//@ts-ignore
					return buses.map((bus)=>{
						const { ROUTE, TIMEPOINT, LATITUDE, LONGITUDE, VEHICLE } = bus;
						return {
							lat: LATITUDE,
							long: LONGITUDE,
							route: ROUTE,
							timepoint: TIMEPOINT,
							unit: VEHICLE
						};
					})
				});
		}
	}
};

export default resolvers;
