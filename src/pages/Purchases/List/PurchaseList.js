import React, { useEffect, useState, useMemo, useRef } from "react";
import MetaTags from "react-meta-tags";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, ModalHeader, Button, CardBody, Row, Col, Card, Table, CardHeader, UncontrolledDropdown, Form, Label, Input, FormGroup, FormFeedback } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { hasPermission, getPurchaseInvoice, purchaseToggleLock, getPurchases, purchaseVerification } from '../../../store/actions';
import { Link, useHistory } from 'react-router-dom';
import { CSVLink } from "react-csv";
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import smartphoneDepotLogo from "../../../assets/images/smartphone-depot-logo.png";
import LoadingBar from 'react-top-loading-bar';
import config from "../../../config";


const PurchaseList = (props) => {

    let purchaseTransaction = [];
    let payments = [];
    let productSummary = [];
    let imeiList = [];
    let groupList = [];
    let returnList = [];
    let productsSerial = 0;
    let imeiListSerial = 0;
    let returnListSerial = 0;
    let paymentsSerial = 0;
    
    const [preLoader, setPreLoader] = useState(true);
    const [transactionId, setTransactionId] = useState(0);
    const [lockStatus, setLockStatus] = useState(0);
    const [purchaseList, setPurchaseList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [refNo, setRefNo] = useState("");

    const radioBtn1 = document.getElementById("yes");
    const radioBtn2 = document.getElementById("no");

    const dispatch = useDispatch();
    const ref = useRef(null);

    const history = useHistory()

    useEffect(() => {
        dispatch(hasPermission("purchase-variation.store", history));
        dispatch(hasPermission("purchase.index", history));
        dispatch(hasPermission("purchase.lock", history));
        dispatch(hasPermission("purchase.verification", history));
        dispatch(hasPermission("purchase-return.store", history));
        dispatch(getPurchases(history));
    }, []);

    
    const { response, addVariationPermission, purchaseIndexPermission, purchaseLockPermission, purchaseReturnPermission, invoiceResponse, verifyResponse, verifyError, purchaseVerifyPermission } =  useSelector( state => ({
        response: state.Purchase.purchases,
        invoiceResponse: state.Purchase.invoiceResponse,
        addVariationPermission: state.General.addVariationPermission,
        purchaseIndexPermission: state.General.purchaseIndexPermission,
        purchaseLockPermission : state.General.purchaseLockPermission,
        purchaseReturnPermission: state.General.purchaseReturnPermission,
        verifyResponse: state.Purchase.verifyResponse,
        verifyError: state.Purchase.verifyError,
        purchaseVerifyPermission: state.General.purchaseVerifyPermission,
    }));


    function downloadFile(filePath, reference_no){
        var link=document.createElement('a');
        link.href = filePath;
        link.download = `PurchaseInvoice_${reference_no}.pdf`;
        link.click();
    }

    const token = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : "";

    const downloadInvoice = (id, reference_no) => {

        ref.current.continuousStart();
        let url = `${config.API_URL}/purchase/downlaod-purchase-invoice/${id}`;
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }

        }).then((res) => (
            res.blob()
        )).then((data) => {
            ref.current.complete();
            downloadFile(URL.createObjectURL(data), reference_no)
        });
    }

    useEffect(() => {
        if(response.purchase_transactions){
            setPurchaseList(response.purchase_transactions)
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [response.purchase_transactions]);

    

    // INVOICE RESPONSE
    if(invoiceResponse.purchase_transaction){
        purchaseTransaction = invoiceResponse.purchase_transaction;
    }

    if(invoiceResponse.payments){
        payments = invoiceResponse.payments;
    }

    if(invoiceResponse.product_summary){
        productSummary = invoiceResponse.product_summary;
    }

    if(invoiceResponse.serial_list){
        imeiList = invoiceResponse.serial_list;
    }

    if(invoiceResponse.group_list){
        groupList = invoiceResponse.group_list;
    }

    if(invoiceResponse.return_list){
        returnList = invoiceResponse.return_list;
    }



    const addVariations = (url, lockStatus, refNo) => {
        localStorage.setItem("setStatus", lockStatus);
        history.push(url, {lockStatus: lockStatus, refNo: refNo});
    }

    const seeVariations = (url, referenceNo) => {
        history.push(url);
    }

    // Invoice-Modal
    const [invoiceModal, setInvoiceModal] = useState(false);

    function handleInvoiceModal(id) {
        ref.current.continuousStart()
        dispatch( getPurchaseInvoice(id, history) );
        setTransactionId(id);
    }

    useEffect(() => {
        if(localStorage.getItem("purchaseInvoice")){
            setInvoiceModal(!invoiceModal);
            localStorage.removeItem("purchaseInvoice");
            ref.current.complete();
        }
    },[localStorage.getItem("purchaseInvoice")]);

    function togInvoiceModal(){
        setInvoiceModal(!invoiceModal);
    }


    // Lock Variation

    useEffect(() => {
        if(localStorage.getItem("lock-status")){
            dispatch(getPurchases(history));
            localStorage.removeItem("lock-status")
        }
    },[localStorage.getItem("lock-status")]);

    const [modal, setModal] = useState(false);

    function lockVariation(id, lockStatus){
        setTransactionId(id);
        setLockStatus(lockStatus);
        tog_center();
    }
    
    function tog_center() {
        setModal(!modal);
    }

    const modalSubmit = () => {
        dispatch( purchaseToggleLock(transactionId, history) );
        tog_center();
    }



    // Verification

    const [verifyModal, setVerifyModal] = useState(false);
    const [verifyStatusRadio, setVerifyStatusRadio] = useState('');
    
    const verifyValidation = useFormik({
        enableReinitialize: true,

        initialValues: {
            purchase_transaction_id: transactionId,
            verification_status: "",
            verification_note: "",
            pin_number: "",
        },

        // validationSchema: Yup.object({
        //     verification_status: Yup.string().required("Please select an option"),
        //     pin_number: Yup.string().required("Please enter pin number"),
        // }),

        onSubmit: (values, {resetForm}) => {
            dispatch(purchaseVerification(values, history));
            resetForm({ values: '' });
            setVerifyStatusRadio(-1)
        },
    });

    const verificationForm = (e) => {
        e.preventDefault();
        verifyValidation.handleSubmit();
        return false;
    }

    const handleVerification = (id, refNo) => {
        setRefNo(refNo);
        setTransactionId(id);
        togVerifyModal();
    }
    
    function togVerifyModal() {
        setVerifyModal(!verifyModal);
    }

    useEffect(() => {
        dispatch(getPurchases(history))

        // setPurchaseList(state => state.map( data => data.id === verifyResponse.purchase_transaction_id
        //     ? {...data, verification_status:verifyResponse.verification_status}
        //     : data
        // ))

        setVerifyModal(false);
        clearVerifyErrors();

    }, [verifyResponse]);

    const clearVerifyErrors = () => {
        verifyError.pin_number = "";
        verifyError.verification_status = "";
    }

    // --end-- Verification


    // TOASTER
    const [purchaseCreatePermissonBtn, setPurchaseCreatePermissonBtn] = useState(false)
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    useEffect(() => {

        if(localStorage.getItem('purchaseTransaction')) {
            successnotify("Purchase Created Successfully !");
            localStorage.removeItem('purchaseTransaction');
            ref.current.complete();
        }
        if(localStorage.getItem('variationsById')) {
            localStorage.removeItem('variationsById')
        }
       
    }, []);



    // PERMISSION
    const { purchaseCreatePermission } = useSelector( state => ({
        purchaseCreatePermission: state.General.createPurchasePermission,
    }));

    useEffect(()=>{
        if(purchaseCreatePermission){
            setPurchaseCreatePermissonBtn(purchaseCreatePermission)
        }
    },[purchaseCreatePermission])

    useEffect(()=>{
        dispatch(hasPermission("purchase.store" , props.history))
    },[])



    // TABLE PROPERTIES

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
                Header: " Reference No",
                accessor: "reference_no",
                Cell: (cellProps) => (<span style={{minWidth: '200px'}} onClick={() => handleInvoiceModal(cellProps.cell.row.original.id)} className="text-link pointer">
                    {cellProps.cell.row.original.reference_no} {cellProps.cell.row.original.purchase_return > 0 && <i className="las la-reply undo-icon"></i>}
                </span>),
            },
            {
                Header: "Business Name",
                accessor: "supplier",
            },
            {
                Header: "Supplier Invoice",
                accessor: "invoice_from_supplier",
                Cell: (cellProps) => (
                    cellProps.cell.row.original.invoice_from_supplier ? 
                    <span className="text-link pointer">
                        <a href={cellProps.cell.row.original.invoice_from_supplier} target='_blank' >{cellProps.cell.row.original.note_from_supplier ? cellProps.cell.row.original.note_from_supplier : "View"}</a>
                    </span> 
                    : cellProps.cell.row.original.note_from_supplier
                )
            },
            {
                Header:"Purchase Status",
                accessor: "purchase_status",
            }, 
            {
                Header: "Total Items",
                accessor: "total_items",
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
                Header:"Amount ($)",
                accessor: "amount",
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
            },
            {
                Header: "Verified By",
                accessor: "verified_by",
                Cell: (cellProps) => (
                    <span>{cellProps.cell.row.original.verified_by !== "" ? cellProps.cell.row.original.verified_by : "-" }</span>
                ),
            },
            {
                Header:"Lock Status",
                accessor: "locked",
                Cell: (locked) => (
                    <>
                    <span
                        className={
                            (locked.row.original.locked === 0) ?
                            "badge text-uppercase badge-soft-success fs-11" :
                            "badge text-uppercase badge-soft-danger fs-11"
                        }
                    >
                        { locked.row.original.locked === 0 ? "Unlocked" : "Locked"}
                    </span>
                    </>
                )
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

                            <DropdownItem onClick={() => handleInvoiceModal(cellProps.cell.row.original.id)}><i style={{marginRight:'10px', verticalAlign: 'bottom' }} className='mdi mdi-receipt text-primary'></i>View Invoice</DropdownItem>

                            { 
                                addVariationPermission &&
                                <DropdownItem onClick={() => addVariations(`/variation-store/${cellProps.cell.row.original.id}`, cellProps.cell.row.original.locked, cellProps.cell.row.original.reference_no)}><i className="ri-add-circle-line text-success" style={{ marginRight: '5px', verticalAlign: 'bottom' }}></i> Add Variations </DropdownItem>
                            }

                            { 
                                purchaseIndexPermission &&
                                <DropdownItem onClick={() => seeVariations(`/variation-list/${cellProps.cell.row.original.id}`)}><i className='ri-eye-fill eye-icon' style={{ marginRight: '5px', verticalAlign: 'bottom' }}></i> View Variations </DropdownItem>
                            }

                            {
                                purchaseReturnPermission && 
                                <DropdownItem onClick={() => purchaseReturn(`/purchase-return-terminal/${cellProps.cell.row.original.id}`)}> <i className="mdi mdi-refresh align-bottom me-2 text-primary"></i>{" "} Purchase Return </DropdownItem>
                            }

                            {
                                purchaseVerifyPermission &&
                                <DropdownItem onClick={() => handleVerification(cellProps.cell.row.original.id, cellProps.cell.row.original.reference_no)}><i className='mdi mdi-checkbox-marked-circle-outline text-success fs-14 vertical-middle me-1'></i> Verify</DropdownItem>
                            }

                            { 
                                purchaseLockPermission 
                                ?
                                cellProps.cell.row.original.locked === 0 ?
                                    <DropdownItem onClick={() => lockVariation(cellProps.cell.row.original.id, cellProps.cell.row.original.locked)}><i className='bx bxs-lock fs-16 text-muted' style={{ marginRight: '5px', verticalAlign: 'top' }}></i> Lock </DropdownItem> :
                                    <DropdownItem onClick={() => lockVariation(cellProps.cell.row.original.id, cellProps.cell.row.original.locked)}><i className='bx bxs-lock-open fs-16 text-muted' style={{ marginRight: '5px', verticalAlign: 'top' }}></i> Unlock </DropdownItem>
                                : <></>
                            }
            
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        [response, addVariationPermission, purchaseIndexPermission, purchaseVerifyPermission, purchaseLockPermission]
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.purchase_transactions.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setPurchaseList(filteredData)
        }
        else {
            if(response.purchase_transactions){
                setPurchaseList(response.purchase_transactions);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Status", "Date", "Reference No", "Business Name", "Purchase Status", "Total Items", "Payment Status", "Amount ($)", "Verification Note", "Finalized By", "Verified By"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Purchase List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [
            data.original.verification_status === 2 ? "Not Verified" : data.original.verification_status === 1 ? "Okay" : "Not Okay", 
            data.original.date, data.original.reference_no, data.original.supplier, data.original.purchase_status, data.original.total_items, data.original.payment_status, data.original.amount, 
            data.original.verification_note !== null ? data.original.verification_note : "N/A", 
            data.original.finalized_by, data.original.verified_by])

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("purchase_list.pdf")
    }

    const purchaseReturn = (url) => {
        history.push(url);
    }



    return (

        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Purchase List</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Purchase List</h4>
                                   
                                    { purchaseCreatePermissonBtn === true && <Link to='/purchases/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Create Purchase</button>
                                    </Link>}
                                    <div className="d-flex gap-2 ms-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            filename="purchase_list.csv"
                                            headers={tableHeaders}
                                            data={filteredData.map(data => [
                                                data.original.verification_status === 2 ? "NOT VERIFIED" : data.original.verification_status === 1 ? "OKAY" : "NOT OKAY", 
                                                data.original.date, data.original.reference_no, data.original.supplier, data.original.purchase_status, data.original.total_items, data.original.payment_status, data.original.amount, data.original.verification_note, data.original.finalized_by, data.original.verified_by]
                                            )}
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
                                                        placeholder="Search for reference no, supplier name, purchase status or something..."
                                                        onChange={(e) => searchItems(e.target.value)}
                                                    />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </Col>

                                            <Col sm={4} xxl={3}>
                                                
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

                                <CardBody>
                                    {
                                        preLoader
                                        ?
                                        <div className="spinner-box">
                                            <Spinner color="primary"> Loading... </Spinner> 
                                        </div>
                                        :
                                        <div className="table-container">
                                            <TableContainer
                                                columns={columns}
                                                data={purchaseList}
                                                customPageSize={10}
                                                maxLength={response.purchase_transactions?response.purchase_transactions.length:10}
                                                filteredLength={purchaseList.length} 
                                                isExtraFeature={true}
                                                isGlobalSearch={true}
                                                setFilteredData={setFilteredData}
                                                divClass="table-responsive"
                                                className="custom-header-css"
                                            />
                                        </div>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <ToastContainer/>
                </Container>
            </div>

            

            {/* invoice modal */}
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
                                        <h5 className="fs-14 mb-0">{purchaseTransaction.reference_no}</h5>
                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">Date</p>
                                        <h5 className="fs-14 mb-0">{purchaseTransaction.date}</h5>
                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">Payment Status</p>
                                        {
                                            purchaseTransaction.payment_status === "Paid" 
                                            ?  
                                            <span className="badge badge-soft-success fs-13">Paid</span>
                                            :
                                            purchaseTransaction.payment_status === "Partial" 
                                            ? 
                                            <span className="badge badge-soft-primary fs-13">Partial</span>
                                            :
                                            <span className="badge badge-soft-danger fs-13">Due</span>
                                        }
                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                        Total
                                        </p>
                                        <h5 className="fs-14 mb-0">${purchaseTransaction.total}</h5>
                                    </Col>
                                </Row>
                            </CardBody>

                            <CardBody className="p-4 border-top border-top-dashed">
                                <Row className="g-3">
                                    <Col sm={6}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">  Supplier </h6>
                                        <p className="fw-medium mb-2">{purchaseTransaction.supplier}</p>
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
                                                <th scope="col">Purchase Price ($)</th>
                                                <th scope="col" className="text-end">Subtotal ($)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                productSummary.map(elmt => (
                                                    <tr key={productsSerial}>
                                                        <th scope="row">{++productsSerial}</th>
                                                        <td className="text-start">{elmt.name}</td>
                                                        <td>{elmt.quantity}</td>
                                                        <td>${elmt.purchase_price}</td>
                                                        <td className="text-end">${parseFloat(elmt.purchase_price) * elmt.quantity}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr className="border-top border-top-dashed mt-2">
                                                <td colSpan="4"></td>
                                                <td colSpan="2" className="fw-medium p-0">
                                                    <Table className="table-borderless text-start table-nowrap align-middle mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <td>Total</td>
                                                                <td className="text-end">${purchaseTransaction.total - purchaseTransaction.overhead_charge}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Overhead</td>
                                                                <td className="text-end">${purchaseTransaction.overhead_charge}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total Amount</td>
                                                                <td className="text-end">${purchaseTransaction.total}</td>
                                                            </tr>
                                                            {
                                                                purchaseTransaction.purchase_return > 0
                                                                ?
                                                                <tr>
                                                                    <td>Total Payable After Purchase Return</td>
                                                                    <td className="text-end">${purchaseTransaction.total_payable_after_purchase_return}</td>
                                                                </tr>
                                                                : 
                                                                <tr>
                                                                    <td>Total Payable</td>
                                                                    <td className="text-end">${purchaseTransaction.total}</td>
                                                                </tr>
                                                            }
                                                            <tr>
                                                                <td>Total Paid</td>
                                                                <td className="text-end">${purchaseTransaction.paid}</td>
                                                            </tr>
                                                            <tr className="border-top border-top-dashed">
                                                                <td>Total Remaining</td>
                                                                <td className="text-end">${
                                                                    purchaseTransaction.purchase_return > 0 
                                                                    ? 
                                                                    ( purchaseTransaction.total_payable_after_purchase_return - purchaseTransaction.paid ) > 0 
                                                                        ?
                                                                        ( purchaseTransaction.total_payable_after_purchase_return - purchaseTransaction.paid )
                                                                        :
                                                                        0
                                                                    :  
                                                                    purchaseTransaction.total - purchaseTransaction.paid
                                                                }</td>
                                                            </tr>
                                                            {
                                                                purchaseTransaction.purchase_return > 0
                                                                ?
                                                                <tr>
                                                                    <td>Amount Credited</td>
                                                                    <td className="text-end">${purchaseTransaction.amount_credited}</td>
                                                                </tr>
                                                                : <></>
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="mt-5">
                                    <h5 className="fs-16 mb-2">Payment Information:</h5>
                                    <Card>
                                        <CardBody className='p-0'>
                                            <Table className="table-borderless table-nowrap align-center mb-0">
                                                <thead>
                                                    <tr className="table-active">
                                                        <th scope="col" style={{ width: "50px" }}>#</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Payment No</th>
                                                        <th scope="col">Amount ($)</th>
                                                        <th scope="col">Payment Method</th>
                                                        <th scope="col">Payment Note</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        payments.map(elmt => (
                                                            <tr key={elmt.id}>
                                                                <th scope="row">{++paymentsSerial}</th>
                                                                <td>{elmt.date}</td>
                                                                <td>{elmt.payment_no}</td>
                                                                <td>{elmt.amount}</td>
                                                                <td>{elmt.payment_method}</td>
                                                                <td>{elmt.payment_note}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </div>

                                {
                                    imeiList.length > 0 
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
                                                            imeiList.map(elmt => (
                                                                <tr key={elmt.id}>
                                                                    <th scope="row">{++imeiListSerial}</th>
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

                                {
                                    groupList.length > 0 
                                    ?
                                    <div className="mt-5">
                                        <h5 className="fs-16 mb-2">Group List:</h5>
                                        <Card>
                                            <CardBody className='p-0'>
                                                <Table className="table-borderless table-nowrap align-center mb-0">
                                                    <thead>
                                                        <tr className="table-active">
                                                            <th scope="col" style={{ width: "50px" }}>#</th>
                                                            <th scope="col">NAME</th>
                                                            <th scope="col">GROUP</th>
                                                            <th scope="col">COLOR</th>
                                                            <th scope="col">WATTAGE</th>
                                                            <th scope="col">TYPE</th>
                                                            <th scope="col">CONDITION</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            groupList.map(elmt => (
                                                                <tr key={elmt.id}>
                                                                    <th scope="row">{++imeiListSerial}</th>
                                                                    <td>{elmt.name}</td>
                                                                    <td>{elmt.group}</td>
                                                                    <td>{elmt.color}</td>
                                                                    <td>{elmt.wattage}</td>
                                                                    <td>{elmt.type}</td>
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

                                {
                                    returnList.length > 0 
                                    ?
                                    <div className="mt-5">
                                        <h5 className="fs-16 mb-2">Return List:</h5>
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
                                                            returnList.map(elmt => (
                                                                <tr key={elmt.id}>
                                                                    <th scope="row">{++returnListSerial}</th>
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
                                    <Button
                                        color="light"
                                        onClick={() => {
                                            togInvoiceModal();
                                        }}
                                    >Close</Button>
                                    <Button onClick={() => downloadInvoice(transactionId, purchaseTransaction.reference_no)} className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1"></i>{" "}Download</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    </Row>
                </ModalBody>
            </Modal>
            {/* --end-- invoice modal */}



            {/* lock confirmation modal */}                                  
            <Modal
                isOpen={modal}
                toggle={() => {
                    tog_center();
                }}
                centered
            >
                <ModalHeader className="modal-title" />

                <ModalBody className="text-center p-4">
                    {
                        lockStatus === 0 ?
                        <h5 className="mb-3">Are you sure you want to lock this <br /> purchase transaction ?</h5> :
                        <h5 className="mb-3">Are you sure you want to unlock this <br /> purchase transaction ?</h5>
                    }
                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Button to="#" className="btn btn-primary me-2" color="primary" onClick={() => modalSubmit()}>Yes</Button>
                        <Button color="danger" onClick={() => setModal(false)}>No</Button>
                    </div>
                </ModalBody>
            </Modal>
            {/* --end-- lock confirmation modal */}



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
                            <h4 className="card-title mb-0 flex-grow-1">Purchase Verification</h4>
                        </CardHeader>

                        <CardBody>
                            <span className="fw-medium text-primary"> {refNo} </span>

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
                                                                (verifyValidation.touched.verification_status &&
                                                                verifyValidation.errors.verification_status) || verifyError.verification_status
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
                                                                (verifyValidation.touched.verification_status &&
                                                                verifyValidation.errors.verification_status) || verifyError.verification_status
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        <Label className="form-check-label" for="no">
                                                            No
                                                        </Label>
                                                    
                                                        {(verifyValidation.touched.verification_status &&
                                                        verifyValidation.errors.verification_status) || verifyError.verification_status ? (
                                                            <FormFeedback type="invalid">
                                                                {verifyError.verification_status ? verifyError.verification_status : verifyValidation.errors.verification_status}
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
                                                    // invalid={
                                                    //     (verifyValidation.touched.verification_note && verifyValidation.errors.verification_note) || verifyError.verification_note
                                                    //     ? true
                                                    //     : false
                                                    // } 
                                                    rows="3">
                                                </textarea>

                                                {/* <Input
                                                name="verification_note"
                                                placeholder="verification_note"
                                                type="text"
                                                className="form-control"
                                                id="verification_note"
                                                onChange={verifyValidation.handleChange}
                                                onBlur={verifyValidation.handleBlur}
                                                value={verifyValidation.values.verification_note || ""}
                                                invalid={
                                                    (verifyValidation.touched.verification_note && verifyValidation.errors.verification_note) || verifyError.verification_note
                                                    ? true
                                                    : false
                                                }
                                                /> */}

                                                {(verifyValidation.touched.verification_note && verifyValidation.errors.verification_note) || verifyError.verification_note ? (
                                                <FormFeedback type="invalid">
                                                    {verifyError.verification_note ? verifyError.verification_note : verifyValidation.errors.verification_note}
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
                                                    (verifyValidation.touched.pin_number && verifyValidation.errors.pin_number) || verifyError.pin_number
                                                    ? true
                                                    : false
                                                }
                                                />
                                                {(verifyValidation.touched.pin_number && verifyValidation.errors.pin_number) || verifyError.pin_number ? (
                                                <FormFeedback type="invalid">
                                                    {verifyError.pin_number ?verifyError.pin_number : verifyValidation.errors.pin_number}
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

        </React.Fragment>
    );
};

export default PurchaseList;