import React, {useRef} from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import PreviewCardHeaderMain from './../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../store/user/action";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

const UserList = (props) => {

    const dispatch = useDispatch();

    const ref = useRef(null);

    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
          pin_number: "",
        },

        validationSchema: Yup.object({
          first_name: Yup.string().required("Please Enter Your First Name"),
          last_name: Yup.string().required("Please Enter Your Last Name"),
          username: Yup.string().required("Please Enter Your Username"),
          email: Yup.string().required("Please Enter Your Email"),
          password: Yup.string().required("Please Enter Password"),
          password_confirmation: Yup.string().required("Please Enter Confirm Password"),
          pin_number: Yup.string().min(5).required("Please Enter Pin Number"),
        }),

        onSubmit: (values) => {

            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();

            dispatch(addUser(values, props.history));
        },

      });

    const { error } = useSelector(state => ({
        error: (state.User.error ? state.User.error : {}),
    }));

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    useEffect(() => {
        
        error.first_name= "";
        error.last_name= "";
        error.username= "";
        error.email= "";
        error.password= "";
        error.password_confirmation= "";
        error.pin_number= "";

    }, []);

    useEffect(() => {

        if(error){
            if( 
                error.first_name  ||
                error.last_name  || 
                error.username || 
                error.email ||
                error.password || 
                error.password_confirmation || 
                error.pin_number
            ){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify("User Creation Failed !")
            }
        }

    }, [error]);

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

// console.log(validation.values.password_confirmation);
    return (
        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Add User</title>
                </MetaTags>
                <Container fluid>
                    
                    <BreadCrumb title="Add User" pageTitle="Users" link="/user-list"/>
                    <Card >
                        <PreviewCardHeaderMain title="Add User" />
                        <CardBody>
                            <div className="live-preview">
                                <Form className="needs-validation" onSubmit={(e) => validate(e)} id="add_user_form">
                                    <Row>
                                        <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationFirst_name">First name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="first_name"
                                                    placeholder="Enter your first name"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationFirst_name"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.first_name || ""}
                                                    invalid={
                                                        (validation.touched.first_name &&
                                                        validation.errors.first_name) || error.first_name
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.first_name &&
                                                validation.errors.first_name) || error.first_name ? (
                                                <FormFeedback type="invalid">
                                                    {error.first_name ? error.first_name : validation.errors.first_name}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationLast_name">Last name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                name="last_name"
                                                placeholder="Enter your last name"
                                                type="text"
                                                className="form-control"
                                                id="validationLast_name"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.last_name || ""}
                                                invalid={
                                                    (validation.touched.last_name &&
                                                    validation.errors.last_name) || error.last_name
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {(validation.touched.last_name &&
                                                validation.errors.last_name) || error.last_name ? (
                                                <FormFeedback type="invalid">
                                                    {error.last_name? error.last_name:validation.errors.last_name}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationUsername">Username<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                name="username"
                                                placeholder="Enter your user name"
                                                type="text"
                                                className="form-control"
                                                id="validationUsername"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.username || ""}
                                                invalid={
                                                    (validation.touched.username &&
                                                    validation.errors.username )|| error.username
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {(validation.touched.username &&
                                                validation.errors.username ) || error.username ? (
                                                <FormFeedback type="invalid">
                                                    {error.username? error.username:validation.errors.username}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationEmail">Email Address<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                            <Input
                                            name="email"
                                            placeholder="example@gmail.com"
                                            type="email"
                                            className="form-control"
                                            id="validationEmail"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.email || ""}
                                            invalid={
                                                (validation.touched.email &&
                                                validation.errors.email) || error.email
                                                ? true
                                                : false
                                            }
                                            />
                                            {(validation.touched.email &&
                                            validation.errors.email) || error.email ? (
                                            <FormFeedback type="invalid">
                                                {error.email ? error.email:validation.errors.email}
                                            </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                        <FormGroup className="mb-3">
                                            <Label htmlFor="validationPassword">Password<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                            <Input
                                                name="password"
                                                placeholder="Enter password"
                                                type="password"
                                                className="form-control"
                                                id="validationPassword"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.password || ""}
                                                invalid={
                                                    (validation.touched.password &&
                                                    validation.errors.password) || error.password
                                                    ? true
                                                    : false
                                                }
                                            />
                                            {(validation.touched.password &&
                                            validation.errors.password) || error.password ? (
                                            <FormFeedback type="invalid">
                                                {error.password? error.password : validation.errors.password}
                                            </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationPassword_confirmation">Confirm Pasword<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="password_confirmation"
                                                    placeholder="Enter confirm password"
                                                    type="password"
                                                    className="form-control"
                                                    id="validationPassword_confirmation"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.password_confirmation || ""}
                                                    invalid={
                                                        (validation.touched.password_confirmation &&
                                                        validation.errors.password_confirmation) || error.password_confirmation
                                                        ? true
                                                        : false
                                                    }       
                                                />
                                                {(validation.touched.password_confirmation &&
                                                validation.errors.password_confirmation) || error.password_confirmation ? (
                                                <FormFeedback type="invalid">
                                                    {error.password_confirmation? error.password_confirmation :validation.errors.password_confirmation}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationPin_number">Pin Number<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="pin_number"
                                                    placeholder="Enter pin number"
                                                    type="password"
                                                    className="form-control"
                                                    id="validationPin_number"
                                                    onChange={validation.handleChange}
                                                    // onKeyUp={(e) => validatePin(e)}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.pin_number || ""}
                                                    invalid={
                                                        (validation.touched.pin_number &&
                                                        validation.errors.pin_number) || error.pin_number
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.pin_number &&
                                                validation.errors.pin_number) || error.pin_number ? (
                                                <FormFeedback type="invalid">
                                                    {error.pin_number ? error.pin_number : validation.errors.pin_number}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md={6}>
                                            <div className="text-end">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </Col> */}
                                    </Row>
                                    <Button id="submit" color="primary" type="submit" className='submit-btn w-md'>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                            <div className="d-none code-view">
                                <pre className="language-markup" style={{ "height": "375px" }}>
                                    <code>
                                        <FormGrid />
                                    </code>
                                </pre>
                            </div>
                        </CardBody>
                    </Card>
                    
                    <ToastContainer />

                </Container>
            </div>
        </React.Fragment>
    );
};

export default UserList;