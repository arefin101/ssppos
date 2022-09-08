import React, { useEffect, useState, useMemo } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner } from "reactstrap";
import Select from "react-select";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getSasIndex, getSasIndexView } from '../../store/actions';

const SAS = () => {

    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const [availableCredit, setAvailableCredit] = useState(null);

    const [preLoader, setPreLoader] = useState(false);

    const [SASList, setSASList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    let allSuppliers = [];

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( getSasIndexView(history) );
        response.statements = [];
    }, []);

    const { suppliers, response } = useSelector(state => ({
        response: state.Report.sasIndex,
        suppliers: state.Report.sasIndexView,
    }));

    if(suppliers.suppliers){
        allSuppliers = suppliers.suppliers?.map(item => {
            return {value:item.id, label:`${item.business_name} (${item.first_name} ${item.last_name})`}
        });
    }

    useEffect(() => {
        let supplierId = selectedSupplier ? selectedSupplier.value : "";
        dispatch( getSasIndex(supplierId, history) );
    }, [selectedSupplier]);


    if(localStorage.getItem("SasIndex")){
        setPreLoader(false);
        localStorage.removeItem("SasIndex");
    }

    useEffect(() => {
        if(response.statements){
            setSASList(response.statements);
        }
    }, [response]);

    useEffect(() => {
        setAvailableCredit(null);
        if(response.available_credit){
            setAvailableCredit(response.available_credit);
        }
    }, [response.available_credit]);

    const columns = useMemo(() => 
        [
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Type",
                accessor: "type",
            },
            {
                Header: "Reference",
                accessor: "reference",
            },
            {
                Header: "Payment Method",
                accessor: "payment_method",
            },
            {
                Header: "Amount ($)",
                accessor: "amount",
                Cell: (cellProps) => (
                    cellProps.cell.row.original.type === "Return" 
                    ? <span>{cellProps.cell.row.original.amount} <br />{cellProps.cell.row.original.amount_credited} <span className="badge badge-soft-success">Credited</span>  <br /> {(cellProps.cell.row.original.amount_adjusted).toFixed(2)} <span className="badge badge-soft-primary">Adjusted</span> </span> 
                    : cellProps.cell.row.original.amount 
                ),
                

            },
            {
                Header: "Balance",
                accessor: "balance",
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.statements.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setSASList(filteredData)
        }
        else {
            if(response.statements){
                setSASList(response.statements);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        setSelectedSupplier(null);
        searchItems("");
    };

    const tableHeaders = ["Date", "Type", "Reference",	"Payment Method", "Amount ($)", "Balance"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Supplier Account Statement (SAS)";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date, data.original.type, data.original.reference, data.original.payment_method, data.original.amount, data.original.balance])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Supplier_Account_Statement.pdf")
    }

    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Supplier Account Statement (SAS)</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Supplier Account Statement (SAS)</h5>

                                    {/* <PdfCsvButtons pageTitle={pageTitle} tableData={tableData} tableHeaders={tableHeaders} filteredData={filteredData}/> */}

                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map(data => [data.original.date, data.original.type, data.original.reference, data.original.payment_method, data.original.amount, data.original.balance])}
                                            filename="Supplier_Account_Statement.csv"
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
                                                    value={selectedSupplier}
                                                    onChange={setSelectedSupplier}
                                                    options={allSuppliers}
                                                    placeholder="Select Supplier"
                                                    name="choices-single-default"
                                                    id="supplier"
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
                                        data={SASList}
                                        customPageSize={10}
                                        maxLength={response.statements ? response.statements.length : 10}
                                        filteredLength={SASList.length} 
                                        isExtraFeature={true}
                                        isGlobalSearch={true}
                                        setFilteredData={setFilteredData}
                                        availableCredit={availableCredit}
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

export default SAS;