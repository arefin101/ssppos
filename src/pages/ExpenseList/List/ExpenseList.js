import React, {useEffect, useState, useMemo, useRef} from 'react';
import MetaTags from "react-meta-tags";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Row, Button, Spinner, Form, Label, Input, FormGroup, FormFeedback, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Modal, ModalBody, } from 'reactstrap';
import { ToastContainer  , toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenseList , hasPermission, expenseVerification } from '../../../store/actions';
import { CSVLink } from "react-csv";
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LoadingBar from 'react-top-loading-bar'




const ExpenseList = (props) => {

    const [preLoader, setPreLoader] = useState(true);
    const [expenseList, setExpenseList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [transactionId, setTransactionId] = useState(0);
    const [expNo, setExpNo] = useState("");

    const ref = useRef(null);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(hasPermission("expense.verification", props.history));
        dispatch( getExpenseList(props.history) );
    }, []);
    
    const { response, verifyResponse, verifyError, expenseVerifyPermission } =  useSelector( state => ({
        response: state.ExpenseList.expense_transactions,
        expenseVerifyPermission: state.General.expenseVerifyPermission,
        verifyResponse: state.ExpenseList.verifyResponse,
        verifyError: state.ExpenseList.verifyError,
    }));

    useEffect(() => {
        if(response.expense_transactions){
            setExpenseList(response.expense_transactions);
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [response]);

    const expense = localStorage.getItem('expense');
    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    useEffect(() => {
        if(expense) {
            successnotify("Expense Added Successfully !");
            localStorage.removeItem('expense');
            ref.current.complete();
        }

        dispatch(hasPermission("expense.store" , props.history))

    }, []);

    const { addExpensePermission } = useSelector( state => ({ 
        addExpensePermission: state.General.addExpensePermission,
    }));



    // Verification

    const [verifyModal, setVerifyModal] = useState(false);
    const [verifyStatusRadio, setVerifyStatusRadio] = useState('');
    
    const verifyValidation = useFormik({
        enableReinitialize: true,

        initialValues: {
            expense_transaction_id: transactionId,
            verification_status: "",
            verification_note: "",
            pin_number: "",
        },

        validationSchema: Yup.object({
            verification_status: Yup.string().required("Please select an option"),
            pin_number: Yup.string().required("Please enter pin number"),
        }),

        onSubmit: (values, {resetForm}) => {
            dispatch(expenseVerification(values, props.history));
            resetForm({ values: '' });
            setVerifyStatusRadio(-1)
        },
    });

    const verificationForm = (e) => {
        e.preventDefault();
        verifyValidation.handleSubmit();
        return false;
    }

    const handleVerification = (id, expNo) => {
        setExpNo(expNo);
        setTransactionId(id);
        togVerifyModal();
    }
    
    function togVerifyModal() {
        setVerifyModal(!verifyModal);
    }

    useEffect(() => {
        dispatch(getExpenseList(props.history));
        setVerifyModal(false);
        clearVerifyErrors();

    }, [verifyResponse]);

    const clearVerifyErrors = () => {
        verifyError.pin_number = "";
        verifyError.verification_status = "";
    }

    // --end-- Verification



    // Table Properties
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
                accessor: "date"
            }, 
            {
                Header: "Expense No",
                accessor: "expense_no",
            }, 
            {
                Header: "Category",
                accessor: "category"
            },
            {
                Header: "Amount ($)",
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
                Header: "Expense For",
                accessor: "expense_for",
                Cell: (expense_for) => (
                    <span>{expense_for.row.original.expense_for ? expense_for.row.original.expense_for : "N/A"}</span>
                )
            },
            {
                Header: "Expense Note",
                accessor: "expense_note"
            },
            {
                Header: "Finalized By",
                accessor: "finalized_by"
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
                    expenseVerifyPermission && 
                    <UncontrolledDropdown >
                        <DropdownToggle href="#" className="btn-soft-secondary btn-sm dropdown" tag="button">
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>

                        <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem onClick={() => handleVerification(cellProps.cell.row.original.id, cellProps.cell.row.original.expense_no)}><i className='mdi mdi-checkbox-marked-circle-outline text-success fs-14 vertical-middle me-1'></i> Verify</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        [expenseVerifyPermission]
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.expense_transactions.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setExpenseList(filteredData)
        }else {
            if(response.expense_transactions){
                setExpenseList(response.expense_transactions);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Status", "Date", "Expense No", "Catagory", "Amount ($)", "Payment Status", "Expense For", "Expense Note", "Verification Note", "Finalized By", "Verified By"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Expense List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [
            data.original.verification_status === 2 ? "NOT VERIFIED" : data.original.verification_status === 1 ? "OKAY" : "NOT OKAY", 
            data.original.date, data.original.expense_no, data.original.category, data.original.amount, data.original.payment_status, data.original.expense_for, data.original.expense_note, 
            data.original.verification_note !== null ? data.original.verification_note : "N/A", 
            data.original.finalized_by, data.original.verified_by])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("expense_transactions.pdf")
    }


    
    return (
        <React.Fragment>
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Expense List</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Expense List</h4>
                                    
                                    {addExpensePermission && <Link to='/expense-list/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success">
                                            <i className="ri-add-line align-bottom me-1"></i>Add Expense
                                        </button>
                                    </Link>}

                                    <div className="d-flex gap-2 ms-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders} 
                                            data={filteredData.map(data => [
                                                data.original.verification_status === 2 ? "NOT VERIFIED" : data.original.verification_status === 1 ? "OKAY" : "NOT OKAY", 
                                                data.original.date, data.original.expense_no, data.original.category, data.original.amount, data.original.payment_status, data.original.expense_for, data.original.expense_note, data.original.verification_note, data.original.finalized_by, data.original.verified_by])}
                                            filename="expense_transactions.csv"
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
                                                        placeholder="Search for expense no, category, payment status or something..."
                                                        onChange={(e) => searchItems(e.target.value)}
                                                    />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </Col>

                                            <Col sm={4} xxl={3}></Col>

                                            <Col sm={4} xxl={3}></Col>

                                            <Col sm={4} xxl={1}>
                                                <div>
                                                    <Button color="soft-danger" className="w-100" onClick={reset}>{" "}<i className="mdi mdi-refresh me-1 align-bottom"></i>Reset</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>

                                <CardBody>
                                    {
                                        preLoader ?
                                        <div className="spinner-box">
                                            <Spinner color="primary"> Loading... </Spinner> 
                                        </div>
                                        :
                                        <div>
                                            <TableContainer
                                                columns={columns}
                                                data={expenseList}
                                                customPageSize={10}
                                                maxLength={response.expense_transactions ? response.expense_transactions.length:10}
                                                filteredLength={expenseList.length} 
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
                    <Card className='m-0'>
                        <CardHeader>
                            <h4 className="card-title mb-0 flex-grow-1">Expense Verification</h4>
                        </CardHeader>

                        <CardBody>
                            <span className="fw-medium text-primary"> {expNo} </span>

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
                                                    rows="3">
                                                </textarea>

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

export default ExpenseList;