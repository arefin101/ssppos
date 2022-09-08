import React, {useEffect, useRef} from 'react';
import UiContent from "../../../Components/Common/UiContent";
import MetaTags from 'react-meta-tags';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createRole } from '../../../store/actions';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card,FormGroup, CardBody, Col, Container, Button,Form, Input, Label, Row , FormFeedback  } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeaderMain';
import {CustomStyles} from "../../Forms/FormValidation/FormValidationCode";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'


const RoleAdd = (props) => {

    const dispatch = useDispatch();
    
    const ref = useRef(null);
   
    const validation = useFormik({
        
        enableReinitialize: true,

        initialValues: {
            name: "",
            description: "",
            
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Your First Name"),
            description: Yup.string().required("Please Enter Roles Description"),
        }),
        
        onSubmit: (values) => {

            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();
            
            dispatch(createRole(values,  props.history))

        },
    });
    

    const {errorRole}  =  useSelector( state => ({
        errorRole: (state.Role.errorRole ? state.Role.errorRole : {}),
    }));

    useEffect(() => {
        
        errorRole.name= "";
        errorRole.description= "";
        
        
    }, []);
    
    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
   
    useEffect(() => {

        if(errorRole){
            if((errorRole.name) || (errorRole.description) ){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify("Role Creation Failed !");
            }
        }
    }, [errorRole]);

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Create Role</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Create Role" pageTitle="Roles" link="/role-List"/>
                    <Row>
                        <Col lg={12}>
                        <Card>
                            <PreviewCardHeader title="Create Role" />
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
                                                <Label htmlFor="name">Name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                name="name"
                                                placeholder="Role Name"
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.name || ""}
                                                invalid={
                                                    (validation.touched.name && validation.errors.name) || errorRole.name
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {
                                                (validation.touched.name && validation.errors.name )|| errorRole.name ? (
                                                <FormFeedback type="invalid">
                                                    {errorRole.name ? errorRole.name: validation.errors.name}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="description">Description<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                name="description"
                                                placeholder="Role Description"
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.description || ""}
                                                invalid={
                                                    (validation.touched.description && validation.errors.description) || errorRole.description
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {
                                                (validation.touched.description && validation.errors.description)|| errorRole.description ? (
                                                <FormFeedback type="invalid">
                                                    {errorRole.description ? errorRole.description: validation.errors.description}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                            </Col>
                                        </Row>
                                        
                                        <Button id="submit" color="primary" type="submit" className='submit-btn w-md'>
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
                    <ToastContainer />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default RoleAdd;