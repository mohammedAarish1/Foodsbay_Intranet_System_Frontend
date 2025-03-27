import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { handlePasswordChange } from "../../auth/authAPI";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  useTheme,
} from '../../components/MUI';
import SubmitButton from "../../components/Buttons/SubmitButton";

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .required("Old Password is required"),
  newPassword: Yup.string()
    .min(8, "Must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[!@#$%^&*]/, "Must contain a special character")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePassword = () => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormSubmission = (values, { setSubmitting }) => {
    const payload = { userId: null, ...values }
    dispatch(handlePasswordChange(payload))
      .then(result => {
        if (result.payload?.user) {
          navigate('/')
        }
        console.log('ressssss chan', result)
      })
    setSubmitting(false);

  }

  return (
    <Box
      sx={{
        // minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        padding: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          // backgroundColor: "white",
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", mb: 3, }}
          >
            <Lock sx={{ fontSize: 32, verticalAlign: "middle", mr: 1, color: "#1976d2" }} />
            Change Password
          </Typography>

          <Formik
            initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmission}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                {/* New Password */}
                <Field
                  as={TextField}
                  label="Old Password"
                  name="oldPassword"
                  type="text"
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.oldPassword}
                  error={touched.oldPassword && Boolean(errors.oldPassword)}
                  helperText={touched.oldPassword && errors.oldPassword}
                  sx={{ borderRadius: 1 }}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                //         {showNewPassword ? <VisibilityOff /> : <Visibility />}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
                />
                {/* New Password */}
                <Field
                  as={TextField}
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPassword}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                  sx={{ borderRadius: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Confirm Password */}
                <Field
                  as={TextField}
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ borderRadius: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Submit Button */}
                {/* <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    fontWeight: "bold",
                    bgcolor: "#1976d2",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#125ea6",
                    },
                  }}
                >
                  Change Password
                </Button> */}
                <SubmitButton
                  title='Change Password'
                  style={{ mt: 2 }}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChangePassword;
