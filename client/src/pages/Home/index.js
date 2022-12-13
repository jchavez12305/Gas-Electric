import React from 'react';
import MapContainer from '../../components/Map';
import SearchEv from '../../components/SearchEv';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';



function Home() {
	return (
		<>
			<Navbar />
			<Sidebar />
			<SearchEv />
			<MapContainer/>
		</>
	);
}



export default Home;