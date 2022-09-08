import React, { useEffect, useState, useRef } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, Table, Input, Label, FormGroup, FormFeedback, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { imeiSearch } from '../../store/actions';
import "jspdf-autotable";
import {ToastContainer, toast} from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from "formik";
import classnames from "classnames";
import LoadingBar from 'react-top-loading-bar'


const ImeiSearch = () => {

    const ref = useRef(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const [data, setData] = useState(null);
    let key = 0;

    useEffect(() => {
        response.basic_info = "";
        response.product_info = "";
        response.purchase_info = "";
        response.sale_info = "";
        response.sale_return_info = "";
        response.transfer_log_info = "";
    }, []);

    const { response } = useSelector(state => ({
        response: state.Search.response,
    }));


    useEffect(() => {
        setData(null);
        if(response.basic_info){
            setData(response)
            // data = response.purchase_variations;
        }
    }, [response])

    // FORM
    const validation = useFormik({

        enableReinitialize: true.valueOf,

        initialValues: {
            imei:"",
        },

        validationSchema: Yup.object({
            imei: Yup.string().required("Please Enter IMEI"),
        }),

        onSubmit: (values) => {
            
            ref.current.continuousStart();
            dispatch( imeiSearch(values.imei, history) );
            ref.current.complete();
        }

    });

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

    
    // Border Top Nav
    const [infoTab, setinfoTab] = useState("1");
    const infoTabtoggle = (tab) => {
        if (infoTab !== tab) {
            setinfoTab(tab);
        }
    };



    return (
        <React.Fragment>
            
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />

                <MetaTags>
                    <title>Search By IMEI</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Search By IMEI</h4>
                                </CardHeader>

                                <CardBody>
                                    
                                    <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Label>Input IMEI</Label>
                                                        <div className="form-icon">
                                                            <Input 
                                                                type="text"
                                                                className='form-control form-control-icon'
                                                                placeholder='Enter IMEI'
                                                                id='imei'
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.imei || ""}
                                                                invalid={
                                                                    (validation.touched.imei && validation.errors.imei) ? true : false
                                                                }
                                                            />
                                                            {(validation.touched.imei && validation.errors.imei ) ? (
                                                                <FormFeedback type="invalid"> {validation.errors.imei} </FormFeedback>
                                                            ) : null}
                                                            <i className="mdi mdi-barcode-scan text-muted" style={{ fontSize: '20px', display:'block', top:'4px', }}></i>
                                                        </div>
                                                </FormGroup>
                                            </Col>
                                            <Col md="2" className="mt-1">
                                                <Button color="primary" className='mt-4 w-md' type="submit">Submit</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>

                            {
                                data ? 
                                <Card>
                                    <CardBody>
    
                                        <Nav tabs className="nav nav-tabs nav-border-top nav-border-top-primary mb-3">
                                            <NavItem>
                                                <NavLink className={classnames({ active: infoTab === "1", }) + " pointer"} onClick={() => { infoTabtoggle("1"); }} >
                                                    Basic Info
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: infoTab === "2", }) + " pointer"} onClick={() => { infoTabtoggle("2"); }} >
                                                    Product Info
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: infoTab === "3", }) + " pointer"} onClick={() => { infoTabtoggle("3"); }} >
                                                    Purchase Info
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: infoTab === "4", }) + " pointer"} onClick={() => { infoTabtoggle("4"); }} >
                                                    Sale Info
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: infoTab === "5", }) + " pointer"} onClick={() => { infoTabtoggle("5"); }} >
                                                    Sale Return Info
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: infoTab === "6", }) + " pointer"} onClick={() => { infoTabtoggle("6"); }} >
                                                    Transfer Log Info
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
    
                                        <TabContent activeTab={infoTab} className="p-3">
                                            <TabPane tabId="1" id="basic_info">
                                                {
                                                    data.basic_info[0] && <>
                                                        <h6 className="mt-0 mb-1 fs-14">Product Name: {data.basic_info[0].product_name}</h6>
                                                        <p className="fs-14 text-dark mb-0 mt-3">Product SKU: {data.basic_info[0].sku}</p>
                                                        <p className="fs-14 text-dark mb-0 mt-3">Available Quantity: {data.basic_info[0].quantity_available}</p>
                                                        <p className="fs-14 text-dark mb-0">{((data.basic_info[0].quantity_available === 0 ? "This Product Belonged To " : "This Product Belongs To ") + (data.basic_info[0].location))}</p>
                                                    </>
                                                }
                                            </TabPane>
    
                                            <TabPane tabId="2" id="product_info">
                                                {
                                                    data.product_info[0] && <>
                                                    <div className="d-flex">
                                                        <img src={data.product_info[0].image} alt="" style={{maxWidth:"300px", marginRight: "2rem",boxShadow: "0px 2px 7px #00000042",padding: "5px"}}/>
        
                                                        <div className="info">
                                                            <h6 className="mt-0 mb-1 fs-14">Product Name: {data.product_info[0].product_name}</h6>
                                                            <p className="fs-14 text-dark mb-0 mt-3">SKU: {data.product_info[0].sku}</p>
                                                            <p className="fs-14 text-dark mb-0">Brand: {data.product_info[0].brand}</p>
                                                            <p className="fs-14 text-dark mb-0">Catagory: {data.product_info[0].category}</p>
                                                            <p className="fs-14 text-dark mb-0">Model: {data.product_info[0].model}</p>
                                                        </div>
                                                    </div>
                                                    </>
                                                }
                                            </TabPane>
    
                                            <TabPane tabId="3" id="purchase_info">
                                                {
                                                    data.purchase_info[0] && <>
                                                    <h6 className="mt-0 mb-1 fs-14">Reference No. {data.purchase_info[0].reference_no}</h6>
                                                    <p className="fs-14 text-dark mb-0 mt-3">Supplier: {data.purchase_info[0].supplier}</p>
                                                    <p className="fs-14 text-dark mb-0">Quantity: {data.purchase_info[0].quantity}</p>
                                                    <p className="fs-14 text-dark mb-0">Purchase Total: ${data.purchase_info[0].purchase_total}</p>
                                                    <p className="fs-14 text-dark mb-0 mt-3">Date: {data.purchase_info[0].date}</p>
                                                    <p className="fs-14 text-muted mb-0">Finalized By: {data.purchase_info[0].finalized_by}</p>
                                                    </>
                                                }
                                            </TabPane>
    
                                            <TabPane tabId="4" id="sale_info">
                                                {
                                                    data.sale_info && <>
                                                    <Table className="align-middle table-nowrap mb-0 table-hover">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">Date</th>
                                                                <th scope="col">Invoice No.</th>
                                                                <th scope="col">Customer</th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col">Selling Price</th>
                                                                <th scope="col">Finalized By</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>   
                                                            { data.sale_info.map(elmt => (
                                                                <tr key={key++}>
                                                                    <td>{elmt.date}</td>
                                                                    <td>{elmt.invoice_no}</td>
                                                                    <td>{elmt.customer} </td>
                                                                    <td>{elmt.quantity}</td>
                                                                    <td>{elmt.selling_price}</td>
                                                                    <td>{elmt.finalized_by}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                    </>
                                                }
                                            </TabPane>
    
                                            <TabPane tabId="5" id="sale_return_info">
                                                {
                                                    data.sale_return_info && <>
                                                    <Table className="align-middle table-nowrap mb-0 table-hover">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">Date</th>
                                                                <th scope="col">Return Invoice</th>
                                                                <th scope="col">Sale Invoice</th>
                                                                <th scope="col">Customer</th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col">Return Price</th>
                                                                <th scope="col">Finalized By</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>   
                                                            { data.sale_return_info.map(elmt => (
                                                                <tr key={key++}>
                                                                    <td>{elmt.date}</td>
                                                                    <td>{elmt.return_invoice}</td>
                                                                    <td>{elmt.sale_invoice} </td>
                                                                    <td>{elmt.customer}</td>
                                                                    <td>{elmt.quantity}</td>
                                                                    <td>{elmt.return_price}</td>
                                                                    <td>{elmt.finalized_by}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                    </>
                                                }
                                            </TabPane>
    
                                            <TabPane tabId="6" id="transfer_log_info">
                                                {
                                                    data.transfer_log_info && <>
                                                    <Table className="align-middle table-nowrap mb-0 table-hover">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">Date</th>
                                                                <th scope="col">Batch No.</th>
                                                                <th scope="col">Sender</th>
                                                                <th scope="col">Receiver</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>   
                                                            { data.transfer_log_info.map(elmt => (
                                                                <tr key={key++}>
                                                                    <td>{elmt.date}</td>
                                                                    <td>{elmt.batch_no}</td>
                                                                    <td>{elmt.sender} </td>
                                                                    <td>{elmt.receiver}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table></>
                                                }
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                                :
                                <></>
                            }

                        </Col>
                    </Row>
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default ImeiSearch;