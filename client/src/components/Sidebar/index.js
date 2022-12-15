import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

function Sidebar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="primary" onClick={handleShow} className = "filter">
				Filter
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
					<Offcanvas.Title>Distance</Offcanvas.Title>

					<Form>
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
					</Form>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default Sidebar;