import { useState, useEffect, use } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AppToast from './Components/Toast';
import ChatsPage from './Pages/ChatsPage';
import AdminPage from './Pages/AdminPage'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Spinner, Flex, Theme } from '@radix-ui/themes';

function getSystemAppearance() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : 'light';
}

function App() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState({ open: false, title: '', description: '', isError: false });
  const [userData, setUserData] = useState({ isLoggedIn: false });
  const [appearance, setAppearance] = useState('light');

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    } else {
      navigate('/login')
    }
  }, []);

  useEffect(() => {
    setAppearance(getSystemAppearance());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(getSystemAppearance())
    const handler = () => {
      setAppearance(mq.matches ? "dark" : "light");
    }
    mq.addEventListener?.("change", handler);

    return () => {
      mq.removeEventListener?.("change", handler);
    }
  }, [])

  return (
    <Theme appearance={appearance}>
      <Routes>
        <Route path='/' element={
          userData.id
            ?
            <ChatsPage loading={loading} setLoading={setLoading} userData={userData} toastData={toastData} setToastData={setToastData} setUserData={setUserData} />
            :
            <Flex direction='column' justify='center' align='center' style={{ height: '100vh' }}>
              <Spinner size='3' />
            </Flex>
        }
        />
        {!userData.isLoggedIn && <Route path='/register' element={<RegisterPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} />} />}
        {!userData.isLoggedIn && <Route path='/login' element={<LoginPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} userData={userData} setUserData={setUserData} />} />}
        {!userData.isLoggedIn && <Route path='/admin' element={ <AdminPage/> } />}
      </Routes>

      <AppToast
        toastData={toastData}
        setToastData={setToastData}
      />
    </Theme>
  )
}

export default App
