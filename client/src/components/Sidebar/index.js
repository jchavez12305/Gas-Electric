import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form, Button } from 'react-bootstrap';
import './index.css';
import { BsFilter } from 'react-icons/bs';
import StationListAPI from '../StationListAPI'



function Sidebar(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button title='Stations' onClick={handleShow}>
				<BsFilter className='filtericon' />
			</Button>


			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Filter Search</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Offcanvas.Title>Fuel Type</Offcanvas.Title>

					<Form>
						{['checkbox'].map((type) => (
							<div key={`default-${type}`} className="mb-3">
								<Form.Check
									type={type}
									id={`default-${type}`}
									label={`Gas`}
								/>
								<Form.Check
									type={type}
									id={`default-${type}`}
									label={`Electric`}
								/>
							</div>
						))}
					</Form>
					<StationListAPI
						zipcodeInput={props.zipcodeInput}
						setZipcodeInput={props.setZipcodeInput}
						stationsFUEL={props.stationsFUEL}
						setstationsFUEL={props.setstationsFUEL}
						stationsEV={props.stationsEV}
						setstationsEV={props.setstationsEV}
						locationMap={props.locationMap}
						setLocationMap={props.setLocationMap}
						search={props.search}
						geocode={props.geocode} />

					{/* <Offcanvas.Title>Distance</Offcanvas.Title> */}

					{/* <Form>
						{['checkbox'].map((type) => (
							<div key={`default-${type}`} className="mb-3">
								<Form.Check
									type={type}
									id={`default-${type}`}
									label={`5 mi`}
								/>
								<Form.Check
									type={type}
									id={`default-${type}`}
									label={`10 mi`}
								/>
								<Form.Check
									type={type}
									id={`default-${type}`}
									label={`25 mi`}
								/>
								<Form.Check
									type={type}
									id={`default-${type}`}
									label={`50 mi`}
								/>

							</div>
						))}
					</Form> */}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default Sidebar;