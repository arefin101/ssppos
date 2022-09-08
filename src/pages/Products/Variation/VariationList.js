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
  Spinner
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useSelector, useDispatch } from "react-redux";
import { getVariationsByProduct } from '../../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { toast, ToastContainer } from 'react-toastify';



const VariationList = (props) => {

    const id = props.match.params.id;

    const [productVariationList, setProductVariationList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();

    const { response, error } = useSelector(state => ({
        response: state.Product.productVariations,
        error: state.PurchaseVariations.error,
    }));

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    let flag = true;

    if(Object.keys(error).length !== 0 && flag){
        errornotify(error);
        flag = false;
    }

    useEffect(()=>{
        
        dispatch( getVariationsByProduct(id) );
    }, [dispatch]);

    useEffect(() => {
        if(response.purchase_variations){
            setProductVariationList(response.purchase_variations);
        }
    }, [response]);

    if(response.purchase_variations){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    useEffect(() => {
        if(localStorage.getItem('variationsByProduct')){
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [localStorage.getItem('variationsByProduct')]);


    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index + 1
                }
            },
            {
                accessor: 'name',
                Header: 'Product Name'
            },
            {
                accessor: 'sku',
                Header: 'SKU'
            },
            {
                accessor: 'imei',
                Header: 'IMEI'
            },
            {
                accessor: 'quantity_purchased',
                Header: 'Quantity Purchased'
            },
            {
                accessor: 'quantity_available',
                Header: 'Quantity Available'
            },
            {
                accessor: 'quantity_sold',
                Header: 'Quantity Sold'
            },
            {
                accessor: 'purchase_price',
                Header: 'Purchase Price ($)',
                Cell: (cellProps) => (
                    (parseInt(cellProps.cell.row.original.purchase_price) + parseInt(cellProps.cell.row.original.overhead_charge)).toFixed(2)
                )  
            },
            {
                accessor: 'risk_fund',
                Header: 'Risk Fund',
                Cell: (cellProps) => (
                    cellProps.cell.row.original.risk_fund * 100 + '%'
                )
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.purchase_variations.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setProductVariationList(filteredData);
        }
        else {
            if(response.purchase_variations){
                setProductVariationList(response.purchase_variations);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Product Name", "SKU", "IMEI", "Quantity Purchased", "Quantity Available", "Quantity Sold", "Purchase Total ($)", "Risk Fund"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Product Variations";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.name, data.original.sku, data.original.imei, data.original.quantity_purchased, data.original.quantity_available, data.original.quantity_sold, (parseInt(data.original.purchase_price) + parseInt(data.original.overhead_charge)).toFixed(2), data.original.risk_fund * 100 + '%'])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("product_variations.pdf")
    }
    

    return (
        <div className="page-content">
            <MetaTags>
                <title>Product Variations</title>
            </MetaTags>
            <Container fluid>

            <BreadCrumb title="Product Variations" pageTitle="Products" link="/product-list"/>

                <Row>
                    <Col lg={12}>
                        <Card id="productVariations">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Product Variations</h5>
                                    <div className="d-flex gap-2">

                                        
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.name, data.original.sku, data.original.imei, data.original.quantity_purchased, data.original.quantity_available, data.original.quantity_sold, (parseInt(data.original.purchase_price) + parseInt(data.original.overhead_charge)).toFixed(2), data.original.risk_fund * 100 + '%'] )}
                                            filename = "product_variations.csv"
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
                                                    placeholder="Search for product name, sku, imei or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}></Col>

                                        <Col sm={4} xxl={3}></Col>

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
                                            data={productVariationList}
                                            customPageSize={10}
                                            maxLength={response.purchase_variations ? response.purchase_variations.length:10}
                                            filteredLength={productVariationList.length} 
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
            <ToastContainer />
        </div>
    )
}


export default VariationList;