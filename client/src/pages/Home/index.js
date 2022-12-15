import React from 'react';
import MapContainer from '../../components/Map';
import SearchEv from '../../components/SearchEv';
import { useState } from 'react';




function Home() {
	const [mapInfo, setMapInfo] = useState({
		locationMap: { lat: 34.064990, lng: -118.287300 },
		zipcodeInput: '',
		stationsEV: {},
		stationsFUEL: {}
	});
	// const [zipcodeInput, setZipcodeInput] = useState("");
	// const [stationsFUEL, setstationsFUEL] = useState("");
	// const [stationsEV, setstationsEV] = useState("");

	// const callGeolocation = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GM_API_KEY}`,
	// 			{ method: 'POST' }
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error('something went wrong!');
	// 		}

	// 		const { location } = await response.json();
	// 		setLocationMap({
	// 			...locationMap,
	// 			lat: location.lat,
	// 			lng: location.lng
	// 		});
	// 		console.log('geolocation');
	// 		geocode();
	// 	} catch (err) {
	// 		console.error(err.message);
	// 	}
	// };

	// async function geocode() {
	// 	try {
	// 		const response = await fetch(
	// 			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationMap.lat},${locationMap.lng}&key=${process.env.REACT_APP_GM_API_KEY}`,
	// 			{ method: 'POST' }
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error('something went wrong!');
	// 		}
	// 		const address = await response.json();
	// 		let dissected = address.results[0].address_components;
	// 		let zip;
	// 		for (let i = 7; i < dissected.length; i++) {
	// 			if (dissected[i].types[0] === 'postal_code') {
	// 				zip = dissected[i].short_name;
	// 			}
	// 		}
	// 		if (!zip) {
	// 			return console.log('zip not found');
	// 		}
	// 		setZipcodeInput(...zipcodeInput, zip);
	// 		console.log('geocode');
	// 		search();

	// 	} catch (err) {
	// 		console.error(err.message);
	// 	}
	// }

	async function search() {
		try {
			let zip = localStorage.getItem('zip');
			let latlng = JSON.parse(localStorage.getItem('latlng'));
			const responseEv = await fetch(
				`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&zip=${zip}&${process.env.REACT_APP_EV_API_KEY}`
			);
			const responseFuel = await fetch(
				`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas_station+in+${zip}&key=${process.env.REACT_APP_GM_API_KEY}`
			);
			if (!responseEv.ok || !responseFuel.ok) {
				throw new Error('something went wrong!');
			}
			const stationsEv = await responseEv.json();
			const stationsFuel = await responseFuel.json();
			// setstationsFUEL(...stationsFUEL, stationsFuel);
			// setstationsEV(...stationsEV, stationsEv);
			// setZipcodeInput(...zipcodeInput, "");
			console.log('search');
			console.log(mapInfo);
			console.log(zip);
			setMapInfo(...mapInfo,{
				locationMap: latlng,
				// zipcodeInput: zip,
				// stationsEV: stationsEv,
				// stationsFUEL: stationsFuel
			});
		} catch (err) {
			console.error(err);
		}
	}

	return (

		<>
			<SearchEv
				mapInfo={mapInfo}
				setMapInfo={setMapInfo}
				// zipcodeInput={zipcodeInput}
				// setZipcodeInput={setZipcodeInput}
				// stationsFUEL={stationsFUEL}
				// setstationsFUEL={setstationsFUEL}
				// stationsEV={stationsEV}
				// setstationsEV={setstationsEV}
				// locationMap={locationMap}
				// setLocationMap={setLocationMap}
				search={search}
			/>
			{/* <button onClick={callGeolocation}>Use Location</button> */}
			<MapContainer
				mapInfo={mapInfo}
				setMapInfo={setMapInfo}
				// zipcodeInput={zipcodeInput}
				// setZipcodeInput={setZipcodeInput}
				// stationsFUEL={stationsFUEL}
				// setstationsFUEL={setstationsFUEL}
				// stationsEV={stationsEV}
				// setstationsEV={setstationsEV}
				// locationMap={locationMap}
				// setLocationMap={setLocationMap}
				search={search}
				// geocode={geocode}
			/>
		</>
	);
}



export default Home;