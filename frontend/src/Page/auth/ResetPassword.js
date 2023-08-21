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
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
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
                        Reset password
                    </Typography>
                    <Formik
                        initialValues={{
                            email: "",
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Required")
                                .test('checkExistsEmail', 'This email is not exists.', async (email) => {
                                    const isExists = await UserApi.existsByEmail(email);
                                    return isExists;
                                }),
                        })}
                        onSubmit={
                            async (values) => {
                                try {
                                    // call api
                                    await UserApi.requestResetPassword(values.email);

                                    // message
                                    setEmail(values.email);
                                    setOpen(true);

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
                                                            label="Email"
                                                            type="email"
                                                            name="email"
                                                            placeholder="Enter your email to reset your password."
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
                                                            Reset Password
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
                                            {"Don't have an account? Sign up"}
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
                        {"Bạn cần xác nhận đặt lại mật khẩu"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p className="mb-0">
                                Chúng tôi đã gửi email tới <b>{email}</b>
                            </p>
                            <p className="mb-0">
                                Vui lòng kiểm tra email của bạn để đặt lại mật khẩu
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

export default ResetPassword;