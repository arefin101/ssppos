import React, { useEffect, useState, useMemo } from "react";
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
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getVerificationReportList } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";


const VerificationReportList = () => {

    const [verificationReportList, setVerificationReportList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.Report.verificationReportList,
    }));

    useEffect(()=>{
        dispatch( getVerificationReportList(history) );
    }, []);

    useEffect(() => {
        if(response.verification_report){
            setVerificationReportList(response.verification_report);
        }
    }, [response]);

    if(response.verification_report){
        if(preLoader){
            setPreLoader(false);
        }
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
                accessor: 'type',
                Header: 'Type'
            },            
            {
                accessor: 'not_verified',
                Header: 'Not Verified'
            },
            {
                accessor: 'verified_okay',
                Header: 'Verified (Okay)'
            },
            {
                accessor: 'verified_not_okay',
                Header: 'Verified (Not Okay)'
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.verification_report.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setVerificationReportList(filteredData)
        }
        else {
            if(response.verification_report){
                setVerificationReportList(response.verification_report);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Type", "Not Verified", "Verified Okay", "Verified Not Okay"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Verification Reports";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.type, data.original.not_verified, data.original.verified_okay, data.original.verified_not_okay])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Verification_Report_List.pdf")
    }
    

    return (
        <div className="page-content">
            <MetaTags>
                <title>Verification Reports</title>
            </MetaTags>
            <Container fluid>
               
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Verification Reports</h5>
                                    <div className="d-flex gap-2">
                                        
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>

                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.type, data.original.not_verified, data.original.verified_okay, data.original.verified_not_okay] )}
                                            filename = "Verification_Report_List.csv"
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
                                                    placeholder="Search for verification type or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}></Col>

                                        <Col sm={4} xxl={3}></Col>

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
                                            data={verificationReportList}
                                            customPageSize={10}
                                            maxLength={response.verification_report ? response.verification_report.length:10}
                                            filteredLength={verificationReportList.length} 
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
            </Container>
        </div>
    )
}

export default VerificationReportList;