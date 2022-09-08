import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import jsPDF from "jspdf";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import { getCashOutRecords } from "../../store/actions";
import "jspdf-autotable";



const CashOut = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [ cashOut, setCashOut ] = useState([]);
    const [ filteredData, setFilteredData ] = useState([]);
    const [ preLoader, setPreLoader ] = useState(true);

    let cashOutCount = 0;
    let totalAmount = 0;

    useEffect(()=>{
        dispatch( getCashOutRecords(history) );
    }, []);

    const { response } = useSelector(state => ({
        response: state.Record.cashOut,
    }));

    useEffect(() => {
        if(response.cash_out){
        setCashOut(response.cash_out);
        if(preLoader){
            setPreLoader(false);
        }
        }
    }, [response]);

    if(response.cash_out_count){
        cashOutCount = response.cash_out_count;
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
            const filteredData = response.cash_out.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setCashOut(filteredData)
        }
        else {
            if(response.cash_out){
                setCashOut(response.cash_out);
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
    
        const title = "Cash Out";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1, data.original.type, data.original.amount, data.original.finalized_by])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("cash_out_records.pdf")
    }



    return (
        
        <div className="page-content">
        <Container fluid>
            <MetaTags>
                <title>Cash Out</title>
            </MetaTags>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="card-header  border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">Cash Out</h5>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                        <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                    </button>
                                    <CSVLink 
                                        data={filteredData.map(data => [data.index+1, data.original.type, data.original.amount, data.original.finalized_by])}
                                        headers={tableHeaders}
                                        filename="Cash_Out.csv"
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
                                            data={cashOut}
                                            customPageSize={10}
                                            maxLength={response.cash_out ? response.cash_out.length : 10}
                                            filteredLength={cashOut.length} 
                                            isExtraFeature={true}
                                            isGlobalSearch={true}
                                            setFilteredData={setFilteredData}
                                            cashOutCount={cashOutCount}
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

export default CashOut