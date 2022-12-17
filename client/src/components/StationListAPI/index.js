import { useState, useEffect } from 'react';
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

    return (
        <div className="sidebarContainer">
        <div>
            <h1>test</h1>
        </div>
            {props.stationsEV.fuel_stations?.map ((station) => {
            let label = `E-${labelMaker(labelIndex)}`;
            labelIndex++;

            return(
                <div key={`RE-${station.id}`} className="stationName">
                    <h4>{label}</h4>
                    <h5>{station.station_name}</h5>
                </div>
            )})}

            {props.stationsFUEL.results?.map((station) => {
            let label = `G-${labelMaker(fuelIndex)}`;
            fuelIndex++;

            return(
                <div key={`RG-${station.place_id}`} className="stationName">
                    <h4>{label}</h4>
                    <h5>{station.name}</h5>
                </div>
            )})}    
        </div>
    )
}


export default StationListAPI;
