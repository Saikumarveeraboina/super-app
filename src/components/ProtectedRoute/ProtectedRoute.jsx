import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../../store/useStore';

const ProtectedRoute = ({ children, requireUser, requireCategories }) => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);

  if (requireUser && !user) {
    return <Navigate to="/" replace />;
  }

  if (requireCategories && (!categories || categories.length < 3)) {
    return <Navigate to="/categories" replace />;
  }

  return children;
};

export default ProtectedRoute;
