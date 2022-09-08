import React, {useEffect, useState, useMemo, useRef} from 'react';
import { MetaTags } from 'react-meta-tags';
import { ToastContainer, toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseReturnList, purchaseReturnVerification, hasPermission } from '../../../store/actions';
import { useHistory, Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, Modal, ModalBody, Button, CardBody, Row, Col, Card, Table, CardHeader, Container, Form, Label, Input, FormGroup, FormFeedback } from 'reactstrap';
import TableContainer from "./TableContainer";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingBar from 'react-top-loading-bar';



const PurchaseReturnList = () => {

    const ref = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const [preLoader, setPreLoader] = useState(true);
    const [list, setList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [transactionId, setTransactionId] = useState(0);
    const [invNo, setInvNo] = useState("");

    const { purchaseReturnListResponse, purchaseReturnVerifyPermission, verifyResponse, verifyError } = useSelector(state => ({
        purchaseReturnListResponse: state.Purchase.purchaseReturns,
        purchaseReturnVerifyPermission: state.General.purchaseReturnVerifyPermission,
        verifyResponse: state.Purchase.verifyResponse,
        verifyError: state.Purchase.verifyError ? state.Purchase.verifyError : {},
    }));

    useEffect(() => {
        dispatch(hasPermission("purchase-return.verification", history));
        dispatch(getPurchaseReturnList(history));
    }, []);

    useEffect(() => {
        if(purchaseReturnListResponse.purchase_return_transactions){
            setList(purchaseReturnListResponse.purchase_return_transactions);
        }
    }, [purchaseReturnListResponse]);


    if(purchaseReturnListResponse.purchase_return_transactions) {
        if(preLoader){
            setPreLoader(false);
        }
    }


    const purchaseReturnVariation = (url) => {
        history.push(url);
    }



    // Verification

    const [verifyModal, setVerifyModal] = useState(false);
    const [verifyStatusRadio, setVerifyStatusRadio] = useState('');
    
    const verifyValidation = useFormik({
        enableReinitialize: true,

        initialValues: {
            purchase_return_transaction_id: transactionId,
            verification_status: "",
            verification_note: "",
            pin_number: "",
        },

        validationSchema: Yup.object({
            verification_status: Yup.string().required("Please select an option"),
            pin_number: Yup.string().required("Please enter pin number"),
        }),

        onSubmit: (values, {resetForm}) => {
            dispatch(purchaseReturnVerification(values, history));
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
        dispatch(getPurchaseReturnList(history));
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
            },
            {
                Header: "Purchase Invoice",
                accessor: "purchase_invoice",
            },
            {
                Header: "Supplier",
                accessor: "supplier",
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

                            <DropdownItem onClick={() => purchaseReturnVariation(`/purchase-return-variations/${cellProps.cell.row.original.id}`)}>
                                <i className='ri-eye-fill eye-icon'></i>View Variations
                            </DropdownItem>

                            {
                                purchaseReturnVerifyPermission && 
                                <DropdownItem onClick={() => handleVerification(cellProps.cell.row.original.id, cellProps.cell.row.original.return_invoice)}><i className='mdi mdi-checkbox-marked-circle-outline text-success fs-14 vertical-middle me-1'></i> Verify</DropdownItem>
                            }
            
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        [purchaseReturnVerifyPermission]
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = purchaseReturnListResponse.purchase_return_transactions.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setList(filteredData)
        }
        else {
            if(purchaseReturnListResponse.purchase_return_transactions){
                setList(purchaseReturnListResponse.purchase_return_transactions);
            }
        }
    };

    let tableHeaders = ["Status", "Date", "Return Invoice", "Purchase Invoice",	"Supplier",	"Total Items", "Amount ($)", "Amount Credited ($)", "Amount Adjusted ($)", "Verification Note", "Finalized By", "Verified By"];

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "landscape";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Purchase Return List";
        const headers = [tableHeaders];
        const data = filteredData.map(data =>[
            data.original.verification_status === 2 ? "Not Verified" : data.original.verification_status === 1 ? "Okay" : "Not Okay", 
            data.original.date, data.original.return_invoice, data.original.purchase_invoice, data.original.supplier, data.original.total_items, data.original.amount,
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
        doc.save("purchase_return_list.pdf")
    }



    return (
        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Purchase Return List</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Purchase Return List</h4>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders} 
                                            data={filteredData.map(data => [
                                                data.original.verification_status === 2 ? "Not Verified" : data.original.verification_status === 1 ? "Okay" : "Not Okay", 
                                                data.original.date, data.original.return_invoice, data.original.purchase_invoice, data.original.supplier, data.original.total_items, data.original.amount, data.original.amount_credited, data.original.amount_adjusted,
                                                data.original.verification_note !== null ? data.original.verification_note : "N/A",  data.original.finalized_by, data.original.verified_by])}
                                            filename="Purchase_Return_List.csv"
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
                                                        placeholder="Search for return invoice, purchase invoice, supplier name or something..."
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
                                                maxLength={purchaseReturnListResponse.purchase_return_transactions ? purchaseReturnListResponse.purchase_return_transactions.length : 10}
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
                                    <h4 className="card-title mb-0 flex-grow-1">Purchase Return Verification</h4>
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

export default PurchaseReturnList