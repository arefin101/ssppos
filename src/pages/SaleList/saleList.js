import React, {useEffect,useState} from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import {SaleTableData }from './saleListTableData';
import { ToastContainer, toast } from 'react-toastify';

const SaleList = (props) => {

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    useEffect(() => {
        if(localStorage.getItem('createSaleTransactionSuccess')){
            successnotify('Sale Transaction Created Successfully !');
            localStorage.removeItem('createSaleTransactionSuccess')
        }
    }, []);
    
    return (
        <React.Fragment>
            <div className="page-content">
                
                <MetaTags>
                    <title>Sale List</title>
                </MetaTags>

                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Sales</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <SaleTableData history={props.history}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <ToastContainer/>
                </Container>

            </div>
        </React.Fragment>
    );
};

export default SaleList;