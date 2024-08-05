import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OTPInput from '../components/Login/OTPInput';
import Reset from '../components/Login/Reset';

const Nav = () => {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/OTPInput">bm</Link>
            </li>
            <li>
              <Link to="/Reset">bjlk;'m</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/Reset" element={<Reset />} />
          <Route path="/OTPInput" element={<OTPInput />} />
        </Routes>
      </div>

  );
};

export default Nav;
