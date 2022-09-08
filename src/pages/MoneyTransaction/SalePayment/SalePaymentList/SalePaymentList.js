import React, { useEffect, useState, useMemo, useRef } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getInvoiceList } from '../../../../store/payment/action';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import LoadingBar from 'react-top-loading-bar';



const SalePaymentList = () => {

    const [salePaymentList, setSalePaymentList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const history = useHistory();

    const ref = useRef(null);

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.Payment.invoiceList,
    }));

    useEffect(() => {
        if(localStorage.getItem("createSalePayment")){
            successnotify("Sale payment successful !");
            localStorage.removeItem("createSalePayment");
            ref.current.complete();
        }
    }, [localStorage.getItem("createSalePayment")]);

    useEffect(()=>{
        dispatch(getInvoiceList(history));
    }, [dispatch]);

    useEffect(() => {
        if(response.sale_transactions){
            setSalePaymentList(response.sale_transactions);
        }
    }, [response]);

    if(response.sale_transactions){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const makePayment = (url, invoiceNo, due, id) => {
        history.push(url, {invoiceNo: invoiceNo, due: due, id: id});
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
                accessor: "payment_status",
                Header: "Payment Status",
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
                accessor: "total_payable",
                Header: "Total Payable"
            },
            {
                accessor: "paid",
                Header: "Paid ($)"
            },
            {
                accessor: "due",
                Header: "Due ($)"
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                        <UncontrolledDropdown >
                        <DropdownToggle
                            href="#"
                            className="btn-soft-secondary btn-sm dropdown"
                            tag="button"
                        >
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">

                            <DropdownItem onClick={() => makePayment(`/add-sale-payment/${cellProps.cell.row.original.id}`, cellProps.cell.row.original.invoice_no, cellProps.cell.row.original.due, cellProps.cell.row.original.id )}>
                                <i className='ri-eye-fill eye-icon'></i> 
                                Make Payment 
                            </DropdownItem>
            
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    );
                },
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.sale_transactions.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setSalePaymentList(filteredData)
        }
        else {
            if(response.sale_transactions){
                setSalePaymentList(response.sale_transactions);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Date", "Invoice No",	"Customer",	"Payment Status", "Total Payable", "Paid ($)",	"Due ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Sale Invoice List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date, data.original.invoice_no, data.original.customer, data.original.payment_status, data.original.total_payable, data.original.paid, data.original.due])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Sale_Invoice_List.pdf")
    }


    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <MetaTags>
                <title>Sale Invoice (Due/Partial)</title>
            </MetaTags>
            <Container fluid>
                <BreadCrumb title="Sale Invoice List" pageTitle="Money Transactions" link="/money-transactions"/>
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Sale Invoice (Due/Partial)</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.date, data.original.invoice_no, data.original.customer, data.original.payment_status, data.original.total_payable, data.original.paid, data.original.due] )}
                                            filename = "Sale_Payment_Report.csv"
                                            >
                                            <button type="button" className="btn btn-success">
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
                                                    placeholder="Search for invoice no, customer name, payment status or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}>
                                            {/* <div>
                                                <Flatpickr
                                                    className="form-control bg-light border-light"
                                                    id="datepicker-publish-input"
                                                    placeholder="Select a date"
                                                    options={{
                                                        altInput: true,
                                                        altFormat: "F j, Y",
                                                        mode: "multiple",
                                                        dateFormat: "d.m.y",
                                                    }}
                                                />
                                            </div> */}
                                        </Col>

                                        <Col sm={4} xxl={3}>
                                            {/* <div>
                                                <Select
                                                    isClearable={true}
                                                    value={orderStatus}
                                                    onChange={() => {
                                                        handleorderStatus();
                                                    }}
                                                    options={orderstatus}
                                                    name="choices-single-default"
                                                    id="idStatus"
                                                ></Select>
                                            </div> */}
                                        </Col>

                                        <Col sm={4} xxl={1}>
                                            <div>
                                                <Button color="primary" className="w-100" onClick={reset}>
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
                                            data={salePaymentList}
                                            customPageSize={10}
                                            maxLength={response.sale_transactions?response.sale_transactions.length:10}
                                            filteredLength={salePaymentList.length} 
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

                <ToastContainer/>
            </Container>
        </div>
    )
}


export default SalePaymentList;