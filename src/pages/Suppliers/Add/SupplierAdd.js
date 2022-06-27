import React, {useEffect} from 'react';
import UiContent from "../../../Components/Common/UiContent";
import MetaTags from 'react-meta-tags';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card,FormGroup, CardBody, Col, Container, Button,Form, Input, Label, Row , FormFeedback  } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeaderMain';
import {CustomStyles} from "../../Forms/FormValidation/FormValidationCode";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { createSupplier } from '../../../store/actions';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';



const SupplierAdd = (props) => {

    const dispatch = useDispatch();
    
    const validation = useFormik({
        
        enableReinitialize: true,

        initialValues: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
        },
            validationSchema: Yup.object({
            first_name: Yup.string().required("Please Enter Your First Name"),
            last_name: Yup.string().required("Please Enter Your Last Name"),
            username: Yup.string().required("Please Enter Your userName"),
            email: Yup.string().email("Invalid email format").required('Please Enter Your email'),
        }),
        onSubmit: (values) => {
            dispatch(createSupplier(values ,  props.history))
        },
    });
    

    const {errorSupplier}  =  useSelector( state => ({
        errorSupplier: state.Contact.error,
    }));

    useEffect(() => {
        
        errorSupplier.first_name= "";
        errorSupplier.last_name= "";
        errorSupplier.username= "";
        errorSupplier.email= "";
    }, []);

    const errornotify = (message) => toast(message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
   
    useEffect(() => {
        if(errorSupplier){
            if((errorSupplier.first_name !== '') || (errorSupplier.last_name !== '') || (errorSupplier.username !== '') || (errorSupplier.email !== '')){
                errornotify("Supplier Creation Failed !");
            }
        }
    }, [errorSupplier]);

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <MetaTags>
                    <title>Suppliers Insert</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Add Supplier" pageTitle="Suppliers" link="/supplier-List"/>
                    <Row>
                        <Col lg={12}>
                        <Card>
                            <PreviewCardHeader title="Add Supplier" />
                            <CardBody>
                            
                                <div className="live-preview">
                                    <Form
                                        className="needs-validation"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                            >
                                        <Row>
                                            <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="first_name">First name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                name="first_name"
                                                placeholder="First Name"
                                                type="text"
                                                className="form-control"
                                                id="first_name"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.first_name || ""}
                                                invalid={
                                                    (validation.touched.first_name && validation.errors.first_name) || errorSupplier.first_name
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {
                                                (validation.touched.first_name && validation.errors.first_name )|| errorSupplier.first_name ? (
                                                <FormFeedback type="invalid">
                                                    {errorSupplier.first_name ? errorSupplier.first_name: validation.errors.first_name}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            </Col>
                                            <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="last_name">Last name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                name="last_name"
                                                placeholder="Last Name"
                                                type="text"
                                                className="form-control"
                                                id="last_name"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.last_name || ""}
                                                invalid={
                                                    (validation.touched.last_name && validation.errors.last_name) || errorSupplier.last_name
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {
                                                (validation.touched.last_name && validation.errors.last_name)|| errorSupplier.last_name ? (
                                                <FormFeedback type="invalid">
                                                    {errorSupplier.last_name ? errorSupplier.last_name: validation.errors.last_name}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="username">Username<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                name="username"
                                                placeholder="username"
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.username || ""}
                                                invalid={
                                                    (validation.touched.username && validation.errors.username) || errorSupplier.username
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {(validation.touched.username && validation.errors.username) || errorSupplier.username ? (
                                                <FormFeedback type="invalid">
                                                    {errorSupplier.username ? errorSupplier.username : validation.errors.username}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            </Col>
                                            <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="email">Email<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                name="email"
                                                placeholder="email"
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.email || ""}
                                                invalid={
                                                    (validation.touched.email && validation.errors.email) || errorSupplier.email
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {(validation.touched.email && validation.errors.email) || errorSupplier.email ? (
                                                <FormFeedback type="invalid">
                                                    {errorSupplier.email ?errorSupplier.email : validation.errors.email}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            </Col>
                                            
                                        </Row>
                                        
                                        <Button color="primary" type="submit" className='submit-btn w-md'>
                                            Submit
                                        </Button>
                                    </Form>
                                </div>

                                <div className="d-none code-view">
                                    <pre className="language-markup" style={{ "height": "352px" }}>
                                    <code>
                                        <CustomStyles />
                                    </code>
                                    </pre>
                                </div>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default SupplierAdd;