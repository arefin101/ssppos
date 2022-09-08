import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import jsPDF from "jspdf";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import { getCashInRecords } from "../../store/actions";
import "jspdf-autotable";


const CashIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [ cashIn, setCashIn ] = useState([]);
    const [ filteredData, setFilteredData ] = useState([]);
    const [preLoader, setPreLoader] = useState(true);

    let cashInCount = 0;
    let totalAmount = 0;

    useEffect(()=>{
        dispatch( getCashInRecords(history) );
    }, []);

    const { response } = useSelector(state => ({
        response: state.Record.cashIn,
    }));

    useEffect(() => {
        if(response.cash_in){

            setCashIn(response.cash_in);

            if(preLoader){
                setPreLoader(false);
            }
            
        }
    }, [response]);

    if(response.cash_in_count){
        cashInCount = response.cash_in_count;
    }

    if(response.total_amount){
        totalAmount = response.total_amount;
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
                Header: "Type",
                accessor: "type",
            },
            {
                Header: "Amount ($)",
                accessor: "amount",
            },
            {
                Header: "Finalized By",
                accessor: "finalized_by",
            },
        ],
        []
    )



    const tableHeaders = ["#", "Type", "Amount ($)", "Finalized By"];
    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.cash_in.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setCashIn(filteredData)
        }
        else {
            if(response.cash_in){
                setCashIn(response.cash_in);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };


    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Cash In";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1, data.original.type, data.original.amount, data.original.finalized_by])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("cash_in_records.pdf")
    }



    return (
        
        <div className="page-content">
        <Container fluid>
            <MetaTags>
                <title>Cash In</title>
            </MetaTags>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="card-header  border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">Cash In</h5>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                        <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                    </button>
                                    <CSVLink 
                                        headers={tableHeaders}
                                        data={filteredData.map(data => [data.index+1, data.original.type, data.original.amount, data.original.finalized_by])}
                                        filename="Cash_In.csv"
                                        >
                                        <button type="button" className="btn btn-primary">
                                            <i className="ri-file-download-line align-bottom me-1"></i>{" "}CSV
                                        </button>
                                    </CSVLink>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="bg-soft-light border border-dashed border-start-0 border-end-0">
                            <Form>
                                <Row className="g-3">
                                    <Col sm={12} xxl={4}>
                                        <div className="search-box">
                                            <input
                                                type="text"
                                                id="search"
                                                className="form-control search bg-light border-light"
                                                placeholder="Search for type or something..."
                                                onChange={(e) => searchItems(e.target.value)}
                                            />
                                            <i className="ri-search-line search-icon"></i>
                                        </div>
                                    </Col>
                                    <Col sm={4} xxl={4}></Col>
                                    <Col sm={4} xxl={3}></Col>
                                    <Col sm={4} xxl={1}>
                                        <div>
                                            <Button color="soft-danger" className="w-100" onClick={reset}>{" "}<i className="mdi mdi-refresh me-1 align-bottom"></i>Reset</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                        <CardBody className="pt-0">

                                {   
                                    preLoader
                                    ?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div>
                                    :
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={cashIn}
                                            customPageSize={10}
                                            maxLength={response.cash_in ? response.cash_in.length : 10}
                                            filteredLength={cashIn.length} 
                                            isExtraFeature={true}
                                            isGlobalSearch={true}
                                            setFilteredData={setFilteredData}
                                            cashInCount={cashInCount}
                                            totalAmount={totalAmount}
                                            divClass="table-responsive"
                                            className="custom-header-css"
                                        />
                                    </div>
                                }

                        </CardBody>
                    </Card>
                </Col>
            </Row>



        </Container>
        </div>
        
    )
}

export default CashIn