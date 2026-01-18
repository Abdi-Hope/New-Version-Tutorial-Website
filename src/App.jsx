import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { TimerProvider } from "./context/TimerContext";

// Layout
import MainLayout from "./components/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseCourses from "./pages/BrowseCourses";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TimerProvider>
          <Router>
            <Routes>
              <Route path="/" element={
                <MainLayout>
                  <Home />
                </MainLayout>
              } />
              
              <Route path="/login" element={<Login />} />
              
              <Route path="/register" element={<Register />} />
              
              <Route path="/courses" element={
                <MainLayout>
                  <BrowseCourses />
                </MainLayout>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={
                <MainLayout>
                  <div className="text-center py-12">
                    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                  </div>
                </MainLayout>
              } />
            </Routes>
          </Router>
        </TimerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
