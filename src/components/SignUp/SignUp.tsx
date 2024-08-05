import '../Login/Login.scss';
import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSigningUp, setIsSigningUp] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	// TODO
	// const [confirmPassword, setconfirmPassword] = useState('');

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (isSigningUp) return;

		setIsSigningUp(true);
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error);
		} finally {
			setIsSigningUp(false);
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
						disabled={isSigningUp}
					>
						{isSigningUp ? 'Signing Up...' : 'Sign Up'}
					</Button>
				</div>
			</Form>
			<div className="text-sm text-center">
				Already have an account? {'   '}
				<Link to={'/login'}>Login</Link>
			</div>
		</Container>
	);
};

export default SignUp;
