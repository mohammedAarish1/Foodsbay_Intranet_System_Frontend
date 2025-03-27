import React, { useEffect } from "react";
import { Box } from "../../components/MUI";
import AuthForm from "../../components/authForm/AuthForm"
import { checkAuthStatus } from "../../auth/authAPI";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "./ChangePasswordPage";

const Auth = () => {

  // const dispatch=useDispatch()
  //   useEffect(() => {
  //     dispatch(checkAuthStatus())
  //   }, [])
  return (
    <div> 
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   background: "linear-gradient(45deg, #373E40 30%, #305252 90%)",
        }}
      >
        {/* <AuthForm /> */}
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/change-password" element={<Box p={4}><ChangePassword /></Box>} />
        </Routes>
      </Box>
    </div>
  );
};

export default Auth;
