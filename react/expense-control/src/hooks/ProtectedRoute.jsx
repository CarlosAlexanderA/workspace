import {Navigate, Outlet} from 'react-router-dom';

export const ProtectedRoute = ({children, user, redirectTo}) => {
  if (user == null) return <Navigate replace to={redirectTo} />;

  return children ? children : <Outlet />;
};
