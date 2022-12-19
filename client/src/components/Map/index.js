import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import './index.css';
import icon from '../../assets/images/userMarker.png';

function MapContainer(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GM_API_KEY,
  })

  async function newCenter() {
    let position = this.getPosition().toJSON();
    let latlng = {
      lat: position.lat,
      lng: position.lng
    };
    localStorage.setItem('latlng', JSON.stringify(latlng));
    props.geocode();
  }

  if (!isLoaded) return <div>Loading...</div>;
  return <div className='mapContainer'><Map
    newCenter={newCenter}
    zipcodeInput={props.zipcodeInput}
    stationsEV={props.stationsEV}
    stationsFUEL={props.stationsFUEL}
    locationMap={props.locationMap}
  /></div>;
}

function Map(props) {
  const emoji = require("emoji-dictionary");
  //this is so it doesnt reset when it rerenders
  let labelIndex = 0;
  let fuelIndex = 0;

  function labelMaker(index) {
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let longerLabel = '';
    if (index >= labels.length) {
      let round = Math.floor(index / labels.length)-1;
      longerLabel += labels[round];
    }
    longerLabel += labels[index % labels.length];
    return longerLabel;
  }
  
  return (
    <>
      <GoogleMap
        zoom={15}
        center={{ lat: props.locationMap.lat, lng: props.locationMap.lng }}
        mapContainerClassName="map">
        <MarkerF
          position={{ lat: props.locationMap.lat, lng: props.locationMap.lng }}
          title='User'
          id='user'
          draggable
          icon={icon}
          onDragEnd={props.newCenter}
        />
        {props.stationsEV.fuel_stations?.map((station) => {
          let position = { lat: station.latitude, lng: station.longitude };
          let label = `${emoji.getUnicode("electric_plug")}${labelMaker(labelIndex)}`;
          labelIndex++;
          let stationName = station.station_name;
          return (
            <MarkerF className="marker" key={`E-${station.id}`} position={position} label={label} title={stationName} />
          )
        })};
        {props.stationsFUEL.results?.map((station) => {
          let location = station.geometry.location;
          let position = { lat: location.lat, lng: location.lng };
          let label = `${emoji.getUnicode("fuelpump")}${labelMaker(fuelIndex)}`;
          fuelIndex++;
          let stationName = station.name;
          return (
            <MarkerF className="marker" key={`G-${station.place_id}`} position={position} label={label} title={stationName} />
          )
        })};
      </GoogleMap>
    </>
  );
}

export default MapContainer;