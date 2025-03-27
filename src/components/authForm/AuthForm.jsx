// import React, { useState, useMemo } from 'react';
// import { Formik, Form, Field } from 'formik';
// import { SignupSchema } from '../../schemas/auth/signUpSchema';
// import { LoginSchema } from '../../schemas/auth/logInSchema';
// import {
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Typography,
//   Box,
//   Container,
//   Paper,
//   Avatar,
//   CircularProgress,
//   Link,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   useMediaQuery,
//   ThemeProvider,
//   createTheme,
//   CssBaseline
// } from '../MUI';
// import {
//   LockOutlinedIcon,
//   LoginIcon,
//   PersonAddIcon,
//   DarkModeIcon,
//   LightModeIcon
// } from '../../assets/icons/icon.js';
// import { useDispatch } from 'react-redux';
// import { loginUser, registerUser } from '../../auth/authAPI';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// // Department List
// const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];




// const AuthForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isSignup, setIsSignup] = useState(true);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [mode, setMode] = useState('light');


//   const initialValues = isSignup ?
//     {
//       userId: '',
//       fullName: '',
//       email: '',
//       phoneNumber: '',
//       password: '',
//       department: '',
//       profilePicture: null,
//     }
//     : {
//       userId: '',
//       password: '',
//       rememberMe: false
//     }



//   // Theme Configuration
//   const theme = useMemo(() =>
//     createTheme({
//       palette: {
//         mode,
//         primary: {
//           main: mode === 'light' ? '#1976d2' : '#90caf9',
//         },
//         background: {
//           default: mode === 'light' ? '#f4f4f4' : '#121212',
//           paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
//         },
//       },
//       typography: {
//         fontFamily: 'Roboto, Arial, sans-serif',
//       },
//       components: {
//         MuiTextField: {
//           styleOverrides: {
//             root: {
//               '& label.Mui-focused': {
//                 color: mode === 'light' ? 'primary.main' : 'primary.light',
//               },
//               '& .MuiOutlinedInput-root': {
//                 '&.Mui-focused fieldset': {
//                   borderColor: mode === 'light' ? 'primary.main' : 'primary.light',
//                 },
//               },
//             },
//           },
//         },
//       },
//       breakpoints: {
//         values: {
//           xs: 0,
//           sm: 600,
//           md: 1000,
//           lg: 1200,
//           xl: 1536,
//         },
//       },
//     }),
//     [mode]
//   );


//   // Toggle Theme Mode
//   const toggleColorMode = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   // Form Handlers
//   const toggleForm = () => {
//     setIsSignup(!isSignup);
//     setUploadedImage(null);
//   };

//   // handle signing up user for the first time
//   const handleSignup = (values, { setSubmitting }) => {
//     setTimeout(() => {
//       dispatch(registerUser(values))
//         .then((result) => {
//           if (result.payload?.success) {
//             setIsSignup(false)
//           }
//           console.log('result', result)
//         })
//       setSubmitting(false);
//     }, 1000);
//   };

//   // handle sign in user
//   const handleSignin = (values, { setSubmitting }) => {
//     setTimeout(() => {
//       console.log('check values', values)
//       const credentials = { userId: values.userId, password: values.password };
//       dispatch(loginUser(credentials))
//         .then(result => {
//           console.log('result', result)
//           if (result.payload?.data?.isTemporary) {
//             navigate('/change-password')
//           } else {
//             if (result.error?.message === 'Rejected') {
//               toast.error(result.payload)
//             } else if (result.payload?.user) {
//               setIsSignup(false)
//               navigate('/')
//               toast("Successfully Logged In")
//             }
//           }


//         })
//       // setSubmitting(false);
//     }, 500);
//   };

//   const handleForgotPassword = () => {
//     console.log('Forgot password clicked');
//     // Implement forgot password logic here
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Container
//         component="main"
//         maxWidth="sm"
//         sx={{
//           minHeight: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingY: 3
//         }}
//       >
//         <IconButton
//           onClick={toggleColorMode}
//           sx={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             color: mode === 'light' ? 'primary.dark' : 'primary.light'
//           }}
//         >
//           {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
//         </IconButton>

//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             width: '100%',
//             borderRadius: 3,
//           }}
//         >
//           {/* Rest of the form remains the same as your original implementation */}
//           {/* ... (include your existing form code) */}
//           <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             {/* Replace '/path/to/your/logo.png' with the actual path to your logo */}
//             <div style={{ bgcolor: 'black', width: '100%' }} >

//               <img src="/logo.png" alt="Company Logo" style={{ width: '100px', marginBottom: '20px' }} />
//             </div>
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               {isSignup ? 'Sign Up' : 'Sign In'}
//             </Typography>
//           </Box>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={isSignup ? SignupSchema : LoginSchema}
//             onSubmit={isSignup ? handleSignup : handleSignin}
//           >
//             {({ errors, touched, setFieldValue, isSubmitting }) => (
//               <Form>
//                 <Field
//                   as={TextField}
//                   name="userId"
//                   label="userId"
//                   fullWidth
//                   margin="normal"
//                   error={touched.userName && Boolean(errors.userName)}
//                   helperText={touched.userName && errors.userName}
//                 />
//                 {isSignup ? (
//                   <>
//                     <Field
//                       as={TextField}
//                       name="fullName"
//                       label="Full Name"
//                       fullWidth
//                       margin="normal"
//                       error={touched.fullName && Boolean(errors.fullName)}
//                       helperText={touched.fullName && errors.fullName}
//                     />
//                     <Field
//                       as={TextField}
//                       name="email"
//                       label="Email"
//                       fullWidth
//                       margin="normal"
//                       error={touched.email && Boolean(errors.email)}
//                       helperText={touched.email && errors.email}
//                     />
//                     <Field
//                       as={TextField}
//                       name="phoneNumber"
//                       label="Phone Number"
//                       fullWidth
//                       margin="normal"
//                       error={touched.phoneNumber && Boolean(errors.phoneNumber)}
//                       helperText={touched.phoneNumber && errors.phoneNumber}
//                     />
//                   </>
//                 ) : null}
//                 <Field
//                   as={TextField}
//                   name="password"
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   error={touched.password && Boolean(errors.password)}
//                   helperText={touched.password && errors.password}
//                 />
//                 {isSignup ? (
//                   <>
//                     <FormControl fullWidth margin="normal">
//                       <InputLabel id="department-label">Department</InputLabel>
//                       <Field
//                         as={Select}
//                         labelId="department-label"
//                         name="department"
//                         label="Department"
//                         error={touched.department && Boolean(errors.department)}
//                       >
//                         {departments.map((dept) => (
//                           <MenuItem key={dept} value={dept}>
//                             {dept}
//                           </MenuItem>
//                         ))}
//                       </Field>
//                     </FormControl>
//                     <input
//                       accept="image/*"
//                       style={{ display: 'none' }}
//                       id="raised-button-file"
//                       type="file"
//                       onChange={(event) => {
//                         const file = event.currentTarget.files[0];
//                         setFieldValue("profilePicture", file);
//                         setUploadedImage(file ? file.name : null);
//                       }}
//                     />
//                     <label htmlFor="raised-button-file">
//                       <Button variant="contained" component="span" fullWidth sx={{ mt: 2, mb: 2 }}>
//                         Upload Profile Picture
//                       </Button>
//                     </label>
//                     {uploadedImage && (
//                       <Typography variant="body2" align="center" sx={{ mb: 2 }}>
//                         Uploaded: {uploadedImage}
//                       </Typography>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     <Field
//                       as={FormControlLabel}
//                       name="rememberMe"
//                       control={<Checkbox />}
//                       label="Remember me"
//                     />
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
//                       <Link component="button" variant="body2" onClick={handleForgotPassword}>
//                         Forgot password?
//                       </Link>
//                     </Box>
//                   </>
//                 )}
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     mt: 1,
//                     mb: 2,
//                     bgcolor: mode === 'light' && 'black',
//                     '&:hover': { bgcolor: mode === 'light' && '#333' },
//                     transition: 'background-color 0.3s',
//                   }}
//                   // disabled={isSubmitting}
//                   startIcon={isSignup ? <PersonAddIcon /> : <LoginIcon />}
//                 >
//                   {/* {isSubmitting ? (
//                     <CircularProgress size={24} color="inherit" />
//                   ) : (
//                     isSignup ? 'Sign Up' : 'Sign In'
//                   )} */}
//                   submit
//                 </Button>
//               </Form>
//             )}
//           </Formik>
//           <Box mt={2}>
//             <Typography variant="body2" align="center">
//               {isSignup ? 'Already have an account? ' : "Don't have an account? "}
//               <Button color="primary" onClick={toggleForm}>
//                 {isSignup ? 'Sign In' : 'Sign Up'}
//               </Button>
//             </Typography>
//           </Box>
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default AuthForm;




import React, { useState, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import { LoginSchema } from '../../schemas/auth/logInSchema';
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
  Avatar,
  CircularProgress,
  Link,
  Checkbox,
  FormControlLabel,
  IconButton,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '../MUI';
import {
  LockOutlinedIcon,
  LoginIcon,
  DarkModeIcon,
  LightModeIcon
} from '../../assets/icons/icon.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../auth/authAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState('light');


  const initialValues = {
    userId: '',
    password: '',
    rememberMe: false
  }



  // Theme Configuration
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'light' ? '#1976d2' : '#90caf9',
        },
        background: {
          default: mode === 'light' ? '#f4f4f4' : '#121212',
          paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
      },
      typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '& label.Mui-focused': {
                color: mode === 'light' ? 'primary.main' : 'primary.light',
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: mode === 'light' ? 'primary.main' : 'primary.light',
                },
              },
            },
          },
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 1000,
          lg: 1200,
          xl: 1536,
        },
      },
    }),
    [mode]
  );


  // Toggle Theme Mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // handle sign in user
  const handleSignin = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log('check values', values)
      const credentials = { userId: values.userId, password: values.password };
      dispatch(loginUser(credentials))
        .then(result => {
          console.log('result', result)
          if (result.payload?.data?.isTemporary) {
            navigate('/change-password')
          } else {
            if (result.error?.message === 'Rejected') {
              toast.error(result.payload)
            } else if (result.payload?.user) {
              navigate('/')
              toast("Successfully Logged In")
            }
          }


        })
      setSubmitting(false);
    }, 500);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Implement forgot password logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: 3
        }}
      >
        <IconButton
          onClick={toggleColorMode}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: mode === 'light' ? 'primary.dark' : 'primary.light'
          }}
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 3,
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ bgcolor: 'black', width: '100%' }} >
              <img src="/logo.png" alt="Company Logo" style={{ width: '100px', marginBottom: '20px' }} />
            </div>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSignin}
          >
            {({ errors, touched, setFieldValue, isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="userId"
                  label="userId"
                  fullWidth
                  margin="normal"
                  error={touched.userName && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Field
                  as={FormControlLabel}
                  name="rememberMe"
                  control={<Checkbox />}
                  label="Remember me"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
                  <Link component="button" variant="body2" onClick={handleForgotPassword}>
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    bgcolor: mode === 'light' && 'black',
                    '&:hover': { bgcolor: mode === 'light' && '#333' },
                    transition: 'background-color 0.3s',
                  }}
                  disabled={isSubmitting}
                  startIcon={<LoginIcon />}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;