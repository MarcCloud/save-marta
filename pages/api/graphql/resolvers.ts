import * as fetch from 'node-fetch';
import routesData from '../../../data/routes.json';
interface BusRoutesParams {}

const resolvers = {
	Query: {
		getBusRoutes: () => {
			return routesData.map((route) => ({
				id: route.route_id,
				number: route.route_short_name,
				name: route.route_long_name,
				color: route.route_color
			}));
		}
	}
};

export default resolvers;
