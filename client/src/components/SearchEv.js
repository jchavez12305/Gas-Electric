import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  Col,
  Form,
  Button,

} from 'react-bootstrap';

import { useMutation } from '@apollo/client';

function SearchEv(props) {

  

  // const handleChange = (e) => {

  //   const { name, value } = e.target;

  //   return name === setZipcodeInput(value);
  // };

  

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!zipcodeInput) {
  //     return false;
  //   }

  //   try {
  //     const response = await fetch(
  //       `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&zip=${zipcodeInput}&${process.env.REACT_APP_EV_API_KEY}`
  //     );

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     const items = await response.json();
  //     const stations = items.fuel_stations;
  //     console.log(stations)
      

  //     setZipcodeInput("");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  

  return (
    <>

      <Container fluid className="text-light search" style={{width: "500px"}}  >
        <h3>Search for EV Stations</h3>
        <Form onSubmit={handleFormSubmit}>

          <Row>
            <Col xs={12} md={8}>

              <Form.Control
                name="zipcodeInput"
                value={props.zipcodeInput}
                onChange={props.handleChange}
                type="text"

                size="sm"
                placeholder="zip"

              />

            </Col>
            <Col xs={12} md={4}>
              <Button type="submit" variant="success" size="sm">
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
export default SearchEv;