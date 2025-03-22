import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, Login, ProtectedRoute, UserAuth} from '../index';

export const MyRoutes = () => {
  const {user} = UserAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
