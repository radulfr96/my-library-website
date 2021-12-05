import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
    Paper, Grid, Button, makeStyles,
} from '@material-ui/core';
import Axios from 'axios';
import { WithSnackbarProps } from 'notistack';
import InputTextField from '../../components/shared/InputTextField';
import { RegisterInfo } from '../../interfaces/registerInfo';
import PageHeading from '../../components/shared/PageHeading';
import UserHelper from './UserHelper';
import { AppContext } from '../../Context';

interface RegisterState {
    registrationInfo: RegisterInfo;
}

const useStyles = makeStyles({
    paper: {
        paddingTop: '20px',
        paddingLeft: '40px',
        paddingRight: '20px',
    },
    formButton: {
        marginBottom: '10px',
        marginRight: '10px',
        float: 'right',
    },
});

export default function Register(props: WithSnackbarProps): JSX.Element {
    const classes = useStyles();
    const [registerState] = useState<RegisterState>({
        registrationInfo: {
            username: '',
            password: '',
            confirmationPassword: '',
        },
    });
    const history = useNavigate();
    const context = useContext(AppContext);

    const renderErrorSnackbar = (message: string): void => {
        props.enqueueSnackbar(message, {
            variant: 'error',
        });
    };

    const renderSuccessSnackbar = (message: string): void => {
        props.enqueueSnackbar(message, {
            variant: 'success',
        });
    };

    const renderWarningSnackbar = (message: string): void => {
        props.enqueueSnackbar(message, {
            variant: 'warning',
        });
    };

    const checkUserIsUnique = (username: string) => {
        const helper = new UserHelper();
        helper.CheckUserIsUnique(username).then((result) => {
            if (result === null || result === undefined) {
                renderErrorSnackbar('Unable to check username, please contact admin');
            } else if (result === true) {
                renderWarningSnackbar('Username is taken please choose another');
            } else if (result === false) {
                renderSuccessSnackbar('Username is availiable');
            }
        });
    };

    const register = (registrationInfo: RegisterInfo, validateForm: any) => {
        validateForm()
            .then((formKeys: any) => {
                if (Object.keys(formKeys).length === 0) {
                    Axios.post('api/user/', registrationInfo)
                        .then((response) => {
                            if (response.status === 200) {
                                renderSuccessSnackbar('Registration successful');
                                context.getUserInfo();
                                history('/');
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 400) {
                                renderWarningSnackbar(error.data);
                            } else {
                                renderErrorSnackbar('Unable to login in user please contact admin');
                            }
                        });
                }
            });
    };

    return (
        <Paper className={classes.paper}>
            <PageHeading headingText="Sign Up" />
            <Formik
                initialValues={registerState.registrationInfo}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validationSchema={() => yup.object().shape({
                        username: yup.string()
                        .required('You must enter a username to register'),
                        password: yup.string()
                        .required('You must enter your a password to register')
                        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 6 characters long and contain one number and uppercase character.'),
                        confirmationPassword: yup.string()
                        .oneOf([yup.ref('password')], 'Confirm password must matched password')
                        .required('You must enter your password confirmation to register'),
                    })}
                    // yup.addMethod(yup.string, 'equalTo', YupExtensions.equalTo);
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    validateForm,
                }) => (
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <InputTextField
                                label="Username"
                                required
                                type="text"
                                keyName="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={() => {
                                    checkUserIsUnique(values.username);
                                }}
                                error={!!(errors.username)}
                                errorMessage={errors.username}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputTextField
                                label="Password"
                                required
                                type="password"
                                keyName="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!(errors.password)}
                                errorMessage={errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputTextField
                                label="Confirm Password"
                                required
                                type="password"
                                keyName="confirmationPassword"
                                value={values.confirmationPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!(errors.confirmationPassword)}
                                errorMessage={errors.confirmationPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    register(values, validateForm);
                                }}
                            >
                                Register
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    history('/');
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Formik>
        </Paper>
    );
}