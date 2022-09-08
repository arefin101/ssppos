import React, {useEffect, useRef} from 'react';
import UiContent from "../../../Components/Common/UiContent";
import MetaTags from 'react-meta-tags';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card,FormGroup, CardBody, Col, Container, Button,Form, Input, Label, Row , FormFeedback } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeaderMain';
import {CustomStyles} from "../../Forms/FormValidation/FormValidationCode";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { createExpenseCategory } from '../../../store/actions';
import { toast, ToastContainer } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'




const ExpenseCategoryAdd = (props) => {

    const ref = useRef(null);

    const dispatch = useDispatch();
    
    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            name: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Expense Category Name"),
        }),

        onSubmit: (values) => {
            document.getElementById("submit").disabled = true;
            ref.current.continuousStart();
            dispatch(createExpenseCategory(values, props.history));
        },
    });

    const {error}  =  useSelector( state => ({
        error: state.ExpenseCategory.error ? state.ExpenseCategory.error : {},
    }));

    useEffect(() => {
        error.name= "";
    }, []);

    
    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
    useEffect(() => {
        if(error){
            if((error.name)){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify("Expense Category Creation Failed !");
            }
        }
    }, [error]);

    
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Expense Categories</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Add Expense Category" pageTitle="Expense Categories" link="/expense-categories"/>
                    <Row>
                        <Col lg={12}>
                        <Card>
                            <PreviewCardHeader title="Add Expense Category" />
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
                                                placeholder="Name"
                                                type="text"
                                                className="form-control"
                                                id="name"
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
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ExpenseCategoryAdd;