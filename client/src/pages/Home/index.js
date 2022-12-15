import React from 'react';
import Map from '../../components/Map';
import SearchEv from '../../components/SearchEv';


function Home() {
	const [zipcodeInput, setZipcodeInput] = useState("");
	const handleChange = (e) => {

		const { name, value } = e.target;

		return name === setZipcodeInput(value);
	};



	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!zipcodeInput) {
			return false;
		}

		try {
			const response = await fetch(
				`https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&zip=${zipcodeInput}&${process.env.REACT_APP_EV_API_KEY}`
			);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const items = await response.json();
			const stations = items.fuel_stations;
			console.log(stations)


			setZipcodeInput("");
		} catch (err) {
			console.error(err);
		}
	};
	return (

		<>
			<SearchEv zipcodeInput={zipcodeInput} setZipcodeInput={setZipcodeInput} handleFormSubmit={handleFormSubmit} handleChange={handleChange}/>
			<Map zipcodeInput={zipcodeInput} setZipcodeInput={setZipcodeInput} />
		</>

	);
}



export default Home;