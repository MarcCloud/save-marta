import React from 'react';
import { NextPage } from 'next';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

interface BusRoute {}

const Index: NextPage<{ busRoutes: BusRoute[] }> = () => {
	return (
		<Container maxWidth="md">
			<Grid container direction="column">
				<Grid item>
					<Typography variant="h1">MARTA Bus Viewer</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h1">Route Selection</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h1">Map</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Index;
