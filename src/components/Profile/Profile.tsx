import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';

const Profile = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(currentUser);
		if (!currentUser) navigate('/login');
	}, [currentUser]);

	return <div>User Profile</div>;
};

export default Profile;
