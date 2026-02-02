import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const Home = () => <div><h1>Home</h1><Link to="/admin">Go to Admin</Link></div>;
const Admin = () => <div><h1>Admin Page</h1><Link to="/">Go Home</Link></div>;

const TestRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default TestRouter;
