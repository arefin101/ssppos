import React, { useEffect, useState, useMemo, useRef } from "react";
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
  Modal,
  ModalBody,
  ButtonGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProducts, hasPermission } from '../../../store/actions';
import { CSVLink } from "react-csv";
import { ToastContainer  , toast} from 'react-toastify';
import jsPDF from "jspdf";
import "jspdf-autotable";
import LoadingBar from "react-top-loading-bar";


const ProductList = () => {

    const [productList, setProductList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const [phoneCreatePermissonBtn , setPhoneCreatePermissonBtn] = useState(false);
    
    const [chargerCreatePermissonBtn , setChargerCreatePermissonBtn] = useState(false);
    
    const phoneProduct = localStorage.getItem('phoneProduct')
    
    const chargerProduct = localStorage.getItem('chargerProduct')

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    const chargersuccessnotify = () => toast("Product Added Successfully !", { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const ref = useRef(null);

    const history = useHistory();

    const dispatch = useDispatch();

    const { response, productIndexPermission, phoneCreatePermission, chargerCreatePermission } =  useSelector( state => ({
        response: state.Product.products,
        productIndexPermission: state.General.productIndexPermission,
        phoneCreatePermission: state.General.phoneCreatePermission,
        chargerCreatePermission: state.General.chargerCreatePermission,
    }));



    useEffect(()=>{
        if(phoneCreatePermission){
            setPhoneCreatePermissonBtn(phoneCreatePermission)
        }
    },[phoneCreatePermission])

    useEffect(()=>{
        if(chargerCreatePermission){
            setChargerCreatePermissonBtn(chargerCreatePermission)
        }
    },[chargerCreatePermission])

    useEffect(()=>{
        dispatch(hasPermission("product.store-phone" , history));
        dispatch(hasPermission("product.store-charger", history));
        localStorage.removeItem('variationsByProduct');
        
        if(phoneProduct) {
            successnotify("Product Added Successfully !");
            localStorage.removeItem('phoneProduct');
            ref.current.complete();
        }
    }, []);
  

    useEffect(() => {
        if(chargerProduct) {
            chargersuccessnotify("Charger Added Successfully !");
            localStorage.removeItem('chargerProduct')
            ref.current.complete();
        }
    }, []);

    useEffect(()=>{
        dispatch(getProducts(history))
        dispatch(hasPermission('product.index', history))
    }, [dispatch]);

    useEffect(() => {
        if(response.products){
            setProductList(response.products);
        }
    }, [response]);

    if(response.products){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index + 1
                }
            },
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "SKU",
                accessor: "sku"
            },
            {
                Header: "Brand",
                accessor: "brand"
            },
            {
                Header: "Category",
                accessor: "product_category"
            },
            {
                Header: "Model",
                accessor: "product_model"
            },
            {
                Header:"Image",
                accessor: 'image',
                Cell: (cellProps) => {
                    return (
                        <div>
                            <img onClick={() => productDeatilsModal(cellProps.cell.row.original.image, cellProps.cell.row.original.id)} width="50px" alt="image" src={cellProps.cell.row.original.image} />
                        </div>
                    )
                }
            },
            {
                Header:"Actions",
                Cell: (cellProps) => {
                    return (
                        <UncontrolledDropdown>
                            <DropdownToggle
                                href="#"
                                className="btn-soft-secondary btn-sm dropdown"
                                tag="button"
                            >
                                <i className="ri-more-fill align-middle"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem onClick={() => productDeatilsModal(cellProps.cell.row.original.image, cellProps.cell.row.original.id)}><i className='ri-eye-fill eye-icon'></i>  View</DropdownItem>
                                <DropdownItem onClick={() => viewVariation(`/variation-list-by-product/${cellProps.cell.row.original.id}`)}><i style={{marginRight:'10px', verticalAlign: 'bottom' }} className='ri-eye-fill text-primary'></i> View Variations</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )
                }
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.products.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setProductList(filteredData)
        }
        else {
            if(response.products){
                setProductList(response.products);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["#", "Name", "SKU", "Brand", "Category", "Model"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Product List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.index+1, data.original.name, data.original.sku, data.original.product_brand, data.original.product_category, data.original.product_model])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Product_List.pdf")
    }

    const [productDetailsModal, setProductDetailsModal] = useState(false);
    const [modalImage, setModalImage] = useState();
    const [productId, setProductId] = useState();
    const [productInfo, setProductInfo] = useState([]);

    function productDeatilsModal(img, id) {
        setModalImage(img);
        setProductId(id);
        toggleModal();
    }

    useEffect(()=>{
        setProductInfo(productList.filter(item => item.id === productId));
    }, [productId]);

    function toggleModal(){
        setProductDetailsModal(!productDetailsModal);
    }

    const viewVariation = (url) => {
        history.push(url);
    }


    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <Container fluid>
                <MetaTags>
                    <title>Products</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Products</h5>
                                    <div className="d-flex gap-2">

                                    {(phoneCreatePermissonBtn==true || chargerCreatePermissonBtn==true) && <UncontrolledButtonDropdown id="btnGroupVerticalDrop1">

                                        <DropdownToggle color="success" className="bg-succes" style={{ borderTopRightRadius: "3px", borderBottomRightRadius: "3px", padding: "4px 12px" }}> 
                                            <i className="ri-add-line label-icon align-middle fs-16 me-2"></i> Add 
                                        </DropdownToggle>

                                        <DropdownMenu style={{ padding:"0" }}>
                                            { phoneCreatePermissonBtn==true && <DropdownItem>
                                                <Link to='/phone-add'>
                                                    <p className='text-success' style={{ marginBottom: "0", padding: "4px 0" }}><i className="ri-add-line align-bottom me-1"></i>Add Phone</p>
                                                </Link>
                                            </DropdownItem>}
                                            { chargerCreatePermissonBtn==true && <DropdownItem>
                                                <Link to='/charger-add'>
                                                    <p className='text-success' style={{ marginBottom: "0", padding: "4px 0" }}><i className="ri-add-line align-bottom me-1"></i>Add Charger</p>
                                                </Link>
                                            </DropdownItem>}
                                        </DropdownMenu>

                                    </UncontrolledButtonDropdown>}

                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.index+1, data.original.name, data.original.sku, data.original.product_brand, data.original.product_category, data.original.product_model] )}
                                            filename = "Product_List.csv"
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
                                                    placeholder="Search for product ID, name, brand, category, model or something..."
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
                                            data={productList}
                                            customPageSize={10}
                                            maxLength={response.products?response.products.length:10}
                                            filteredLength={productList.length} 
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

                <Modal id="flipModal" className='product-modal' isOpen={productDetailsModal} toggle={() => { toggleModal(); }} modalClassName="zoomIn" centered >
                    <ModalBody>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <img className='product-image' src={modalImage} alt="" style={{maxWidth:"300px", marginRight: "2rem",padding: "5px"}}/>
                            </div>
                            <div className="col-lg-6 col-12">
                                {
                                    productInfo[0] && <div className="info">
                                        {productInfo[0].name &&<h6 className="mt-0 mb-1 fs-14 fw-semibold">{productInfo[0].name}</h6>}
                                        {productInfo[0].brand &&<p className="fs-14 text-dark mt-3 mb-0">Brand: {productInfo[0].brand}</p>}
                                        {productInfo[0].product_category &&<p className="fs-14 mb-1 ">Catagory: {productInfo[0].product_category}</p>}
                                        {productInfo[0].product_model &&<p className="fs-14 text-dark mb-0">Model: {productInfo[0].product_model}</p>}
                                        {productInfo[0].sku &&<p className="fs-14 text-dark mb-0">SKU: {productInfo[0].sku}</p>}
                                        {productInfo[0].color &&<p className="fs-14 text-dark mb-0">Color: {productInfo[0].color}</p>}
                                        {productInfo[0].ram && <p className="fs-14 text-dark mb-0">RAM: {productInfo[0].ram}</p>}
                                        {productInfo[0].storage && <p className="fs-14 text-dark mb-0">Storage: {productInfo[0].storage}</p>}
                                        {productInfo[0].size && <p className="fs-14 text-dark mb-0">Size: {productInfo[0].size}</p>}
                                        {productInfo[0].wattage && <p className="fs-14 text-dark mb-0">Wattage: {productInfo[0].wattage}</p>}
                                        {productInfo[0].type && <p className="fs-14 text-dark mb-0">Type: {productInfo[0].type}</p>}
                                        {productInfo[0].condition && <p className="fs-14 text-dark mb-0">Condition: {productInfo[0].condition}</p>}
                                    </div>
                                }
                            </div>
                        </div>
                    </ModalBody>
                    
                </Modal>
                
                <ToastContainer/>

            </Container>
        </div>
    )
}


export default ProductList;