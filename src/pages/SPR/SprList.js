import React, { useEffect, useState, useMemo } from "react";
import {Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getSprIndex } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";


const Spr = () => {

    const [sprList, setSprList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.Report.sprIndex,
    }));

    useEffect(()=>{
        dispatch( getSprIndex(history) );
    }, [dispatch]);

    useEffect(() => {
        if(response.payments){
            setSprList(response.payments);
        }
    }, [response]);

    if(response.payments){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const columns = useMemo(() => 
        [
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Customer",
                accessor: "customer",
            },
            {
                Header: "Payment No",
                accessor: "payment_no",
            },
            {
                Header: "Sale Invoice",
                accessor: "sale_invoice",
            },
            {
                Header: "Amount ($)",
                accessor: "amount",
            },
            {
                Header: "Payment Method",
                accessor: "payment_method",
            },
            {
                Header: "Payment Note",
                accessor: "payment_note",
            },
            {
                Header: "Finalized By",
                accessor: "finalized_by",
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.payments.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setSprList(filteredData)
        }
        else {
            if(response.payments){
                setSprList(response.payments);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Date", "Customer", "Payment No",	"Sale Invoice",	"Amount", "Payment Method", "Payment Note",	"Finalized By"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Sale Payment Report";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date, data.original.customer, data.original.payment_no, data.original.sale_invoice, data.original.amount, data.original.payment_method, data.original.payment_note, data.original.finalized_by])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Sale_Payment_Report.pdf")
    }


    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Sale Payment Report</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Sale Payment Report</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.date, data.original.customer, data.original.payment_no, data.original.sale_invoice, data.original.amount, data.original.payment_method, data.original.payment_note, data.original.finalized_by] )}
                                            filename = "Sale_Payment_Report.csv"
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
                                                    placeholder="Search for payment no, sale invoice or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}> </Col>

                                        <Col sm={4} xxl={3}> </Col>

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
                                            data={sprList}
                                            customPageSize={10}
                                            maxLength={response.payments?response.payments.length:10}
                                            filteredLength={sprList.length} 
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


export default Spr;