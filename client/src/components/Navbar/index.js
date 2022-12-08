import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav>
			<a href="/">Home</a>
			<Link to="/">Home</Link>
			
			<Link to="/about">About</Link>
			<Link to="/contact">Contact</Link>
		</nav>
	);	
}

export default Navbar;