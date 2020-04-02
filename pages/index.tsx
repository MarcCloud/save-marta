import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withApollo } from '../lib/withApollo';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {BusRoute}from '../types';

const ALL_ROUTES = gql`
	query AllBusRoutes {
		getBusRoutes {
			id
			name
			number
			color
		}
	}
`;

const Index: NextPage<{}> = () => {
	const { data } = useQuery(ALL_ROUTES);
	if (data) {
		console.log(data.getBusRoutes);
	}
	return (
		<Container maxWidth="md">
			<Grid container direction="column">
				<Grid item>
					<Typography variant="h2">MARTA Bus Viewer</Typography>
				</Grid>
				<Grid item>
                    <Autocomplete 
                        options={data?.getBusRoutes as BusRoute[] || []}
                        getOptionLabel={(option) => `${option.number}-${option.name}`}
                        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}/>
				</Grid>
				<Grid item>
					<Typography variant="h1">Map</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default withApollo({ ssr: true })(Index);
