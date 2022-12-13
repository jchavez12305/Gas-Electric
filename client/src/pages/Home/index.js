import React from 'react';
import SearchEv from "../../components/SearchEv";

import Map from '../../components/Map';

function Home() {
	return (
		<>
		<div className="row g-3">
			<div className="citybox">
				<input type="text" className="city" placeholder="City" aria-label="City"></input>
			</div>
			<div className="statebox">
				<input type="text" className="state" placeholder="State" aria-label="State"></input>
			</div>
			<div className="zipcode">
				<input type="text" className="zipcode" placeholder="Zip" aria-label="Zip"></input>
			</div>
			
		</div>
		<SearchEv/>
		<Map/>

		</>

	);
}



export default Home;