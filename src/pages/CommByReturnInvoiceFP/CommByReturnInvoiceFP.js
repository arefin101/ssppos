import React from 'react'
import  { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Form,
  Button,
  Spinner,
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getComissionByReturnInvoiceFPView, hasPermission } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CommByReturnInvoiceFP = () => {

    const [comissionByReturnInvoice, setComissionByReturnInvoice] = useState([]);
    
    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.ReportFP.comissionbyReturnInvoice,
    }));

    useEffect(()=>{
        dispatch( getComissionByReturnInvoiceFPView(history) );
    }, [dispatch]);

    useEffect(() => {
        if(response){
            if(response.commission_by_return_invoice){
                setComissionByReturnInvoice(response.commission_by_return_invoice);
            }
        }
    }, [response]);

    if(response){
        if(response.commission_by_return_invoice){
            if(preLoader){
                setPreLoader(false);
            }
        }
    }
    const salesDueFP = (url) => {
        history.push(url);
    };

    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1
                }
            },
            {
                accessor: 'date',
                Header: 'Date'
            },
            {
                accessor: 'return_invoice',
                Header: 'Return Invoice'
            },
            {
                accessor: 'sale_invoice',
                Header: 'Sale Invoice'
            },
            {
                accessor: 'customer',
                Header: 'Customer'
            },
            {
                accessor: 'commission',
                Header: 'Commission ($)'
            },
            
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.commission_by_return_invoice.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setComissionByReturnInvoice(filteredData);
        }
        else {
            if(response.commission_by_return_invoice){
                setComissionByReturnInvoice(response.commission_by_return_invoice);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Date", "Return Invoice", "Sale Invoice", "Customer" , "Commission ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
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
        doc.save("commission_by_return_invoice.pdf")
    }

  return (
    <div className="page-content">
            {/* <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} /> */}
            <MetaTags>
                <title>Commission By Return Invoice</title>
            </MetaTags>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Commission By Return Invoice</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.date, data.original.return_invoice, data.original.sale_invoice, data.original.customer, data.original.commission] )}
                                            filename = "commission_by_return_invoice.csv"
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
                                                    placeholder="Search for supplier ID, name, email or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}></Col>

                                        <Col sm={4} xxl={3}></Col>

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
                                            data={comissionByReturnInvoice}
                                            customPageSize={10}
                                            maxLength={response.commission_by_return_invoice ? response.commission_by_return_invoice.length:10}
                                            filteredLength={comissionByReturnInvoice.length} 
                                            setFilteredData={setFilteredData}
                                            divClass="table-responsive"
                                            className="custom-header-css"
                                        />
                                    </div>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* <ToastContainer/> */}
            </Container>
        </div>

  )
}

export default CommByReturnInvoiceFP