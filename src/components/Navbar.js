// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// function Navbar() {
//   const { handleLogout } = useContext(AuthContext);

//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/follow">Follow</Link></li>
//         <li><Link to="/notifications">Notifications</Link></li>
//         <li><Link to="/search">Search</Link></li>
//         <li><Link to="/settings">Settings</Link></li>
//         <li><button onClick={handleLogout}>Logout</button></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { state, handleLogout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        {state.isLoggedIn ? (
          <>
            <li><Link to="/home">Home</Link></li>
            {/* <li><Link to={`/profile/${state.user ? state.user._id : ''}`}>Profile</Link></li> */}
            {/* <li><Link to={`/profile/${state.user ? state.user._id : ''}`}>Profile</Link></li> */}
            <li><Link to="/profile/:id">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/notifications">Notifications</Link></li>
            <li><Link to="/follow">Follow</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
