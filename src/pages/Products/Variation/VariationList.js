import React from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { VariationTableData } from './VariationTableData';
import { ToastContainer } from 'react-toastify';
import BreadCrumb from './../../../Components/Common/BreadCrumb';

const VariationList = (props) => {
 
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Product Variations</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Product Variations" pageTitle="Products" link="/product-list"/>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Product Variations</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <VariationTableData match={props.match} />
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

export default VariationList;