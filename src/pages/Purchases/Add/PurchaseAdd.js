import React, { useEffect, useState, useRef } from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import PreviewCardHeaderMain from '../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createPurchase, getStorePurchaseView } from '../../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import LoadingBar from 'react-top-loading-bar'

const purchaseStatus = [
    { value: 'Received', label: 'Received' },
    { value: 'Pending', label: 'Pending' },
];

const ChargerAdd = (props) => {

    const ref = useRef(null);

    const dispatch = useDispatch();
    
    const [selectedStatus, setSelectedStatus] = useState(null);

    const [selectedSupplier, setSelectedSupplier] = useState(null);

    let [date, setDate] = useState(new Date());
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
            return {value:item.id, label:`${item.business_name} (${item.first_name} ${item.last_name})`}
        });
    }
    
    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
            purchase_status: "",
            supplier_id: "",
            transaction_date: "",
            invoice_from_supplier: "",
            note_from_supplier: "",
        },

        validationSchema: Yup.object({
            purchase_status: Yup.string().required("Please enter purchase status"),
            supplier_id: Yup.string().required("Please select a suppplier"),
            transaction_date: Yup.date().required("Please set a date").typeError("Please set a date"),
        }),

        onSubmit: (values) => {
            const formData = new FormData();

            formData.append('purchase_status', values.purchase_status);
            formData.append('supplier_id', values.supplier_id); 
            formData.append('transaction_date', values.transaction_date);
            formData.append('invoice_from_supplier', values.invoice_from_supplier);
            formData.append('note_from_supplier', values.note_from_supplier);

            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();
            
            dispatch(createPurchase(formData, props.history));

        },

    });

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }
    
    
    const { error } = useSelector(state => ({
        error: state.Purchase.error ? state.Purchase.error : {},
    }));
    
    useEffect(() => {

        if(selectedStatus !== null){
            if(error){
                if(error.purchase_status){
                    error.purchase_status = "";
                }
            }
            validation.setFieldValue("purchase_status", (selectedStatus.value?selectedStatus.value:"") );
        }else{
            if(error){
                if(error.purchase_status){
                    error.purchase_status = "Please select the purchase status !";
                }
            }
            validation.setFieldValue("purchase_status", "");
        }

    }, [selectedStatus]);

    useEffect(() => {

        if(selectedSupplier !== null){
            if(error){
                if(error.supplier_id){
                    error.supplier_id = "";
                }
            }
            validation.setFieldValue("supplier_id", (selectedSupplier.value?selectedSupplier.value:""));
        }else{
            if(error){
                if(error.supplier_id){
                    error.supplier_id = "Please select the suppliers !";
                }
            }
            validation.setFieldValue("supplier_id", "");
        }

    }, [selectedSupplier]);

    useEffect(() => {

        if(date !== "NaN-NaN-NaN"){
            if(error){
                if(error.transaction_date){
                    error.transaction_date = "";
                }
            }
            validation.setFieldValue("transaction_date", date);
        }else{
            if(error){
                if(error.transaction_date){
                    error.transaction_date = "Please set a date !";
                }
            }
            validation.setFieldValue("transaction_date", "");
        }

    }, [date]);

    useEffect(() => {
        
        if(error){
            if(error.purchase_status){
                error.purchase_status = "";
            }
            if(error.supplier_id){
                error.supplier_id = "";
            }
            if(error.transaction_date){
                error.transaction_date = "";
            }
            if(error.invoice_from_supplier){
                error.invoice_from_supplier = "";
            }
            if(error.note_from_supplier){
                error.note_from_supplier = "";
            }
        }

    }, []);

    useEffect(() => {

        if(error){

            if( 
                error.purchase_status  ||
                error.supplier_id  ||
                error.transaction_date  ||
                error.invoice_from_supplier  ||
                error.note_from_supplier
            ){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
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
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Create Purchase</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Create Purchase" pageTitle="Purchase List" link="/purchase-list"/>
                        <Card >
                            <PreviewCardHeaderMain title="Create Purchase" />
                            <CardBody>
                                <div className="live-preview">
                                    <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                        <Row>

                                            <Col md="6" xxl="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="validationStatus">Purchase Status<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                    <Select
                                                        isClearable={true}
                                                        value={selectedStatus}
                                                        onChange={setSelectedStatus}
                                                        options={purchaseStatus}
                                                        styles={
                                                            ((validation.touched.purchase_status &&
                                                            validation.errors.purchase_status) 
                                                            || (error?error.purchase_status?error.purchase_status:false:false))
                                                            ? customStyles
                                                            : false
                                                        }
                                                    />
                                                    {((validation.touched.purchase_status && 
                                                    validation.errors.purchase_status) 
                                                    || (error?error.purchase_status?error.purchase_status:false:false))
                                                    ? (
                                                        <div className="text-danger">
                                                            {error?error.purchase_status ? error.purchase_status : validation.errors.purchase_status : validation.errors.purchase_status}
                                                        </div>
                                                    ) 
                                                    : null}
                                                </div>
                                            </Col>

                                            <Col md="6" xxl="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="validationSupplierName">Supplier Name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                    <Select
                                                        isClearable={true}
                                                        value={selectedSupplier}
                                                        onChange={setSelectedSupplier}
                                                        options={allSuppliers}
                                                        styles={
                                                            ((validation.touched.supplier_id && validation.errors.supplier_id) || 
                                                                (error?error.supplier_id?error.supplier_id:false:false))
                                                            ? customStyles
                                                            : false
                                                        }
                                                    />
                                                    {((validation.touched.supplier_id && validation.errors.supplier_id) || 
                                                        (error?error.supplier_id?error.supplier_id:false:false))
                                                    ? (
                                                        <div className="text-danger">
                                                            {error?error.supplier_id ? error.supplier_id : validation.errors.supplier_id : validation.errors.supplier_id}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </Col>

                                            <Col md="6" xxl="4" >
                                                <div className="mb-3">
                                                    <Label htmlFor="validationSupplierName">Date<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                    <Flatpickr
                                                        className={`form-control ${(validation.errors.transaction_date && validation.touched.transaction_date) || error?error.transaction_date ? 'border-danger' : '' : ''}`}
                                                        name="transaction_date"
                                                        options={{
                                                            dateFormat: "m/d/Y",
                                                            defaultDate:new Date()
                                                        }}
                                                        onChange={setDate}
                                                    />
                                                    {(validation.touched.transaction_date && validation.errors.transaction_date) || 
                                                        (error?error.transaction_date?error.transaction_date:false:false) ? (
                                                        <div className="text-danger">
                                                            {error?error.transaction_date ? error.transaction_date : validation.errors.transaction_date:validation.errors.transaction_date}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="invoice_from_supplier">Invoice From Supplier</Label>
                                                    <Input
                                                        type="file"
                                                        className="form-control"
                                                        id="invoice_from_supplier"
                                                        onChange={(e)=> validation.setFieldValue('invoice_from_supplier', e.target.files[0])}
                                                        invalid={
                                                            error? error.invoice_from_supplier
                                                            ? true
                                                            : false
                                                            : false
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {error ? error.invoice_from_supplier ? error.invoice_from_supplier : "" : ""}
                                                    </div>
                                                </FormGroup>
                                            </Col>

                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="note_from_supplier">Supplier's Note</Label>
                                                    <Input
                                                        name="note_from_supplier"
                                                        placeholder="Enter a note"
                                                        type="text"
                                                        className="form-control"
                                                        id="note_from_supplier"
                                                        onChange={validation.handleChange}
                                                        value={validation.values.note_from_supplier || ""}
                                                        invalid={
                                                            error? error.note_from_supplier
                                                            ? true
                                                            : false
                                                            : false
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {error ? error.note_from_supplier ? error.note_from_supplier : "" : ""}
                                                    </div>
                                                </FormGroup>
                                            </Col>


                                        </Row>
                                        <Button id="submit" color="primary" type="submit" className='submit-btn w-md'>
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
