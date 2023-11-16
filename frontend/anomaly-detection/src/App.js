import './App.css';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './components/Authentication/Register';
// import Login from './components/Authentication/Login';
// import VerifyEmail from './components/Authentication/VerifyEmail';
// import Profile from './components/Profile/Profile';
// import PrivateRoute from './PrivateRoute';
// import { useState, useEffect } from 'react';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { AuthProvider } from './AuthContext';
// import ImageUploadForm from './components/ImageUploadForm/ImageUploadForm';
import ImageUploadPage from './components/ImageUploadForm/ImageUploadPage';
import ColorExtractionPage from './components/ColorExtraction/ColorExtraction';

function App() {
  return (
    <>
      <h1>AAsat Color Palette Extraction</h1>
      <Router>
        <Routes>
          <Route path="/" exact Component={ImageUploadPage}/>
          <Route path="/ex-color" Component={ColorExtractionPage}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
