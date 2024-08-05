import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className="header">
			<Link to={'/login'}>Login</Link>
			<Link to={'/signup'}>Sign up</Link>
			<Link to={'/home'}>Home</Link>
		</nav>
	);
};

export default Header;
