import React, {useEffect, useState, useMemo} from 'react';
import MetaTags from "react-meta-tags";
import { Button,  } from 'reactstrap';
import { getPaymentsByMethod, paymentVerification, hasPermission } from '../../store/actions';
import { Card, CardBody, CardHeader, Col, Container, Row, Spinner, Form, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Modal, ModalBody, Label, Input, FormFeedback, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from "react-csv";
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as Yup from "yup";
import { useFormik } from "formik";
import BreadCrumb from '../../Components/Common/BreadCrumb';



const PaymentsByPaymentMethod = ({match, history, location}) => {

    const dispatch = useDispatch();
    const id = match.params.id;
    const paymentMethodName =  location.state ? location.state.name : "--";
    
    const [preLoader, setPreLoader] = useState(true);
    const [paymentsByPaymentMethod, setPaymentsByPaymentMethod] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    
    const { response, verifyResponse, verifyError, paymentVerifyPermission } =  useSelector( state => ({
        response: state.Payment.paymentsByMethod,
        paymentVerifyPermission: state.General.paymentVerifyPermission,
        verifyResponse: state.Payment.verifyResponse,
        verifyError: state.Payment.verifyError,
    }));

    useEffect(() => {
        response.payments = null;
        dispatch(hasPermission("payment.verification", history));
        dispatch(getPaymentsByMethod(id, history));
    }, []);

    useEffect(() => {
        setPreLoader(true);
        if(response.payments){
            setPaymentsByPaymentMethod(response.payments);
        }
    }, [response.payments]);

    if(response.payments){
        if(preLoader){
            setPreLoader(false);
        }
    }



    // Verification

    const [verifyModal, setVerifyModal] = useState(false);
    const [verifyStatusRadio, setVerifyStatusRadio] = useState('');
    const [paymentId, setPaymentId] = useState(0);
    const [paymentNo, setPaymentNo] = useState("");
    
    const verifyValidation = useFormik({
        enableReinitialize: true,

        initialValues: {
            payment_id: paymentId,
            verification_status: "",
            verification_note: "",
            pin_number: "",
        },

        validationSchema: Yup.object({
            verification_status: Yup.string().required("Please select an option"),
            pin_number: Yup.string().required("Please enter pin number"),
        }),

        onSubmit: (values, {resetForm}) => {
            dispatch(paymentVerification(values, history));
            resetForm({ values: '' });
            setVerifyStatusRadio(-1);
        },
    });

    const verificationForm = (e) => {
        e.preventDefault();
        verifyValidation.handleSubmit();
        return false;
    }

    const handleVerification = (id, paymentNo) => {
        setPaymentNo(paymentNo);
        setPaymentId(id);
        togVerifyModal();
    }
    
    function togVerifyModal() {
        setVerifyModal(!verifyModal);
    }

    useEffect(() => {
        dispatch(getPaymentsByMethod(id, history));
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
                accessor: "date",
            },
            {
                Header: "Verification Note",
                accessor: "verification_note",
                Cell: (cellProps) => (
                    <span>{cellProps.cell.row.original.verification_note !== null ? cellProps.cell.row.original.verification_note : "N/A" }</span>
                ),
            },
            {
                Header: "Payment No",
                accessor: "payment_no",
            },
            {
                Header: "Reference",
                accessor: "reference",
            },
            {
                Header: "Amount ($)",
                accessor: "amount",
            },
            {
                Header: "Payment Note",
                accessor: "payment_note",
            },
            {
                Header: "Finalized by",
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
                    paymentVerifyPermission &&
                    <UncontrolledDropdown >
                        <DropdownToggle href="#" className="btn-soft-secondary btn-sm dropdown" tag="button">
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>

                        <DropdownMenu className="dropdown-menu-end">

                            <DropdownItem onClick={() => handleVerification(cellProps.cell.row.original.id, cellProps.cell.row.original.payment_no)}><i className='mdi mdi-checkbox-marked-circle-outline text-success fs-14 vertical-middle me-1'></i> Verify </DropdownItem>
            
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        []
    )

    const tableHeaders = ["Status", "Date", "Verification Note", "Payment No", "Reference", "Amount ($)", "Payment Note", "Finalized by", "Verified By",];

    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.payments.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setPaymentsByPaymentMethod(filteredData)
        }else {
            if(response.payments){
                setPaymentsByPaymentMethod(response.payments);
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
    
        const title = `Payments under ${paymentMethodName}`;
        const headers = [tableHeaders];
        const data = filteredData.map(data => [
            data.original.verification_status === 2 ? "NOT VERIFIED" : data.original.verification_status === 1 ? "OKAY" : "NOT OKAY", data.original.date, 
            data.original.verification_note !== null ? data.original.verification_note : "N/A", 
            data.original.payment_no, data.original.reference, data.original.amount, data.original.payment_note, data.original.finalized_by, data.original.verified_by, 
        ])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("payments.pdf")
    }

   

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Payments under {paymentMethodName}</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title={`Payments under ${paymentMethodName}`} pageTitle="Payment Method Report" link="/payment-method-report" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">Payments under {paymentMethodName}</h4>
                                        <div className="d-flex gap-2 ms-2">
                                            <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                                <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                                PDF
                                            </button>
                                            <CSVLink 
                                                headers={tableHeaders} 
                                                data={filteredData.map(data => [
                                                    data.original.verification_status === 2 ? "NOT VERIFIED" : data.original.verification_status === 1 ? "OKAY" : "NOT OKAY",data.original.date, 
                                                    data.original.verification_note !== null ? data.original.verification_note : "N/A", 
                                                    data.original.payment_no, data.original.reference, data.original.amount, data.original.payment_note, data.original.finalized_by, data.original.verified_by, 
                                                ])}
                                                filename="payments.csv"
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
                                                        placeholder="Search for payment no, reference or something..."
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
                                    <div id="table-gridjs">
                                        {
                                            preLoader ?
                                            <div className="spinner-box">
                                                <Spinner color="primary"> Loading... </Spinner> 
                                            </div> :
                                            <div>
                                                <TableContainer
                                                    columns={columns}
                                                    data={paymentsByPaymentMethod}
                                                    customPageSize={10}
                                                    maxLength={response.payments ? response.payments.length:10}
                                                    filteredLength={paymentsByPaymentMethod.length} 
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
                            <h4 className="card-title mb-0 flex-grow-1">Payment Verification</h4>
                        </CardHeader>

                        <CardBody>
                            <span className="fw-medium text-primary"> {paymentNo} </span>

                            <div className="live-preview mt-3">
                                <Form
                                    className="needs-validation"
                                    onSubmit={(e) => verificationForm(e)}
                                        >
                                    <Row>
                                                    
                                        <Col md="12">
                                            <FormGroup className="mb-3">
                                                <Label className="form-check-label" for="verification_status">Is this Payment Okay ?</Label>
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

export default PaymentsByPaymentMethod;