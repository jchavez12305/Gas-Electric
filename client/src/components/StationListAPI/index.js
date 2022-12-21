import React from 'react';
import './index.css'

 
function StationListAPI(props) {
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
  const emoji = require("emoji-dictionary");
    return (
        <div className="sidebarContainer">
            {props.stationsEV.fuel_stations?.map ((station) => {
            let label = `${emoji.getUnicode("electric_plug")}${labelMaker(labelIndex)}`;
            labelIndex++;
            return(
                <div key={`RE-${station.id}`} className="stationName">
                    <h4>{label}</h4>
                    <h5>{station.station_name}</h5>
                <div className="addressDetails" style={{ borderBottom: "8px solid #0C1D36" }}>
                    {station.street_address}, {station.city}, {station.state}, {station.zip}
                    <h6 style= {{color: 'green'}}><b> OPEN </b></h6>
                </div>
                </div>
            )})}
            {props.stationsFUEL.results?.map ((station) => {
            let label = `${emoji.getUnicode("fuelpump")}${labelMaker(fuelIndex)}`;
            fuelIndex++;

            return(
                <div key={`RG-${station.place_id}`} className="stationName">
                    <h4>{label}</h4>
                    <h5>{station.name}</h5>
                <div className="addressDetails" style={{ borderBottom: "8px solid #0C1D36" }}>
                    {station.formatted_address.split(", United States").slice(0,-1)},  
                    {station.opening_hours && station.opening_hours.open_now ? (
						<>
                        <h6 style= {{color: 'green'}}><b> OPEN </b></h6>
						</>
					) : (
						<>
						<h6>  </h6>
						</>
					)}
                </div>
                </div>
            )})}
        </div>
    )
}
export default StationListAPI;
