// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Navbar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
		  	<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="primary" onClick={handleShow}>
				Sign In
				</Button>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								autoFocus
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>


			<div style={{ display: 'flex', justifyContent: 'end' }}>
				<Button variant="center" onClick={handleShow}>
				Sign Up
				</Button>
			</div>
			

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Sign Up</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								autoFocus
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Navbar;