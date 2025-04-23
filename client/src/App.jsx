import React, { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";


import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import SignUpPage from './pages/Signup';
import Setting from "./pages/Setting"
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/setting" element={<Setting />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
