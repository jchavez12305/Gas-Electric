import React, { useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';
import './index.css';
import { BsFilter } from 'react-icons/bs';
import StationListAPI from '../StationListAPI'
import image from "../../assets/images/logo.png";




function Sidebar(props) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const exclude = (e) => {
		let checkbox = e.target.id;
		if (checkbox === 'default-gas') {
			if (e.target.checked) {
				props.setGasChecked(true);
			} else {
				props.setGasChecked(false);
			}
		} else if (checkbox === 'default-electric') {
			if (e.target.checked) {
				props.setEvChecked(true);
			} else {
				props.setEvChecked(false);
			}
		}
	}

	return (
		<>
			<Button title='Stations' onClick={handleShow}>
				<BsFilter className='filtericon' />
			</Button>


			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header >
					<Form>
						<div key={`default-checkbox`} className="mb-3">
							<Form.Check
								type='checkbox'
								id={`default-gas`}
								label={`Gas`}
								onChange={exclude}
								checked={props.gasChecked}
							/>
							<Form.Check
								type='checkbox'
								id={`default-electric`}
								label={`Electric`}
								onChange={exclude}
								checked={props.evChecked}
							/>
						</div>
					</Form>
					<Offcanvas.Title>Exclude Fuel Type</Offcanvas.Title>
					<span className='sideHeader'>
						<Button onClick={handleClose}>X</Button>
						<img src={image} className="logo2" />
					</span>


				</Offcanvas.Header>
				<Offcanvas.Body>
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

				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default Sidebar;