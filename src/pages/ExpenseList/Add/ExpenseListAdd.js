import React, { useEffect, useState, useRef } from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import PreviewCardHeaderMain from '../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createExpense, getExpenseView } from '../../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import LoadingBar from 'react-top-loading-bar'



const ExpenseListAdd = (props) => {
    // const [ expenseReference, setExpenseReference ] = useState(null);
    const [ expenseCategory, setExpenseCategory ] = useState(null);
    const [ expenseFor, setExpenseFor ] = useState(null);

    const ref = useRef(null);
    
    let expenseViewData = [];
    // let expenseReferenceList = [];
    let expenseCategoriesList = [];
    let expenseForList = [];
    
    let [date, setDate] = useState(new Date());
    let d = new Date(Date.parse(date));
    date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    const customStyles = {
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ? '#ddd' : 'red',
        })
    }
    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    const dispatch = useDispatch();

    const { response} = useSelector( state => ({
        response: state.ExpenseList.response
    }) );

    useEffect(() => {
        dispatch( getExpenseView(props.history) );
    }, []);

    if(response){
        expenseViewData = response;

        // expenseReferenceList = expenseViewData.expense_references?.map((item) => {
        //     return {value:item.id, label:item.name}
        // });

        expenseCategoriesList = expenseViewData.expense_categories?.map((item) => {
            return {value:item.id, label:item.name}
        });

        expenseForList = expenseViewData.expense_for?.map((item) => {
            return {value:item.id, label: item.first_name + " " + item.last_name}
        });
    }

    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
            // expense_reference_id: "",
            expense_category_id: "",
            amount: "",
            transaction_date: "",
            expense_for: null,
            expense_note: "",
        },

        validationSchema: Yup.object({
            // expense_reference_id: Yup.string().required("Please select expense reference"),
            expense_category_id: Yup.string().required("Please select expense catagory"),
            amount: Yup.string().required("Please enter amount"),
            transaction_date: Yup.string().required("Please select transaction date"),
            expense_note: Yup.string().required("Please enter expense note"),
        }),

        onSubmit: (values) => {
            document.getElementById("submit").disabled = true;
            ref.current.continuousStart();
            dispatch(createExpense(values, props.history));
        },

    });

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

    // useEffect(() => {
    //     if(expenseReference != null){
    //         error.expense_reference_id = "";
    //         validation.setFieldValue("expense_reference_id", expenseReference.value);
    //     }else{
    //         error.expense_reference_id = "Please select expense reference";
    //         validation.setFieldValue("expense_reference_id", "");
    //     }
    // }, [expenseReference]);

    useEffect(() => {
        if(expenseCategory != null){
            error.expense_category_id = "";
            validation.setFieldValue("expense_category_id", expenseCategory.value);
        }else{
            error.expense_category_id = "Please select expense catagory";
            validation.setFieldValue("expense_category_id", "");
        }
    }, [expenseCategory]);

    useEffect(() => {
        if(expenseFor != null){
            validation.setFieldValue("expense_for", expenseFor.value);
        }else{
            validation.setFieldValue("expense_for", "");
        }
    }, [expenseFor]);

    useEffect(() => {
        if(date != "NaN-NaN-NaN"){
            error.transaction_date = "";
            validation.setFieldValue("transaction_date", date);
        }else{
            error.transaction_date = "Please select transaction date";
            validation.setFieldValue("transaction_date", "");
        }
    }, [date]);

    

    const { error } = useSelector( state => ({
        error: state.ExpenseList.error ? state.ExpenseList.error : {},
    }) );

    useEffect(() => {
        // error.expense_reference_id= "";
        error.expense_category_id= "";
        error.expense_for = "" ;
        error.amount = "" ;
        error.expense_note = "" ;
        error.transaction_date = "";
    }, []);

    useEffect(() => {
        if(error){
            if( 
                // error.expense_reference_id != "" ||
                error.expense_category_id  ||
                error.expense_for  ||
                error.amount  ||
                error.expense_note  ||
                error.transaction_date  
            ){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify("Expense Creation Failed !");
            }
        }

    }, [error]);




    return (
        <React.Fragment>
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Add Expense List</title>
                </MetaTags>
                <Container fluid>
                    
                    <BreadCrumb title="Add Expense" pageTitle="Expense List" link="/expense-list"/>
                    <Card >
                        <PreviewCardHeaderMain title="Add Expense" />
                        <CardBody>
                            <div className="live-preview">
                                <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                    <Row>
                                        <Col md="6">
                                            <div className="mb-3">
                                                <Label htmlFor="validationProductModel">Expense Category<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                <Select
                                                    isClearable={true} 
                                                    value={expenseCategory}
                                                    onChange={setExpenseCategory}
                                                    options={expenseCategoriesList}
                                                    styles={
                                                        (validation.touched.expense_category_id &&
                                                        validation.errors.expense_category_id) || error.expense_category_id
                                                        ? customStyles
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.expense_category_id &&
                                                validation.errors.expense_category_id) || error.expense_category_id ? (
                                                    <div className="text-danger">
                                                        {error.expense_category_id ? error.expense_category_id : validation.errors.expense_category_id}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </Col>

                                        {/* <Col md="6">
                                            <div className="mb-3">
                                                <Label htmlFor="validationExpReference">Expense Reference<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                <Select
                                                    isClearable={true}
                                                    value={expenseReference}
                                                    onChange={setExpenseReference}
                                                    options={expenseReferenceList}
                                                    styles={
                                                        (validation.touched.expense_reference_id &&
                                                        validation.errors.expense_reference_id) || error.expense_reference_id
                                                        ? customStyles
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.expense_reference_id &&
                                                validation.errors.expense_reference_id) || error.expense_reference_id ? (
                                                    <div className="text-danger">
                                                        {error.expense_reference_id ? error.expense_reference_id : validation.errors.expense_reference_id}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </Col> */}

                                        <Col md="3">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationColor">Amount<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="amount"
                                                    placeholder="Enter Amount"
                                                    type="number"
                                                    className="form-control"
                                                    id="validationAmount"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.amount || ""}
                                                    invalid={
                                                        (validation.touched.amount &&
                                                        validation.errors.amount) || error.amount
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.amount &&
                                                validation.errors.amount) || error.amount ? (
                                                <FormFeedback type="invalid">
                                                    {error.amount ? error.amount : validation.errors.amount}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>

                                        <Col md="3">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationRam">Transaction Date<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Flatpickr
                                                    className={`form-control ${validation.errors.transaction_date && validation.touched.transaction_date || error.transaction_date ? 'border-red' : ''}`}
                                                    name="transaction_date"
                                                    options={{
                                                        dateFormat: "m/d/Y",
                                                        defaultDate:new Date()
                                                    }}
                                                    onChange={setDate}
                                                />
                                                {(validation.touched.transaction_date &&
                                                validation.errors.transaction_date) || error.transaction_date ? (
                                                    <div className="text-danger">
                                                        {error.transaction_date ? error.transaction_date : validation.errors.transaction_date}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>   

                                        <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationSize">Expense For</Label>
                                                <Select
                                                    isClearable={true}
                                                    value={expenseFor}
                                                    onChange={setExpenseFor}
                                                    options={expenseForList}
                                                    styles={
                                                        (validation.touched.expense_for &&
                                                        validation.errors.expense_for) || error.expense_for
                                                        ? customStyles
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.expense_for &&
                                                validation.errors.expense_for) || error.expense_for ? (
                                                    <div className="text-danger">
                                                        {error.expense_for ? error.expense_for : validation.errors.expense_for}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                        </Col>

                                        <Col md="6">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationSize">Expense Note<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="expense_note"
                                                    placeholder="Enter Expense Note"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationExpenseNote"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.expense_note || ""}
                                                    invalid={
                                                        (validation.touched.expense_note &&
                                                        validation.errors.expense_note) || error.expense_note
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.expense_note &&
                                                validation.errors.expense_note) || error.expense_note ? (
                                                <FormFeedback type="invalid">
                                                    {error.expense_note ? error.expense_note : validation.errors.expense_note}
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
    )

};

export default ExpenseListAdd;