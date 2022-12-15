import React from 'react';
import MapContainer from '../../components/Map';
import SearchEv from '../../components/SearchEv';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useState } from 'react';




function Home() {
	const [locationMap, setLocationMap] = useState({ lat: 34.064990, lng: -118.287300 });
	const [zipcodeInput, setZipcodeInput] = useState("");
	const [stationsFUEL, setstationsFUEL] = useState("");
	const [stationsEV, setstationsEV] = useState("");

	return (

		<>
			<Navbar />
			<Sidebar />
			<SearchEv
				zipcodeInput={zipcodeInput}
				setZipcodeInput={setZipcodeInput}
				stationsFUEL={stationsFUEL}
				setstationsFUEL={setstationsFUEL}
				stationsEV={stationsEV}
				setstationsEV={setstationsEV}
				locationMap={locationMap}
				setLocationMap={setLocationMap} />
			<MapContainer
				// zipcodeInput={zipcodeInput}
				// setZipcodeInput={setZipcodeInput}
				stationsEV={stationsEV}
				setstationsEV={setstationsEV}
				locationMap={locationMap}
				setLocationMap={setLocationMap} />
		</>
	);
}



export default Home;