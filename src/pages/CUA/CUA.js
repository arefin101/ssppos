import React, { useState , useEffect, useRef } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useSelector, useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import { Spinner, Card, CardBody, CardHeader, Col, Container, Row, Form, Button, Label, Table} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { getCuaList, getCuaAssignView, cuaAssign } from '../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from 'react-select';
import LoadingBar from 'react-top-loading-bar'


const CUA = () => {
    const [preLoader, setPreLoader] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const ref = useRef(null);

    const dispatch = useDispatch();
    const history = useHistory();
    let data = [];
    let serial = 0;
    let allUsers = [];
    let allCustomers = [];

    useEffect(()=>{
        dispatch( getCuaAssignView(history) );
        dispatch( getCuaList(history));
    }, []);

    const { response, cuaResponse, customers, user_officials } = useSelector(state => ({
        response: state.User.response,
        cuaResponse : state.User.list,
        user_officials : state.User.users,
    }));

    if(cuaResponse.cua_list){
        data = cuaResponse.cua_list;
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

            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();
            
            dispatch(cuaAssign(assignedValue, history));

            resetFeilds();
        },
    });


    // RESET FIELDS AFTER SUBMIT
    const resetFeilds = () => {
        setSelectedCustomer(null);
        validation.touched.customer = false;
        
        if(error){
            if(error.customer){
                error.customer="";
            }
        }
        setSelectedUser(null);
        validation.touched.user = false;
        
        if(error){
            if(error.user){
                error.user="";
            }
        }
    }

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
        error: state.User.error ? state.User.error : {},
    }));
    
    useEffect(() => {
        if(selectedCustomer !== null){
            
            if(error){
                if(error.customer){
                    error.customer="";
                }
            }
            validation.setFieldValue("customer", selectedCustomer.value);
        }else{
            if(error){
                if(error.customer){
                    error.customer = "Please Select Customer Name !";
                }
            }
            validation.setFieldValue("customer", "");
        }
    }, [selectedCustomer]);
    
    useEffect(() => {
        if(selectedUser !== null){
           
            if(error){
                if(error.user){
                    error.user = "";
                }
            }
            validation.setFieldValue("user", selectedUser.value);
        }else{
            if(error){
                if(error.user){
                    error.user = "Please Select User Official Name !";
                }
            }
            validation.setFieldValue("user", "");
        }
    }, [selectedUser]);

    useEffect(() => {
        
        if(error){
            if(error.customer){
                error.customer = "";
            }
        }
        
        if(error){
            if(error.user){
                error.user = "";
            }
        }
    }, []);

    
    
    // TOASTER
    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    let cuaList = localStorage.getItem("cua");

    useEffect(() => {
        if(cuaList) {
            localStorage.removeItem("cua");
            ref.current.complete();
            document.getElementById("submit").disabled = false;
            successnotify("User Associated Successfully !");
        }
    }, [cuaList]);

    

    return (
        <React.Fragment>
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Customer User Association</title>
                </MetaTags>
                <Container fluid>
                    <Card >

                        <CardHeader className='d-flex'>
                            <h4 className="card-title mb-0 flex-grow-1">Customer User Association (CUA)</h4>
                        </CardHeader>

                        <CardBody>
                            <div className="live-preview">
                                <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                    <Row>
                                        <Col md="6" lg={5}>
                                            <div className="mb-3">
                                                <Label htmlFor="validationCustomerName">
                                                    Customer<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span>
                                                </Label>                                                   
                                                <Select
                                                    id='customer'
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
                                        
                                        <Col md="6" lg={5}>
                                            <div className="mb-3">
                                                <Label htmlFor="validationUserName">
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

                                        <Col md={12} lg={2} className="cua-submit-div">
                                            <Button id="submit" color="primary" type="submit" className='cua-submit w-md'> Submit </Button>
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
                                    preLoader
                                    ?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div>
                                    :
                                    <div className="live-preview">
                                        <div className="table-responsive table-card">
                                            <Table className="align-middle table-nowrap mb-0 table-hover">
                                                <thead className="table-light">
                                                    <tr> 
                                                        <th scope="col">#</th>
                                                        <th scope="col">Customer</th>
                                                        <th scope="col">User Official</th>
                                                    </tr>
                                                </thead>
                                                <tbody>   
                                                    { data.map(elmt => (
                                                        <tr key={elmt.id}>
                                                            <td>{++serial}</td>
                                                            <td>{elmt.customer} </td>
                                                            <td>{elmt.user_official}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
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