import React, { useEffect, useState, useRef } from 'react'
import { MetaTags } from 'react-meta-tags';
import { Container, CardBody, Card, Row, Col, Label, FormGroup, Input, FormFeedback, Form, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import BreadCrumb from './../../../../Components/Common/BreadCrumb';
import PreviewCardHeaderMain from './../../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { makePaymentView, createPurchasePayment } from './../../../../store/payment/action';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';


const AddPurchasePayment = ( props ) => {

    let refNo = props.location.state ? props.location.state.refNo : "--";
    let due = props.location.state ? props.location.state.due : 0;
    let transactionId = props.match.params.id;
    let allPaymentMethods = [];

    const ref = useRef(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [formValues, setFormValues] = useState({});

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });



    // DATE PROCCESSING
    let [date, setDate] = useState(new Date());
    let d = new Date(Date.parse(date));
    date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    
    
    // MODAL
    const [modal, setModal] = useState(false);
    function tog_center() {
        setModal(!modal);
    }
    const modalSubmit = () => {
        document.getElementById("yes").disabled = true;
        ref.current.continuousStart();
        dispatch(createPurchasePayment(formValues, history));
    }



    const validation = useFormik({

        enableReinitialize: true.valueOf,

        initialValues: {
            money_transaction_type: "purchase",
            transaction_id: transactionId,
            amount: "",
            payment_date: "",
            payment_method_id: "",
            payment_note: ""
        },

        validationSchema: Yup.object({
            amount: Yup.string().required("Please enter amount"),
            payment_date: Yup.date().required("Please set a date").typeError("Please set a date"),
            payment_method_id: Yup.string().required("Please enter payment method"),
        }),

        onSubmit: (values) => {
            tog_center();
            setFormValues(values);
        }

    });

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }



    const { makePaymentViewResponse } =  useSelector( state => ({
        makePaymentViewResponse: state.Payment.makePaymentView
    }));

    if(makePaymentViewResponse.payment_methods) {
        allPaymentMethods = makePaymentViewResponse.payment_methods.map(item => {
            return { value:item.id, label: item.name }
        }).filter(item => item.value !== 1);
    }

    useEffect(()=> {
        dispatch(makePaymentView(history));
    }, []);



    useEffect(() => {
        if(date !== "NaN-NaN-NaN"){
            error.payment_date = "";
            validation.setFieldValue("payment_date", date);
        }else{
            error.payment_date = "Please set a date !";
            validation.setFieldValue("payment_date", "");
        }
    }, [date]);

    useEffect(() => {
        if(selectedPaymentMethod !== null){
            error.payment_method_id = "";
            validation.setFieldValue("payment_method_id", selectedPaymentMethod.value);
        }else{
            error.payment_method_id = "Please select a payment method !";
            validation.setFieldValue("payment_method_id", "");
        }
    }, [selectedPaymentMethod]);


    const { error } =  useSelector( state => ({
        error: state.Payment.purchasePaymentError ? state.Payment.purchasePaymentError : {}
    }));


    useEffect(() => {
        error.amount= "";
        error.payment_date= "";
        error.payment_method_id= "";
    }, []);

    useEffect(() => {
        if(error){
            setModal(false);
            if( 
                error.amount ||
                error.payment_date ||
                error.payment_method_id
            ){
                ref.current.complete();
                errornotify("Purchase Payment Failed !")
            }
        }
    }, [error]);

    const customStyles = {
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ?
            '#ddd' : '#ff5500',
        })
    }



    return (
        
        <React.Fragment>
            <div className='page-content'>
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Make Purchase Payment</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Make Payment" pageTitle="Money Transactions" link="/money-transactions" pageTitle2="Purchase Invoice list" link2="/purchase-payment-list"/>
                    <Card>
                        <PreviewCardHeaderMain title={"Payment For "+ refNo}/>
                        <CardBody>
                            <div className="live-preview">
                                <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label>Amount<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span> <span className='text-muted'>({"Due: $"+due})</span></Label>
                                                <Input 
                                                    type="text"
                                                    className='form-control'
                                                    placeholder='Enter amount'
                                                    name='amount'
                                                    onChange={validation.handleChange}
                                                    invalid={
                                                        ((validation.touched.amount && validation.errors.amount) || error.amount)
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                { ((validation.touched.amount && validation.errors.amount) || error.amount) ? (
                                                    <FormFeedback className="text-danger">
                                                        {error.amount ? error.amount : validation.errors.amount}
                                                    </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <div className='mb-3'>
                                                <Label>Payment Date<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Flatpickr
                                                    className={`form-control ${(validation.errors.payment_date && validation.touched.payment_date) || error.payment_date ? 'border-danger' : ''}`}
                                                    id='payment_date'
                                                    options={{ 
                                                        defaultDate:new Date(),
                                                        dateFormat: "m/d/Y"
                                                     }}
                                                     onChange={setDate}
                                                />
                                                { ((validation.touched.payment_date && validation.errors.payment_date) || error.payment_date) ? (
                                                    <div className="text-danger">
                                                        {error.payment_date ? error.payment_date : validation.errors.payment_date}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-3">
                                                <Label>Payment Method<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Select
                                                    isClearable={true}
                                                    value={selectedPaymentMethod}
                                                    onChange={setSelectedPaymentMethod}
                                                    options={allPaymentMethods}
                                                    styles={
                                                        (validation.touched.payment_method_id &&
                                                        validation.errors.payment_method_id) || error.payment_method_id
                                                        ? customStyles
                                                        : false
                                                    }
                                                />
                                                { ((validation.touched.payment_method_id && validation.errors.payment_method_id) || error.payment_method_id) ? (
                                                    <div className="text-danger">
                                                        {error.payment_method_id ? error.payment_method_id : validation.errors.payment_method_id}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label>Payment Note</Label>
                                                <Input 
                                                    type="text"
                                                    className='form-control'
                                                    placeholder='Enter payment note'
                                                    id='payment_note'
                                                    onChange={validation.handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button color="primary" type="submit" className='submit-btn w-md'>
                                        Submit
                                    </Button>
                                    <Link to="/purchase-payment-list" color="danger" className="btn btn-ghost-danger submit-btn ms-3">Cancel</Link>
                                    
                                    <Modal
                                        isOpen={modal}
                                        toggle={() => {
                                            tog_center();
                                        }}
                                        centered
                                    >
                                        <ModalHeader className="modal-title" />

                                        <ModalBody className="text-center p-4">
                                            <h5 className="mb-3">Are you sure you want to make this <br /> purchase payment ?</h5>
                                            <div className="hstack gap-2 justify-content-center mt-4">
                                                <Button id='yes' to="#" className="btn btn-primary me-2" color="primary" onClick={() => modalSubmit()}>Yes</Button>
                                                <Button color="danger" onClick={() => setModal(false)}>No</Button>
                                            </div>
                                        </ModalBody>
                                    </Modal>
                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                    <ToastContainer />
                </Container>
            </div>
        </React.Fragment>

    )

}

export default AddPurchasePayment