import React from 'react';
import './index.css'
import Card from 'react-bootstrap/card'


// const PlaceDetails = ({ place, selected, refProp }) => {
//     if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     const classes = useStyles();
  
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
                <Card style={{width: '20rem' }}>
                <Card.body>
                    <Card.Title>
                <div key={`RE-${station.id}`} className="stationName">
                    <h4>{label}</h4>
                    <h5>{station.station_name}</h5>
                </div>
                    </Card.Title>
                <Card.Text>
                <div class="addressDetails">
                    {station.street_address}, {station.city}, {station.state}, {station.zip}
                </div>
                </Card.Text>
                </Card.body>
                </Card>
            )})}
            {props.stationsFUEL.results?.map ((station) => {
            let label = `${emoji.getUnicode("fuelpump")}${labelMaker(fuelIndex)}`;
            fuelIndex++;
            return(
                <div key={`RG-${station.place_id}`} className="stationName">
                    <h4>{label}</h4>
                    <h5>{station.name}</h5>
                <div className="addressDetails">
                    {station.formatted_address.split(", United States").slice(0,-1)}
                </div>
                </div>
            )})}
        </div>
    )
}
export default StationListAPI;
