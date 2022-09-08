import React, { useEffect, useState, useMemo } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner } from "reactstrap";
import Select from "react-select";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getCommSaleInvoiceFP } from '../../store/actions';
import "jspdf-autotable";
import TableContainer from "./TableContainer";


const CommBySaleInvoiceFP = () => {

    const [paymentStatusDropdown, setPaymentStatusDropdown] = useState("");

    const [commBySaleInvoiceFP, setCommBySaleInvoiceFP] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const paymentStatusData = [
                                // {value:"", label:"All"},
                                {value:"paid", label:"Paid"}, 
                                {value:"due", label:"Due"}, 
                                {value:"partial", label:"Partial"}
                            ];
    
    const { response } = useSelector(state => ({
        response: state.ReportFP.commBySaleInvoice,
      }));

    useEffect(()=>{
        let paymentStatus = paymentStatusDropdown ? paymentStatusDropdown.value ? paymentStatusDropdown.value : "" : "";

        dispatch(getCommSaleInvoiceFP(paymentStatus, history));

    }, [ dispatch, paymentStatusDropdown ]);

    useEffect(() => {
        if(response.commission_by_sale_invoice){
            setCommBySaleInvoiceFP(response.commission_by_sale_invoice);
        }
    }, [response]);

    
    if(response.commission_by_sale_invoice){
        if(preLoader){
            setPreLoader(false);
        }
    } 
    const columns = useMemo(() => 
        [
            {
                accessor: 'date',
                Header: 'Date'
            },
            {
                accessor: 'invoice_no',
                Header: 'Invoice No.'
            },
            {
                accessor: 'customer',
                Header: 'Customer'
            },
            {
                accessor:"payment_status",
                Header:"Payment Status"
            },
            {
                accessor:"commission",
                Header:"Commission ($)"
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.commission_by_sale_invoice.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setCommBySaleInvoiceFP(filteredData);
        }
        else {
            if(response.commission_by_sale_invoice){
                setCommBySaleInvoiceFP(response.commission_by_sale_invoice);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        setPaymentStatusDropdown("");
        searchItems("");
    };

    const tableHeaders = ["Date", "Invoice No.", "Customer", "Payment Status", "Commission ($)"];


    return (
        <div className="page-content"> 
            <MetaTags>
                <title>Commission By Sale Invoice</title>
            </MetaTags>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card id="commBySaleInvoiceFP">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Commission By Sale Invoice</h5>
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
                                                    placeholder="Search for invoice no, customer, payment status or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3} >
                                        <div>
                                                <Select
                                                    isClearable={true}
                                                    value={paymentStatusDropdown}
                                                    onChange={setPaymentStatusDropdown}
                                                    options={paymentStatusData}
                                                    placeholder="Select Payment Status"
                                                    name="choices-single-default"
                                                    id="customer"
                                                ></Select>
                                            </div>
                                        </Col>

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
                                            data={commBySaleInvoiceFP}
                                            customPageSize={10}
                                            maxLength={response.commission_by_sale_invoice?response.commission_by_sale_invoice.length:10}
                                            filteredLength={commBySaleInvoiceFP.length} 
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


export default CommBySaleInvoiceFP;