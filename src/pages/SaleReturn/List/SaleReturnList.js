import React, {useEffect, useState, useMemo, useRef} from 'react';
import { MetaTags } from 'react-meta-tags';
import {ToastContainer, toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { saleReturnList, getSaleReturnInvoice, saleReturnVerification, hasPermission } from '../../../store/actions';
import { useHistory, Link } from 'react-router-dom';
import { CSVLink } from "react-csv";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, Modal, ModalBody, Button, CardBody, Row, Col, Card, Table, CardHeader, Container, Form, Label, Input, FormGroup, FormFeedback } from 'reactstrap';
import smartphoneDepotLogo from "../../../assets/images/smartphone-depot-logo.png";
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingBar from 'react-top-loading-bar';
import config from '../../../config';



const SaleReturnList = () => {

    const ref = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const [preLoader, setPreLoader] = useState(true);
    const [list, setList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [transactionId, setTransactionId] = useState(0);
    const [invNo, setInvNo] = useState("");

    let saleReturnTransactions = [];
    let products = [];
    let serialList = [];
    let productsSerial = 0;
    let listSerial = 0;

    const { saleReturnListResponse, invoiceResponse, saleReturnVerifyPermission, verifyResponse, verifyError } = useSelector(state => ({
        saleReturnListResponse: state.Sale.saleReturnList,
        invoiceResponse: state.Sale.saleReturnInvoiceResponse,
        saleReturnVerifyPermission: state.General.saleReturnVerifyPermission,
        verifyResponse: state.Sale.verifyResponse,
        verifyError: state.Sale.verifyError?state.Sale.verifyError:{},
    }));

    useEffect(() => {
        dispatch(hasPermission("sale-return.verification", history));
        dispatch(saleReturnList(history));
    }, []);

    useEffect(() => {
        if(saleReturnListResponse.sale_return_transactions){
            setList(saleReturnListResponse.sale_return_transactions);
        }
    }, [saleReturnListResponse]);


    if(saleReturnListResponse.sale_return_transactions) {
        if(preLoader){
            setPreLoader(false);
        }
    }

    if(invoiceResponse.sale_return_transaction){
        saleReturnTransactions = invoiceResponse.sale_return_transaction;
    }

    if(invoiceResponse.product_summary){
        products = invoiceResponse.product_summary;
    }

    if(invoiceResponse.serial_list){
        serialList = invoiceResponse.serial_list;
    }



    const saleReturnVariation = (url) => {
        history.push(url);
    }



    // Verification

    const [verifyModal, setVerifyModal] = useState(false);
    const [verifyStatusRadio, setVerifyStatusRadio] = useState('');
    
    const verifyValidation = useFormik({
        enableReinitialize: true,

        initialValues: {
            sale_return_transaction_id: transactionId,
            verification_status: "",
            verification_note: "",
            pin_number: "",
        },

        validationSchema: Yup.object({
            verification_status: Yup.string().required("Please select an option"),
            pin_number: Yup.string().required("Please enter pin number"),
        }),

        onSubmit: (values, {resetForm}) => {
            dispatch(saleReturnVerification(values, history));
            resetForm({ values: '' });
            setVerifyStatusRadio(-1)
        },
    });

    const verificationForm = (e) => {
        e.preventDefault();
        verifyValidation.handleSubmit();
        return false;
    }

    const handleVerification = (id, invNo) => {
        setInvNo(invNo);
        setTransactionId(id);
        togVerifyModal();
    }
    
    function togVerifyModal() {
        setVerifyModal(!verifyModal);
    }

    useEffect(() => {
        dispatch(saleReturnList(history));
        setVerifyModal(false);
        clearVerifyErrors();

    }, [verifyResponse]);

    const clearVerifyErrors = () => {
        if(verifyError){
            verifyError.pin_number = "";
            verifyError.verification_status = "";
        }
    }

    // --end-- Verification



    // table properties
    let tableHeaders = ["Status", "Date", "Return Invoice", "Sale Invoice",	"Customer",	"Total Items", "Amount ($)", "Amount Credited ($)", "Amount Adjusted ($)", "Verification Note", "Finalized By", "Verified By"];

    const columns = useMemo(() => 
        [
            {
                Header: "Status",
                accessor: "verification_status",
                Cell: (cellProps) => (
                    cellProps.cell.row.original.verification_status === 2 ?
                    <span className="text-mod-blue fw-bold">Not Verified</span> :
                    cellProps.cell.row.original.verification_status === 1 ?
                    <span className="text-success fw-bold">Okay</span> :
                    <span className="text-red fw-bold">Not Okay</span>
                ),
            },
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Return Invoice",
                accessor: "return_invoice",
                Cell: (cellProps) => {
                    return (
                        <span onClick={() => handleInvoiceModal(cellProps.cell.row.original.id)} className="text-link pointer">
                            {cellProps.cell.row.original.return_invoice}
                        </span>
                    )
                }
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
                Header: "Total Items",
                accessor: "total_items",
            },
            {
                Header: "Amount ($)",
                accessor: "amount",
            },
            {
                Header: "Amount Credited ($)",
                accessor: "amount_credited",
            },
            {
                Header: "Amount Adjusted ($)",
                accessor: "amount_adjusted",
            },
            {
                Header: "Verification Note",
                accessor: "verification_note",
                Cell: (cellProps) => (
                    <span>{cellProps.cell.row.original.verification_note !== null ? cellProps.cell.row.original.verification_note : "N/A" }</span>
                ),
            },
            {
                Header: "Finalized By",
                accessor: "finalized_by",
                //disableSortBy: true
            },
            {
                Header: "Verified By",
                accessor: "verified_by",
                Cell: (cellProps) => (
                    <span>{cellProps.cell.row.original.verified_by !== "" ? cellProps.cell.row.original.verified_by : "-" }</span>
                ),
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

                            <DropdownItem onClick={() => handleInvoiceModal(cellProps.cell.row.original.id)}><i style={{marginRight:'10px', verticalAlign: 'bottom' }} className='ri-eye-fill text-primary'></i>View Invoice</DropdownItem>

                            <DropdownItem onClick={() => saleReturnVariation(`/sale-return-variations/${cellProps.cell.row.original.id}`)}>
                                <i className='ri-eye-fill eye-icon'></i>Sale Return Variations
                            </DropdownItem>

                            {
                                saleReturnVerifyPermission && 
                                <DropdownItem onClick={() => handleVerification(cellProps.cell.row.original.id, cellProps.cell.row.original.return_invoice)}><i className='mdi mdi-checkbox-marked-circle-outline text-success fs-14 vertical-middle me-1'></i> Verify</DropdownItem>
                            }
            
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        [saleReturnVerifyPermission]
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = saleReturnListResponse.sale_return_transactions.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setList(filteredData)
        }
        else {
            if(saleReturnListResponse.sale_return_transactions){
                setList(saleReturnListResponse.sale_return_transactions);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Sale Return List";
        const headers = [tableHeaders];
        const data = filteredData.map(data =>[
            data.original.verification_status === 2 ? "Not Verified" : data.original.verification_status === 1 ? "Okay" : "Not Okay", 
            data.original.date, data.original.return_invoice, data.original.sale_invoice, data.original.customer, data.original.total_items, data.original.amount,
            data.original.amount_credited, data.original.amount_adjusted, 
            data.original.verification_note !== null ? data.original.verification_note : "N/A", 
            data.original.finalized_by, data.original.verified_by])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("sale_return_list.pdf")
    }



    // Modal
    const [invoiceModal, setInvoiceModal] = useState(false);

    function handleInvoiceModal(id) {
        ref.current.continuousStart()
        dispatch( getSaleReturnInvoice(id, history) );
    }

    useEffect(() => {
        if(localStorage.getItem("SaleReturnInvoice")){
            setInvoiceModal(!invoiceModal);
            ref.current.complete();
            localStorage.removeItem("SaleReturnInvoice")
        }
    }, [localStorage.getItem("SaleReturnInvoice")]);

    function togInvoiceModal(){
        setInvoiceModal(!invoiceModal);
    }


    
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    useEffect(() => {
        if(localStorage.getItem("saleReturn")){
            ref.current.complete();
            successnotify("Sale return successful");
            localStorage.removeItem("saleReturn");
        }
    }, [localStorage.getItem("saleReturn")]);

    
    
    const token = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : "";

    function downloadFile(filePath, invoiceNo){
        var link=document.createElement('a');
        link.href = filePath;
        link.download = `SaleReturnInvoice_${invoiceNo}.pdf`;
        link.click();
    }

    const downloadSaleReturn = (id, invoiceNo) => {
        ref.current.continuousStart();
        let url = `${config.API_URL}/sale-return/downlaod-sale-return-invoice/${id}`;
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => (
            res.blob()
        )).then((data) => {
            ref.current.complete();
            downloadFile(URL.createObjectURL(data), invoiceNo)
        });
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Sale Return List</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Sale Return List</h4>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders} 
                                            data={filteredData.map(data => [
                                                data.original.verification_status === 2 ? "Not Verified" : data.original.verification_status === 1 ? "Okay" : "Not Okay", 
                                                data.original.date, data.original.return_invoice, data.original.sale_invoice, data.original.customer, data.original.total_items, data.original.amount, data.original.amount_credited, data.original.amount_adjusted,
                                                data.original.verification_note !== null ? data.original.verification_note : "N/A",  data.original.finalized_by, data.original.verified_by])}
                                            filename="Sale_Return_List.csv"
                                        >
                                            <button type="button" className="btn btn-primary">
                                                <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                                                CSV
                                            </button>
                                        </CSVLink>
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
                                                        placeholder="Search for return invoice, sale invoice, customer name or something..."
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
                                    <div>
                                        {
                                        preLoader ?
                                        <div className="spinner-box">
                                            <Spinner color="primary"> Loading... </Spinner> 
                                        </div>
                                        :
                                        <div>
                                            <TableContainer
                                                columns={columns}
                                                data={list}
                                                customPageSize={10}
                                                maxLength={saleReturnListResponse.sale_return_transactions ? saleReturnListResponse.sale_return_transactions.length : 10}
                                                filteredLength={list.length} 
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
                    <ToastContainer />


                    
                    <Modal
                        size="xl"
                        isOpen={invoiceModal}
                        toggle={() => {
                            togInvoiceModal();
                        }}
                        className="modal-xl"
                    >
                        <ModalBody className='p-0'>
                            <Row className="justify-content-center">
                            <Col xxl={12}>
                                <Card className='mb-0'>
                                    <CardHeader className="border-bottom-dashed p-4">
                                        <div className="d-sm-flex">
                                        <div className="flex-grow-1">
                                            <img src={smartphoneDepotLogo} className="card-logo card-logo-dark" alt="logo dark" height="50" />
                                            <img src={smartphoneDepotLogo} className="card-logo card-logo-light" alt="logo light" height="50" />
                                            <div className="mt-sm-5 mt-4">
                                                <h6 className="text-muted text-uppercase fw-semibold">Smartphone-Depot</h6>
                                                <p className="text-muted mb-1">2735 Hartland Road. Suite 303</p>
                                                <p className="text-muted mb-0">Falls Church, VA 22043</p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 mt-sm-0 mt-3">
                                            <h6 className="text-muted fw-normal">Contact Information :</h6>
                                            <h6 > <span className="text-muted fw-normal">Contact No:</span>{" "} 571-529-4022 </h6>
                                            <h6>
                                                <span className="text-muted fw-normal">Email:</span>{" "}sales@smartphone-depot.com
                                            </h6>
                                            <h6 className="mb-0">
                                                <span className="text-muted fw-normal">Website:</span>{" "}
                                                <a href="https://www.smartphone-depot.com/" target="_blank" className="link-primary"> www.smartphone-depot.com </a>
                                            </h6>
                                        </div>
                                        </div>
                                    </CardHeader>

                                    <CardBody className="p-4">
                                        <Row className="g-3">
                                            <Col lg={3} xs={6}>
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Invoice No</p>
                                                <h5 className="fs-14 mb-0">{saleReturnTransactions.invoice_no}</h5>
                                            </Col>
                                            <Col lg={3} xs={6}>
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Date</p>
                                                <h5 className="fs-14 mb-0">{saleReturnTransactions.date}</h5>
                                            </Col>
                                            <Col lg={3} xs={6}>
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">Parent Invoice</p>
                                                <h5 className="fs-14 mb-0">{saleReturnTransactions.parent_invoice}</h5>
                                            </Col>
                                            <Col lg={3} xs={6}>
                                                <p className="text-muted mb-2 text-uppercase fw-semibold">
                                                Total
                                                </p>
                                                <h5 className="fs-14 mb-0">${saleReturnTransactions.total}</h5>
                                            </Col>
                                        </Row>
                                    </CardBody>

                                    <CardBody className="p-4 border-top border-top-dashed">
                                        <Row className="g-3">
                                            <Col sm={6}>
                                                <h6 className="text-muted text-uppercase fw-semibold mb-2">  Customer </h6>
                                                <p className="fw-medium mb-2">{saleReturnTransactions.customer}</p>
                                            </Col>
                                        </Row>
                                    </CardBody>

                                    <CardBody className="p-4">
                                        <div className="table-responsive">
                                            <h5 className="fs-16 mb-2">Products:</h5>
                                            <Table className="table-borderless table-nowrap align-center mb-0">
                                                <thead>
                                                    <tr className="table-active">
                                                        <th scope="col" style={{ width: "50px" }}>#</th>
                                                        <th scope="col">Product Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit Price ($)</th>
                                                        <th scope="col" className="text-end">Subtotal ($)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        products.map(elmt => (
                                                            <tr key={productsSerial}>
                                                                <th scope="row">{++productsSerial}</th>
                                                                <td className="text-start">{elmt.name}</td>
                                                                <td>{elmt.quantity}</td>
                                                                <td>${elmt.unit_price}</td>
                                                                <td className="text-end">${(elmt.unit_price * elmt.quantity).toFixed(2)}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                    <tr className="border-top border-top-dashed mt-2">
                                                        <td colSpan="3"></td>
                                                        <td colSpan="2" className="fw-medium p-0">
                                                            <Table className="table-borderless text-start table-nowrap align-middle mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Total </td>
                                                                        <td className="text-end">${(parseFloat(saleReturnTransactions.total) + parseFloat(saleReturnTransactions.return_deduction)).toFixed(2)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Return Deduction</td>
                                                                        <td className="text-end">${saleReturnTransactions.return_deduction}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Total Amount</td>
                                                                        <td className="text-end">${saleReturnTransactions.total}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Amount Credited</td>
                                                                        <td className="text-end">${saleReturnTransactions.amount_credited}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Amount Adjusted</td>
                                                                        <td className="text-end">${saleReturnTransactions.amount_adjusted}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                        {
                                            serialList.length > 0 
                                            ?
                                            <div className="mt-5">
                                                <h5 className="fs-16 mb-2">IMEI/Serial List:</h5>
                                                <Card>
                                                    <CardBody className='p-0'>
                                                        <Table className="table-borderless table-nowrap align-center mb-0">
                                                            <thead>
                                                                <tr className="table-active">
                                                                    <th scope="col" style={{ width: "50px" }}>#</th>
                                                                    <th scope="col">NAME</th>
                                                                    <th scope="col">IMEI</th>
                                                                    <th scope="col">COLOR</th>
                                                                    <th scope="col">STORAGE</th>
                                                                    <th scope="col">CONDITION</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    serialList.map(elmt => (
                                                                        <tr key={elmt.id}>
                                                                            <th scope="row">{++listSerial}</th>
                                                                            <td>{elmt.name}</td>
                                                                            <td>{elmt.imei}</td>
                                                                            <td>{elmt.color}</td>
                                                                            <td>{elmt.storage} GB</td>
                                                                            <td>{elmt.condition}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                            : <></>
                                        }

                                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                            <Button color="light" onClick={ () => togInvoiceModal() } >Close</Button>
                                            <Button onClick={() => downloadSaleReturn(saleReturnTransactions.id, saleReturnTransactions.invoice_no)} className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1"></i>{" "}Download</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            </Row>
                        </ModalBody>
                    </Modal>



                    {/* verification modal */}                           
                    <Modal
                        isOpen={verifyModal}
                        toggle={() => {
                            togVerifyModal();
                        }}
                        centered
                        className="modal-lg"
                    >

                        <ModalBody className="p-0">
                            <Card className="m-0">
                                <CardHeader>
                                    <h4 className="card-title mb-0 flex-grow-1">Sale Return Verification</h4>
                                </CardHeader>

                                <CardBody>
                                    <span className="fw-medium text-primary"> {invNo} </span>

                                    <div className="live-preview mt-3">
                                        <Form
                                            className="needs-validation"
                                            onSubmit={(e) => verificationForm(e)}
                                                >
                                            <Row>
                                                            
                                                <Col md="12">
                                                    <FormGroup className="mb-3">
                                                        <Label className="form-check-label" for="verification_status">Is this Transaction Okay ?</Label>
                                                        <div className="d-flex verify-radio">
                                                            <div className="form-check form-radio-outline form-radio-primary mt-3 me-3">
                                                                <Input
                                                                    className="form-check-input" 
                                                                    type="radio" 
                                                                    name="verification_status" 
                                                                    id="yes"
                                                                    value={1}
                                                                    onClick={()=>{setVerifyStatusRadio(1)}}
                                                                    checked={verifyStatusRadio === 1}
                                                                    onChange={verifyValidation.handleChange} 
                                                                    invalid={
                                                                        ((verifyValidation.touched.verification_status &&
                                                                        verifyValidation.errors.verification_status) || 
                                                                        (verifyError?verifyError.verification_status?verifyError.verification_status:false:false))
                                                                        ? true
                                                                        : false
                                                                    }
                                                                />
                                                                <Label className="form-check-label" for="yes">
                                                                    Yes
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-radio-outline form-radio-primary mt-3">
                                                                <Input 
                                                                    className="form-check-input" 
                                                                    type="radio" 
                                                                    name="verification_status" 
                                                                    id="no" 
                                                                    value={0}
                                                                    onClick={()=>{setVerifyStatusRadio(0)}}
                                                                    checked={verifyStatusRadio === 0}
                                                                    onChange={verifyValidation.handleChange} 
                                                                    invalid={
                                                                        ((verifyValidation.touched.verification_status &&
                                                                        verifyValidation.errors.verification_status) || 
                                                                        (verifyError?verifyError.verification_status?verifyError.verification_status:false:false))
                                                                        ? true
                                                                        : false
                                                                    }
                                                                />
                                                                <Label className="form-check-label" for="no">
                                                                    No
                                                                </Label>
                                                                
                                                                {((verifyValidation.touched.verification_status &&
                                                                verifyValidation.errors.verification_status) || 
                                                                (verifyError?verifyError.verification_status?verifyError.verification_status:false:false)) ? (
                                                                    <FormFeedback type="invalid">
                                                                        {verifyError?
                                                                        verifyError.verification_status ? 
                                                                        verifyError.verification_status : 
                                                                        verifyValidation.errors.verification_status
                                                                        :verifyValidation.errors.verification_status}
                                                                    </FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        
                                                    
                                                    </FormGroup>
                                                </Col>
                                                <Col md="12">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="verification_note">Verification Note</Label>
                                                        
                                                        <textarea 
                                                            name="verification_note"
                                                            placeholder="Enter Description"
                                                            type="text"
                                                            className="form-control"
                                                            id="verification_note"
                                                            onChange={verifyValidation.handleChange}
                                                            onBlur={verifyValidation.handleBlur}
                                                            value={verifyValidation.values.verification_note || ""}
                                                            rows="3">
                                                        </textarea>

                                                        {((verifyValidation.touched.verification_note && 
                                                        verifyValidation.errors.verification_note) || 
                                                        (verifyError?verifyError.verification_note?verifyError.verification_note:false:false)) ? (
                                                        <FormFeedback type="invalid">
                                                            {verifyError?
                                                            verifyError.verification_note ? 
                                                            verifyError.verification_note : 
                                                            verifyValidation.errors.verification_note :
                                                            verifyValidation.errors.verification_note }
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="12">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="pin_number">Pin Number<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                        name="pin_number"
                                                        placeholder="Enter pin number"
                                                        type="password"
                                                        className="form-control"
                                                        id="pin_number"
                                                        onChange={verifyValidation.handleChange}
                                                        onBlur={verifyValidation.handleBlur}
                                                        value={verifyValidation.values.pin_number || ""}
                                                        invalid={
                                                            (verifyValidation.touched.pin_number && 
                                                            verifyValidation.errors.pin_number) || 
                                                            (verifyError?verifyError.pin_number?verifyError.pin_number:false:false)
                                                            ? true
                                                            : false
                                                        }
                                                        />
                                                        {(verifyValidation.touched.pin_number && 
                                                        verifyValidation.errors.pin_number) || 
                                                        (verifyError?verifyError.pin_number?verifyError.pin_number:false:false) ? (
                                                        <FormFeedback type="invalid">
                                                            {verifyError ?
                                                            verifyError.pin_number ?
                                                            verifyError.pin_number : 
                                                            verifyValidation.errors.pin_number :
                                                            verifyValidation.errors.pin_number}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                                
                                            </Row>
                                            <div className="hstack gap-2 justify-content-end mt-4">
                                                <Button color="primary" type="submit" className='w-md'> Submit </Button>
                                                <Button color="light" onClick={() => setVerifyModal(false)}>Close</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </ModalBody>
                    </Modal>
                    {/* --end-- verification modal */}

                </Container>
            </div>
        </React.Fragment>
    );

};

export default SaleReturnList