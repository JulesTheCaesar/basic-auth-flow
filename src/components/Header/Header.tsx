import { Button, Navbar } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase/firebase';

const Header = () => {
	const { currentUser } = useAuth();

	const signOut = async () => {
		await auth.signOut();
	};

	return (
		<Navbar className="justify-content-between">
			<Navbar.Brand>Basic Auth Flow</Navbar.Brand>
			{currentUser && <Button onClick={signOut}>Sign Out</Button>}
		</Navbar>
	);
};

export default Header;
