import React, { useEffect, useState, useMemo } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner } from "reactstrap";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getSupplierCredit } from '../../../store/actions';
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableContainer from "./TableContainer";



const SupplierCredit = (props) => {

    const id = props.match.params.id;

    const supplier_credit = props.location.state ? props.location.state.supplier_credit : '';

    const [supplierCredit, setSupplierCredit] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.Contact.response,
    }));

    useEffect(()=>{
        dispatch(getSupplierCredit( id, history ));
    }, [dispatch]);

    useEffect(() => {
        if(response.supplier_credit_history){
            setSupplierCredit(response.supplier_credit_history);
        }
    }, [response]);

    if(response.supplier_credit_history){
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
                accessor: 'amount',
                Header: 'Amount ($)'
            },
            {
                accessor: 'type',
                Header: 'Type'
            },
            {
                accessor:"purchase_invoice",
                Header:"Purchase Invoice",
                Cell: (cellProps) => (
					<span>{cellProps.cell.row.original.purchase_invoice ? cellProps.cell.row.original.purchase_invoice : "N/A"}</span>
				),
            },
            {
                accessor:"purchase_return_invoice",
                Header:"Purchase Return Invoice",
                Cell: (cellProps) => (
					<span>{cellProps.cell.row.original.purchase_return_invoice ? cellProps.cell.row.original.purchase_return_invoice : "N/A"}</span>
				),
            },
            {
                accessor:"note",
                Header:"Note",
                Cell: (cellProps) => (
					<span>{cellProps.cell.row.original.note ? cellProps.cell.row.original.note : "N/A"}</span>
				),
            },
            {
                accessor:"finalized_by",
                Header:"Finalized By",
                Cell: (cellProps) => (
					<span>{cellProps.cell.row.original.finalized_by ? cellProps.cell.row.original.finalized_by : "-"}</span>
				),
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.supplier_credit_history.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setSupplierCredit(filteredData)
        }
        else {
            if(response.supplier_credit_history){
                setSupplierCredit(response.supplier_credit_history);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Date", "Amount ($)", "Type", "Purchase Invoice", "Purchase Return Invoice", "Note", "Finalized By"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Supplier Credit List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date , data.original.amount, data.original.type, data.original.purchase_invoice, data.original.purchase_return_invoice, data.original.note ? data.original.note : "N/A", data.original.finalized_by])

        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Supplier_Credit_List.pdf")
    }

    return (
        <div className="page-content">
            <MetaTags>
                <title>Supplier Credit</title>
            </MetaTags>
            <Container fluid>
                <BreadCrumb title="Supplier Details" pageTitle="Suppliers" link="/supplier-list"/>
                <Row>
                    <Col lg={12}>
                        <Card id="supplierCreditList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Supplier Credit History</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        
                                        <CSVLink 
                                            headers={tableHeaders}
                                           data={filteredData.map( data => [data.original.date , data.original.amount, data.original.type, data.original.purchase_invoice, data.original.purchase_return_invoice, data.original.note ? data.original.note : "N/A", data.original.finalized_by] )}
                                            filename = "Supplier_Credit_List.csv"
                                            >
                                            <button type="button" className="btn btn-primary">
                                                <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                                                CSV
                                            </button>
                                        </CSVLink>
                                    </div>
                                </div>
                                <div className="text-muted fs-14 mt-4">
                                    Current Available Credit :{" "} <span className="text-primary fw-medium"> $ {supplier_credit} </span>
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
                                                    placeholder="Search for date, type, credit amount or something..."
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
                                            data={supplierCredit}
                                            customPageSize={10}
                                            maxLength={response.supplier_credit_history ? response.supplier_credit_history.length : 10}
                                            filteredLength={supplierCredit.length} 
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


export default SupplierCredit;