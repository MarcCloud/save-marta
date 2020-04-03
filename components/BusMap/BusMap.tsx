import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import GoogleMapReact from 'google-map-react';
import {BusRoute, Bus}from '../../types';
import { ALL_ROUTES, BUSES_BY_ROUTE } from './queries';

const BusMarker = (bus:Bus) => {
	return (
		<Box bgcolor="#FFF" borderColor="#00EF90" border={1} borderRadius={24} height={48} width={48} textAlign="center" p={1}>
			<Typography variant="caption">{`${bus.unit}`}</Typography>
			<AirportShuttleIcon fontSize="small"/>
		</Box>
	)
}

const BusMap:React.FC<{}> = () => {
    const { data } = useQuery(ALL_ROUTES);
	const [loadBuses, result] = useLazyQuery(BUSES_BY_ROUTE);
	const mapsApiKey = process.env.GOOGLE_MAPS_KEY || ''
	const handleRouteSelection = (_: React.ChangeEvent<{}>, value: BusRoute | null) => {
		const route = value?.number;
		if(value){loadBuses({variables:{route}})}
    }
    
    return (<>
    <Grid container direction="column" spacing={1}>
        <Grid item>
            {/*@ts-ignore*/}
            <Autocomplete
                data-testid="combobox"
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
                    defaultZoom={10}
                    >
                        {result?.data?.getBuses.map((bus:Bus) => 
                        //@ts-ignore
                        (<div lat={bus.lat} lng={bus.long}><BusMarker {...bus} /></div>))}
                </GoogleMapReact>
            </Box>
        </Grid>
    </Grid>
    {result.error &&
        <Alert severity="error">There was an issue finding buses for that route. Please try again later.</Alert>}
    {(result.called &&!result?.data?.getBuses.length)&&
        <Alert severity="info">There are no available buses for that route..</Alert>}
    </>)
}

export default BusMap;