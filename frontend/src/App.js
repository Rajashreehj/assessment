import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/register';
import Login from './components/login';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
					<Route index path='/' element={<Login />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Registration />} />
					<Route path='admin-dashboard' element={<AdminDashboard />} />
					<Route path='dashboard' element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
