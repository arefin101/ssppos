import React, {useEffect, useState, useMemo} from 'react';
import MetaTags from "react-meta-tags";
import { Button,  } from 'reactstrap';
import { getPaymentMethodSummary } from '../../../store/actions';
import { Card, CardBody, CardHeader, Col, Container, Row, Spinner, Form } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from "react-csv";
import TableContainer from "./TableContainer";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import jsPDF from "jspdf";
import "jspdf-autotable";

const PaymentMethodSummary = ({history}) => {

    const dispatch = useDispatch();
    
    const [preLoader, setPreLoader] = useState(true);
    const [paymentMethodSummary, setPaymentMethodSummary] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    
    const { response } =  useSelector( state => ({
        response: state.Payment.paymentMethodSummary,
    }));

    useEffect(() => {
        dispatch(getPaymentMethodSummary(history))
    }, []);

    useEffect(() => {
        if(response.payment_summary){
            setPaymentMethodSummary(response.payment_summary);
        }
    }, [response]);

    if(response.payment_summary){
        if(preLoader){
            setPreLoader(false);
        }
    }



    // Table Properties
    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1;
                }
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Sale Transaction ($)",
                accessor: "sale_transaction",
            },
            {
                Header: "Purchase Transaction ($)",
                accessor: "purchase_transaction",
            },
            {
                Header: "Expense Transaction ($)",
                accessor: "expense_transaction",
            },
            {
                Header: "Total Amount ($)",
                accessor: "total_amount",
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.payment_summary.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setPaymentMethodSummary(filteredData)
        }else {
            if(response.payment_summary){
                setPaymentMethodSummary(response.payment_summary);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["#", "Name", "Sale Transaction ($)", "Purchase Transaction ($)", "Expense Transaction ($)", "Total Amount ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Payment Method Summary";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1, data.original.name, data.original.sale_transaction, data.original.purchase_transaction, data.original.expense_transaction, data.original.total_amount])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("payment_method_summary.pdf")
    }

   

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Payment Method Summary</title>
                </MetaTags>
                    
                <BreadCrumb title="Summary" pageTitle="Payment Method Report" link="/payment-method-report"/>

                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">Payment Method Summary</h4>
                                        <div className="d-flex gap-2 ms-2">
                                            <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                                <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                                PDF
                                            </button>
                                            <CSVLink 
                                                headers={tableHeaders} 
                                                data={filteredData.map(data => [data.index+1, data.original.name, data.original.sale_transaction, data.original.purchase_transaction, data.original.expense_transaction, data.original.total_amount])}
                                                filename="payment_method_summary.csv"
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
                                                        placeholder="Search for paymnet method name or something..."
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
                                                    data={paymentMethodSummary}
                                                    customPageSize={10}
                                                    maxLength={response.payment_summary ? response.payment_summary.length:10}
                                                    filteredLength={paymentMethodSummary.length} 
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
        </React.Fragment>
    );
};

export default PaymentMethodSummary