import React ,{useEffect}  from 'react';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { ProductCategoryTableData } from './ProductCategoryTableData';

const ProductCategoryList = (props) => {
    
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Product Categories</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Product Categories</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <ProductCategoryTableData history={props.history}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProductCategoryList;