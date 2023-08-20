import React, { useState } from "react";
import { Button, Card, CardContent, FormGroup, Typography, Box, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import UserApi from '../../api/UserApi';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [isDisableResendButton, setDisableResendButton] = useState(false);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const resendEmailToActiveAccount = async () => {
        setDisableResendButton(true);
        await UserApi.resendEmailToActiveAccount(email);
        setDisableResendButton(false);
    }
    const handleClose = () => {
        setOpen(false);
    };

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
                            Sign in
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
                                        await UserApi.create(
                                            values.username,
                                            values.password
                                        );
                                        // message
                                        setEmail(values.email);
                                        // mở modal
                                        setOpen(true)
                                    } catch (error) {
                                        // redirect page error server
                                        //   props.history.push("/auth/500");
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
                                                        <FormControlLabel
                                                            control={<Checkbox value="remember" color="primary" />}
                                                            label="Remember me"
                                                        />
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
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">

                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/signUp" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Card>
                            )}

                        </Formik>

                    </Box>


                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {"Bạn cần xác nhận tài khoản của mình"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p className="mb-0">
                                    Chúng tôi đã gửi một email đến <b>{email}</b>.
                                </p>
                                <p className="mb-0">
                                    Vui lòng kiểm tra email của bạn để kích hoạt tài khoản
                                </p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={resendEmailToActiveAccount} disabled={isDisableResendButton}>
                                Resend
                            </Button>
                            <Link to='/login'><Button >Login</Button></Link>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid >
        </>
    );
};

export default SignUp;