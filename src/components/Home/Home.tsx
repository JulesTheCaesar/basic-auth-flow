import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) navigate('/login');
	}, [currentUser]);

	return <div>Welcome</div>;
};

export default Home;
