import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo } from 'react';
import './index.css';
import json from './all.json';
import $ from 'jquery';

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
      let currentLocation = {lat:location.lat,lng:location.lng};
      console.log(currentLocation);
      return currentLocation;

    } catch (err) {
      console.error(err);
    }
  };

  let coordinates = callGeolocation();
  console.log(coordinates, 'coordinates');

export default function MapContainer() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GM_API_KEY,
    })
    if (!isLoaded) return <div>Loading...</div>;
    return <div className='mapContainer'><Map /></div>;

}


function Map () {
    //this is so it doesnt reset when it rerenders
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let labelIndex = 0;
    // console.log(currentLocation);
    const center = useMemo(() => (coordinates), []);
    return (
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
    );
}