import React, { useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import Select from 'react-select';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, CardHeader, Col, Container, Row, Label, Table, FormGroup, Input, Form, Button, FormFeedback} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { useFormik } from "formik";
import { productTransfer, getProductTransferView } from '../../../store/actions';
import {ToastContainer, toast} from 'react-toastify';
import { Link } from 'react-router-dom'; 

const ProductTransferForm = (props) => {

    const [receiver, setReceiver] = useState(null);
    const data = props.location.state.items;

    let serial = 0;
    let allReceivers = [];

    const dispatch = useDispatch();

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    let purchaseVariationIds = data.map(elmt => elmt.id);

    
    
    useEffect(()=> {
        dispatch(getProductTransferView( props.history ));
    }, []);

    const { productTransferView, error } =  useSelector( state => ({
        productTransferView: state.productLocation.productTransferView,
        error: state.productLocation.error,
    }));

    if(productTransferView.receiver) {
        allReceivers = productTransferView.receiver.map(item => {
            return { value:item.id, label: `${item.first_name} ${item.last_name}` }
        });
    }

    
    // FORM
    const validation = useFormik({

        enableReinitialize: true.valueOf,

        initialValues: {
            purchase_variation_ids: purchaseVariationIds,
            receiver_id: "",
            sender_pin: "",
            receiver_pin:"",
        },

        validationSchema: Yup.object({
            receiver_id: Yup.string().required("Please Select Receiver Name"),
            sender_pin: Yup.string().required("Please enter Sender's Pin"),
            receiver_pin: Yup.string().required("Please enter Receiver's Pin"),
        }),

        onSubmit: (values) => {
            dispatch( productTransfer(values, props.history) );
        }

    });

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }
    
    
    // HANDLE VALIDATION

    useEffect(() => {
        if(receiver !== null){
            error.receiver_id = "";
            validation.setFieldValue("receiver_id", receiver.value);
        }else{
            error.receiver_id = "Please select a receiver !";
            validation.setFieldValue("receiver_id", "");
        }
    }, [receiver]);
    
    useEffect(()=> {
        error.receiver_id = "";
        error.sender_pin= "";
        error.receiver_pin= "";
    }, []);

    useEffect(() => {
        if(error){
            if( 
                error.receiver_id != "" ||
                error.sender_pin != "" ||
                error.receiver_pin != ""
            ){
                errornotify("Product Transfer Failed !")
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
                    <title>Transfer Product</title>
                </MetaTags>

                <Container fluid>
                    <BreadCrumb title="Transfer" pageTitle="Transfar Products" link="/product-transfer"/>
                    <Card className='card70vh'>
                        <CardHeader className='d-flex'>
                            <h4 className="card-title mb-0 flex-grow-1">Transfer Product</h4>
                        </CardHeader>

                        <CardBody>

                            <Row>
                                <Col lg={6}>
                                    <Card className='mb-5'>
                                        <CardBody>  
                                            <div className="live-preview">
                                                <div className="table-responsive table-card">
                                                    <Table className="align-middle table-nowrap mb-0 text-center">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">SKU</th>
                                                                <th scope="col">IMEI</th>
                                                                <th scope="col">Quantity Available</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>   
                                                            { data.map(elmt => (
                                                                <tr key={elmt.id}>
                                                                    <td>{++serial}</td>
                                                                    <td>{elmt.name}</td>
                                                                    <td>{elmt.sku}</td>
                                                                    <td>{elmt.imei} </td>
                                                                    <td>{elmt.quantity_available}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col lg={6}>
                                    <div className="live-preview">
                                        <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                            <Row>
                                                <Col md="12">
                                                    <div className="mb-3">
                                                        <Label>Receiver</Label>
                                                        <Select
                                                            isClearable={true}
                                                            value={receiver}
                                                            onChange={setReceiver}
                                                            options={allReceivers}
                                                            id='receiver_id'
                                                            styles={
                                                                (validation.touched.receiver_id &&
                                                                validation.errors.receiver_id) || error.receiver_id
                                                                ? customStyles
                                                                : false
                                                            }
                                                        />
                                                        { ((validation.touched.receiver_id && validation.errors.receiver_id) || error.receiver_id) ? (
                                                            <div className="text-danger">
                                                                {error.receiver_id ? error.receiver_id : validation.errors.receiver_id}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="mb-3">
                                                        <Label>Sender Pin</Label>
                                                        <Input 
                                                            type="password"
                                                            className='form-control'
                                                            placeholder='Enter Pin'
                                                            autoComplete="new-password"
                                                            id='sender_pin'
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.sender_pin || ""}
                                                            invalid={
                                                                (validation.touched.sender_pin && validation.errors.sender_pin) || error.sender_pin
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {
                                                        (validation.touched.sender_pin && validation.errors.sender_pin )|| error.sender_pin ? (
                                                        <FormFeedback type="invalid">
                                                            {error.sender_pin ? error.sender_pin: validation.errors.sender_pin}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="mb-3">
                                                        <Label>Receiver Pin</Label>
                                                        <Input 
                                                            type="password"
                                                            className='form-control'
                                                            placeholder='Enter Pin'
                                                            autoComplete="new-password"
                                                            id='receiver_pin'
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.receiver_pin || ""}
                                                            invalid={
                                                                (validation.touched.receiver_pin && validation.errors.receiver_pin) || error.receiver_pin
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {
                                                        (validation.touched.receiver_pin && validation.errors.receiver_pin )|| error.receiver_pin ? (
                                                        <FormFeedback type="invalid">
                                                            {error.receiver_pin ? error.receiver_pin: validation.errors.receiver_pin}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button color="primary" className='submit-btn w-md' type="submit">
                                                Submit
                                            </Button>
                                        
                                            <Link to="/product-transfer" className="btn btn-info btn-label left w-md ms-3 submit-btn"><i className="ri-arrow-left-s-fill label-icon align-middle me-2 fs-16"></i>Previous Page</Link>

                                        </Form>
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                    <ToastContainer />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default ProductTransferForm