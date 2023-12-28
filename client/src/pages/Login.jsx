import React from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../components/Header";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const Login = () => {
  const socialButtons = [
    {
      platform: "facebook",
      color: "#1877F2",
      icon: <FacebookIcon />,
    },
    {
      platform: "gitHub",
      color: "#333333",
      icon: <GitHubIcon />,
    },
    {
      platform: "google",
      color: "#DB4437",
      icon: <GoogleIcon />,
    },
  ];

  const renderSocialButtons = () => {
    return socialButtons.map((button) => (
      <Button
        key={button.platform}
        variant="contained"
        style={{
          backgroundColor: button.color,
          color: "white",
          marginBottom: "10px",
          width: "150px",
        }}
        startIcon={button.icon}
        onClick={() => handleSocialLogin(button.platform)}
      >
        {button.platform}
      </Button>
    ));
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSocialLogin = (platform) => {
    console.log(`Clicked on ${platform} login`);
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <Box m="20px">
      <Header
        title="Login"
        subtitle="Welcome back! Please login to continue."
      />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          alignItems="center"
        >
          {renderSocialButtons()}
        </Box>
        <Box flexGrow={1}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={loginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <Box display="flex" justifyContent="space-between" mt="20px">
                  <Typography variant="h6" >
                    Don't have an account?{"\t"}
                    <Link href="/signup">
                      Register
                    </Link>
                  </Typography>
                  <Button type="submit" color="secondary" variant="contained">
                    Login
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
