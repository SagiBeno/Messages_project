import { useState, useEffect, use } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AppToast from './Components/Toast';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState( { open: false, title: '', description: '', isError: true } );
  const [userData, setUserData] = useState( { isLoggedIn: false} );

  useEffect( () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if ( storedUserData ) {
      setUserData(storedUserData);
    } else {
      setUserData( { isLoggedIn: false } );
    }
  }, [] );

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} userData={userData} setUserData={setUserData} />} />
        <Route path='/login' element={<LoginPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} userData={userData} setUserData={setUserData} />} />
        <Route path='/register' element={<RegisterPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} />} />
      </Routes>

      <AppToast
        toastData={toastData}
        setToastData={setToastData}
      />
    </>
  )
}

export default App
