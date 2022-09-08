import React, { useEffect, useState, useMemo } from "react";
import {Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner} from "reactstrap";
import MetaTags from 'react-meta-tags';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getCommissionByCustomer } from "../../store/actions";
import "jspdf-autotable";
import TableContainer from "./TableContainer";


const CommByCustomerFP = () => {

    const [commByCustomerFP, setCommByCustomerFP] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.ReportFP.commByCustomerFP,
    }));

    useEffect(()=>{
        dispatch(getCommissionByCustomer(history));
    }, [dispatch]);

    useEffect(() => {
        if(response.commission_by_customer){
            setCommByCustomerFP(response.commission_by_customer);
        }
    }, [response]);

    if(response.commission_by_customer){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1
                }
            },
            {
                accessor: 'customer',
                Header: 'Customer'
            },
            {
                accessor: 'commission',
                Header: 'Commission ($)'
            }
            
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.commission_by_customer.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setCommByCustomerFP(filteredData)
        }
        else {
            if(response.commission_by_customer){
                setCommByCustomerFP(response.commission_by_customer);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Customer", "Commission"];

    return (
        <div className="page-content">
            <MetaTags>
                <title>Commission By Customer</title>
            </MetaTags>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card id="commByCustomerFP">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Commission By Customer</h5>
                                    <div className="d-flex gap-2">
                                    
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="bg-soft-light border border-dashed border-start-0 border-end-0">
                                <Form>
                                    <Row className="g-3">
                                        <Col sm={12} xxl={5}>
                                            <div className="search-box">
                                                <input
                                                    type="text"
                                                    id="search"
                                                    className="form-control search bg-light border-light"
                                                    placeholder="Search for customer's name, commission something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3} />

                                        <Col sm={4} xxl={3} />

                                        <Col sm={4} xxl={1}>
                                            <div>
                                                <Button color="soft-danger" className="w-100" onClick={reset}>
                                                    {" "}
                                                    <i className="mdi mdi-refresh me-1 align-bottom"></i>
                                                    Reset
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardBody className="pt-0">
                                {preLoader?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div>:
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={commByCustomerFP}
                                            customPageSize={10}
                                            maxLength={response.commission_by_customer?response.commission_by_customer.length:10}
                                            filteredLength={commByCustomerFP.length} 
                                            isExtraFeature={true}
                                            isGlobalSearch={true}
                                            setFilteredData={setFilteredData}
                                            divClass="table-responsive"
                                            className="custom-header-css"
                                        />
                                    </div>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default CommByCustomerFP;