/**
 * @jest-environment node
 */
import fetch from 'isomorphic-unfetch';
import resolvers from '../../../pages/api/graphql/resolvers';

jest.mock('isomorphic-unfetch', () => () =>
	Promise.resolve({
		json: () => [
			{
				LATITUDE: '33.7745208',
				LONGITUDE: '-84.297658',
				ROUTE: '15',
				TIMEPOINT: 'Candler Rd & Glenwood Rd',
				VEHICLE: '12345'
			}
		]
	})
);

describe('Resolvers', () => {
	it('has a resolver that returns a list of routes with number, name', () => {
		const results = resolvers.Query.getBusRoutes();
		expect(results.length).toBeGreaterThan(0);
		expect(results[0]).toHaveProperty('name');
		expect(results[0]).toHaveProperty('number');
	});

	it('has a resolver that returns active buses by route number', async () => {
		const result = await resolvers.Query.getBuses({}, { route: '15' });
		expect(result).toHaveLength(1);
		expect(result[0]).toHaveProperty('route');
		expect(result[0]).toHaveProperty('unit');
		expect(result[0]).toHaveProperty('lat');
		expect(result[0]).toHaveProperty('long');
	});
});
