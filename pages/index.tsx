import React, { useState, useEffect, ChangeEvent } from 'react';
import { NextPage } from 'next';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import GoogleMapReact from 'google-map-react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withApollo } from '../lib/withApollo';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import {BusRoute, Bus}from '../types';
import Footer from '../components/Footer';

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

const BUSES_BY_ROUTE = gql`
	query BusesByRoute($route:String!){
		getBuses(route:$route){
			unit,
			lat,
			long,
			timepoint
		}
	}
`;

const BusMarker = (bus:Bus) => {
	
	return (
		<Box bgcolor="#FFF" borderColor="#00EF90" border={1} borderRadius={24} height={48} width={48} textAlign="center" p={1}>
			<Typography variant="caption">{`${bus.unit}`}</Typography>
			<AirportShuttleIcon fontSize="small"/>
		</Box>
	)
}

const Index: NextPage<{}> = () => {
	const { data } = useQuery(ALL_ROUTES);
	const [loadBuses, result] = useLazyQuery(BUSES_BY_ROUTE);

	const handleRouteSelection = (event: ChangeEvent<{}>, value: BusRoute | null) => {
		const route = value?.number;
		if(value){loadBuses({variables:{route}})}
	}
	if(result?.data?.getBuses){
		console.log(result?.data?.getBuses);
	}

	return (
		<Container maxWidth="md">
			<Grid container direction="column" spacing={1} justify="center">
				<Grid item container  direction="row" justify="center">
					<Grid item md={4}>
						<Typography variant="h4">MARTA Bus Viewer</Typography>
					</Grid>
				</Grid>
				<Grid item>
                    <Autocomplete 
                        options={data?.getBusRoutes as BusRoute[] || []}
						getOptionLabel={(option) => `${option.number}-${option.name}`}
						onChange={handleRouteSelection}
						
                        renderInput={(params) => <TextField {...params} fullWidth label="Choose a Route" variant="outlined" />}
						/>
				</Grid>
				<Grid item>
					<Box width="100%" height="75vh">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: mapsApiKey }}
                            defaultCenter={{lat: 33.7421726, lng:-84.3941932}}
                            defaultZoom={12}
                            >
								{result?.data?.getBuses.map((bus:Bus) => 
								//@ts-ignore
								(<div lat={bus.lat} lng={bus.long}><BusMarker {...bus} /></div>))}
                        </GoogleMapReact>
                    </Box>
				</Grid>
				<Grid item container  direction="row" justify="space-around" alignContent="center">
					<Grid item md={5}><Footer/></Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default withApollo({ ssr: true })(Index);
