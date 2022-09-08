import React, { useEffect, useState, useMemo, useRef } from "react";
import MetaTags from "react-meta-tags";
import { getAveragePurchasePrices, getPurchaseProductList } from '../../store/actions';
import TableContainer from "./TableContainer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, Modal, ModalBody, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import LoadingBar from 'react-top-loading-bar';

const AveragePurchasePriceList = (props) => {

    const [ preLoader, setPreLoader ] = useState(true);
    const [ avgPurchasePrices, setAvgPurchasePrices ] = useState([]);
    const [ filteredData, setFilteredData ] = useState([]);

    const dispatch = useDispatch();
    const ref = useRef(null);
    let serial = 0;
    
    const { averagePurchasePrice, productList } =  useSelector( state => ({
        averagePurchasePrice: state.AveragePurchasePrice.averagePurchasePrices,
        productList: state.AveragePurchasePrice.productList,
    }));

    useEffect(() => {
        dispatch(getAveragePurchasePrices(props.history))
    }, []);

    useEffect(() => {
        if(averagePurchasePrice.average_purchase_prices){
            setAvgPurchasePrices(averagePurchasePrice.average_purchase_prices);
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [averagePurchasePrice]);



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
                Header: "Product Name",
                accessor: "name",
            },
            {
                Header: "SKU",
                accessor: "sku",
            },
            {
                Header: "Quantity Available",
                accessor: "quantity_available",
                Cell: (cellProps) => {
                    return (
                        <span onClick={() => productListModal(cellProps.cell.row.original.sku)} className="text-link pointer">
                            {cellProps.cell.row.original.quantity_available}
                        </span>
                    )
                }
            },
            {
                Header: "Average Purchase Price ($)",
                accessor: "average_purchase_price",
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                return (
                    <UncontrolledDropdown >
                        <DropdownToggle href="#" className="btn-soft-secondary btn-sm dropdown" tag="button">
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>

                        <DropdownMenu className="dropdown-menu-end">

                            <DropdownItem onClick={() => productListModal(cellProps.cell.row.original.sku)}><i style={{ verticalAlign: 'bottom' }} className='ri-eye-fill eye-icon'></i>View Products</DropdownItem>
            
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        []
    )

    const tableHeaders = [ "#", "Product Name", "SKU", "Quantity Available", "Purchase Price" ];

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = averagePurchasePrice.average_purchase_prices.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setAvgPurchasePrices(filteredData)
        }
        else {
            if(averagePurchasePrice.average_purchase_prices){
                setAvgPurchasePrices(averagePurchasePrice.average_purchase_prices);
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
    
        const title = "Average Purchase Price";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [ data.index+1, data.original.name, data.original.sku, data.original.quantity_available, data.original.average_purchase_price ])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("average_purchase_price.pdf")
    }

    // Purchase Products Modal
    
    const [modal, setModal] = useState(false);
    const [sku, setSku] = useState("--");
    const [purchaseProductList, setPurchaseProductList] = useState([]);
    
    function togModal() {
        setModal(!modal);
    }

    const productListModal = (sku) => {
        ref.current.continuousStart();
        dispatch( getPurchaseProductList(sku, props.history) );
        setSku(sku);
    }

    useEffect(() => {
        if(productList.purchase_product_list){
            setPurchaseProductList(productList.purchase_product_list);
        }
    }, [productList.purchase_product_list]);

    useEffect(() => {
        if(localStorage.getItem("purchaseProducts")){
            ref.current.complete();
            setModal(!modal);
            localStorage.removeItem("purchaseProducts");
        }
    }, [localStorage.getItem("purchaseProducts")]);


 
    return (
        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />

                <MetaTags>
                    <title>Average Purchase Price</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Average Purchase Price</h4>
                                    <div className="d-flex gap-2 ms-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                            PDF
                                        </button>
                                        <CSVLink 
                                            filename="average_purchase_price.csv"
                                            headers={tableHeaders}
                                            data={ filteredData.map(data => [ data.index+1, data.original.name, data.original.sku, data.original.quantity_available, data.original.average_purchase_price ]) }
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
                                                        placeholder="Search for product name, sku or something..."
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
                                            data={avgPurchasePrices}
                                            customPageSize={10}
                                            maxLength={averagePurchasePrice.average_purchase_prices ? averagePurchasePrice.average_purchase_prices.length : 10}
                                            filteredLength={avgPurchasePrices.length} 
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



            {/* Purchase Product List Modal */}                           
            <Modal
                isOpen={modal}
                scrollable={true}
                toggle={() => {
                    togModal();
                }}
                centered
                className="modal-lg"
            >

                <ModalBody className="p-0">
                    <Card className="m-0">

                        <CardBody>
                            <h4 className="card-title mb-4 flex-grow-1">Purchase Product List for <span className="text-primary">SKU {sku}</span></h4>
                            <Card>
                                <CardBody>
                                    <div className="live-preview">
                                        <div className="table-responsive table-card">
                                            <Table className="align-middle table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">SKU</th>
                                                        <th scope="col">IMEI</th>
                                                        <th scope="col">Group</th>
                                                        <th scope="col">Available Quantity</th>
                                                        <th scope="col">Purchase Total ($)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>   
                                                    { purchaseProductList.map(elmt => (
                                                        // console.log(`${elmt.sku}${elmt.id}`)
                                                        <tr key={serial}>
                                                            <td>{++serial}</td>
                                                            <td>{elmt.name}</td>
                                                            <td>{elmt.sku}</td>
                                                            <td>{elmt.imei ? elmt.imei : 'N/A'}</td>
                                                            <td>{elmt.group ? elmt.group : 'N/A'}</td>
                                                            <td>{elmt.quantity}</td>
                                                            <td>{(parseFloat(elmt.purchase_price) + parseFloat(elmt.overhead_charge)).toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
            {/* --end-- Purchase Product List Modal */}

        </React.Fragment>
    );
};

export default AveragePurchasePriceList;