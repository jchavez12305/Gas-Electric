import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import './index.css';


function MapContainer(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GM_API_KEY,
  })

  // async function newCenter() {
  //   let position = this.getPosition().toJSON();
  //   props.setLocationMap({
	// 		...props.locationMap,
	// 		lat: position.lat,
	// 		lng: position.lng
	// 	});
  //   props.geocode();
  // }

  if (!isLoaded) return <div>Loading...</div>;
  return <div className='mapContainer'><Map
    // newCenter={newCenter}
    mapInfo={props.mapInfo}
    setMapInfo={props.setMapInfo}
    // zipcodeInput={props.zipcodeInput}
    // stationsEV={props.stationsEV}
    // stationsFUEL={props.stationsFUEL}
    // locationMap={props.locationMap}
  /></div>;
}

function Map(props) {
  //this is so it doesnt reset when it rerenders
  let labelIndex = 0;
  let fuelIndex = 0;

  function labelMaker(index) {
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let longerLabel = '';
    for (let i = 0; i < index / labels.length; i++) {
      longerLabel += labels[index % labels.length];
    }
    return longerLabel;
  }
  let locationMap=props.mapInfo.locationMap;
  let zipcodeInput=props.mapInfo.zipcodeInput;
  let stationsEV=props.stationsEV;
  let stationsFUEL=props.stationsFUEL;
  if(!zipcodeInput){
    stationsEV={fuel_stations:[]};
    stationsFUEL={results:[]};
  }

  return (
    <>
      <GoogleMap
        zoom={15}
        center={{ lat: locationMap.lat, lng: locationMap.lng }}
        mapContainerClassName="map">
        <MarkerF
          position={{ lat: locationMap.lat, lng: locationMap.lng }}
          title='user'
          id='user'
          draggable
          // onDragEnd={props.newCenter}
        />
        {stationsEV.fuel_stations?.map((station) => {
          let position = { lat: station.latitude, lng: station.longitude };
          labelIndex++;
          let label = `E-${labelMaker(labelIndex)}`;
          let stationName = station.station_name;
          return (
            <MarkerF key={label} position={position} label={label} title={stationName} />
          )
        })};
        {stationsFUEL.results?.map((station) => {
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