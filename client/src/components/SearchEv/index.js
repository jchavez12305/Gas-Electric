import React from "react";
import { IoLocationSharp } from 'react-icons/io5';
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


function SearchEv(props) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem('zip', value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
      <Sidebar />
      <IoLocationSharp onClick={props.callGeolocation} className= "location"/>
      <Form className="text-light search" onSubmit={handleFormSubmit}>

        <Form.Control
          name="zipcodeInput"
          // value={props.zipcodeInput}
          onChange={handleChange}
          type="text"

          size="sm"
          placeholder="Search by Zip"
        />
        <GoSearch/>
      </Form>
    </div>
  );
}
export default SearchEv;