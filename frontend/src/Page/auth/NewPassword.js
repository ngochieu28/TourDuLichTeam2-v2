import React from "react";
import { Button, Card, CardContent, FormGroup, Typography, Box, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import UserApi from '../../api/UserApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const NewPassword = () => {
    const navigate = useNavigate();

    const { token } = useParams();

    // TODO
    if (!token) {
        navigate('/login');
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset password
                    </Typography>
                    <Formik
                        initialValues={{
                            firstname: "",
                            lastname: "",
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .min(6, "Must be between 6 and 50 characters")
                                .max(50, "Must be between 6 and 50 characters")
                                .required("Required"),
                            confirmPassword: Yup.string()
                                .required("Required")
                                .oneOf([Yup.ref("password")], "Confirm Password does not match")
                        })}
                        onSubmit={
                            async (values) => {
                                try {
                                    // call api
                                    await UserApi.resetPassword(token, values.password);

                                    // message
                                    toast.success("Reset Password Successfully!");
                                    // redirect to login page
                                    navigate('/login');

                                } catch (error) {
                                    // redirect page error server
                                    navigate('/page500');
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
                                                    <FormGroup>
                                                        <Field
                                                            label="Confirm Password"
                                                            type="password"
                                                            name="confirmPassword"
                                                            placeholder="Enter confirm password"
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
                                                            Reset password
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
            </Container >
        </>
    );
};

export default NewPassword;