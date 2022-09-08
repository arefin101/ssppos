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
import { getSalesDueFPView, hasPermission } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";


const SalesDueFP = () => {
    
        const [salesDueFPList, setSalesDueFPList] = useState([]);
    
        const [filteredData, setFilteredData] = useState([]);
    
        const [preLoader, setPreLoader] = useState(true);
    
        const history = useHistory();
    
        const dispatch = useDispatch();
    
        const { response } = useSelector(state => ({
            response: state.ReportFP.salesDueFP,
        }));
    
        useEffect(()=>{
            dispatch( getSalesDueFPView(history) );
        }, [dispatch]);
    
        useEffect(() => {
            if(response){
                if(response.sales_due){
                    setSalesDueFPList(response.sales_due);
                }
            }
        }, [response]);

        if(response){
            if(response.sales_due){
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
                    accessor: 'invoice_no',
                    Header: 'Invoice No'
                },
                {
                    accessor: 'customer',
                    Header: 'Customer'
                },
                {
                    Header: "Payment Status",
                    accessor: "payment_status",
                    Cell: (payment_status) => (
                        <>
                        <span
                            className={
                            (payment_status.row.original.payment_status === "Paid")?
                            "badge text-uppercase badge-soft-success fs-11"
                            :(payment_status.row.original.payment_status === "Partial")?
                            "badge text-uppercase badge-soft-primary fs-11"
                            :"badge text-uppercase badge-soft-danger fs-11"
                            }
                        >
                            {payment_status.row.original.payment_status}
                        </span>
                        </>
                    ),
                },
                {
                    accessor: 'total_payable',
                    Header: 'Total Payable'
                },
                {
                    accessor: 'paid',
                    Header: 'Paid'
                },
                {
                    accessor: 'due',
                    Header: 'Due'
                },
                
            ],
            []
        )
    
        const searchItems = (searchValue) => {
    
            if (searchValue !== '') {
    
                const filteredData = response.sales_due.filter((item) => {
                    return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
                })
                setSalesDueFPList(filteredData);
            }
            else {
                if(response.sales_due){
                    setSalesDueFPList(response.sales_due);
                }
            }
        };
    
        const reset = () => {
            document.getElementById('search').value = "";
            searchItems("");
        };
    
        const tableHeaders = ["Date", "Invoice No", "Customer", "Payment Status" , "Total Payable" , "Paid" , "Due"];
    
        const exportPDF = () => {
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape
        
            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);
        
            doc.setFontSize(15);
        
            const title = "Sales Due";
            const headers = [tableHeaders];
            const data = filteredData.map(data => [data.original.date, data.original.invoice_no, data.original.customer, data.original.payment_status, data.original.total_payable, data.original.paid, data.original.due])
           
            let content = {
                startY: 50,
                head: headers,
                body: data
            };
        
            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("Sales_due.pdf")
        }



  return (
    <div className="page-content">
            <MetaTags>
                <title>Sales Due</title>
            </MetaTags>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Sales Due</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.date, data.original.invoice_no, data.original.customer, data.original.payment_status, data.original.total_payable, data.original.paid, data.original.due] )}
                                            filename = "sale_due.csv"
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
                                            data={salesDueFPList}
                                            customPageSize={10}
                                            maxLength={response.salesDueFPList ? response.salesDueFPList.length:10}
                                            filteredLength={salesDueFPList.length} 
                                            // isExtraFeature={true}
                                            // isGlobalSearch={true}
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

export default SalesDueFP