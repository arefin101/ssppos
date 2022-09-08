import React, {useRef} from 'react';
import MetaTags from 'react-meta-tags';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import LoadingBar from 'react-top-loading-bar';

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// actions
import { loginUser, socialLogin } from "../../store/actions";

import logoLight from "../../assets/images/logo-light.png";
//Import config
import { facebook, google } from "../../config";
//import images

import { useProfile } from "../../Components/Hooks/UserHooks";
import { Redirect, Route } from "react-router-dom";
import { useEffect } from 'react';


const Login = (props) => {

    const dispatch = useDispatch();
    const ref = useRef(null);
    

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please Enter Your Username"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            document.getElementById("submit").disabled = true;

            dispatch(loginUser(values, props.history));
    
            ref.current.continuousStart();
            // ref.current.complete();
        }
    });

    const { error } = useSelector(state => ({
        error: state.Login.error,
    }));
    

    // loader
    useEffect(() => {
        if(localStorage.getItem("loginSuccess")){
            ref.current.complete();
            localStorage.removeItem("loginSuccess");
        }
    }, [localStorage.getItem("loginSuccess")])
    
    useEffect(() => {
        if(localStorage.getItem("loginError")){
            ref.current.complete();
            localStorage.removeItem("loginError");
            document.getElementById("submit").disabled = false;
        }
    }, [localStorage.getItem("loginError")])



    const signIn = (res, type) => {
        if (type === "google" && res) {
            const postData = {
                name: res.profileObj.name,
                email: res.profileObj.email,
                token: res.tokenObj.access_token,
                idToken: res.tokenId,
            };
            dispatch(socialLogin(postData, props.history, type));
        } else if (type === "facebook" && res) {
            const postData = {
                name: res.name,
                email: res.email,
                token: res.accessToken,
                idToken: res.tokenId,
            };
            dispatch(socialLogin(postData, props.history, type));
        }
    };

    //handleGoogleLoginResponse
    const googleResponse = response => {
        signIn(response, "google");
    };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //handleFacebookLoginResponse
    const facebookResponse = response => {
        signIn(response, "facebook");
    };

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

    const { userProfile, loading } = useProfile();

    if (userProfile) {
        return (
          <Redirect to='/dashboard' />
        );
    }

    const showPassword = () => {
        const password = document.getElementById('password');
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
    }

    return (
        <React.Fragment>
            
            <LoadingBar color='#fff' ref={ref} />
            {/* <ParticlesAuth> */}
            <div className="auth-page-content auth-bg-cover">
                <div className="bg-overlay"></div>

                <MetaTags>
                    <title>SSPPOS</title>
                </MetaTags>
                <Container>
                    {/*<Row>
                        <Col lg={12}>
                            <div className="text-center mt-sm-5 mb-4 text-white-50">
                                <div>
                                    <Link to="/" className="d-inline-block auth-logo">
                                        <h1 style={{ color:"black" }}>SSPPOS</h1>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row> */}

                    <Row className="align-items-center justify-content-center" style={{ height: "100vh" }}>
                        <Col md={8} lg={6} xl={5}>
                            <Card className="mt-4" style={{ paddingBottom:'30px', marginBottom:'80px' }}>
                                <CardBody className="p-4">
                                    <h1 className='text-center text-primary pt-4 pb-3'>SSPPOS</h1>
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Welcome Back !</h5>
                                        <p className="text-muted">Please Sign in to continue</p>
                                    </div>
                                    <div className="p-2 mt-4">
                                    { error &&  (
                                        <Alert color="danger" className="alert-borderless mb-xl-0">
                                            {error}
                                        </Alert>
                                    )}
                                        <Form onSubmit={(e) => validate(e)} action="#">
                                        <div className="mb-3">
                                                <Label htmlFor="username" className="form-label">Username</Label>
                                                <Input
                                                    name="username"
                                                    className="form-control"
                                                    placeholder="Enter Username"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.username || ""}
                                                    invalid={
                                                        validation.touched.username && validation.errors.username ? true : false
                                                    }
                                                />
                                                {validation.touched.username && validation.errors.username ? (
                                                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <div className="float-end">
                                                    <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                </div>
                                                <Label className="form-label" htmlFor="password-input">Password</Label>
                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                    <Input
                                                        name="password"
                                                        id='password'
                                                        value={validation.values.password || ""}
                                                        type="password"
                                                        className="form-control pe-5"
                                                        placeholder="Enter Password"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={
                                                            validation.touched.password && validation.errors.password ? true : false
                                                        }
                                                    />
                                                    {validation.touched.password && validation.errors.password ? (
                                                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                    ) : null}
                                                    <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={()=>showPassword()}><i className="ri-eye-fill align-middle"></i></button>
                                                </div>
                                            </div>

                                            {/* <div className="form-check">
                                                <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                            </div> */}

                                            <div className="mt-4">
                                                <Button id="submit" color="success" className="btn btn-success w-100" type="submit">Sign In</Button>
                                            </div>

                                            {/* <div className="mt-4 text-center">
                                                <div className="signin-other-title">
                                                    <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                </div>
                                                <div>
                                                    <FacebookLogin
                                                        appId={facebook.APP_ID}
                                                        autoLoad={false}
                                                        callback={facebookResponse}
                                                        render={renderProps => (
                                                            <Button color="primary"
                                                                className="btn-icon me-1"
                                                                onClick={renderProps.onClick}
                                                            >
                                                                <i className="ri-facebook-fill fs-16" />
                                                            </Button>
                                                        )}
                                                    />
                                                    <GoogleLogin
                                                        clientId={
                                                            google.CLIENT_ID ? google.CLIENT_ID : ""
                                                        }
                                                        render={renderProps => (
                                                            <Button color="danger"
                                                                to="#"
                                                                className="btn-icon me-1"
                                                                onClick={renderProps.onClick}
                                                            >
                                                                <i className="ri-google-fill fs-16" />
                                                            </Button>
                                                        )}
                                                        onSuccess={googleResponse}
                                                        onFailure={() => {

                                                        }}
                                                    />
                                                    <Button color="dark" className="btn-icon"><i className="ri-github-fill fs-16"></i></Button>{" "}
                                                    <Button color="info" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>
                                                </div>
                                            </div> */}
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* <div className="mt-4 text-center">
                                <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup </Link> </p>
                            </div> */}

                        </Col>
                    </Row>
                </Container>
            </div>
            {/* </ParticlesAuth> */}
        </React.Fragment>
    );
};

export default withRouter(Login);