import React, { useEffect, useState, useRef } from 'react'
import BreadCrumb from './../../../../Components/Common/BreadCrumb';
import PreviewCardHeaderMain from './../../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import { MetaTags } from 'react-meta-tags';
import { Container, CardBody, Card, Row, Col, Label, FormGroup, Input, FormFeedback, Form, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { makePaymentView, createSalePayment } from './../../../../store/payment/action';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';



const AddSalePayment = ( props ) => {

    let saleInvoice = props.location.state?props.location.state.invoiceNo:"(Nothing found)";

    let due = props.location.state?props.location.state.due:"(No due)";

    let transactionId = props.location.state?props.location.state.id:null;

    const ref = useRef(null);

    const dispatch = useDispatch();

    const history = useHistory();

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [formValues, setFormValues] = useState({});

    let allPaymentMethods = [];

    // DATE PROCCESSING
    let [date, setDate] = useState(new Date());
    let d = new Date(Date.parse(date));
    date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    
    const customStyles = {
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ?
            '#ddd' : "#ff5500",
        })
    }
    

    
    // MODAL
    const [modal, setModal] = useState(false);
    function tog_center() {
        setModal(!modal);
    }
    const modalSubmit = () => {
        document.getElementById("yes").disabled = true;
        ref.current.continuousStart();
        dispatch(createSalePayment(formValues, history));
    }



    const validation = useFormik({

        enableReinitialize: true.valueOf,

        initialValues: {
            money_transaction_type: "sale",
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
        });
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
        error: state.Payment.createSalePaymentError ? state.Payment.createSalePaymentError : {}
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
                errornotify("Sale Payment Failed !")
            }
        }

    }, [error]);

    return (
        
        <React.Fragment>
            <div className='page-content'>
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Make Sale Payment</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Make Payment" pageTitle="Money Transactions" link="/money-transactions" pageTitle2="Sale Invoice list" link2="/sale-payment-list"/>
                    <Card>
                        <PreviewCardHeaderMain title={"Payment For "+saleInvoice}/>
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
                                    <Link to="/sale-payment-list" color="danger" className="btn btn-ghost-danger submit-btn ms-3">Cancel</Link>
                                    
                                    <Modal
                                        isOpen={modal}
                                        toggle={() => {
                                            tog_center();
                                        }}
                                        centered
                                    >
                                        <ModalHeader className="modal-title" />

                                        <ModalBody className="text-center p-4">
                                            <h5 className="mb-3">Are you sure you want to make this <br /> sale payment ?</h5>
                                            <div className="hstack gap-2 justify-content-center mt-4">
                                                <Button id="yes" to="#" className="btn btn-primary me-2" color="primary" onClick={() => modalSubmit()}>Yes</Button>
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

export default AddSalePayment