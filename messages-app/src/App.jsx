import { useState } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AppToast from './Components/Toast';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [toastData, setToastData] = useState( { title: 'Szia', description: 'Szia...' } );

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage loading={loading} setLoading={setLoading} />} />
        <Route path='/register' element={<RegisterPage loading={loading} setLoading={setLoading} setShowToast={setShowToast} setToastData={setToastData} />} />
      </Routes>

      <AppToast
        open={showToast}
        onOpenChange={setShowToast}
        title={toastData.title}
        description={toastData.description}
      />
    </>
  )
}

export default App
