// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout Components
import Layout from './components/Layout';
import Layoutd from './components/Layoutd';

// Page Components
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Dashboard';

// Placeholder components for additional pages
const Products = () => (
  <div className="min-h-screen pt-20 p-8 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Products</h1>
      <p className="text-gray-600 dark:text-gray-400">Product management page coming soon...</p>
    </div>
  </div>
);

const Reports = () => (
  <div className="min-h-screen pt-20 p-8 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Reports</h1>
      <p className="text-gray-600 dark:text-gray-400">Analytics and reporting page coming soon...</p>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen pt-20 p-8 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
      <p className="text-gray-600 dark:text-gray-400">Get in touch with our team...</p>
    </div>
  </div>
);

const Terms = () => (
  <div className="min-h-screen pt-20 p-8 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using InventoryPro, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of InventoryPro for personal, non-commercial transitory viewing only.</p>
          
          <h2>3. Disclaimer</h2>
          <p>The materials on InventoryPro are provided on an 'as is' basis. InventoryPro makes no warranties, expressed or implied.</p>
          
          <h2>4. Limitations</h2>
          <p>In no event shall InventoryPro or its suppliers be liable for any damages arising out of the use or inability to use the materials.</p>
          
          <h2>5. Privacy Policy</h2>
          <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service.</p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Privacy = () => (
  <div className="min-h-screen pt-20 p-8 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="prose dark:prose-invert max-w-none">
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, update your profile, or contact us for support.</p>
          
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
          
          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          
          <h2>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@inventorypro.com</p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              
              <Route path="/terms" element={
                <Layout>
                  <Terms />
                </Layout>
              } />
              
              <Route path="/privacy" element={
                <Layout>
                  <Privacy />
                </Layout>
              } />
              
              <Route path="/contact" element={
                <Layout>
                  <Contact />
                </Layout>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } />
              
              <Route path="/products" element={
                <ProtectedRoute>
                  <Layout>
                    <Products />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layoutd>
                    <Dashboard />
                  </Layoutd>
                </ProtectedRoute>
              } />

              {/* Redirect root to dashboard if logged in, otherwise home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App;