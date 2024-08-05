import { Button, Navbar } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const signOut = async () => {
		await auth.signOut();
	};

	return (
		<Navbar className="justify-content-between px-2">
			<Navbar.Brand>Basic Auth Flow</Navbar.Brand>
			{currentUser && (
				<div className="d-flex flex-row gap-2">
					<Button onClick={signOut}>Sign Out</Button>
					<Button onClick={() => navigate('/profile')}>
						Profile
					</Button>
				</div>
			)}
		</Navbar>
	);
};

export default Header;
