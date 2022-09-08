import React, { useEffect, useState, useRef } from 'react';
import MetaTags from "react-meta-tags";
import Select from 'react-select';
import BreadCrumb from './../../../../Components/Common/BreadCrumb';
import { Card, CardBody, CardHeader, Col, Container, Row, Label, Table, Button, } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDropdown, getCollectivePaymentView } from '../../../../store/payment/action';
import {ToastContainer, toast} from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';


const CollectivePaymentList = ({ history }) => {
    
    const ref = useRef(null);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showBtn, setShowBtn] = useState(null);
    const dispatch = useDispatch();

    let data = [];
    let customerId = null;
    let allCustomers = [];
    let totalDue = 0;

    useEffect(() => {
        response.sale_transactions = [];
        dispatch( getCustomerDropdown( history ) );
    }, []);

    const { customers, response } = useSelector(state => ({
        customers: state.Payment.customers,
        response: state.Payment.response,
    }));

    if(customers.customers){
        allCustomers = customers.customers?.map(item => {
            return {value:item.id, label:`${item.first_name} ${item.last_name}`}
        });
    }

    useEffect(() => {
        customerId = selectedCustomer ? selectedCustomer.value : "";
        dispatch( getCollectivePaymentView(customerId, history) );
    }, [selectedCustomer]);


    if(response.sale_transactions){
        data = response.sale_transactions;
        totalDue = data.map(elmt => elmt.due).reduce((total, due) => total += parseFloat(due), 0);
    }


    useEffect(() => {
        setShowBtn(null);
        if(response.sale_transactions.length !== 0){
            setShowBtn(response.sale_transactions);
        }
    }, [response.sale_transactions]);



    //TOASTER
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    useEffect(() => {
        if(localStorage.getItem('createCollectivePayment')){
            successnotify('Collective Sale Payment Complete !');
            localStorage.removeItem('createCollectivePayment');
            ref.current.complete();
        }
    }, []); 

    const handleSubmit = () => {
        history.push(`/add-collective-payment/${selectedCustomer.value}`, {totalDue : totalDue});
    }



    return (    
        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Collective Payment</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Sale Invoice List" pageTitle="Money Transactions" link="/money-transactions"/>
                    <Row>
                        <Col lg={12}>
                            <Card className="card70vh">
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Sale Invoice List (Due/Partial)</h4>
                                </CardHeader>

                                <CardBody>
                                    <div className="live-preview">
                                        <Row className='align-items-end'>
                                            <Col md="4">
                                                <div className="mb-3">
                                                    <Label htmlFor="validationCustomerName">Customer</Label>                                                   
                                                    <Select
                                                        isClearable={true}
                                                        value={selectedCustomer}
                                                        onChange={setSelectedCustomer}
                                                        options={allCustomers}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    
                                    <Card>
                                        <CardBody>  
                                            <div className="live-preview">
                                                <div className="table-responsive table-card">
                                                    <Table className="align-middle table-nowrap mb-0">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">Date</th>
                                                                <th scope="col">Invoice No.</th>
                                                                <th scope="col">Customer</th>
                                                                <th scope="col">Payment Status</th>
                                                                <th scope="col">Total Payable</th>
                                                                <th scope="col">Paid</th>
                                                                <th scope="col">Due</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>   
                                                            { data.map(elmt => (
                                                                <tr key={elmt.id}>
                                                                    <td>{elmt.date}</td>
                                                                    <td>{elmt.invoice_no}</td>
                                                                    <td>{elmt.customer} </td>
                                                                    <td>{elmt.payment_status}</td>
                                                                    <td>{elmt.total_payable}</td>
                                                                    <td>{elmt.paid}</td>
                                                                    <td>{elmt.due}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    
                                    {
                                        showBtn
                                        ?
                                        <Button color="primary" onClick={handleSubmit}>Make Payment</Button>
                                        :
                                        <></>
                                    }

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default CollectivePaymentList