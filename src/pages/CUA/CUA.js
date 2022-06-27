import React, { useState , useEffect } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useSelector, useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import { Spinner, Card, CardBody, CardHeader, Col, Container, Row, Form, FormGroup, FormFeedback, Button, Label} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { getCuaList, getCuaAssignView, getUsers, cuaAssign } from '../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from 'react-select';

const CUA = () => {
    const [preLoader, setPreLoader] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();
    let data = [];
    let serial = 0;
    let allUsers = [];
    let allCustomers = [];

    useEffect(()=>{
        dispatch( getCuaList(history));
        dispatch( getCuaAssignView(history) );
    }, []);

    const { response, cuaResponse, customers, user_officials } = useSelector(state => ({
        response: state.User.response,
        cuaResponse : state.User.list,
        user_officials : state.User.users,
    }));

    if(cuaResponse.cua_list){
        data = cuaResponse.cua_list;
        data = data.map(elmt => ({ 
            sl: ++serial, 
            id: elmt.id,  
            customer: elmt.customer,  
            user_official: elmt.user_official,
        }));
        if(preLoader){
            setPreLoader(false);
        }
    }

    if(user_officials.customers){
        allCustomers = user_officials.customers?.map(item => {
            return {value:item.id, label:`${item.first_name} ${item.last_name}`}
        });
    }

    if(user_officials.user_officials){
        allUsers = user_officials.user_officials?.map(item => {
            return {value:item.id, label:`${item.first_name} ${item.last_name}`}
        });
    }



    // FORM
    const validation = useFormik({
        enableReinitialize: true,
    
        initialValues: {
          customer: "",
          user: "",
        },

        validationSchema: Yup.object({
          customer: Yup.string().required("Please Select Customer Name"),
          user: Yup.string().required("Please Select User Official Name"),
        }),

        onSubmit: (values) => {
            let assignedValue = {
                customer_id: values.customer,
                user_official_id: values.user,
            }
            dispatch(cuaAssign(assignedValue, history));
        },
    });

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }



    // TABLE RELOAD AFTER FORM SUBMIT
    useEffect(() => {
        dispatch( getCuaList(history));
    }, [response]);



    // HANDLE ERRORS
    let { error } = useSelector(state => ({
        error: state.User.error,
    }));
    
    useEffect(() => {
        if(selectedCustomer !== null){
            error.customer = "";
            validation.setFieldValue("customer", selectedCustomer.value);
        }else{
            error.customer = "Please Select Customer Name !";
            validation.setFieldValue("customer", "");
        }
    }, [selectedCustomer]);
    
    useEffect(() => {
        if(selectedUser !== null){
            error.user = "";
            validation.setFieldValue("user", selectedUser.value);
        }else{
            error.user = "Please Select User Official Name !";
            validation.setFieldValue("user", "");
        }
    }, [selectedUser]);

    useEffect(() => {
        error.customer= "";
        error.user= "";
    }, []);

    
    
    // TOASTER
    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    let cuaList = localStorage.getItem("cua");

    useEffect(() => {
        if(cuaList) {
            successnotify("User Associated Successfully !");
            localStorage.removeItem("cua");
        }
    }, [cuaList]);




    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Customer User Association</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Customer User Association" pageTitle="Users" link="/user-list"/>
                    <Card >
                        <CardBody>
                            <div className="live-preview">
                                <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                    <Row>
                                        <Col md="5">
                                            <div className="mb-3">
                                                <Label htmlFor="validationSupplierName">
                                                    Customer Name<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span>
                                                </Label>                                                   
                                                <Select
                                                    isClearable={true}
                                                    value={selectedCustomer}
                                                    onChange={setSelectedCustomer}
                                                    options={allCustomers}
                                                />
                                                {(validation.touched.customer &&
                                                validation.errors.customer) || error.customer ? (
                                                    <div className="text-danger">
                                                        {error.customer ? error.customer : validation.errors.customer}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </Col>
                                        
                                        <Col md="5">
                                            <div className="mb-3">
                                                <Label htmlFor="validationSupplierName">
                                                    User Official<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span>
                                                </Label>                                                   
                                                <Select
                                                    isClearable={true}
                                                    value={selectedUser}
                                                    onChange={setSelectedUser}
                                                    options={allUsers}
                                                />
                                                {(validation.touched.user &&
                                                validation.errors.user) || error.user ? (
                                                    <div className="text-danger">
                                                        {error.user ? error.user : validation.errors.user}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </Col>

                                        <Col md={2}>
                                            <Button color="primary" type="submit" className='cua-submit w-md'> Submit </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </CardBody>
                    </Card>

                    
                    <Row>
                        <Col xl={12}>
                            <Card>
                                <CardBody>                                       
                                    
                                {
                                    preLoader ?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div>
                                    :
                                    <Grid
                                        data={data}
                                        columns={[
                                        {
                                            id: "sl",
                                            name: '#',
                                            formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                                        },
                                        {
                                            id:'id',
                                            name: 'ID',
                                            hidden:true
                                        },
                                        {
                                            id:'customer',
                                            name: 'Customer Name',
                                        },
                                        {
                                            id:"user_official",
                                            name:"User Official"
                                        },
                                        ]}
                                        search={true}
                                        sort={true}
                                        pagination={{ enabled: true, limit: 15 }}
                                    />
                                }

                                </CardBody>
                            </Card>
                        </Col>
                    </Row> 
                    
                    <ToastContainer />

                </Container>
            </div>
        </React.Fragment>
    )
}

export default CUA;