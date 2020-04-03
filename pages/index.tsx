import React from 'react';
import { NextPage } from 'next';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withApollo } from '../lib/withApollo';
import Footer from '../components/Footer';
import BusMap from '../components/BusMap';

const Index: NextPage<{}> = () => {
	return (
		<Container maxWidth="md">
			<Grid container direction="column" spacing={1} justify="center">
				<Grid item container direction="row" justify="center">
					<Grid item md={4}>
						<Typography variant="h4">MARTA Bus Viewer</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<BusMap />
				</Grid>
				<Grid item container direction="row" justify="space-around" alignContent="center">
					<Grid item md={5}>
						<Footer />
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

export default withApollo({ ssr: true })(Index);
