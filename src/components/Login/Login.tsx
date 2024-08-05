import './Login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { Button, Container, Form } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) navigate('/home');
	}, [currentUser]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (isSigningIn) return;

		setIsSigningIn(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error);
		} finally {
			setIsSigningIn(false);
		}
	};

	return (
		<Container style={{ maxWidth: '500px' }} fluid>
			<Form className="mt-4">
				<Form.Group controlId="formEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="email"
						autoComplete="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="formPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="password"
						autoComplete="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<div className="form-actions">
					<Button
						onClick={onSubmit}
						type="submit"
						disabled={isSigningIn}
					>
						{isSigningIn ? 'Logging in...' : 'Login'}
					</Button>
				</div>
			</Form>
			<p className="text-center text-sm">
				Don't have an account? <Link to={'/signup '}>Sign up</Link>
			</p>
		</Container>
	);
};

export default Login;
