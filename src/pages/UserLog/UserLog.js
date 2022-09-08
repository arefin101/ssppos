import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import jsPDF from "jspdf";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import { getUserLog } from "../../store/actions";
import "jspdf-autotable";


const VerificationRecord = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [userLog, setUserLog ] = useState([]);
    const [filteredData, setFilteredData ] = useState([]);
    const [preLoader, setPreLoader] = useState(true);

    useEffect(()=>{
        dispatch(getUserLog(history));
    },[]);

    const { response } = useSelector(state => ({
        response: state.Record.userLog,
    }));

    useEffect(() => {
        if(response.user_log){
            setUserLog(response.user_log);
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [response]);

    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1
                }
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Type",
                accessor: "type",
            },
            {
                Header: "Date Time",
                accessor: "date_time",
            },
        ],
        []
    )



    const tableHeaders = ["#", "Name", "Type", "Date Time"];
    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.user_log.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setUserLog(filteredData)
        }
        else {
            if(response.user_log){
                setUserLog(response.user_log);
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
    
        const title = "User Log";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1,  data.original.name, data.original.type, data.original.date_time])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("user_log.pdf")
    }



    return (
        
        <div className="page-content">
        <Container fluid>
            <MetaTags>
                <title>User Log</title>
            </MetaTags>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="card-header  border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">User Log</h5>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                        <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                    </button>
                                    <CSVLink 
                                        headers={tableHeaders}
                                        data={filteredData.map(data => [data.index+1,  data.original.name, data.original.type, data.original.date_time])}
                                        filename="User_Log.csv"
                                        >
                                        <button type="button" className="btn btn-success">
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
                                                placeholder="Search for name, type or something..."
                                                onChange={(e) => searchItems(e.target.value)}
                                            />
                                            <i className="ri-search-line search-icon"></i>
                                        </div>
                                    </Col>
                                    <Col sm={4} xxl={4}></Col>
                                    <Col sm={4} xxl={3}></Col>
                                    <Col sm={4} xxl={1}>
                                        <div>
                                            <Button color="primary" className="w-100" onClick={reset}>{" "}<i className="mdi mdi-refresh me-1 align-bottom"></i>Reset</Button>
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
                                            data={userLog}
                                            customPageSize={10}
                                            maxLength={response.user_log ? response.user_log.length : 10}
                                            filteredLength={userLog.length} 
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

export default VerificationRecord