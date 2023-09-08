import React, { useState } from "react";
import { Button, Card, CardContent, FormGroup, Typography, Box, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
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
import storage from '../../Storage/Storage'
import LoginApi from '../../api/LoginApi'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppConsumer } from '../../store';
import { SET_ROLE, SET_INFO_USER } from '../../store/action'

const Login = () => {
    const [state, dispatch] = AppConsumer();
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState("");
    const [isDisableResendButton, setDisableResendButton] = useState(false);
    const navigate = useNavigate();

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
    // rememberMe
    const [checkedRememberMe, setCheckedRememberMe] = React.useState(storage.isRememberMe());

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
                                        const result = await LoginApi.login(
                                            values.username,
                                            values.password
                                        );

                                        // setRole để check admin
                                        dispatch(SET_ROLE(result.role))
                                        dispatch(SET_INFO_USER(result))

                                        // check user active
                                        if (result.token === null || result.token === undefined) {
                                            setEmail(result.email);
                                            setOpen(true);

                                        } else {
                                            // set remember me
                                            storage.setRememberMe(checkedRememberMe);

                                            // save token & UserInfo to storage
                                            storage.setToken(result.token);
                                            storage.setUserInfo(
                                                result.userName,
                                                result.email,
                                                result.firstName,
                                                result.lastName,
                                                result.role,
                                                result.status);

                                            // redirect to home page
                                            navigate('/');
                                            dispatch(SET_INFO_USER(result))

                                            if (result.role === 'Admin') {
                                                navigate("/admin");
                                            }
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
                                                        <FormControlLabel
                                                            control={<Checkbox value="remember" color="primary" />}
                                                            label="Remember me"
                                                            value={checkedRememberMe}
                                                            onChange={() => setCheckedRememberMe(!checkedRememberMe)}
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
                                            <Link to="/resetpassword" variant="body2">
                                                {"Forgot password?"}
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
                    <h1>Đăng nhập với role admin: </h1>
                    <h2>userName: admintrator</h2>
                    <h2>passWord: admin123</h2>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {"Bạn cần kích hoạt tài khoản của mình"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p className="mb-0">
                                    Tài khoản của bạn chưa kích hoạt.
                                </p>
                                <p className="mb-0">
                                    Vui lòng kiểm tra email của bạn (<b>{email}</b>) để gửi tài khoản đang hoạt động.
                                </p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={resendEmailToActiveAccount} disabled={isDisableResendButton}>
                                Resend
                            </Button>
                            <Button color="primary" onClick={() => handleClose()}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid >
        </>
    );
};

export default Login;