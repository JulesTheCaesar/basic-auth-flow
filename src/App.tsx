import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="*" element={<Login />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="home" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
