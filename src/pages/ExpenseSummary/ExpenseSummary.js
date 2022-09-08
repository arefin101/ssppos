import React, {useEffect, useState, useMemo} from 'react';
import MetaTags from "react-meta-tags";
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getExpenseSummary } from '../../store/actions';
import { Card, CardBody, CardHeader, Col, Container, Row, Spinner, Form } from 'reactstrap';
import { ToastContainer  , toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from "react-csv";

const ExpenseSummary = ({history}) => {

    const [preLoader, setPreLoader] = useState(true);
    const [expenseSummary, setExpenseSummary] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.ExpenseList.expSummary,
    }));

    useEffect(() => {
        dispatch(getExpenseSummary(history))
    }, []);

    useEffect(() => {
        if(response.expense_summary){
            setExpenseSummary(response.expense_summary);
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [response]);



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
                Header: "Category",
                accessor: "category",
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
            const filteredData = response.expense_summary.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setExpenseSummary(filteredData)
        }
        else {
            if(response.expense_summary){
                setExpenseSummary(response.expense_summary);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["#", "Catagory", "Total Amount ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Expense Summary";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1, data.original.category, data.original.total_amount])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("expense_summary.pdf")
    }

   

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Expense Summary</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">Expense Summary</h4>
                                        <div className="d-flex gap-2 ms-2">
                                            <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                                <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                                PDF
                                            </button>
                                            <CSVLink 
                                                headers={tableHeaders} 
                                                data={filteredData.map(data => [data.index+1, data.original.category, data.original.total_amount])}
                                                filename="expense_summary.csv"
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
                                                        placeholder="Search for category, total amount or something..."
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
                                                    data={expenseSummary}
                                                    customPageSize={10}
                                                    maxLength={response.expense_summary ? response.expense_summary.length:10}
                                                    filteredLength={expenseSummary.length} 
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
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ExpenseSummary