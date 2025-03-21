import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, Login} from '../index';

export const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
