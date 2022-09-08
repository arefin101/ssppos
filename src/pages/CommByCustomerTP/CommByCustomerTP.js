import React, { useEffect, useState, useMemo } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner } from "reactstrap";
import Select from "react-select";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import "jspdf-autotable";
import { getSalesmanDropdown, getCommissionByCustomerTp } from '../../store/actions';

const CommByCustomerTP = () => {

    const [selectedSalesman, setSelectedSalesman] = useState(null);

    const [preLoader, setPreLoader] = useState(false);

    const [commByCustomerTP, setCommByCustomerTP] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    let allSalesman = [];

    const history = useHistory();

    const dispatch = useDispatch();

    
    const { salesman, response } = useSelector(state => ({
        response: state.ReportTP.commByCustomerTP,
        salesman: state.ReportTP.salesmanDropdown,
    }));
    

    useEffect(()=>{
        dispatch( getSalesmanDropdown(history) );
        response.commission_by_customer = [];
    }, []);

    if(salesman.salesmen){
        allSalesman = salesman.salesmen?.map(item => {
            return {value:item.id, label:`${item.first_name} ${item.last_name}`}
        });
    }

    useEffect(() => {
        let salesmanId = selectedSalesman ? selectedSalesman.value : "";
        dispatch( getCommissionByCustomerTp(salesmanId, history) );
    }, [selectedSalesman]);


    if(localStorage.getItem("salesMan")){
        setPreLoader(false);
        localStorage.removeItem("salesMan");
    }

    useEffect(() => {
        if(response.commission_by_customer){
            setCommByCustomerTP(response.commission_by_customer);
        }
    }, [response]);


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

            setCommByCustomerTP(filteredData)
        }
        else {
            if(response.commission_by_customer){
                setCommByCustomerTP(response.commission_by_customer);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        setSelectedSalesman(null);
        searchItems("");
    };

    const tableHeaders = ["Customer", "Commission"];


    
    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Commission By Customer</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Commission By Customer</h5>

                                   
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
                                                    placeholder="Search for customer name, commission or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}>
                                            <div>
                                                <Select
                                                    isClearable={true}
                                                    value={selectedSalesman}
                                                    onChange={setSelectedSalesman}
                                                    options={allSalesman}
                                                    placeholder="Select Salesman"
                                                    name="choices-single-default"
                                                    id="customer"
                                                ></Select>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}>
                                            
                                        </Col>

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

                                <div>
                                    {preLoader?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div>:
                                    <TableContainer
                                        columns={columns}
                                        data={commByCustomerTP}
                                        customPageSize={10}
                                        maxLength={response.commission_by_customer ? response.commission_by_customer.length : 10}
                                        filteredLength={commByCustomerTP.length} 
                                        isExtraFeature={true}
                                        isGlobalSearch={true}
                                        setFilteredData={setFilteredData}
                                        divClass="table-responsive"
                                        className="custom-header-css"
                                    />}
                                </div>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>



            </Container>
        </div>
    )
}

export default CommByCustomerTP;