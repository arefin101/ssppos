import React, { useEffect, useState, useRef } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import MetaTags from 'react-meta-tags';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeaderMain';
import Select from 'react-select';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Card,FormGroup, CardBody, Col, Container, Button,Form, Input, Label, Row , FormFeedback  } from 'reactstrap';
import { CustomStyles} from "../../Forms/FormValidation/FormValidationCode";
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { createCustomerCredit, getAddCustomerCreditView, getAvailableCustomerCredit } from '../../../store/actions';
import LoadingBar from 'react-top-loading-bar';



const AddCustomerCredit = (props) => {

    const ref = useRef(null);

    const dispatch = useDispatch();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerCredit, setCustomerCredit] = useState(null);
    let allCustomers = [];

    const { customers, availableCredit } = useSelector(state => ({
        customers: state.Payment.customerCreditView,
        availableCredit: state.Payment.availableCredit,
    }));

    if(customers.customers){
        allCustomers = customers.customers?.map(item => {
            return {value:item.id, label:`${item.first_name} ${item.last_name}`}
        });
    }

    useEffect(() => {
        dispatch( getAddCustomerCreditView(props.history) );
    }, []);


    
    const validation = useFormik({
        
        enableReinitialize: true,

        initialValues: {
            customer_id: "",
            amount: "",
            note: "",
        },
        validationSchema: Yup.object({
            amount: Yup.string().required("Please Enter Amount"),
            customer_id: Yup.string().required("Please select Customer"),
        }),
        onSubmit: (values, {resetForm}) => {
            let id = values.customer_id;
            let alteredValues = {
                amount: values.amount,
                note: values.note,
            };

            document.getElementById("submit").disabled = true;
            ref.current.continuousStart();

            dispatch(createCustomerCredit(id, alteredValues, props.history));

            resetForm({ values: '' });
            setSelectedCustomer(null);
            error.customer_id = "";
            ref.current.complete();
        },
    });

    

    useEffect(() => {
        let customerId = selectedCustomer ? selectedCustomer.value : "";
        dispatch( getAvailableCustomerCredit(customerId, props.history) );

        if(selectedCustomer !== null){
            error.customer_id = "";
            validation.setFieldValue("customer_id", selectedCustomer.value);
        }else{
            error.customer_id = "Please select Customer";
            validation.setFieldValue("customer_id", "");
        }
    }, [selectedCustomer]);
    
    useEffect(() => {
        setCustomerCredit(availableCredit.available_credit);
    }, [availableCredit.available_credit]);



    const { error }  =  useSelector( state => ({
        error: state.Payment.error ? state.Payment.error : {},
    }));

    useEffect(() => {
        error.customer_id = ""
        error.amount = "";
        error.note = "";
    }, []);

    const errornotify = (message) => toast(message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    useEffect(() => {
        if(error){
            if( (error.amount) || (error.note) ){
                errornotify("Customer Credit Creation Failed !");
                ref.current.complete();
                document.getElementById("submit").disabled = false;

            }
        }
    }, [error]);

    
    
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    if(localStorage.getItem('addCustomerCredit')) {
        successnotify("Customer Credit Added Successfully !");
        localStorage.removeItem('addCustomerCredit');
        document.getElementById("submit").disabled = false;
        ref.current.complete();
    }


    
    const customStyles = {
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ?
            '#ddd' : '#ff5500',
        })
    }


    
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Add Customer Credit</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Add Customer Credit" pageTitle="Money Transactions" link="/money-transactions"/>
                    <Row>
                        <Col lg={12}>
                        <Card>
                            <PreviewCardHeader title="Add Customer Credit" />
                            <CardBody>
                            
                                <div className="live-preview">
                                    <Form
                                        className="needs-validation"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}>
                                        <Row>
                                            <Col md="6">
                                                <Row>
                                                    <Col md="12">
                                                        <div className="mb-3">
                                                            <Label htmlFor="validationCustomerName">Customer Name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                            <Select
                                                                isClearable={true}
                                                                value={selectedCustomer}
                                                                onChange={setSelectedCustomer}
                                                                options={allCustomers}
                                                                styles={
                                                                    (validation.touched.customer_id &&
                                                                    validation.errors.customer_id) || error.customer_id
                                                                    ? customStyles
                                                                    : false
                                                                }
                                                            />
                                                            {(validation.touched.customer_id &&
                                                            validation.errors.customer_id) || error.customer_id ? (
                                                                <div className="text-danger">
                                                                    {error.customer_id ? error.customer_id : validation.errors.customer_id}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col md="12">
                                                        <FormGroup className="mb-3">
                                                            <Label htmlFor="amount">Amount ($)<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                            <Input
                                                            name="amount"
                                                            placeholder="Amount($)"
                                                            type="number"
                                                            className="form-control"
                                                            id="amount"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.amount || ""}
                                                            invalid={
                                                                (validation.touched.amount && validation.errors.amount) || error.amount
                                                                ? true
                                                                : false
                                                            }
                                                            />
                                                            {
                                                            (validation.touched.amount && validation.errors.amount )|| error.amount ? (
                                                            <FormFeedback type="invalid">
                                                                {error.amount ? error.amount: validation.errors.amount}
                                                            </FormFeedback>
                                                            ) : null}
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="12">
                                                        <FormGroup className="mb-3">
                                                            <Label htmlFor="note">Note</Label>
                                                            <Input
                                                            name="note"
                                                            placeholder="Note"
                                                            type="text"
                                                            className="form-control"
                                                            id="note"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.note || ""}
                                                            invalid={
                                                                (validation.touched.note && validation.errors.note) || error.note
                                                                ? true
                                                                : false
                                                            }
                                                            />
                                                            {
                                                            (validation.touched.note && validation.errors.note)|| error.note ? (
                                                            <FormFeedback type="invalid">
                                                                {error.note ? error.note: validation.errors.note}
                                                            </FormFeedback>
                                                            ) : null}
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md="6" xxl="3">
                                                {
                                                    customerCredit &&
                                                    <div className='amount bg-light'>
                                                        <Label>Available Credit</Label>
                                                        <div className="fs-16"> $ {customerCredit} </div>
                                                    </div>
                                                }
                                            </Col>
                                        </Row>
                                        
                                        <Button id='submit' color="primary" type="submit" className='submit-btn w-md'>
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

export default AddCustomerCredit

