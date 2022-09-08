import React, { useEffect, useState, useMemo } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner } from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getPurchaseReturnVariationsById } from '../../../store/actions';
import "jspdf-autotable";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";



const PurchaseReturnVariationList = (props) => {

    const [purchaseReturnVariationList, setPurchaseReturnVariationList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const id = props.match.params.id;

    const { purchaseReturnVariations } = useSelector(state => ({
        purchaseReturnVariations: state.Purchase.purchaseReturnVariations,
    }));

    useEffect(()=>{
        dispatch(getPurchaseReturnVariationsById(id, history));
    }, []);

    useEffect(() => {
        if(purchaseReturnVariations.purchase_return_variations){
            setPurchaseReturnVariationList(purchaseReturnVariations.purchase_return_variations);
        }
    }, [purchaseReturnVariations]);

    useEffect(() => {
        if(localStorage.getItem('PurchaseReturnVariationById')){
            if(preLoader){
                setPreLoader(false);
            }
            localStorage.removeItem('PurchaseReturnVariationById')
        }
    }, [localStorage.getItem('PurchaseReturnVariationById')]);



    const columns = useMemo(() => 
        [
            {
                Header: "#",
                accessor:'#',
                Cell: (cellProps) => {
                    return cellProps.cell.row.index + 1
                }
            },
            {
                accessor: 'return_invoice',
                Header: 'Return Invoice'
            },
            {
                accessor: 'name',
                Header: 'Name'
            },
            {
                accessor: 'sku',
                Header: 'SKU'
            },
            {
                accessor: "imei",
                Header: "IMEI"
            },
            {
                accessor: "group",
                Header: "Group"
            },
            {
                accessor: "quantity",
                Header: "Quantity"
            },
            {
                accessor: "purchase_price",
                Header: "Purchase Price ($)"
            },
            {
                accessor: "overhead_charge",
                Header: "Overhead Charge ($)"
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = purchaseReturnVariations.purchase_return_variations.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setPurchaseReturnVariationList(filteredData);
        }
        else {
            if(purchaseReturnVariations.purchase_return_variations){
                setPurchaseReturnVariationList(purchaseReturnVariations.purchase_return_variations);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["#", "Return Invoice", "Name", "SKU", "IMEI", "Group", "Quantity", "Purchase Price ($)", "Overhead Charge ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "landscape";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Purchase Return Variations";
        const headers = [tableHeaders];
        const data = filteredData.map(data =>[data.index+1, data.original.return_invoice, data.original.name, data.original.sku, data.original.imei, data.original.group, data.original.quantity, data.original.purchase_price, data.original.overhead_charge])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("purchase_return_variations.pdf")
    }


    return (
        <div className="page-content">
            <MetaTags>
                <title>Purchase Return Variations</title>
            </MetaTags>
            <Container fluid>
            <BreadCrumb title="Purchase Return Variations" pageTitle="Purchase Return List" link="/purchase-return-list"/>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Purchase Return Variations</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders} 
                                            data={filteredData.map(data => [data.index+1, data.original.return_invoice, data.original.name, data.original.sku, data.original.imei, data.original.group, data.original.quantity, data.original.purchase_price, data.original.overhead_charge])}
                                            filename="Purchase_Return_Variation_List.csv"
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
                                                    placeholder="Search for return invoice, name, sku or something..."
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
                                            data={purchaseReturnVariationList}
                                            customPageSize={10}
                                            maxLength={purchaseReturnVariations.purchase_return_variations ? purchaseReturnVariations.purchase_return_variations.length:10}
                                            filteredLength={purchaseReturnVariationList.length} 
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


export default PurchaseReturnVariationList;