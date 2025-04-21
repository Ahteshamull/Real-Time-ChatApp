import React from 'react'
import Navbar from '../components/Navbar';
import { Routes,Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
<Route path="/" element={Home} />
      </Routes>
    </div>
  );
}
