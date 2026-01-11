import { useState, useEffect, use } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AppToast from './Components/Toast';
import ChatsPage from './Pages/ChatsPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState( { open: false, title: '', description: '', isError: false } );
  const [userData, setUserData] = useState( { isLoggedIn: false} );

  useEffect( () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if ( storedUserData ) {
      setUserData(storedUserData);
    } else {
      setUserData( { isLoggedIn: false } );
      navigate('/login')
    }
  }, [] );

  return (
    <>
      <Routes>
        <Route path='/' element={ <ChatsPage loading={loading} setLoading={setLoading} userData={userData} toastData={toastData} setToastData={setToastData} /> } />
        { !userData.isLoggedIn && <Route path='/register' element={<RegisterPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} />} /> }
        { !userData.isLoggedIn && <Route path='/login' element={ <LoginPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} userData={userData} setUserData={setUserData} /> }/> }
      </Routes>

      <AppToast
        toastData={toastData}
        setToastData={setToastData}
      />
    </>
  )
}

export default App
