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
import { getSalesDueSummary } from '../../store/actions';


const SalesDueSummary = () => {

    const [salesDueSummaryList, setSalesDueSummaryList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.ReportTP.salesDueSummary,
    }));


    useEffect(() => {
        if(response){
            if(response.sales_due_summary){
    
                setSalesDueSummaryList(response.sales_due_summary);

                if(preLoader){
                    
                    setPreLoader(false);

                }
            } 
        }
    }, [response]);
    

    if(response.sales_due_summary){

        if(preLoader){
            
            setPreLoader(false);

        }
    } 

    const columns = useMemo(() => 
        [
            {
                Header: "Salesman",
                accessor: "salesman",
            },
            {
                Header: "Due ($)",
                accessor: "due",
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if(response){

            if(response.sales_due_summary){
    
                if (searchValue !== '') {

                    const filteredData = response.sales_due_summary.filter((item) => {
                        return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
                    })
        
                    setSalesDueSummaryList(filteredData)
                }
                
                else {

                    setSalesDueSummaryList(response.sales_due_summary);

                }
            } 
        }

    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    useEffect(()=>{
        dispatch( getSalesDueSummary(history) );
    }, []);

    return (
        <div className="page-content">
            <Container fluid>
                <MetaTags>
                    <title>Sales Due Summary</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Sales Due Summary</h5>
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
                                            data={salesDueSummaryList}
                                            customPageSize={10}
                                            maxLength={response?response.sales_due_summary?response.sales_due_summary.length:10:0}
                                            filteredLength={salesDueSummaryList.length} 
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

export default SalesDueSummary