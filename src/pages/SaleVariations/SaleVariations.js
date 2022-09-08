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
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getSaleVariations } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import BreadCrumb from '../../Components/Common/BreadCrumb';



const SaleVariations = (props) => {

    const id = props.match.params.id;

    const [saleVariationList, setSaleVariationList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.Sale.saleVariaitons,
    }));

    useEffect(()=>{
        
        dispatch( getSaleVariations(id, history) );
    }, [dispatch]);

    useEffect(() => {
        if(response.sale_variations){
            setSaleVariationList(response.sale_variations);
        }
    }, [response]);

    if(response.sale_variations){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    useEffect(() => {
        if(localStorage.getItem('SaleVariations')){
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [localStorage.getItem('SaleVariations')]);


    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index + 1
                }
            },
            {
                accessor: 'invoice_no',
                Header: 'Invoice No'
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
                accessor: 'group',
                Header: 'Group'
            },
            {
                accessor: 'quantity',
                Header: 'Quantity'
            },
            {
                accessor: 'selling_price',
                Header: 'Selling Price ($)'
            },
            {
                accessor: 'purchase_price',
                Header: 'Purchase Price ($)'
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.sale_variations.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setSaleVariationList(filteredData);
        }
        else {
            if(response.sale_variations){
                setSaleVariationList(response.sale_variations);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Invoice No", "Product Name", "SKU", "IMEI", "Group", "Quantity", "Selling Price ($)", "Purchase Price ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Sale Variations";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.invoice_no, data.original.name, data.original.sku, data.original.imei, data.original.group, data.original.quantity, data.original.selling_price, data.original.purchase_price])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("sale_variations.pdf")
    }


    const refdata = filteredData.map( (data, index) => {
        if(index === 0){
            return [data.original.invoice_no];
        }
    });

    const invoice_no_data = refdata[0] ? refdata[0] : "--";
    

    return (
        <div className="page-content">
            <MetaTags>
                <title>Sale Variations</title>
            </MetaTags>
            <Container fluid>
                <BreadCrumb title="Sale Variations" pageTitle="Sale List" link="/sale-list"/>
                <Row>
                    <Col lg={12}>
                        <Card id="saleVariations">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Sale Variations for <b> {invoice_no_data} </b></h5>
                                    <div className="d-flex gap-2">

                                        
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.invoice_no, data.original.name, data.original.sku, data.original.imei, data.original.group, data.original.quantity, data.original.selling_price, data.original.purchase_price] )}
                                            filename = "sale_variations.csv"
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
                                            data={saleVariationList}
                                            customPageSize={10}
                                            maxLength={response.sale_variations ? response.sale_variations.length:10}
                                            filteredLength={saleVariationList.length} 
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


export default SaleVariations;