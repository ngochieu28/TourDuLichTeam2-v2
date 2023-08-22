import React, { useState } from "react";
import { Button, Card, CardContent, FormGroup, Typography, Box, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import UserApi from '../../api/UserApi';
import storage from '../../Storage/Storage'
import LoginApi from '../../api/LoginApi'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in Admin
                        </Typography>
                        <Formik
                            initialValues={{
                                username: "",
                                password: "",
                            }}
                            validationSchema={Yup.object({
                                username: Yup.string()
                                    .min(6, "Must be between 6 and 50 characters")
                                    .max(50, "Must be between 6 and 50 characters")
                                    .required("Required"),
                                password: Yup.string()
                                    .min(6, "Must be between 6 and 50 characters")
                                    .max(50, "Must be between 6 and 50 characters")
                                    .required("Required"),
                            })}
                            onSubmit={
                                async (values) => {
                                    try {
                                        // call api
                                        const result = await LoginApi.login(
                                            values.username,
                                            values.password
                                        );

                                        // check user active
                                        if (result.token === null || result.token === undefined) {
                                            setEmail(result.email);
                                        } else {
                                            // save token & UserInfo to storage
                                            storage.setToken(result.token);
                                            storage.setUserInfo(
                                                result.userName,
                                                result.email,
                                                result.firstName,
                                                result.lastName,
                                                result.role,
                                                result.status);

                                            // save token & UserInfo to redux

                                            // redirect to home page
                                            navigate('/admin');
                                        }

                                    } catch (error) {
                                        if (error.status === 401) {
                                            // show error notification
                                            toast.error('Wrong Username or Password!');
                                        } else {
                                            // redirect page error server
                                            navigate('/page500');
                                        }
                                    }
                                }
                            }
                        >
                            {({ isSubmitting }) => (
                                <Card>
                                    <CardContent>
                                        <div className="m-sm-4">
                                            <Form>
                                                <Grid container spacing={2}>

                                                    <Grid item xs={12} >
                                                        <FormGroup>
                                                            <Field
                                                                label="Username"
                                                                type="text"
                                                                name="username"
                                                                placeholder="Enter your username"
                                                                component={TextField}
                                                                fullWidth
                                                            />
                                                        </FormGroup>
                                                    </Grid>

                                                    <Grid item xs={12} >
                                                        <FormGroup>
                                                            <Field
                                                                label="Password"
                                                                type="password"
                                                                name="password"
                                                                placeholder="Enter password"
                                                                component={TextField}
                                                                fullWidth
                                                            />
                                                        </FormGroup>
                                                    </Grid>
                                                    <Grid item xs={12} >
                                                        <div className="text-center mt-3">
                                                            <Button
                                                                type="submit"
                                                                color="primary"
                                                                variant="contained"
                                                                size="large"
                                                                disabled={isSubmitting}
                                                                style={{ width: '100%' }}
                                                            >
                                                                Sign In
                                                            </Button>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid >
        </>
    );
};

export default Login;