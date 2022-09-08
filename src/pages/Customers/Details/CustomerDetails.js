import React, { useEffect, useState, useRef } from "react";
import MetaTags from 'react-meta-tags';
import { useSelector, useDispatch } from "react-redux";
import { getCustomerById, getShippingAddress, addShippingAddress, deleteShippingAddress, editShippingAddress, hasPermission } from "../../../store/actions";
import classnames from 'classnames';
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { CardBody, CardHeader, Container, Row, Card, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Spinner, TabContent, TabPane, Col, Nav, NavItem, NavLink, Button, Modal, ModalBody, ModalHeader, Input, Form, FormGroup, FormFeedback, Label } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import userDummy from '../../../assets/images/users/user-dummy-img.jpg';
import profileBg from '../../../assets/images/profile-bg.jpg';
import LoadingBar from 'react-top-loading-bar';


const CustomerDetails = (props) => {
    
    const userId = props.match.params.id;
    
    const [userData, setUserData] = useState([]);   
    const [shippingAddress, setShippingAddress] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editAddress, setEditAddress] = useState([]);
    const [addressIndex, setAddressIndex] = useState();
    const [preLoader, setPreLoader] = useState(true);
    const [activeTab, setActiveTab] = useState('1');
    
    const dispatch = useDispatch();

    const ref = useRef(null);
    
    const { customer , address, permission } = useSelector( state => ({
        customer: state.Contact.customer,
        address: state.Contact.address.shipping_addresses,
        permission: state.General.updateCustomerPermission,
    }) );

    useEffect(() => {
        if(customer.customer){
            setUserData(customer.customer);
        }else{
            setUserData([]);
        }

        if(address){
            setShippingAddress(address);
        }else{
            setShippingAddress([]);
        }
        
    }, [customer.customer, address]);

    

    // toasters
    const addAddressResponse = localStorage.getItem('add-shipping-address');
    const editAddressResponse = localStorage.getItem('edit-shipping-address');
    const deleteAddressResponse = localStorage.getItem('delete-shipping-address');
    const infoUpdateResponse = localStorage.getItem('customer-info-update');

    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    useEffect(() => {
        if(addAddressResponse) {
            successnotify("Shipping Address Added Successfully !");
            localStorage.removeItem('add-shipping-address')
            ref.current.complete();
        }
        if(editAddressResponse) {
            successnotify("Shipping Address Updated Successfully !");
            localStorage.removeItem('edit-shipping-address')
            ref.current.complete();
        }
        if(deleteAddressResponse) {
            successnotify("Shipping Address Deleted Successfully !");
            localStorage.removeItem('delete-shipping-address')
            ref.current.complete();
        }
    }, [address]);

    
    
    useEffect(() => {
        setUserData({});
        setShippingAddress([]);
        dispatch( hasPermission("user.update-customer" , props.history) )
        dispatch( hasPermission("user.index-customer" , props.history) )
        dispatch( getCustomerById( userId, props.history ) );
        dispatch( getShippingAddress( userId, props.history ) );
    }, []);



    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    function togAddModal() {
        setAddModal(!addModal);
    }
    
    function togEditModal() {
        setEditModal(!editModal);
    }



    // Add shipping address Validation 
    const validation = useFormik({
        
        enableReinitialize: true,
    
        initialValues: {
            address: "",
            city: "",
            state: "",
            country: "",
        },

        validationSchema: Yup.object({
          address: Yup.string().required("Please Enter Address"),
          city: Yup.string().required("Please Enter Your City"),
          state: Yup.string().required("Please Enter Your State"),
          country: Yup.string().required("Please Enter Your Country Name"),
        }),

        onSubmit: (values) => {
            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();

            dispatch( addShippingAddress( userId, values, props.history ));
            setShippingAddress(address);
            setAddModal(false);
        },

    });

    
    // Edit shipping address Validation 
    const validationForEdit = useFormik({
        
        enableReinitialize: true,
    
        initialValues: {
            address: editAddress.address,
            city: editAddress.city,
            state: editAddress.state,
            country: editAddress.country,
        },

        validationSchema: Yup.object({
          address: Yup.string().required("Please Enter Address"),
          city: Yup.string().required("Please Enter Your City"),
          state: Yup.string().required("Please Enter Your State"),
          country: Yup.string().required("Please Enter Your Country Name"),
        }),

        onSubmit: (values) => {
            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();

            values.index = addressIndex;
            dispatch( editShippingAddress( userId, values, props.history ));
            setShippingAddress(address);
            setEditModal(false);
        },
        
    });
    
    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }
    
    const validateEditForm = (e) => {
        e.preventDefault();
        validationForEdit.handleSubmit();
        return false;
    }


    
    let { error } = useSelector(state => ({
        error: state.Contact.errorAddress ? state.Contact.errorAddress : {},
    }));

    useEffect(() => {
        error.address= "";
        error.state= "";
        error.city= "";
        error.country= "";
    }, []);



    const handleDelete = (indexValue) => {
        let indexObj = {
            index: indexValue
        };
        dispatch( deleteShippingAddress(userId, indexObj, props.history));
        setShippingAddress(address);
    }

    const handleEdit = (index) => {
        setEditAddress(address[index]);
        setAddressIndex(index)
        setEditModal(true);
    }
    
    useEffect(() => {
        if(infoUpdateResponse) {
            successnotify("Information Updated Successfully !");
            localStorage.removeItem('customer-info-update')
            ref.current.complete();

        }
    }, [customer]);

    const editCustomer = (url) => {
        props.history.push(url);
    }
    
    // preloader
    if(Object.keys(userData).length !== 0){
        if(preLoader){
            setPreLoader(false);
        }
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                    <MetaTags> <title>Customer Details</title> </MetaTags>
                    
                    <BreadCrumb title="Customer Details" pageTitle="Customers" link="/customer-list"/>

                    {
                        preLoader ?
                        <div className="spinner-box">
                            <Spinner color="primary"> Loading... </Spinner> 
                        </div>
                        :
                        <>
                            
                            <div className="profile-foreground position-relative mx-n4 mt-n4">
                                <div className="profile-wid-bg">
                                    <img src={profileBg} alt="" className="profile-wid-img" />
                                </div>
                            </div>
                            <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                                <Row className="g-4">
                                    <div className="col-auto">
                                        <div className="avatar-lg">
                                            <img src={userDummy} alt="user-img" className="img-thumbnail rounded-circle" />
                                        </div>
                                    </div>
        
                                    <Col>
                                        <div className="p-2">
                                            <h3 className="text-white mb-1">{userData.first_name + " " + userData.last_name}</h3>
                                            <p className="text-white-75">Customer</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        
                            <Row>
                                <Col lg={12}>
                                    <div>
                                        <Nav pills className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                                            <NavItem>
                                                <NavLink
                                                    href="#overview"
                                                    className={classnames({ active: activeTab === '1' })}
                                                    onClick={() => { toggleTab('1'); }}
                                                >
                                                    <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                        className="d-none d-md-inline-block">Overview</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    href="#shipping-address"
                                                    className={classnames({ active: activeTab === '2' })}
                                                    onClick={() => { toggleTab('2'); }}
                                                >
                                                    <i className="ri-list-unordered d-inline-block d-md-none"></i> <span
                                                        className="d-none d-md-inline-block">Shipping Address</span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>

                                        <TabContent activeTab={activeTab} className="pt-4">
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col>
                                                        <Card>
                                                            <CardHeader>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <h4 className="card-title">Customer Information</h4>
                                                                    {permission && <Link className="btn btn-success" to={"/update-customer-details/" + userId} onClick={() => editCustomer("/update-customer-details/" + userId)}>
                                                                        <i className="ri-edit-box-line align-bottom"></i> Edit
                                                                    </Link>}
                                                                </div>
                                                            </CardHeader>
                                                            <CardBody>
                                                                
                                                                <div className="table-responsive">
                                                                    <Table className="table-borderless mb-0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row" style={{ width:'20%' }}>First Name :</th>
                                                                                <td className="text-muted">{userData.first_name}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Last Name :</th>
                                                                                <td className="text-muted">{userData.last_name}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Username :</th>
                                                                                <td className="text-muted">{userData.username}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Email :</th>
                                                                                <td className="text-muted">{userData.email}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Business Name :</th>
                                                                                <td className="text-muted">{userData.business_name === null ? "" : userData.business_name}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Business Website :</th>
                                                                                <td className="text-muted">{userData.business_website === null ? "" : userData.business_website}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Tax ID :</th>
                                                                                <td className="text-muted">{userData.tax_id === null ? "" : userData.tax_id}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">License Certificate :</th>
                                                                                <td> { userData.license_certificate === null ? "" : <a href={userData.license_certificate} target="_blank">
                                                                                        <Button className="btn-soft-primary" size="sm"> View </Button>
                                                                                    </a> }
                                                                                    
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Contact No. :</th>
                                                                                <td className="text-muted">{userData.contact_no}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Address :</th>
                                                                                <td className="text-muted">{userData.address}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">City :</th>
                                                                                <td className="text-muted">{userData.city}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">State :</th>
                                                                                <td className="text-muted">{userData.state}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Country :</th>
                                                                                <td className="text-muted">{userData.country}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Zip Code :</th>
                                                                                <td className="text-muted">{userData.zip_code === null ? "" : userData.zip_code}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Card style={{ minHeight:'300px' }}>
                                                    <CardHeader>
                                                        <div className="d-flex justify-content-between">
                                                            <h4 className="card-title">Shipping Address</h4>
                                                            {permission && <button type="button" id="create-btn" className="add-btn btn btn-success" onClick={() => setAddModal(true)}><i className="ri-add-line align-bottom me-1"></i>Add New Address</button>}
                                                        </div>


                                                        {/* Add address modal */}
                                                        <Modal isOpen={addModal} toggle={() => { togAddModal(); }} >
                                                            <ModalHeader>
                                                                <p className="modal-title">Add New Shipping Address</p>
                                                            </ModalHeader>
                                                            <ModalBody>
                                                                <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                                                    <Row>
                                                                        <Col md="12">
                                                                            <FormGroup className="mb-3">
                                                                                <Label htmlFor="validationAddress">Address/Street<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                                                <Input
                                                                                    name="address"
                                                                                    placeholder="Enter your Address"
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="validationAddress"
                                                                                    onChange={validation.handleChange}
                                                                                    onBlur={validation.handleBlur}
                                                                                    value={validation.values.address || ""}
                                                                                    invalid={
                                                                                        (validation.touched.address &&
                                                                                        validation.errors.address) || error.address
                                                                                        ? true
                                                                                        : false
                                                                                    }
                                                                                />
                                                                                {(validation.touched.address &&
                                                                                validation.errors.address) || error.address ? (
                                                                                <FormFeedback type="invalid">
                                                                                    {error.address ? error.address : validation.errors.address}
                                                                                </FormFeedback>
                                                                                ) : null}
                                                                            </FormGroup>

                                                                            <FormGroup className="mb-3">
                                                                                <Label htmlFor="validationCity">City<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                                                <Input
                                                                                    name="city"
                                                                                    placeholder="Enter your City"
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="validationCity"
                                                                                    onChange={validation.handleChange}
                                                                                    onBlur={validation.handleBlur}
                                                                                    value={validation.values.city || ""}
                                                                                    invalid={
                                                                                        (validation.touched.city &&
                                                                                        validation.errors.city) || error.city
                                                                                        ? true
                                                                                        : false
                                                                                    }
                                                                                />
                                                                                {(validation.touched.city &&
                                                                                validation.errors.city) || error.city ? (
                                                                                <FormFeedback type="invalid">
                                                                                    {error.city ? error.city : validation.errors.city}
                                                                                </FormFeedback>
                                                                                ) : null}
                                                                            </FormGroup>

                                                                            <FormGroup className="mb-3">
                                                                                <Label htmlFor="validationState">State<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                                                <Input
                                                                                    name="state"
                                                                                    placeholder="Enter your State"
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="validationState"
                                                                                    onChange={validation.handleChange}
                                                                                    onBlur={validation.handleBlur}
                                                                                    value={validation.values.state || ""}
                                                                                    invalid={
                                                                                        (validation.touched.state &&
                                                                                        validation.errors.state) || error.state
                                                                                        ? true
                                                                                        : false
                                                                                    }
                                                                                />
                                                                                {(validation.touched.state &&
                                                                                validation.errors.state) || error.state ? (
                                                                                <FormFeedback type="invalid">
                                                                                    {error.state ? error.state : validation.errors.state}
                                                                                </FormFeedback>
                                                                                ) : null}
                                                                            </FormGroup>

                                                                            <FormGroup className="mb-3">
                                                                                <Label htmlFor="validationCountry">Country<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                                                <Input
                                                                                    name="country"
                                                                                    placeholder="Enter your Country"
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="validationCountry"
                                                                                    onChange={validation.handleChange}
                                                                                    onBlur={validation.handleBlur}
                                                                                    value={validation.values.country || ""}
                                                                                    invalid={
                                                                                        (validation.touched.country &&
                                                                                        validation.errors.country) || error.country
                                                                                        ? true
                                                                                        : false
                                                                                    }
                                                                                />
                                                                                {(validation.touched.country &&
                                                                                validation.errors.country) || error.country ? (
                                                                                <FormFeedback type="invalid">
                                                                                    {error.country ? error.country : validation.errors.country}
                                                                                </FormFeedback>
                                                                                ) : null}
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                    <div className="col-lg-12">
                                                                        <div className="hstack gap-2 justify-content-end">
                                                                            <Button color="light" onClick={() => setAddModal(false)}>Close</Button>
                                                                            <Button id="submit" color="primary" type="submit" className='w-md'> Submit </Button>
                                                                        </div>
                                                                    </div>
                                                                </Form>
                                                            </ModalBody>
                                                        </Modal>
                                                        
                                                        {/* Edit address modal */}
                                                        <Modal isOpen={editModal} toggle={() => { togEditModal(); }} >
                                                            <ModalHeader>
                                                                <p className="modal-title">Edit Shipping Address</p>
                                                            </ModalHeader>
                                                            <ModalBody>
                                                                <Form className="needs-validation" onSubmit={(e) => validateEditForm(e)}>
                                                                    <Row>
                                                                        <Col md="12">
                                                                            <FormGroup className="mb-3">
                                                                                <Label htmlFor="validationAddress">Address/Street<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                                                <Input
                                                                                    name="address"
                                                                                    placeholder="Enter your Address"
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="validationAddress"
                                                                                    onChange={validationForEdit.handleChange}
                                                                                    onBlur={validationForEdit.handleBlur}
                                                                                    value={validationForEdit.values.address}
                                                                                    invalid={
                                                                                        (validationForEdit.touched.address &&
                                                                                        validationForEdit.errors.address) || error.address
                                                                                        ? true
                                                                                        : false
                                                                                    }
                                                                                />
                                                                                {(validationForEdit.touched.address &&
                                                                                validationForEdit.errors.address) || error.address ? (
                                                                                <FormFeedback type="invalid">
                                                                                    {error.address ? error.address : validationForEdit.errors.address}
                                                                                </FormFeedback>
                                                                                ) : null}
                                                                            </FormGroup>

                                                                            <FormGroup className="mb-3">
                                                                                <Label htmlFor="validationCity">City<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                                                <Input
                                                                                    name="city"
                                                                                    placeholder="Enter your City"
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="validationCity"
                                                                                    onChange={validationForEdit.handleChange}
                                                                                    onBlur={validationForEdit.handleBlur}
                                                                                    value={validationForEdit.values.city || ""}
                                                                                    invalid={
                                                                                        (validationForEdit.touched.city &&
                                                                                        validationForEdit.errors.city) || error.city
                                                                                        ? true
                                                                                        : false
                                                                                    }
                                                                                />
                                                                                {(validationForEdit.touched.city &&
                                                                                validationForEdit.errors.city) || error.city ? (
                                                                                <FormFeedback type="invalid">
                                                                                    {error.city ? error.city : validationForEdit.errors.city}
                                                                                </FormFeedback>
                                                                                ) : null}
                                                                            </FormGroup>

                                                                            <FormGroup className="mb-3">
                                                                                <Label htmlFor="validationState">State<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                                                <Input
                                                                                    name="state"
                                                                                    placeholder="Enter your State"
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="validationState"
                                                                                    onChange={validationForEdit.handleChange}
                                                                                    onBlur={validationForEdit.handleBlur}
                                                                                    value={validationForEdit.values.state || ""}
                                                                                    invalid={
                                                                                        (validationForEdit.touched.state &&
                                                                                        validationForEdit.errors.state) || error.state
                                                                                        ? true
                                                                                        : false
                                                                                    }
                                                                                />
                                                                                {(validationForEdit.touched.state &&
                                                                                validationForEdit.errors.state) || error.state ? (
                                                                                <FormFeedback type="invalid">
                                                                                    {error.state ? error.state : validationForEdit.errors.state}
                                                                                </FormFeedback>
                                                                                ) : null}
                                                                            </FormGroup>

                                                                            <FormGroup className="mb-3">
                                                                                <Label htmlFor="validationCountry">Country<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                                                <Input
                                                                                    name="country"
                                                                                    placeholder="Enter your Country"
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="validationCountry"
                                                                                    onChange={validationForEdit.handleChange}
                                                                                    onBlur={validationForEdit.handleBlur}
                                                                                    value={validationForEdit.values.country || ""}
                                                                                    invalid={
                                                                                        (validationForEdit.touched.country &&
                                                                                        validationForEdit.errors.country) || error.country
                                                                                        ? true
                                                                                        : false
                                                                                    }
                                                                                />
                                                                                {(validationForEdit.touched.country &&
                                                                                validationForEdit.errors.country) || error.country ? (
                                                                                <FormFeedback type="invalid">
                                                                                    {error.country ? error.country : validationForEdit.errors.country}
                                                                                </FormFeedback>
                                                                                ) : null}
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                    <div className="col-lg-12">
                                                                        <div className="hstack gap-2 justify-content-end">
                                                                            <Button color="light" onClick={() => setEditModal(false)}>Close</Button>
                                                                            <Button id="submit" color="primary" type="submit" className='w-md'> Submit </Button>
                                                                        </div>
                                                                    </div>
                                                                </Form>
                                                            </ModalBody>
                                                        </Modal>

                                                    </CardHeader>
                                                    <CardBody>
                                                        
                                                    <Row>
                                                        {   (shippingAddress) ?
                                                            shippingAddress.map((item, index) => {
                                                                return ( 
                                                                    <Col xxl={3} lg={4} md={6} key={index}>
                                                                        <Card style={{ minHeight:'150px' }}>
                                                                            <CardHeader>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="flex-grow-1">
                                                                                        <h5 className="card-title mb-0">
                                                                                        <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "} Address {index+1}</h5>
                                                                                    </div>
                                                                                    <div className="flex-shrink-0">
                                                                                        <UncontrolledDropdown direction='start'>
                                                                                            <DropdownToggle tag="a" id="dropdownMenuLink2" role="button">
                                                                                                <i className="ri-more-2-fill fs-14"></i>
                                                                                            </DropdownToggle>
                                                                                            <DropdownMenu>
                                                                                                <DropdownItem onClick={() => handleEdit(index)}>Edit</DropdownItem>
                                                                                                <DropdownItem onClick={() => handleDelete(index)}>Delete</DropdownItem>
                                                                                            </DropdownMenu>
                                                                                        </UncontrolledDropdown>
                                                                                    </div>
                                                                                </div>
                                                                            </CardHeader>
                                                                            <CardBody>
                                                                                <p><span>{item.address}</span>, <span>{item.city}</span>, <span>{item.state}</span>, <span>{item.country}</span></p>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                )
                                                            })
                                                            :
                                                            <></>
                                                        }
                                                    </Row>

                                                    </CardBody>
                                                </Card>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    }
                    
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CustomerDetails;
