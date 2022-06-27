import React from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import PreviewCardHeaderMain from '../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createExpense, getProductBrand } from '../../../store/actions';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

const ExpenseListAdd = (props) => {

    const [selectedBrand, setSelectedBrand] = useState(null);
 
    const [selectedProductModel, setSelectedProductModel] = useState(null);


    const dispatch = useDispatch();

    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
            expense_reference_id: "",
            expense_category_id: "",
            amount: "",
            transaction_date: "",
            expense_for: "",
            expense_note: "",         
        },

        validationSchema: Yup.object({
            expense_reference_id: Yup.mixed().required("Please select expense reference"),
            expense_category_id: Yup.mixed().required("Please select a expense category"),
            amount: Yup.string().required("Please enter expense amount"),
            transaction_date: Yup.string().required("Please enter transaction date"),
            expense_for: Yup.string().required("Please enter expense"),
            expense_note: Yup.string().required("Please enter expense note"),
        }),

        onSubmit: (values) => {

            const formData = new FormData()

            formData.append('expense_reference_id', values.expense_reference_id);
            formData.append('expense_category_id', values.expense_category_id); 
            formData.append('amount', values.amount);
            formData.append('transaction_date', values.transaction_date);
            formData.append('expense_for', values.expense_for);
            formData.append('expense_note', values.expense_note);

            dispatch(createExpense(formData, props.history));

        },

    });

    useEffect(() => {

        if(selectedBrand != null){
            error.brand_id = "";
            validation.setFieldValue("brand_id", selectedBrand.value);
        }else{
            error.brand_id = "Please select a phone model";
            validation.setFieldValue("brand_id", "");
        }

    }, [selectedBrand]);

    useEffect(() => {
        if(selectedProductModel != null){
            error.product_model_id = "";
            validation.setFieldValue("product_model_id", selectedProductModel.value);
        }else{
            error.product_model_id = "Please select a phone model";
            validation.setFieldValue("product_model_id", "");
        }
    }, [selectedProductModel]);




    let { error } = useSelector(state => ({
        error: state.Product.errorPhone,
    }));

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    useEffect(() => {
        
        error.expense_reference_id= "";
        error.expense_category_id= "";
        error.amount= "";
        error.transaction_date= "";
        error.expense_for= "";
        error.expense_note= "";

    }, []);

    let data = [];
    let brands = [];
    let productModels= []

    const { productDropDown } =  useSelector( state => ({
        productDropDown: state.Product.productBrandsSelect
    }));

    if(productDropDown){

        data =  productDropDown;

        brands = data.brands?.map(item => {
            return {value:item.id, label:item.name}
            }
        );

        productModels = data.product_models?.map(item => {
            return {value:item.id, label:item.name}
            }
        );
       
    }

    useEffect(() => {  
        dispatch(getProductBrand())
    }, []);

    useEffect(() => {

        if(error){

            if( 
                error.name != "" ||
                error.brand_id != "" ||
                error.product_model_id != "" ||
                error.color != "" ||
                error.wattage != "" ||
                error.type != "" ||
                error.condition != "" ||
                error.image != ""
            ){
                errornotify("Expense Creation Failed !")
            }
        }

    }, [error]);

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

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
                    <title>Add Expense List</title>
                </MetaTags>
                <Container fluid>
                    
                    <BreadCrumb title="Add Expense" pageTitle="Expenses" link="/expense-list"/>
                    <Card >
                        <PreviewCardHeaderMain title="Add Expense" />
                        <CardBody>
                            <div className="live-preview">
                                <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                    <Row>
                                        <Col md="6">
                                            <div className="mb-3">
                                                <Label htmlFor="validationBrand">Expense Reference<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                <Select
                                                    isClearable={true}
                                                    value={selectedBrand}
                                                    onChange={setSelectedBrand}
                                                    options={brands}
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
                                        </Col>

                                        <Col md="6">
                                            <div className="mb-3">
                                                <Label htmlFor="validationProductModel">Expense Category<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                <Select
                                                    isClearable={true}
                                                    value={selectedProductModel}
                                                    onChange={setSelectedProductModel}
                                                    options={productModels}
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

                                        <Col md="3">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationColor">Amount<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="color"
                                                    placeholder="Enter Your Expense Amount"
                                                    type="number"
                                                    className="form-control"
                                                    id="validationColor"
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
                                                <Input
                                                    name="ram"
                                                    placeholder="Enter Your Transaction Date"
                                                    type="date"
                                                    className="form-control"
                                                    id="validationRam"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.transaction_date || ""}
                                                    invalid={
                                                        (validation.touched.transaction_date &&
                                                        validation.errors.transaction_date) || error.transaction_date
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.transaction_date &&
                                                validation.errors.transaction_date) || error.transaction_date ? (
                                                <FormFeedback type="invalid">
                                                    {error.ram ? error.transaction_date : validation.errors.transaction_date}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>                                           
                                        <Col md="3">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationSize">Expense For<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="size"
                                                    placeholder="Enter Your Expense Note"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationSize"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.expense_for || ""}
                                                    invalid={
                                                        (validation.touched.expense_for &&
                                                        validation.errors.expense_for) || error.expense_for
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.expense_for &&
                                                validation.errors.expense_for) || error.expense_for ? (
                                                <FormFeedback type="invalid">
                                                    {error.expense_for ? error.expense_for : validation.errors.expense_for}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
                                        </Col>

                                        <Col md="3">
                                            <FormGroup className="mb-3">
                                                <Label htmlFor="validationSize">Expense Note<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                <Input
                                                    name="size"
                                                    placeholder="Enter Your Expense Note"
                                                    type="text"
                                                    className="form-control"
                                                    id="validationSize"
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
                                                    {error.size ? error.expense_note : validation.errors.expense_note}
                                                </FormFeedback>
                                                ) : null}
                                            </FormGroup>
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

export default ExpenseListAdd;
