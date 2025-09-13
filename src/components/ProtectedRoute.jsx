
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * ProtectedRoute component
 * Wraps around routes that require authentication.
 * Supports optional role-based access (admin or user).
 *
 * @param {ReactNode} children - Component to render if authorized.
 * @param {string[]} allowedRoles - Array of allowed roles. Defaults to ["admin", "user"].
 */
const ProtectedRoute = ({ children, allowedRoles = ["admin", "user"] }) => {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Loading...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we verify your authentication
          </p>
        </div>
      </div>
    );
  }

  // If no user is logged in, redirect to SignIn
  if (!currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If user role is not authorized, redirect to default dashboard
  if (userProfile?.userType && !allowedRoles.includes(userProfile.userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and authorized, render child components
  return children;
};

export default ProtectedRoute;
