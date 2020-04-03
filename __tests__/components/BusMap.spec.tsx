import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import BusMap from '../../components/BusMap';
import { ALL_ROUTES } from '../../components/BusMap/queries';
const mocks = [
	{
		request: {
			query: ALL_ROUTES
		},
		result: {
			data: {
				getBusRoutes: [
					{
						id: 7634,
						number: '1',
						name: 'Marietta Blvd/Joseph E Lowery Blvd',
						color: '819FF7'
					},
					{
						id: 7635,
						number: '2',
						name: 'Ponce de Leon Avenue / Druid Hills',
						color: '819FF7'
					}
				]
			}
		}
	}
];

describe('BusMap', () => {
	it('should reder without issues', () => {
		render(
			<MockedProvider mocks={mocks}>
				<BusMap />
			</MockedProvider>
		);
	});
});
