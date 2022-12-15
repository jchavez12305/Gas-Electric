// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import image from "../../images/image2.png";

function Navbar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showSignIn, setSignInShow] = useState(false);

	const handleSignInClose = () => setSignInShow(false);
	const handleSignInShow = () => setSignInShow(true);
	return (
		<>
			<div>
				<a href=".." target="_blank" rel="noreferrer" >
					<img src={image} className="logo" alt="image2.png" />
				
				</a>
			</div>
			<div className = "signin" style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="primary" className = "signin" onClick={handleSignInShow}>
					Sign In
				</Button>
			</div>

			<Modal show={showSignIn} onHide={handleSignInClose}>
				<Modal.Header closeButton>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email address:</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								autoFocus
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleSignInClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSignInClose}>
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
							<Form.Label>Username:</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email Address:</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="email"
								placeholder="name@example.com"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Re-type Password:</Form.Label>
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