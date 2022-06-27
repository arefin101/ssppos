import React from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import PreviewCardHeaderMain from '../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createPurchase, getStorePurchaseView } from '../../../store/actions';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';


const purchaseStatus = [
    { value: 'Received', label: 'Received' },
    { value: 'Pending', label: 'Pending' },
];

const ChargerAdd = (props) => {

    const dispatch = useDispatch();
    
    const [selectedStatus, setSelectedStatus] = useState(null);

    const [selectedSupplier, setSelectedSupplier] = useState(null);

    let [date, setDate] = useState(null);
    let d = new Date(Date.parse(date));
    date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
    
    let allSuppliers = [];

    

    useEffect(() => {  
        dispatch( getStorePurchaseView(props.history) );
    }, []);

    const { response } =  useSelector( state => ({
        response: state.Purchase.supplier.suppliers
    }));

    if(response){
        allSuppliers = response?.map(item => {
            return {value:item.id, label:`${item.first_name} ${item.last_name}`}
        });
    }
    
    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
            reference_no: "",
            purchase_status: "",
            supplier_id: "",
            transaction_date: "",
        },

        validationSchema: Yup.object({
            reference_no: Yup.string().required("Please enter reference no"),
            purchase_status: Yup.string().required("Please enter purchase status"),
            supplier_id: Yup.string().required("Please select a suppplier"),
            transaction_date: Yup.date().required("Please set a date").typeError("Please set a date"),
        }),

        onSubmit: (values) => {

            dispatch(createPurchase(values, props.history));

        },

    });

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }
    
    
    const { error } = useSelector(state => ({
        error: state.Purchase.error,
    }));
    
    useEffect(() => {

        if(selectedStatus !== null){
            error.purchase_status = "";
            validation.setFieldValue("purchase_status", selectedStatus.value);
        }else{
            error.purchase_status = "Please select the purchase status !";
            validation.setFieldValue("purchase_status", "");
        }

    }, [selectedStatus]);

    useEffect(() => {

        if(selectedSupplier !== null){
            error.supplier_id = "";
            validation.setFieldValue("supplier_id", selectedSupplier.value);
        }else{
            error.supplier_id = "Please select the suppliers !";
            validation.setFieldValue("supplier_id", "");
        }

    }, [selectedSupplier]);

    useEffect(() => {

        if(date !== "NaN-NaN-NaN"){
            error.transaction_date = "";
            validation.setFieldValue("transaction_date", date);
        }else{
            error.transaction_date = "Please select the suppliers !";
            validation.setFieldValue("transaction_date", "");
        }

    }, [date]);

    useEffect(() => {
        
        error.reference_no= "";
        error.purchase_status= "";
        error.supplier_id= "";
        error.transaction_date= "";

    }, []);

    useEffect(() => {

        if(error){

            if( 
                error.reference_no !== "" ||
                error.purchase_status !== "" ||
                error.supplier_id !== "" ||
                error.transaction_date !== "" 
            ){
                errornotify("Purchase Creation Failed !")
            }
        }

    }, [error]);

    
    const customStyles = {
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ?
            '#ddd' : 'red',
        })
    }



    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Create Purchase</title>
                </MetaTags>
                <Container fluid>
                    
                    <BreadCrumb title="Create Purchase" pageTitle="Purchase List" link="/purchase-list"/>
                    {/* <Row>
                        <Col> */}
                            <Card >
                                <PreviewCardHeaderMain title="Create Purchase" />
                                <CardBody>
                                    <div className="live-preview">
                                        <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                            <Row>

                                                <Col md="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationreference_no">Reference No<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="reference_no"
                                                            placeholder="Enter reference no"
                                                            type="text"
                                                            className="form-control"
                                                            id="validationreference_no"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.reference_no || ""}
                                                            invalid={
                                                                (validation.touched.reference_no &&
                                                                validation.errors.reference_no) || error.reference_no
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.reference_no &&
                                                        validation.errors.reference_no) || error.reference_no ? (
                                                        <FormFeedback type="invalid">
                                                            {error.reference_no ? error.reference_no : validation.errors.reference_no}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>

                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="validationStatus">Purchase Status<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedStatus}
                                                            onChange={setSelectedStatus}
                                                            options={purchaseStatus}
                                                            styles={
                                                                (validation.touched.purchase_status &&
                                                                validation.errors.purchase_status) || error.purchase_status
                                                                ? customStyles
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.purchase_status &&
                                                        validation.errors.purchase_status) || error.purchase_status ? (
                                                            <div className="text-danger">
                                                                {error.purchase_status ? error.purchase_status : validation.errors.purchase_status}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="validationSupplierName">Supplier Name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedSupplier}
                                                            onChange={setSelectedSupplier}
                                                            options={allSuppliers}
                                                            styles={
                                                                (validation.touched.supplier_id &&
                                                                validation.errors.supplier_id) || error.supplier_id
                                                                ? customStyles
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.supplier_id &&
                                                        validation.errors.supplier_id) || error.supplier_id ? (
                                                            <div className="text-danger">
                                                                {error.supplier_id ? error.supplier_id : validation.errors.supplier_id}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col md="6" >
                                                    <div className="mb-3">
                                                        <Label htmlFor="validationSupplierName">Date<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Flatpickr
                                                            className={`form-control ${(validation.errors.transaction_date && validation.touched.transaction_date) || error.transaction_date ? 'border-red' : ''}`}
                                                            name="transaction_date"
                                                            options={{
                                                                dateFormat: "d/m/Y",
                                                            }}
                                                            onChange={setDate}
                                                        />
                                                        {(validation.touched.transaction_date &&
                                                        validation.errors.transaction_date) || error.transaction_date ? (
                                                            <div className="text-danger">
                                                                {error.transaction_date ? error.transaction_date : validation.errors.transaction_date}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                            </Row>
                                            <Button color="primary" type="submit" className='submit-btn w-md'>
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

export default ChargerAdd;
