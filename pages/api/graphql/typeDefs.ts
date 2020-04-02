import { gql } from 'apollo-server-micro';

const typeDefs = gql`
    type BusRoute {
        id: Int!
        number: String!
        name: String!
        color: String!
    }

    type Bus {
        route: String!
        lat: Float!
        long: Float!
        timepoint: String!
        unit: Int!
    }

	type Query {
		getBusRoutes: [BusRoute!]!
        getBuses(route:String!): [Bus!]!
	}
`;

export default typeDefs;
