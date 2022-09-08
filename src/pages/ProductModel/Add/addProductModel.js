import React, {useEffect, useState, useRef} from 'react';
import MetaTags from 'react-meta-tags';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card,CardHeader, CardBody, Col, Container, Button,Form, Input, Label, Row , FormFeedback } from 'reactstrap';
import {CustomStyles} from "../../Forms/FormValidation/FormValidationCode";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { createProductModel } from '../../../store/actions';
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css'; 
import { useHistory } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const ProductModelAdd = () => {

    const ref = useRef(null);

    const dispatch = useDispatch();

    const history = useHistory();

    const validation = useFormik({

        enableReinitialize: true,

        initialValues: {
            name: "",
        },
        
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Product Model Name"),
        }),

        onSubmit: (values) => {
            document.getElementById("submit").disabled = true;
            ref.current.continuousStart();
            dispatch(createProductModel(values ,  history))
        },
    });

    const {error}  =  useSelector( state => ({
        error: (state.productModels.error ? state.productModels.error : {}),

    }));

    useEffect(() => { 
        error.name= "";
    }, []);

    const errornotify = () => toast("Model Creation Failed !", { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    useEffect(() => {
        if(error){
            if((error.name)){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify();
            }
        }
    }, [error]);


    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }
    return (
        <React.Fragment>
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Add Model</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Add Model" pageTitle="Models" link="/models"/>
                    <Row>
                        <Col lg={12}>
                        <Card>
                            <CardHeader className="d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Add Model</h4>
                            </CardHeader>
                            <CardBody>
                            
                                <div className="live-preview">
                                    <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                        <Row>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="Nameinput" className="form-label">Model Name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                    <Input
                                                        name="name"
                                                        placeholder="Enter your model name"
                                                        type="text"
                                                        className="form-control"
                                                        id="validationBrand_name"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.name || ""}
                                                        invalid={
                                                            (validation.touched.name && validation.errors.name) || error.name
                                                            ? true
                                                            : false
                                                        }
                                                    />
                                                    {
                                                (validation.touched.name && validation.errors.name )|| error.name ? (
                                                <FormFeedback type="invalid">
                                                    {error.name ? error.name: validation.errors.name}
                                                </FormFeedback>
                                                ) : null}
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Button id="submit" color="primary" type="submit" className='submit-btn w-md'>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
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

export default ProductModelAdd;