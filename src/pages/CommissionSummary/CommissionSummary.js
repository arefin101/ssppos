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
import { getCommissionSummary } from '../../store/actions';


const CommissionSummary = () => {

    const [initialSummaryList, setInitialSummaryList] = useState([]);

    const [summaryList, setSummaryList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    let newSummary = new Array();

    const { response } = useSelector(state => ({
        response: state.ReportTP.commissionSummary,
    }));

    // useEffect(() => {
    //     if(response){
    //         if(response.commission_summary){
                
    //             const summary = response.commission_summary
    
    //             let n = 0;
                
    //             for (let x in summary) {
    //                 newSummary[n++] = summary[x];
    //             }

    //             setInitialSummaryList(newSummary);
    
    //             setSummaryList(newSummary);

    //             if(preLoader){
                    
    //                 setPreLoader(false);

    //             }
    //         } 
    //     }
    // }, [response]);

    useEffect(() => {
        if(response){
            if(response.commissions){
                
                const summary = response.commissions
    
                setSummaryList(summary);

                if(preLoader){
                    
                    setPreLoader(false);

                }
            } 
        }
    }, [response]);

    const columns = useMemo(() => 
        [
            {
                Header: "Salesman",
                accessor: "salesman",
            },
            {
                Header: "Commission ($)",
                accessor: "commission",
            },
            {
                Header: "Commission Return ($)",
                accessor: "commission_return",
            },
            {
                Header: "Net Commission ($)",
                Cell: (cellProps) => {
                    return (
                        (cellProps.cell.row.original.commission - cellProps.cell.row.original.commission_return).toFixed(2)
                    )
                }
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = initialSummaryList.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setSummaryList(filteredData)
        }
        
        else {

            setSummaryList(initialSummaryList);

        }

    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    useEffect(()=>{
        dispatch( getCommissionSummary(history) );
    }, []);

    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Commission Summary</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Commission Summary</h5>
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
                                                    placeholder="Search for user ID, username or something..."
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
                                            data={summaryList}
                                            customPageSize={10}
                                            maxLength={response?response.commission_summary?response.commission_summary.length:10:0}
                                            filteredLength={summaryList.length} 
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

export default CommissionSummary