import React, { useState } from "react";
import { Button, Card, CardContent, FormGroup, Typography, Box, Grid } from "@mui/material";
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
                        Sign up
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
                            firstname: Yup.string()
                                .max(50, "Must be less than 50 characters")
                                .required("Required"),
                            lastname: Yup.string()
                                .max(50, "Must be less than 50 characters")
                                .required("Required"),
                            username: Yup.string()
                                .min(6, "Must be between 6 and 50 characters")
                                .max(50, "Must be between 6 and 50 characters")
                                .required("Required")
                                .test(
                                    'checkExistsUsername',
                                    'This username is already registered.',
                                    async (username) => {
                                        const isExists = await UserApi.existsByUsername(username);
                                        return !isExists;
                                    }
                                ),
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Required")
                                .test('checkExistsEmail', 'This email is already registered.',
                                    async (email) => {
                                        const isExists = await UserApi.existsByEmail(email);
                                        return !isExists;
                                    }),
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
                                    await UserApi.create(
                                        values.firstname,
                                        values.lastname,
                                        values.username,
                                        values.email,
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
                                                <Grid item xs={6} >
                                                    <FormGroup>
                                                        <Field
                                                            label="First Name"
                                                            type="text"
                                                            name="firstname"
                                                            placeholder="Enter your first name"
                                                            component={TextField}
                                                            fullWidth
                                                        />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <FormGroup>
                                                        <Field
                                                            label="Last Name"
                                                            type="text"
                                                            name="lastname"
                                                            placeholder="Enter your last name"
                                                            component={TextField}
                                                            fullWidth
                                                        />
                                                    </FormGroup>
                                                </Grid>
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
                                                            label="Email"
                                                            type="email"
                                                            name="email"
                                                            placeholder="Enter your email"
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
                                                            Sign up
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
                                        <Link to="/login" variant="body2">
                                            {"Already have an account? Sign in"}
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
            </Container >
        </>
    );
};

export default SignUp;