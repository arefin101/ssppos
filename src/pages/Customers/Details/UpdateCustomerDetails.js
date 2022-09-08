import React, { useEffect, useState, useRef }  from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import PreviewCardHeaderMain from './../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerById, updateCustomerById } from '../../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


const UpdateCustomerDetails = (props) => {

    const userId = props.match.params.id;
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();
    
    const ref = useRef(null);

    const { response } = useSelector( state => ({
        response: state.Contact.customer,
    }));

    useEffect(() => {
        if(response){
            setUserData(response.customer);
        }else{
            setUserData([]);
        }
    }, [response.customer]);
    
    useEffect(() => {
        dispatch( getCustomerById( userId, props.history ) );
    }, []);
    

    
    const validation = useFormik({
        
        enableReinitialize: true,
    
        initialValues: {
            first_name: userData ? userData.first_name ? userData.first_name : "" : "",
            last_name: userData ? userData.last_name ? userData.last_name : "" : "",
            username: userData ? userData.username ? userData.username : "" : "",
            email: userData ? userData.email ? userData.email : "" : "",
            password: "",
            password_confirmation: "",
            pin_number: "",
            business_name: userData ? userData.business_name ? userData.business_name : "" : "",
            business_website: userData ? userData.business_website ? userData.business_website : "" : "",
            tax_id: userData ? userData.tax_id ? userData.tax_id : "" : "",
            license_certificate: "",
            contact_no: userData ? userData.contact_no ? userData.contact_no : "" : "",
            address: userData ? userData.address ? userData.address : "" : "",
            city: userData ? userData.city ? userData.city : "" : "",
            state: userData ? userData.state ? userData.state : "" : "",
            country: userData ? userData.country ? userData.country : "" : "",
            zip_code: userData ? userData.zip_code ? userData.zip_code : "" : "",
        },

        validationSchema: Yup.object({
            first_name: Yup.string().required("Please Enter First Name"),
            last_name: Yup.string().required("Please Enter Last Name"),
            username: Yup.string().required("Please Enter Username"),
            email: Yup.string().required("Please Enter Email"),
            tax_id: Yup.string().required("Please Enter Tax ID"),
            contact_no: Yup.string().required("Please Enter Contact No."),
            address: Yup.string().required("Please Enter Address"),
            city: Yup.string().required("Please Enter City"),
            state: Yup.string().required("Please Enter State"),
            country: Yup.string().required("Please Enter Country"),
        }),

        onSubmit: (values) => {

            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();

            const formData = new FormData();

            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('password_confirmation', values.password_confirmation);
            formData.append('pin_number', values.pin_number);
            formData.append('business_name', values.business_name);
            formData.append('business_website', values.business_website);
            formData.append('tax_id', values.tax_id);
            formData.append('license_certificate', values.license_certificate);
            formData.append('contact_no', values.contact_no);
            formData.append('address', values.address);
            formData.append('city', values.city);
            formData.append('state', values.state);
            formData.append('country', values.country);
            formData.append('zip_code', values.zip_code);
            
            dispatch(updateCustomerById(userId, formData, props.history));
        },

    });

    
    const {error}  =  useSelector( state => ({
        error: state.Contact.errorCustomer ? state.Contact.errorCustomer : {},
    }));
    
    useEffect(() => {
        error.first_name= "" ; 
        error.last_name= "" ;
        error.username= "" ;
        error.email= "" ;
        error.password= "" ;
        error.password_confirmation= "" ;
        error.pin_number= "" ;
        error.business_name= "" ;
        error.business_website= "" ;
        error.tax_id="";
        error.license_certificate= "";
        error.contact_no= "" ;
        error.address= "" ;
        error.city= "" ;
        error.state= "" ;
        error.country= "" ;
        error.zip_code= "" ;
    }, []);

    useEffect(() => {
        if(error){
            if( 
                error.first_name  ||
                error.last_name  ||
                error.username  ||
                error.email  ||
                error.password  ||
                error.password_confirmation  ||
                error.pin_number  ||
                error.business_name  ||
                error.business_website  ||
                error.tax_id  ||
                error.license_certificate  ||
                error.contact_no  ||
                error.address  ||
                error.city  ||
                error.state  ||
                error.country  ||
                error.zip_code 
            ){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify("Customer Information Update Failed !")
            }
        }
    }, [error]);

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

    // toasters
    const errornotify = (message) => toast(message, { 
        position: "top-right", 
        hideProgressBar: true, 
        closeOnClick: false, 
        className: 'bg-danger text-white' 
    });

    return (
        <React.Fragment>
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Edit Customer Information</title>
                </MetaTags>
                <Container fluid>
                    
                    {/* <BreadCrumb title="Edit User Information" pageTitle="Users" link="/user-list"/> */}
                    <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                        <Card>
                            <PreviewCardHeaderMain title="Edit Information" />
                            <CardBody>
                                <div className="live-preview">
                                    <Row>
                                        <Col md={6} xxl={4}>
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
                                        <Col md={6} xxl={4}>
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
                                        <Col md={6} xxl={4}>
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
                                        <Col md={6} xxl={3}>
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
                                        <Col md={4} xxl={3}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationPassword">Password</Label>
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
                                        <Col md={4} xxl={3}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationPassword_confirmation">Confirm Password</Label>
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
                                                        validation.errors.password_confirmation) || error.password
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.password_confirmation &&
                                                validation.errors.password_confirmation) || error.password ? (
                                                <FormFeedback type="invalid">
                                                    {error.password_confirmation? error.password_confirmation :validation.errors.password_confirmation}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={4} xxl={3}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationPin_number">Pin Number</Label>
                                                <Input
                                                    name="pin_number"
                                                    placeholder="Enter pin number"
                                                    type="password"
                                                    className="form-control"
                                                    id="validationPin_number"
                                                    onChange={validation.handleChange}
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
                                    </Row> 
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <PreviewCardHeaderMain title="Other Information" />
                            <CardBody>
                                <div className="live-preview">
                                    <Row>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationBusiness_name">Business Name</Label>
                                                <Input
                                                    name="business_name"
                                                    placeholder="Enter Business Name"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationBusiness_name"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.business_name || ""}
                                                    invalid={
                                                        (validation.touched.business_name &&
                                                        validation.errors.business_name) || error.business_name
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.business_name &&
                                                validation.errors.business_name) || error.business_name ? (
                                                <FormFeedback type="invalid">
                                                    {error.business_name ? error.business_name : validation.errors.business_name}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationBusiness_website">Business Website</Label>
                                                <Input
                                                    name="business_website"
                                                    placeholder="Enter Business Website"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationBusiness_website"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.business_website || ""}
                                                    invalid={
                                                        (validation.touched.business_website &&
                                                        validation.errors.business_website) || error.business_website
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.business_website &&
                                                validation.errors.business_website) || error.business_website ? (
                                                <FormFeedback type="invalid">
                                                    {error.business_website ? error.business_website : validation.errors.business_website}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationBusiness_website">Tax ID<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="tax_id"
                                                    placeholder="Enter Tax ID"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationTax_id"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.tax_id || ""}
                                                    invalid={
                                                        (validation.touched.tax_id &&
                                                        validation.errors.tax_id) || error.tax_id
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.tax_id &&
                                                validation.errors.tax_id) || error.tax_id ? (
                                                <FormFeedback type="invalid">
                                                    {error.tax_id ? error.tax_id : validation.errors.tax_id}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationBusiness_website">License Certificate</Label>
                                                <Input
                                                    name="license_certificate"
                                                    placeholder="Upload File"
                                                    type="file"
                                                    className="form-control"
                                                    id="validationlicense_certificate"
                                                    aria-label="file example"
                                                    onChange={(e)=> validation.setFieldValue('license_certificate', e.target.files[0])}
                                                    onBlur={validation.handleBlur}
                                                    
                                                    invalid={
                                                        (validation.touched.license_certificate &&
                                                        validation.errors.license_certificate) || error.license_certificate
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                <div className="invalid-feedback">
                                                    {error.license_certificate ? error.license_certificate : validation.errors.license_certificate}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationContact_no">Contact No.<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="contact_no"
                                                    placeholder="Enter your contact no."
                                                    type="text"
                                                    className="form-control"
                                                    id="validationContact"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.contact_no || ""}
                                                    invalid={
                                                        (validation.touched.contact_no &&
                                                        validation.errors.contact_no) || error.contact_no
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.contact_no &&
                                                validation.errors.contact_no) || error.contact_no ? (
                                                <FormFeedback type="invalid">
                                                    {error.contact_no ? error.contact_no : validation.errors.contact_no}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationAddress">Address<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="address"
                                                    placeholder="Enter your Address"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationAddress"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.address || ""}
                                                    invalid={
                                                        (validation.touched.address &&
                                                        validation.errors.address) || error.address
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.address &&
                                                validation.errors.address) || error.address ? (
                                                <FormFeedback type="invalid">
                                                    {error.address ? error.address : validation.errors.address}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationCity">City<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="city"
                                                    placeholder="Enter your City"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCity"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.city || ""}
                                                    invalid={
                                                        (validation.touched.city &&
                                                        validation.errors.city) || error.city
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.city &&
                                                validation.errors.city) || error.city ? (
                                                <FormFeedback type="invalid">
                                                    {error.city ? error.city : validation.errors.city}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationState">State<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="state"
                                                    placeholder="Enter your State"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationState"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.state || ""}
                                                    invalid={
                                                        (validation.touched.state &&
                                                        validation.errors.state) || error.state
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.state &&
                                                validation.errors.state) || error.state ? (
                                                <FormFeedback type="invalid">
                                                    {error.state ? error.state : validation.errors.state}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationCountry">Country<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="country"
                                                    placeholder="Enter your Country"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationCountry"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.country || ""}
                                                    invalid={
                                                        (validation.touched.country &&
                                                        validation.errors.country) || error.country
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.country &&
                                                validation.errors.country) || error.country ? (
                                                <FormFeedback type="invalid">
                                                    {error.country ? error.country : validation.errors.country}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} xxl={4}>
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationZipCode">Zip Code</Label>
                                                <Input
                                                    name="zip_code"
                                                    placeholder="Enter your Zip Code"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationZipCode"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.zip_code || ""}
                                                    invalid={
                                                        (validation.touched.zip_code &&
                                                        validation.errors.zip_code) || error.zip_code
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.zip_code &&
                                                validation.errors.zip_code) || error.zip_code ? (
                                                <FormFeedback type="invalid">
                                                    {error.zip_code ? error.zip_code : validation.errors.zip_code}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <div className='d-flex'>
                                        <Button id="submit" color="primary" type="submit" className='mt-4 w-md'> Update </Button>
                                        <Link className="mt-4 ms-3" to={"/customer-details/" + userId}> 
                                            <Button color="danger" outline className="btn btn-ghost-danger vertical-top">Cancel</Button> 
                                        </Link>
                                    </div> 
                                </div>
                            </CardBody>
                        </Card>
                    </Form>
                    <div className="d-none code-view">
                        <pre className="language-markup" style={{ "height": "375px" }}>
                            <code>
                                <FormGrid />
                            </code>
                        </pre>
                    </div>
                    
                    <ToastContainer />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default UpdateCustomerDetails