import React from "react";
import {
  Row,
  Container,
  Col,
  Form,
  Button,
} from 'react-bootstrap';


function SearchEv(props) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem('zip', value);
    // return name === props.setZipcodeInput(value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let zip = localStorage.getItem('zip');
    if (!zip) {
      return false;
    }
    // if (!props.zipcodeInput) {
    //   return false;
    // }
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${process.env.REACT_APP_GM_API_KEY}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const address = await response.json();
      let latlng = address.results[0].geometry.location;
      localStorage.setItem('latlng', JSON.stringify(latlng));
      // props.setLocationMap({
      //   ...props.locationMap,
      //   lat: latlng.lat,
      //   lng: latlng.lng
      // }
      // );
      props.search();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container fluid className="text-light search" style={{width: "500px"}}  >
        <h3>Search for EV Stations</h3>
        <Form onSubmit={handleFormSubmit}>

          <Row>
            <Col xs={12} md={8}>

              <Form.Control
                name="zipcodeInput"
                // value={props.zipcodeInput}
                onChange={handleChange}
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