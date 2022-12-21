import React from 'react';
import MapContainer from '../../components/Map';
import SearchEv from '../../components/SearchEv/index';
import { useState } from 'react';




function Home() {
	const [locationMap, setLocationMap] = useState({ lat: 34.064990, lng: -118.287300 });
	const [zipcodeInput, setZipcodeInput] = useState("");
	const [stationsFUEL, setstationsFUEL] = useState("");
	const [stationsEV, setstationsEV] = useState("");
	const [gasChecked, setGasChecked] = useState(false);
	const [evChecked, setEvChecked] = useState(false);

	const callGeolocation = async () => {
		try {
			const response = await fetch(
				`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GM_API_KEY}`,
				{ method: 'POST' }
			);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const { location } = await response.json();
			let latlng = {
				lat: location.lat,
				lng: location.lng
			};
			localStorage.setItem('latlng', JSON.stringify(latlng));
			console.log('geolocation');
			geocode();
		} catch (err) {
			console.error(err.message);
		}
	};

	async function geocode() {
		try {
			let latlng = JSON.parse(localStorage.getItem('latlng'));
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${process.env.REACT_APP_GM_API_KEY}`,
				{ method: 'POST' }
			);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}
			const address = await response.json();
			let dissected = address.results[0].address_components;
			let zip;
			for (let i = 7; i < dissected.length; i++) {
				if (dissected[i].types[0] === 'postal_code') {
					zip = dissected[i].short_name;
				}
			}
			if (!zip) {
				return console.log('zip not found');
			}
			localStorage.setItem('zip', zip);
			console.log('geocode');
			search();

		} catch (err) {
			console.error(err.message);
		}
	}

	async function search() {
		try {
			let zip = localStorage.getItem('zip');
			let latlng = JSON.parse(localStorage.getItem('latlng'));
			let stationsEv = '';
			let stationsFuel = '';

			if (!evChecked) {
				const responseEv = await fetch(
					`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&zip=${zip}&${process.env.REACT_APP_EV_API_KEY}`
				);
				if (!responseEv.ok) {
					throw new Error('something went wrong!');
				}
				stationsEv = await responseEv.json();
			}
			if (!gasChecked) {
				console.log('hi')
				const responseFuel = await fetch(
					`/gas?zip=${zip}`
				);
				console.log(responseFuel);
				if (!responseFuel.ok) {
					
					throw new Error('something went wrong!');
				}
				stationsFuel = await responseFuel.json();
				console.log(stationsFuel);
			}
			setstationsEV(stationsEv);
			setstationsFUEL(stationsFuel);
			setLocationMap({ ...locationMap, lat: latlng.lat, lng: latlng.lng })
			setZipcodeInput(...zipcodeInput, "");
			console.log('search');
		} catch (err) {
			console.error(err);
		}
	}

	return (

		<>
			<SearchEv
				zipcodeInput={zipcodeInput}
				setZipcodeInput={setZipcodeInput}
				stationsFUEL={stationsFUEL}
				setstationsFUEL={setstationsFUEL}
				stationsEV={stationsEV}
				setstationsEV={setstationsEV}
				locationMap={locationMap}
				setLocationMap={setLocationMap}
				search={search}
				callGeolocation={callGeolocation}
				geocode={geocode}
				evChecked={evChecked}
				setEvChecked={setEvChecked}
				gasChecked={gasChecked}
				setGasChecked={setGasChecked}
			/>
			<MapContainer
				zipcodeInput={zipcodeInput}
				setZipcodeInput={setZipcodeInput}
				stationsFUEL={stationsFUEL}
				setstationsFUEL={setstationsFUEL}
				stationsEV={stationsEV}
				setstationsEV={setstationsEV}
				locationMap={locationMap}
				setLocationMap={setLocationMap}
				search={search}
				geocode={geocode}
			/>
		</>
	);
}



export default Home;