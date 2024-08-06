import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
	updatePassword,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from 'firebase/auth';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { auth } from '../../firebase/firebase';

const Profile = () => {
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onTouched',
		reValidateMode: 'onSubmit',
		defaultValues: {
			currentPassword: '',
			newPassword: '',
		},
	});

	useEffect(() => {
		if (!currentUser) navigate('/login');
	}, [currentUser]);

	const onSubmit = async (data: {
		currentPassword: string;
		newPassword: string;
	}) => {
		if (isUpdating) return;
		if (!currentUser) return;
		setIsUpdating(true);
		// TODO - error handle no user email
		let credential = EmailAuthProvider.credential(
			currentUser.email ?? '',
			data.currentPassword
		);
		try {
			await reauthenticateWithCredential(currentUser, credential);
			await updatePassword(currentUser, data.newPassword);
		} catch (error) {
			console.error(error);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<Container style={{ maxWidth: '500px' }} fluid>
			<div>Profile for {currentUser?.displayName ?? 'user'}</div>
			<div>{currentUser?.email}</div>
			<Form>
				<Form.Group controlId="formCurrentPassword">
					<Form.Label>Current password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Current password"
						autoComplete="password"
						{...register('currentPassword', {
							required: true,
							minLength: 6,
						})}
					/>
					{errors.newPassword?.type === 'required' && (
						<Form.Text className="text-danger">
							{errors.newPassword.message}
						</Form.Text>
					)}
					{errors.newPassword?.type === 'minLength' && (
						<Form.Text className="text-danger">
							Password must be at least 6 characters
						</Form.Text>
					)}
				</Form.Group>
				<Form.Group controlId="formNewPassword">
					<Form.Label>New password</Form.Label>
					<Form.Control
						type="password"
						placeholder="New password"
						{...register('newPassword', {
							required: true,
							minLength: 6,
						})}
					/>
					{errors.newPassword?.type === 'required' && (
						<Form.Text className="text-danger">
							{errors.newPassword.message}
						</Form.Text>
					)}
					{errors.newPassword?.type === 'minLength' && (
						<Form.Text className="text-danger">
							Password must be at least 6 characters
						</Form.Text>
					)}
				</Form.Group>
				<div className="form-actions">
					<Button
						onClick={handleSubmit(onSubmit)}
						type="submit"
						disabled={isUpdating}
					>
						{isUpdating ? 'Updating...' : 'Update'}
					</Button>
					<Button onClick={() => navigate('/home')}>Back</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Profile;
