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
import { saleReturnVariationById } from '../../../store/actions';
import "jspdf-autotable";
import BreadCrumb from '../../../Components/Common/BreadCrumb';



const SaleReturnVariationList = (props) => {

    const [saleReturnVariationList, setSaleReturnVariationList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const dispatch = useDispatch();

    const id = props.match.params.id;

    const { saleReturnVariationByIdResponse } = useSelector(state => ({
        saleReturnVariationByIdResponse: state.Sale.saleReturnVariations,
    }));

    useEffect(()=>{
        dispatch(saleReturnVariationById(id, history));
    }, []);

    useEffect(() => {
        if(saleReturnVariationByIdResponse.sale_return_variations){
            setSaleReturnVariationList(saleReturnVariationByIdResponse.sale_return_variations);
        }
    }, [saleReturnVariationByIdResponse]);

    useEffect(() => {
        if(localStorage.getItem('SaleReturnVariationById')){
            if(preLoader){
                setPreLoader(false);
            }
            localStorage.removeItem('SaleReturnVariationById');
        }
    }, [localStorage.getItem('SaleReturnVariationById')]);


    const columns = useMemo(() => 
        [
            {
                Header: "#",
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
                accessor: "selling_price",
                Header: "Selling Price ($)"
            },
            {
                accessor: "purchase_price",
                Header: "Purchase Price ($)"
            },
            {
                accessor: "return_deduction",
                Header: "Return Deduction ($)"
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = saleReturnVariationByIdResponse.sale_return_variations.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setSaleReturnVariationList(filteredData);
        }
        else {
            if(saleReturnVariationByIdResponse.sale_return_variations){
                setSaleReturnVariationList(saleReturnVariationByIdResponse.sale_return_variations);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Return Invoice", "Name", "SKU", "IMEI", "Group", "Quantity", "Selling Price ($)", "Purchase Price ($)", "Return Deduction ($)"];


    return (
        <div className="page-content">
            <MetaTags>
                <title>Sale Return Variations</title>
            </MetaTags>
            <Container fluid>
            <BreadCrumb title="Sale Return Variations" pageTitle="Sale Return List" link="/sale-return-list"/>
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Sale Return Variations</h5>
                                    <div className="d-flex gap-2">
                                        
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
                                            data={saleReturnVariationList}
                                            customPageSize={10}
                                            maxLength={saleReturnVariationByIdResponse.sale_return_variations ? saleReturnVariationByIdResponse.sale_return_variations.length:10}
                                            filteredLength={saleReturnVariationList.length} 
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


export default SaleReturnVariationList;