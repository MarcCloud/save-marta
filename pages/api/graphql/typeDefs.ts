import { gql } from 'apollo-server-micro';

const typeDefs = gql`
    type BusRoute {
        id: Int!
        number: String!
        name: String!
        color: String!
    }

	type Query {
		getBusRoutes: [BusRoute!]!
	}
`;

export default typeDefs;
// import { gql } from 'apollo-server-micro';

// const typeDefs = gql`
//   type BusRoute {
//     "id": Int!
//     "number": String!
//     "name": String!
//     "color": String!
//   }

//   type Bus {
//     lat: String!
//     long: String!
//     route: String!
//     timepoint: String!
//   }

//   type Query {
//     getBusRoutes(): [BusRoute]
//     getBus(routeNumber: String!): [Bus]
//   }
// `;

// export default typeDefs;
