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
  const emoji = require("emoji-dictionary");

    return (
        <div className="sidebarContainer">
            {props.stationsEV.fuel_stations?.map ((station) => {
            let label = `${emoji.getUnicode("electric_plug")}${labelMaker(labelIndex)}`;
            labelIndex++;

            return(
                <div class="stationName">
                    <h4>{label}</h4>
                    <h5>{station.station_name}</h5>
                <div class="addressDetails">
                    {station.street_address}, {station.city}, {station.state}, {station.zip}
                </div>
                </div>
            )})}

            {props.stationsFUEL.results?.map((station) => {
            let label = `${emoji.getUnicode("fuelpump")}${labelMaker(fuelIndex)}`;
            fuelIndex++;

            return(
                <div class="stationName">
                    <h4>{label}</h4>
                    <h5>{station.name}</h5>
                <div class="addressDetails">
                    {station.formatted_address}
                </div>
                </div>
            )})}    
        </div>
    )
}


export default StationListAPI;
