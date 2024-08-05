import './Login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { Button, Container, Form } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface LoginFormData {
	email: string;
	password: string;
}

const Login = () => {
	const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) navigate('/home');
	}, [currentUser]);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onTouched',
		reValidateMode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (data: LoginFormData) => {
		if (isSigningIn) return;
		setIsSigningIn(true);
		try {
			signInWithEmailAndPassword(auth, data.email, data.password);
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
						placeholder="Email"
						autoComplete="email"
						{...register('email', {
							required: 'Email is required',
							pattern:
								/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						})}
					/>
					{errors.email?.type === 'required' && (
						<Form.Text className="text-danger">
							{errors.email.message}
						</Form.Text>
					)}
					{errors.email?.type === 'pattern' && (
						<Form.Text className="text-danger">
							Invalid email address
						</Form.Text>
					)}
				</Form.Group>
				<Form.Group controlId="formPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						autoComplete="password"
						{...register('password', {
							required: 'Password is required',
						})}
					/>
					{errors.password?.type === 'required' && (
						<Form.Text className="text-danger">
							{errors.password.message}
						</Form.Text>
					)}
					{errors.password?.type === 'minLength' && (
						<Form.Text className="text-danger">
							Password must be at least 6 characters
						</Form.Text>
					)}
				</Form.Group>
				<div className="form-actions">
					<Button
						onClick={handleSubmit(onSubmit)}
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
