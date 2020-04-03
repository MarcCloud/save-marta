import gql from 'graphql-tag';
export const ALL_ROUTES = gql`
	query AllBusRoutes {
		getBusRoutes {
			id
			name
			number
			color
		}
	}
`;

export const BUSES_BY_ROUTE = gql`
	query BusesByRoute($route:String!){
		getBuses(route:$route){
			unit,
			lat,
			long,
			timepoint
		}
	}
`;