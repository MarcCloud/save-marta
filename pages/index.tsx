import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import GoogleMapReact from 'google-map-react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withApollo } from '../lib/withApollo';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {BusRoute}from '../types';

const mapsApiKey = "AIzaSyCbuuFPjf64OjJPzRiXMmxW-bhY7rZQaWA"

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
	
	return (
		<Container maxWidth="md">
			<Grid container direction="column" spacing={1}>
				<Grid item>
					<Typography variant="h4">MARTA Bus Viewer</Typography>
				</Grid>
				<Grid item>
                    <Autocomplete 
                        options={data?.getBusRoutes as BusRoute[] || []}
                        getOptionLabel={(option) => `${option.number}-${option.name}`}
                        renderInput={(params) => <TextField {...params} label="Choose a Route" variant="outlined" />}/>
				</Grid>
				<Grid item>
					<Box width="100%" height="75vh">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: mapsApiKey }}
                            defaultCenter={{lat: 33.7421726, lng:-84.3941932}}
                            defaultZoom={12}
                            >

                            
                        </GoogleMapReact>
                    </Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default withApollo({ ssr: true })(Index);
