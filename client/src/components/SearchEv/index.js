import React from "react";
import { BiCurrentLocation } from 'react-icons/bi';
import { GoSearch } from 'react-icons/go';



import {
  // Row,
  // Container,
  // Col,
  Form,
  Button,
} from 'react-bootstrap';
import './index.css';
import Sidebar from '../Sidebar';
import $ from 'jquery';
import { IoLocationSharp } from 'react-icons/io5';


function SearchEv(props) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem('zip', value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    $('#searchInput').val('');

    let zip = localStorage.getItem('zip');
    if (!zip) {
      return false;
    }
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${process.env.REACT_APP_GM_API_KEY}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      //       const stationsEv = await response.json();
      // console.log(stationsEv)

      // props.setZipcodeInput("");
      // props.setstationsEV(stationsEv);

      const address = await response.json();
      let latlng = address.results[0].geometry.location;
      localStorage.setItem('latlng', JSON.stringify(latlng));
      props.search();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="searchSection">
      <Sidebar 
      zipcodeInput={props.zipcodeInput}
      setZipcodeInput={props.setZipcodeInput}
      stationsFUEL={props.stationsFUEL}
      setstationsFUEL={props.setstationsFUEL}
      stationsEV={props.stationsEV}
      setstationsEV={props.setstationsEV}
      locationMap={props.locationMap}
      setLocationMap={props.setLocationMap}
      search={props.search}
      geocode={props.geocode}/>
      <Button title='Use Current Location' onClick={props.callGeolocation}>
        <IoLocationSharp className="location" />
      </Button>
      <Form className="text-light search" onSubmit={handleFormSubmit}>

        <Form.Control
          name="zipcodeInput"
          // value={props.zipcodeInput}
          onChange={handleChange}
          type="text"
          id='searchInput'
          size="sm"
          placeholder="Search by Zip"
        />


        <Button type='submit'>
          <GoSearch />
        </Button>
      </Form>
    </div>
  );
}
export default SearchEv;