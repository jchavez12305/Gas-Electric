// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {
	Button,
	Form,
	Modal
} from 'react-bootstrap';
import image from "../../assets/images/logo.png";
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../../utils/mutations';
import './index.css';
import Auth from "../../utils/auth"

function Navbar() {

	const [showSignIn, setSignInShow] = useState(false);
	const [addUser, { error }] = useMutation(ADD_USER);
	const [login] = useMutation(LOGIN_USER);
	const [show, setShow] = useState(false);

	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
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
			<nav>
				<a href="/" >
					<img src={image} className="logo" />
				</a>
				<h1 className='motto'>Find Gas and Electric Stations</h1>
				<div className='signUp/In'>
					{Auth.loggedIn() ? (
						<>

							<Button className="signBtn" onClick={logout}>
								Logout
							</Button>
						</>
					) : (
						<>
							<Button className='signBtn' onClick={handleSignInShow}>
								Sign In
							</Button>
							<Button className='signBtn' onClick={handleShow}>
								Sign Up
							</Button>
						</>
					)}

				</div>
			</nav>


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