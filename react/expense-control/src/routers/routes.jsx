import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Configuracion, Home, Login, ProtectedRoute, UserAuth} from '../index';

export const MyRoutes = () => {
  const {user} = UserAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
      </Route>
    </Routes>
  );
};
