import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import { AuthProvider } from './contexts/AuthContext';

function App() {
	return (
		<AuthProvider>
			<div className="app">
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="*" element={<Login />} />
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<SignUp />} />
						<Route path="home" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</div>
		</AuthProvider>
	);
}

export default App;
