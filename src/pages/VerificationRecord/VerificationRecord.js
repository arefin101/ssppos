import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import jsPDF from "jspdf";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import { getVerificationRecord } from "../../store/actions";
import "jspdf-autotable";


const VerificationRecord = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [verificationRecord, setVerificationRecord ] = useState([]);
    const [filteredData, setFilteredData ] = useState([]);
    const [preLoader, setPreLoader] = useState(true);

    useEffect(()=>{
        dispatch(getVerificationRecord(history));
    },[]);

    const { response } = useSelector(state => ({
        response: state.Record.verificationRecord,
    }));

    useEffect(() => {
        if(response.verification_records){
            setVerificationRecord(response.verification_records);
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
                Header: "Type",
                accessor: "type",
            },
            {
                Header: "Reference",
                accessor: "reference",
            },
            {
                Header: "Verified By",
                accessor: "verified_by",
            },
        ],
        []
    )



    const tableHeaders = ["#", "Type", "Reference", "Verified By"];
    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.verification_records.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setVerificationRecord(filteredData)
        }
        else {
            if(response.verification_records){
                setVerificationRecord(response.verification_records);
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
    
        const title = "Verification Record";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1, data.original.type, data.original.reference, data.original.verified_by])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("verification_record.pdf")
    }



    return (
        
        <div className="page-content">
        <Container fluid>
            <MetaTags>
                <title>Verification Record</title>
            </MetaTags>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader className="card-header  border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">Verification Record</h5>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                        <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                    </button>
                                    <CSVLink 
                                        headers={tableHeaders}
                                        data={filteredData.map(data => [data.index+1, data.original.type, data.original.reference, data.original.verified_by])}
                                        filename="Cash_In.csv"
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
                                                placeholder="Search for type, reference no or something..."
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
                                            data={verificationRecord}
                                            customPageSize={10}
                                            maxLength={response.verification_records ? response.verification_records.length : 10}
                                            filteredLength={verificationRecord.length} 
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