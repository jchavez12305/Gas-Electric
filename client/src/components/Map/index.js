import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from 'react';
import './index.css';
import json from './all.json';
import $ from 'jquery';



function MapContainer(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GM_API_KEY,
    })

    const [location, setLocation] = useState({lat:34.064990,lng:-118.283350});

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
        setLocation({lat:location.lat,lng:location.lng});
      } catch (err) {
        console.error(err.message);
      }
    };

    // callGeolocation();

    // //when state changes run this callback
    //   // Use useEffect hook to set the document.title to the current temp
    // useEffect(() => {
    //   document.title = `° Fahrenheit`;
    //   },[]);
    
      // const handleIncrease = () => {
      // setLocation({lat:34.064990,lng:-118.283350});
      // };
    

    if (!isLoaded) return <div>Loading...</div>;
    return <div className='mapContainer'><Map coord={location} geolocation={callGeolocation}/></div>;

}

function Map(props) {
    //this is so it doesnt reset when it rerenders
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let labelIndex = 0;
    // console.log(currentLocation);
    const center = useMemo(() => ({lat:props.coord.lat,lng:props.coord.lng}), []);
    return (
      <>
      <button onClick={props.geolocation}>Geolocation</button>
        <GoogleMap
            zoom={15}
            center={center}
            mapContainerClassName="map">
            <MarkerF
                position={center}
                label='10'
                title='the curb'
                draggable/>
            {json.fuel_stations.map((station) => {
                let position = { lat: station.latitude, lng: station.longitude };
                let label = labels[labelIndex++ % labels.length];
                let stationName = station.station_name;
                return (
                    <MarkerF key={label} position={position} label={label} title={stationName}/>
                )
            })};
        </GoogleMap>
        </>
    );
}

export default MapContainer;