import * as React from 'react';
import { Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Box } from '../components/MUI';
import { AppProvider } from '@toolpad/core/AppProvider';
import theme from '../theme/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../auth/authAPI.js';


// Custom router hook with all required properties
const useCustomRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return React.useMemo(
    () => ({
      navigate: (path) => navigate(path),
      push: (path) => navigate(path),
      replace: (path) => navigate(path, { replace: true }),
      pathname: location.pathname,
      query: Object.fromEntries(searchParams.entries()),
      asPath: location.pathname,
      searchParams: searchParams,
      back: () => navigate(-1),
      basePath: '',
      events: {
        on: () => { },
        off: () => { },
      },
    }),
    [navigate, location.pathname, searchParams]
  );
};





function DashboardLayoutBasic({ navigation, routes }) {
  const customRouter = useCustomRouter();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)


  const handleUserLogout = () => {
    dispatch(logoutUser())
      .then(result => {
        if (result.payload.success) {
          navigate('/')
        }
      })
  }

  const [session, setSession] = React.useState({
    user: {
      name: user?.basicInfo.firstName + ' ' + user?.basicInfo.firstName  + ' ' + (user.employeeId)  || '',
      email: user?.basicInfo.email || '',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: user.fullName,
            email: user.email,
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        handleUserLogout()
        setSession(null);
      },
    };
  }, []);



  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={navigation}
      router={customRouter}
      theme={theme}
      branding={{
        logo: <img src="/logo.png" alt="Foodsbay India logo" style={{ color: 'white' }} />,
        title: 'Foodsbay India'
      }}
    >
      {routes}
    </AppProvider>
  );
}

export default DashboardLayoutBasic;