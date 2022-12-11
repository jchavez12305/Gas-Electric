import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo } from 'react';
import './index.css';


export default function MapContainer() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GM_API_KEY,
    })

    if (!isLoaded) return <div>Loading...</div>;
    return <div className='mapContainer'><Map /></div>;

}

function Map() {
    //this is so it doesnt reset when it rerenders
    const  center = useMemo(()=>({ lat: 34.064990, lng: -118.283350 }),[]);
    let markerPosition = { lat: 34.052542, lng: -118.448504 };
    return (
    <GoogleMap 
        zoom={15} 
        center={center} 
        mapContainerClassName="map">
        <MarkerF position={center} />
        <MarkerF position={markerPosition} />
    </GoogleMap>
    );
}
