import React, { useEffect, useState, useMemo } from "react";
import {Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProfitByDate } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";


const ProfitByDate = () => {

    const [profitByDate, setProfitByDate] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.ProfitLossReport.profitByDate,
    }));

    useEffect(()=>{
        dispatch( getProfitByDate(history) );
    }, []);

    useEffect(() => {
        if(response.profit_by_date){
            setProfitByDate(response.profit_by_date);
        }
    }, [response]);

    if(response.profit_by_date){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const columns = useMemo(() => 
        [
            {
                Header: "Date",
                accessor: "date",
                filterable: false,
            },
            {
                Header: "Gross Profit ($)",
                accessor: "gross_profit",
                filterable: false,
            },
        ],
        []
    )
    

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.profit_by_date.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setProfitByDate(filteredData)
        }
        else {
            if(response.profit_by_date){
                setProfitByDate(response.profit_by_date);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Date", "Gross Profit ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Profit By Date";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date, data.original.gross_profit])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Profit_by_date.pdf")
    }


    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Profit By Date</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Profit By Date</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            filename="Profit_by_date.csv"
                                            headers={tableHeaders}
                                            data={filteredData.map(data => [data.original.date, data.original.gross_profit])}>
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
                                                    placeholder="Search for gross profit or something..."
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
                            <CardBody className="pt-0">
                                {preLoader?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div>:
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={profitByDate}
                                            customPageSize={10}
                                            maxLength={response.profit_by_date?response.profit_by_date.length:10}
                                            filteredLength={profitByDate.length} 
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
            </Container>
        </div>
    )
}


export default ProfitByDate;