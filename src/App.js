// import React, { useContext } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import PrivateRoute from './components/PrivateRoute';
// import AuthContext from './context/AuthContext';

// import Register from './components/Register';
// import Login from './components/Login';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import Home from './pages/Home';
// import Search from './pages/Search';
// import Notifications from './pages/Notifications';
// import Follow from './pages/Follow';
// import Navbar from './components/Navbar';
// import './styles.css'
// function App() {
//   const { state, handleLogout } = useContext(AuthContext);

//   return (
//     <div className="App">
//       <h2>Micro Blogging Platform</h2>
//       <ul>
//         {state.isLoggedIn ? (
//           <>
//             <li><Link to="/home">Home</Link></li>
//             <li><Link to="/profile">Profile</Link></li>
//             <li><Link to="/settings">Settings</Link></li>
//             <li><Link to="/search">Search</Link></li>
//             <li><Link to="/notifications">Notifications</Link></li>
//             <li><Link to="/follow">Follow</Link></li>
//             <li><button onClick={handleLogout}>Logout</button></li>
//           </>
//         ) : (
//           <>
//             <li><Link to="/register">Register</Link></li>
//             <li><Link to="/login">Login</Link></li>
//           </>
//         )}
//       </ul>
//       <Navbar />
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
//         <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
//         <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
//         <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
//         <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/follow" element={<PrivateRoute><Follow /></PrivateRoute>} />
//       </Routes>
      
//       <ToastContainer />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoute';

import Register from './components/Register';
import Login from './components/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './pages/Home';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import Follow from './pages/Follow';
import Navbar from './components/Navbar';

import './styles.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/follow" element={<PrivateRoute><Follow /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
