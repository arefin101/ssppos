import React, { useEffect, useState, useMemo, useRef } from "react";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getExpensePaymentView } from '../../../../store/payment/action';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import LoadingBar from 'react-top-loading-bar';



const ExpensePaymentList = () => {

    const [expensePaymentList, setExpensePaymentList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const history = useHistory();

    const dispatch = useDispatch();

    const ref = useRef(null);

    const { response  } = useSelector(state => ({
        response: state.Payment.expensePaymentView,
    }));

    useEffect(() => {
        if(localStorage.getItem("createExpensePayment")){
            successnotify("Expense payment complete !");
            localStorage.removeItem("createExpensePayment");
            ref.current.complete();
        }
    }, [localStorage.getItem("createExpensePayment")]);

    useEffect(()=>{
        dispatch( getExpensePaymentView(history) );
    }, [dispatch]);

    useEffect(() => {
        if(response.expense_transactions){
            setExpensePaymentList(response.expense_transactions);
        }
    }, [response]);

    if(response.expense_transactions){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const makePayment = (url, expNo, due) => {
        history.push(url, {expNo: expNo, due: due});
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
                accessor: 'expense_no',
                Header: 'Expense No'
            },
            {
                accessor: 'expense_for',
                Header: 'Expense For'
            },
            {
                accessor: 'category',
                Header: 'Category'
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

                            <DropdownItem onClick={() => makePayment(`/add-expense-payment/${cellProps.cell.row.original.id}`, cellProps.cell.row.original.expense_no, cellProps.cell.row.original.due)}>
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

            const filteredData = response.expense_transactions.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setExpensePaymentList(filteredData)
        }
        else {
            if(response.sale_transactions){
                setExpensePaymentList(response.expense_transactions);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Date", "Expense No",	"Expense For", "Category", "Payment Status", "Total Payable", "Paid ($)", "Due ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Purchase Invoice List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date, data.original.expense_no, data.original.expense_for, data.original.category,  data.original.payment_status, data.original.total_payable, data.original.paid, data.original.due])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Purchase_Invoice_List.pdf")
    }


    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <MetaTags>
                <title>Expense (Due/Partial)</title>
            </MetaTags>
            <Container fluid>
            <BreadCrumb title="Expenses" pageTitle="Money Transactions" link="/money-transactions"/>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Expenses (Due/Partial)</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.date, data.original.expense_no, data.original.expense_for, data.original.category,  data.original.payment_status, data.original.total_payable, data.original.paid, data.original.due] )}
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
                                                    placeholder="Search for expense no, category, payment status or something..."
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
                                            data={expensePaymentList}
                                            customPageSize={10}
                                            maxLength={response.expense_transactions?response.expense_transactions.length:10}
                                            filteredLength={expensePaymentList.length} 
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


export default ExpensePaymentList;