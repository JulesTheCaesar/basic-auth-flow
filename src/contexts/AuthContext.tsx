import {
	useContext,
	useState,
	useEffect,
	createContext,
	ReactNode,
} from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContext {
	currentUser: User | null;
}

const DEFAULT_CONTEXT: AuthContext = {
	currentUser: null,
};

const AuthContext = createContext<AuthContext>(DEFAULT_CONTEXT);

export const AuthProvider = (props: { children: ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initializeUser);
		return unsubscribe;
	}, []);

	const initializeUser = (user: User | null) => {
		if (user) {
			setCurrentUser({ ...user });
		} else {
			setCurrentUser(null);
		}

		setLoading(false);
	};

	const value = {
		currentUser,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
