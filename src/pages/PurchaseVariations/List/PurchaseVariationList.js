import React, { useEffect, useState, useMemo } from "react";
import MetaTags from "react-meta-tags";
import { ToastContainer } from 'react-toastify';
import { getPurchaseVariations } from '../../../store/actions';
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import "jspdf-autotable";


const PurchaseVariationList = (props) => {

    const dispatch = useDispatch();

    const [preLoader, setPreLoader] = useState(true);
    const [ variationList, setVariationList ] = useState([]);
    const [ filteredData, setFilteredData ] = useState([]);
    
    useEffect(() => {
        dispatch(getPurchaseVariations(props.history))
    }, []);

    const { response } =  useSelector( state => ({
        response: state.PurchaseVariations.purchaseVariations,
    }));

    useEffect(() => {
        if(response.purchase_variations){
            setVariationList(response.purchase_variations);
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [response]);



    // TABLE PROPERTIES
    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1
                }
            },
            {
                Header: "Purchase Reference",
                accessor: "purchase_reference",
            },
            {
                Header: "Product Name",
                accessor: "name",
            },
            {
                Header: "SKU",
                accessor: "sku",
            },
            {
                Header: "IMEI",
                accessor: "imei",
            },
            {
                Header: "Group",
                accessor: "group",
            },
            {
                Header: "Quantity Purchased",
                accessor: "quantity_purchased",
            },
            {
                Header: "Quantity Available",
                accessor: "quantity_available",
            },
            {
                Header: "Quantity Sold",
                accessor: "quantity_sold",
            },
            {
                Header: "Purchase Price ($)",
                accessor: "purchase_price",
            },
            {
                Header: "Overhead Charge ($)",
                accessor: "overhead_charge",
            },
            {
                Header: "Risk Fund",
                accessor: "risk_fund",
                Cell: (cellProps) => (cellProps.cell.row.original.risk_fund * 100 + '%')
            },
        ],
        []
    )

    const tableHeaders = ["#", "Purchase Reference", "Product Name", "SKU", "IMEI", "Group", "Quantity Purchased", "Quantity Available", "Quantity Sold", "Purchase Price", "Overhead Charge", "Risk Fund"];

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.purchase_variations.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setVariationList(filteredData)
        }
        else {
            if(response.purchase_variations){
                setVariationList(response.purchase_variations);
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
        const orientation = "landscape";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Purchase Variations";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [ data.index+1, data.original.purchase_reference, data.original.name, data.original.sku, data.original.imei, data.original.group, data.original.quantity_purchased, data.original.quantity_available, data.original.quantity_sold, data.original.purchase_price, data.original.overhead_charge, data.original.risk_fund*100+'%' ])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("purchase_variation_List.pdf")
    }


 
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Purchase Variations</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Purchase Variations</h4>
                                    <div className="d-flex gap-2 ms-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            filename="purchase_variation_List.csv"
                                            headers={tableHeaders}
                                            data={ filteredData.map(data => [ data.index+1, data.original.purchase_reference, data.original.name, data.original.sku, data.original.imei, data.original.group, data.original.quantity_purchased, data.original.quantity_available, data.original.quantity_sold, data.original.purchase_price, data.original.overhead_charge, data.original.risk_fund*100+'%' ]) }
                                        >
                                            <button type="button" className="btn btn-primary">
                                                <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                                                CSV
                                            </button>
                                        </CSVLink>
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
                                                        placeholder="Search for reference no, product name, sku, imei or something..."
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

                                <CardBody>
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
                                            data={variationList}
                                            customPageSize={10}
                                            maxLength={response.purchase_variations ? response.purchase_variations.length : 10}
                                            filteredLength={variationList.length} 
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
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default PurchaseVariationList;