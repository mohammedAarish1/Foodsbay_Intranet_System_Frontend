import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//======== tostify =======
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import IMSDashboard from './dashboards/IMSDashboard.jsx';
import Auth from './pages/auth/Auth.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './auth/authAPI.js';
import MGTDashboard from './dashboards/MGTDashboard.jsx';
import OMSDashboard from './dashboards/OMSDashboard.jsx';
import HRMSDashboard from './dashboards/HRMSDashboard.jsx';
import ChangePassword from './pages/auth/ChangePasswordPage.jsx';
import { Box } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [])

  // Render dashboard based on user role
  const renderDashboard = () => {
    if (!user) {
      return <Auth />;
    }

    // switch ('') {
    //   case '':
    //     return <HRMSDashboard  />;
     
    // }
    switch (user.workDetails.jobTitle) {
      case 'Manager':
        return <HRMSDashboard />;
      // case 'manager':
      //   return <MGTDashboard />;
      // case 'operator':
      //   return <OMSDashboard />;
      // case 'hr':
      //   return <HRMSDashboard />;
      default:
        return <Auth />;
    }
  }

  return (
    <>
      <ToastContainer position='bottom-right' autoClose={2000} />
      <BrowserRouter>
        {renderDashboard()}
      </BrowserRouter>

    </>
  )
}

export default App;

