import './App.css';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import VerifyEmail from './components/Authentication/VerifyEmail';
import Profile from './components/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './AuthContext';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
