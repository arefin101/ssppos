import React, { useEffect, useState, useMemo, useRef } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Modal, ModalBody, Table } from "reactstrap";
import LoadingBar from 'react-top-loading-bar';
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProductsOnHand, getProductsOnHandVariations } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";


const ProductsOnHand = () => {

    const ref = useRef(null);

    const [productsOnHandList, setProductsOnHandList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const { response, productOnHandVariations } = useSelector(state => ({
        response: state.productLocation.productsOnHand,
        productOnHandVariations: state.productLocation.productOnHandVariations
    }));

    useEffect(()=>{
        dispatch( getProductsOnHand(history) );
    }, []);

    useEffect(() => {
        if(response.products_on_hand){
            setProductsOnHandList(response.products_on_hand);
        }
    }, [response.products_on_hand]);

    if(response.products_on_hand){
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
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Total",
                accessor: "total",
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
                            <DropdownItem onClick={() => onHandVariation(cellProps.row.original.id, cellProps.row.original.name)}><i className='ri-eye-fill eye-icon'></i> View Variations</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        []
    )
    
    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.products_on_hand.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setProductsOnHandList(filteredData)
        }
        else {
            if(response.products_on_hand){
                setProductsOnHandList(response.products_on_hand);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["#","Name","Total"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Products On Hand";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1, data.original.name, data.original.total])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("products_on_hand.pdf")
    }



    // On Hand Variation Modal
    let serial = 0;

    const [variationModal, setVariationModal] = useState(false);
    const [variationsUnderName, setVariationsUnderName] = useState("--");
    const [onHandVariations, setOnHandVariations] = useState([]);

    const togVariationModal = () => {
        setVariationModal(!variationModal);
    }

    const onHandVariation = (id, name) => {
        ref.current.continuousStart();
        dispatch( getProductsOnHandVariations(id, history) );
        setVariationsUnderName(name);
    }

    useEffect(() => {
        if(productOnHandVariations.on_hand_variations){
            setOnHandVariations(productOnHandVariations.on_hand_variations);
        }
    }, [productOnHandVariations.on_hand_variations]);

    useEffect(() => {
        if(localStorage.getItem("variations")){
            ref.current.complete();
            setVariationModal(!variationModal);
            localStorage.removeItem("variations");
        }
    }, [localStorage.getItem("variations")]);

    // --end-- On Hand Variation Modal


    return (
        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <Container fluid>
                    <MetaTags>
                        <title>Products On Hand</title>
                    </MetaTags>
                    <Row>
                        <Col lg={12}>
                            <Card id="sprList">
                                <CardHeader className="card-header  border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Products On Hand</h5>
                                        <div className="d-flex gap-2">
                                            <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                                <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                            </button>
                                            <CSVLink 
                                                filename="products_on_hand.csv"
                                                headers={tableHeaders}
                                                data={filteredData.map(data => [data.index+1, data.original.name, data.original.total])}
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
                                                        placeholder="Search for name, total or something..."
                                                        onChange={(e) => searchItems(e.target.value)}
                                                    />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </Col>

                                            <Col sm={4} xxl={3}> </Col>

                                            <Col sm={4} xxl={3}> </Col>

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
                                                data={productsOnHandList}
                                                customPageSize={10}
                                                maxLength={response.products_on_hand?response.products_on_hand.length:10}
                                                filteredLength={productsOnHandList.length} 
                                                isExtraFeature={true}
                                                isGlobalSearch={true}
                                                setFilteredData={setFilteredData}
                                                divClass="table-responsive"
                                                className="custom-header-css"
                                            />
                                        </div>
                                    }
                                    {/* <DeleteModal
                                        show={deleteModal}
                                        onDeleteClick={() => setDeleteModal(false)}
                                        onCloseClick={() => setDeleteModal(false)}
                                    /> */}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* On Hand Variation Modal */}                      
            <Modal
                isOpen={variationModal}
                toggle={() => {
                    togVariationModal();
                }}
                scrollable={true}
                centered
                className="modal-lg"
            >

                <ModalBody className="p-0">
                    <Card className='m-0'>
                        <CardHeader>
                            <h4 className="card-title mb-0 flex-grow-1">Variations under <span className="text-primary">{variationsUnderName}</span></h4>
                        </CardHeader>

                        <CardBody>
                            <Card className="m-0">
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
                                                    </tr>
                                                </thead>
                                                <tbody>   
                                                    { onHandVariations.map(elmt => (
                                                        <tr key={elmt.id}>
                                                            <td>{++serial}</td>
                                                            <td>{elmt.name}</td>
                                                            <td>{elmt.sku}</td>
                                                            <td>{elmt.imei}</td>
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
            {/* --end-- On Hand Variation Modal */}

        </React.Fragment>
    )
}


export default ProductsOnHand;