import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Search from './pages/Search/search';
import { ToastContainer, toast } from 'react-toastify';
import Category from './pages/Category/Category';


const App = () => {
  const navigate = useNavigate();
  const firstRun = useRef(true); // <--- Track first run

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (firstRun.current) {
        firstRun.current = false; // skip toasts on first run
        if (user) {
          navigate('/');
        } else {
          navigate('/login');
        }
        return;
      }

      if (user) {
        toast.success('Logged In');
        navigate('/');
      } else {
        toast.info('Logged Out');
        navigate('/login');
      }
    });

    return () => unsubscribe(); // clean up
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
