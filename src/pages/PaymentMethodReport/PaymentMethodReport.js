import React, {useEffect, useState, useMemo} from 'react';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { Button,  } from 'reactstrap';
import { getPaymentMethodReport } from '../../store/actions';
import { Card, CardBody, CardHeader, Col, Container, Row, Spinner, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from "react-csv";
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PaymentMethodReport = ({history}) => {

    const dispatch = useDispatch();
    
    const [preLoader, setPreLoader] = useState(true);
    const [paymentMethodReport, setPaymentMethodReport] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    
    const { response } =  useSelector( state => ({
        response: state.Payment.paymentMethodReport,
    }));

    useEffect(() => {
        dispatch(getPaymentMethodReport(history))
    }, []);

    useEffect(() => {
        if(response.payment_report){
            setPaymentMethodReport(response.payment_report);
        }
    }, [response]);

    if(response.payment_report){
        if(preLoader){
            setPreLoader(false);
        }
    }



    const viewPayments = (url, name) =>{
        history.push(url, {name});

    }



    // Table Properties
    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1;
                }
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Total Amount ($)",
                accessor: "total_amount",
            },
            {
                Header: "Not Verified",
                accessor: "not_verified",
            },
            {
                Header: "Verified (Okay)",
                accessor: "verified_okay",
            },
            {
                Header: "Verified (Not Okay)",
                accessor: "verified_not_okay",
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                return (
                    <UncontrolledDropdown >
                        <DropdownToggle href="#" className="btn-soft-secondary btn-sm dropdown" tag="button">
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>

                        <DropdownMenu className="dropdown-menu-end">

                            <DropdownItem onClick={() => viewPayments(`/payment-method/payments/${cellProps.cell.row.original.id}`, cellProps.cell.row.original.name)}>
                                <i className='ri-eye-fill eye-icon'></i> View
                            </DropdownItem>
            
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.payment_report.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setPaymentMethodReport(filteredData)
        }else {
            if(response.payment_report){
                setPaymentMethodReport(response.payment_report);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["#", "Name", "Total Amount ($)", "Not Verified", "Verified (Okay)", "Verified (Not Okay)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Payment Method Report";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1, data.original.name, data.original.total_amount, data.original.not_verified, data.original.verified_okay, data.original.verified_not_okay])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("payment_report.pdf")
    }

   

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Payment Method Report</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">Payment Method Report</h4>
                                        <div className="d-flex gap-2 ms-2">

                                            <Link className="btn btn-soft-primary" to="/payment-method-report/summary">
                                                <i className="ri-file-list-2-line align-bottom me-1 fw-bold"></i>Summary
                                                </Link>

                                            <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                                <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                                PDF
                                            </button>
                                            <CSVLink 
                                                headers={tableHeaders} 
                                                data={filteredData.map(data => [data.index+1, data.original.name, data.original.total_amount, data.original.not_verified, data.original.verified_okay, data.original.verified_not_okay])}
                                                filename="payment_report.csv"
                                            >
                                                <button type="button" className="btn btn-primary">
                                                    <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                                                    CSV
                                                </button>
                                            </CSVLink>
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
                                                        placeholder="Search for paymnet method name or something..."
                                                        onChange={(e) => searchItems(e.target.value)}
                                                    />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </Col>

                                            <Col sm={4} xxl={3}></Col>

                                            <Col sm={4} xxl={3}></Col>

                                            <Col sm={4} xxl={1}>
                                                <div>
                                                    <Button color="soft-danger" className="w-100" onClick={reset}>{" "}<i className="mdi mdi-refresh me-1 align-bottom"></i>Reset</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>

                                <CardBody>
                                    <div id="table-gridjs">
                                        {
                                            preLoader ?
                                            <div className="spinner-box">
                                                <Spinner color="primary"> Loading... </Spinner> 
                                            </div> :
                                            <div>
                                                <TableContainer
                                                    columns={columns}
                                                    data={paymentMethodReport}
                                                    customPageSize={10}
                                                    maxLength={response.payment_report ? response.payment_report.length:10}
                                                    filteredLength={paymentMethodReport.length} 
                                                    isExtraFeature={true}
                                                    isGlobalSearch={true}
                                                    setFilteredData={setFilteredData}
                                                    divClass="table-responsive"
                                                    className="custom-header-css"
                                                />
                                            </div>
                                        }
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

export default PaymentMethodReport