import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from 'react';
import './index.css';


function MapContainer() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GM_API_KEY,
  })

  const [locationMap, setLocationMap] = useState({ lat: 34.064990, lng: -118.287300 });
  const [zipcodeInput, setZipcodeInput] = useState("");
  const [stationsFUEL, setstationsFUEL] = useState("");
  const [stationsEV, setstationsEV] = useState("");


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
      // console.log(location);

      const responseZip = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.REACT_APP_GM_API_KEY}`,
        { method: 'POST' }
      );

      if (!responseZip.ok) {
        throw new Error('something went wrong!');
      }
      const address = await responseZip.json();
      let zip = address.results[0].address_components[7].short_name;
      setZipcodeInput(...zipcodeInput, zip);
      setLocationMap({
        ...locationMap,
        lat: location.lat,
        lng: location.lng
      }
      );
      console.log(zipcodeInput,'geolocation');

      search();
    } catch (err) {
      console.error(err.message);
    }
  };

  async function newCenter() {
    let position = this.getPosition().toJSON();
    geocode(position);  
  }

  async function geocode(coordinates){
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GM_API_KEY}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      setLocationMap({
        ...locationMap,
        lat: coordinates.lat,
        lng: coordinates.lng
      }
      );
      const address = await response.json();
      let zip = address.results[0].address_components[7].short_name;
      setZipcodeInput(...zipcodeInput, zip);
      search();

    } catch (err) {
      console.error(err.message);
    }
  } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    return name === setZipcodeInput(value);
  };

  const handleFormSubmit = async (event) => {
    event ? event.preventDefault() : console.log('noEvent');
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcodeInput}&key=${process.env.REACT_APP_GM_API_KEY}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const address = await response.json();
      let latlng = address.results[0].geometry.location;
      setLocationMap({
        ...locationMap,
        lat: latlng.lat,
        lng: latlng.lng
      }
      );
      search();

    } catch (err) {
      console.error(err.message);
    }
  };

  async function search() {
    // let allMarkers = document.getElementsByClassName('marker');
    // allMarkers.remove();
    // labelIndex=0;
    // fuelIndex=0;
    if (!zipcodeInput) {
      return false;
    }
    console.log(zipcodeInput,'search');
    try {
      const responseEv = await fetch(
        `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&zip=${zipcodeInput}&${process.env.REACT_APP_EV_API_KEY}`
      );
      //will need to update initial website
      const responseFuel = await fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas_station+in+${zipcodeInput}&key=${process.env.REACT_APP_GM_API_KEY}`
      );
      if (!responseEv.ok || !responseFuel.ok) {
        throw new Error('something went wrong!');
      }
      const stationsEv = await responseEv.json();
      const stationsFuel = await responseFuel.json(); 
      setstationsFUEL(...stationsFUEL, stationsFuel);
      setstationsEV(...stationsEV, stationsEv);
      // setZipcodeInput("");
    } catch (err) {
      console.error(err);
    }

  }

  if (!isLoaded) return <div>Loading...</div>;
  return <div className='mapContainer'><Map
    coord={locationMap}
    geolocation={callGeolocation}
    newCenter={newCenter}
    zipcodeInput={zipcodeInput}
    handleFormSubmit={handleFormSubmit}
    handleChange={handleChange}
    stationsEV={stationsEV}
    stationsFUEL={stationsFUEL}
    // labelIndex={labelIndex}
    // fuelIndex={fuelIndex} 
    /></div>;
}

function Map(props) {
  //this is so it doesnt reset when it rerenders
  let labelIndex = 0;
  let fuelIndex = 0;
  
  function labelMaker(index){
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let longerLabel = '';
    for(let i = 0; i < index/labels.length; i++){
      longerLabel+=labels[index%labels.length];
    }
    return longerLabel;
  }
  return (
    <>
      <button onClick={props.geolocation}>Geolocation</button>
      <form onSubmit={props.handleFormSubmit}>
        <input name="zipcodeInput"
          value={props.zipcodeInput}
          onChange={props.handleChange}
          type="text" />
        <button type='submit'>Submit</button>
      </form>

      <GoogleMap
        zoom={15}
        center={{ lat: props.coord.lat, lng: props.coord.lng }}
        mapContainerClassName="map">
        <MarkerF
          position={{ lat: props.coord.lat, lng: props.coord.lng }}
          title='user'
          id='user'
          draggable
          onDragEnd={props.newCenter}
        />
        {props.stationsEV.fuel_stations?.map((station) => {
          let position = { lat: station.latitude, lng: station.longitude };
          labelIndex++;
          let label = `E-${labelMaker(labelIndex)}`;
          let stationName = station.station_name;
          return (
            <MarkerF key={label} position={position} label={label} title={stationName} />
          )
        })};
        {props.stationsFUEL.results?.map((station) => {
          let location = station.geometry.location;
          let position = { lat: location.lat, lng: location.lng };
          fuelIndex++;
          let label = `G-${labelMaker(fuelIndex)}`;
          let stationName = station.name;
          return (
            <MarkerF key={label} position={position} label={label} title={stationName} />
          )
        })};
      </GoogleMap>
    </>
  );
}

export default MapContainer;