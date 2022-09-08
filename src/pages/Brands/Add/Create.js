import React, {useEffect, useRef} from 'react';
import MetaTags from "react-meta-tags";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardHeader,FormGroup, CardBody, Col, Container, Button,Form, Input, Label, Row , FormFeedback } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrand } from '../../../store/actions';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'



const BrandCreate = (props) => {

    const ref = useRef(null);

    const dispatch = useDispatch();

    const history = useHistory();

    const validation = useFormik({

        enableReinitialize: true,

        initialValues: {
            name: "",
            image: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Your Brand Name"),
            image:Yup.mixed().required("Please upload an image"),
        }),

        onSubmit: (values) => {

            const formData = new FormData()

            let name = values.name.toUpperCase();

            formData.append('name', name);
            formData.append('image', values.image);

            document.getElementById("submit").disabled = true;
            ref.current.continuousStart();
            dispatch(createBrand(formData, props.history));

        },

    });

    let {errorBrand}  =  useSelector( state => ({
        errorBrand: (state.productBrand.errorBrand ? state.productBrand.errorBrand : {}),
    }));

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    useEffect(() => {
        errorBrand.name= "";
        errorBrand.image= "";
    }, []);
    
    useEffect(() => {
        
        if(errorBrand){
            if( errorBrand.name || errorBrand.image ){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify("Brand Creation Failed !");
            }
        }

    }, [errorBrand]);

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
                    <title>Add Brand</title>
                </MetaTags>
                <Container fluid>
                    
                    <BreadCrumb title="Add Brand" pageTitle="Brands" link="/brand-list"/>
                    <Row>
                        <Col xxl={12}>
                            <Card >
                                <CardHeader className="d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Add Brand</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="live-preview">
                                        <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                            <Row>

                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="Nameinput" className="form-label">Brand Name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="name"
                                                            placeholder="Enter your brand name"
                                                            type="text"
                                                            className="form-control"
                                                            id="validationBrand_name"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.name || ""}
                                                            invalid={
                                                                (validation.touched.name && validation.errors.name) || errorBrand.name
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                       {
                                                    (validation.touched.name && validation.errors.name )|| errorBrand.name ? (
                                                        <FormFeedback type="invalid">
                                                            {errorBrand.name ? errorBrand.name: validation.errors.name}
                                                        </FormFeedback>
                                                    ) : null}
                                                    </div>
                                                </Col>

                                                <Col md="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationImage">Image<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="image"
                                                            placeholder="Upload Image"
                                                            type="file"
                                                            className="form-control"
                                                            id="validationImage"
                                                            aria-label="file example"
                                                            onChange={(e)=> validation.setFieldValue('image', e.target.files[0])}
                                                            onBlur={validation.handleBlur}
                                                            
                                                            invalid={
                                                                (validation.touched.image &&
                                                                validation.errors.image) || errorBrand.image
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errorBrand.image ? errorBrand.image : validation.errors.image}
                                                        </div>
                                                    </FormGroup>
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
                                        <pre className="language-markup" style={{ "height": "375px" }}>
                                            <code>
                                                <FormGrid />
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

export default BrandCreate;