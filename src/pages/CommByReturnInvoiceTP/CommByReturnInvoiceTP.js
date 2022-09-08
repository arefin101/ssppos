import React, { useEffect, useState, useMemo } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner } from "reactstrap";
import Select from "react-select";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getCommByReturnInvoiceTp, getSalesmanDropdown } from '../../store/actions';

const CommByReturnInvoiceTP = () => {

    const [selectedSalesman, setSelectedSalesman] = useState(null);
    const [preLoader, setPreLoader] = useState(false);
    const [list, setList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    let allSalesmen = [];

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch( getSalesmanDropdown(history) );
      response.commission_by_return_invoice = [];
    }, []);

    const { salesmen, response } = useSelector(state => ({
      response: state.ReportTP.commByReturnInvoice,
      salesmen: state.ReportTP.salesmanDropdown,
    }));

    if(salesmen.salesmen){
        allSalesmen = salesmen.salesmen?.map(item => {
            return {value:item.id, label:`${item.first_name} ${item.last_name}`}
        });
    }

    useEffect(() => {
        let salesmanId = selectedSalesman ? selectedSalesman.value : "";
        dispatch( getCommByReturnInvoiceTp(salesmanId, history) );
    }, [selectedSalesman]);


    if(localStorage.getItem("commByReturnInvoice")){
        setPreLoader(false);
        localStorage.removeItem("commByReturnInvoice");
    }

    useEffect(() => {
        if(response.commission_by_return_invoice){
            setList(response.commission_by_return_invoice);
        }
    }, [response]);

    

    const columns = useMemo(() => 
        [
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Return Invoice",
                accessor: "return_invoice",
            },
            {
                Header: "Sale Invoice",
                accessor: "sale_invoice",
            },
            {
                Header: "Customer",
                accessor: "customer",
            },
            {
                Header: "Commission ($)",
                accessor: "commission",
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.commission_by_return_invoice.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setList(filteredData)
        }
        else {
            if(response.commission_by_return_invoice){
                setList(response.commission_by_return_invoice);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        setSelectedSalesman(null);
        searchItems("");
    };

    const tableHeaders = ["Date", "Return Invoice", "Sale Invoice", "Customer", "Commission ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "portrait"; 
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Commission By Return Invoice";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date, data.original.return_invoice, data.original.sale_invoice, data.original.customer, data.original.commission])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("commission_by_return_invoice_TP.pdf")
    }

    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Commission By Return Invoice</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Commission By Return Invoice</h5>

                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map(data => [data.original.date, data.original.return_invoice, data.original.sale_invoice, data.original.customer, data.original.commission])}
                                            filename="commission_by_return_invoice_TP.csv"
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
                                                    placeholder="Search for type, reference or something..."
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
                                                    options={allSalesmen}
                                                    placeholder="Select Salesman"
                                                    name="choices-single-default"
                                                    id="salesman"
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
                                    {preLoader ?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div> :
                                    <TableContainer
                                        columns={columns}
                                        data={list}
                                        customPageSize={10}
                                        maxLength={response.commission_by_return_invoice ? response.commission_by_return_invoice.length : 10}
                                        filteredLength={list.length} 
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

export default CommByReturnInvoiceTP