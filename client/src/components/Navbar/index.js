// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import image from "../../images/image2.png";
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../../utils/mutations';

import Auth from "../../utils/auth"

function Navbar() {
	const [show, setShow] = useState(false);
	const [userFormData, setUserFormData] = useState({
		username: '',
		email: '',
		password: '',
	  });
	  const [userLoginData, setUserLoginData] = useState({
		email: '',
		password: '',
	  });
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showSignIn, setSignInShow] = useState(false);
	const [addUser, { error }] = useMutation(ADD_USER);
	const [login] = useMutation(LOGIN_USER);
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	  };
	  const handleLoginChange = (event) => {
		const { name, value } = event.target;
		setUserLoginData({ ...userLoginData, [name]: value });
	  };
	  const handleFormSubmit = async (event) => {
		event.preventDefault();
	
		// check if form has everything (as per react-bootstrap docs)
	
		try {
		  const { data } = await addUser({
			variables: { ...userFormData },
		  });
		  console.log(data);
		  Auth.login(data.addUser.token);
		} catch (err) {
		  console.error(err);
		}
	
		setUserFormData({
		  username: '',
		  email: '',
		  password: '',
		});
	  };
	  const handleLoginSubmit = async (event) => {
		event.preventDefault();
	
		// check if form has everything (as per react-bootstrap docs)
	
		try {
		  const { data } = await login({
			variables: { ...userLoginData },
		  });
		  console.log(data);
		  Auth.login(data.login.token);
		} catch (err) {
		  console.error(err);
		}
	
		setUserLoginData({
		  email: '',
		  password: '',
		});
	  };

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
					<Form onSubmit={handleLoginSubmit}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email address:</Form.Label>
							<Form.Control
								type="email"
								placeholder="Your email"
								name="email"
								onChange={handleLoginChange}
								value={userLoginData.email}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Your password"
								name="password"
								onChange={handleLoginChange}
								value={userLoginData.password}
								required
							/>
						</Form.Group>
						<Button type="submit" variant="primary">Submit</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleSignInClose}>
						Close
					</Button>
					{/* <Button variant="primary" onClick={handleSignInClose}>
						Submit
					</Button> */}
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
					<Form onSubmit={handleFormSubmit}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Username:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Your username"
								name="username"
								onChange={handleInputChange}
								value={userFormData.username}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email Address:</Form.Label>
							<Form.Control
								type="email"
								placeholder="Your email"
								name="email"
								onChange={handleInputChange}
								value={userFormData.email}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Your password"
								name="password"
								onChange={handleInputChange}
								value={userFormData.password}
								required
							/>
						</Form.Group>
						<Button type="submit" variant="primary">Submit</Button>
						{/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Re-type Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="password"
								autoFocus
							/>
						</Form.Group> */}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					{/* <Button variant="primary" onClick={handleClose}>
						Submit
					</Button> */}
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Navbar;