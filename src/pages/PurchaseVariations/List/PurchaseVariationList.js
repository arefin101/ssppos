import React from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { PurchaseVariationTableData } from './PurchaseVariationTableData';
import { ToastContainer } from 'react-toastify';


const PurchaseVariationList = (props) => {
 
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>All Purchase Variations</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Purchase Variations</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <PurchaseVariationTableData history={props.history} />
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

export default PurchaseVariationList;