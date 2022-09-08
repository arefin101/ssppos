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
  ModalBody
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { _ } from 'gridjs-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getBrands, hasPermission } from '../../store/actions';
import "jspdf-autotable";
import { Link } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'



const BrandList = (props) => {

    const [brandCreatePermissonBtn , setBrandCreatePermissonBtn] = useState(false);

    const [brandList, setBrandList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const history = useHistory();

    const ref = useRef(null);

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.productBrand.brands,
    }));

    useEffect(() => {
        if(localStorage.getItem("brand")){
            successnotify("Brand Created Successfully !");
            localStorage.removeItem("brand");
            ref.current.complete();
        }
    }, []);

    useEffect(()=>{
        dispatch( getBrands(history) );
    }, [dispatch]);

    useEffect(() => {
        if(response.brands){
            setBrandList(response.brands);
        }
    }, [response]);

    if(response.brands){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const { brandCreatePermission } =useSelector( state => ({
        brandCreatePermission: state.General.brandCreatePermission,
    }));

    useEffect(()=>{

        if(brandCreatePermission){
            setBrandCreatePermissonBtn(brandCreatePermission)
        }

    },[brandCreatePermission])

    useEffect(()=>{
        dispatch(hasPermission("brand.store" , props.history))
    },[])

    const [modal_animationZoom, setmodal_animationZoom] = useState(false);
    const [modal_image, setmodal_image] = useState();
    

    function tog_animationZoom(data) {
        setmodal_animationZoom(!modal_animationZoom);
        setmodal_image(data);
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
                accessor: 'name',
                Header: 'Name'
            },
            {
                accessor: 'image',
                Header: 'Image',
                Cell: (cellProps) => {
                    
                    return (
                        <div>
                            <img onClick={() => tog_animationZoom(cellProps.cell.row.original.image)} width="50px" alt="image" src={cellProps.cell.row.original.image} />
                        </div>
                    )
                }
            }
            
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.brands.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setBrandList(filteredData)
        }
        else {
            if(response.brands){
                setBrandList(response.brands);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />

            <MetaTags>
                <title>Brand List</title>
            </MetaTags>
            <Container fluid>
               
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Brands</h5>
                                    <div className="d-flex gap-2">

                                        { brandCreatePermission === true && 
                                            <Link to ='/brand-create'>
                                                <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Brand</button>
                                            </Link>
                                        }
                                        
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
                                                    placeholder="Search for brand ID, name or something..."
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
                                <Modal id="flipModal" className='product-modal' isOpen={modal_animationZoom} toggle={() => { tog_animationZoom(); }} modalClassName="zoomIn" centered >
                                    <ModalBody>
                                        <img className='product-image' src={modal_image} alt="" />
                                    </ModalBody>
                                </Modal>
                                {preLoader?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div>:
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={brandList}
                                            customPageSize={10}
                                            maxLength={response.brands ? response.brands.length:10}
                                            filteredLength={brandList.length} 
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
                <ToastContainer/>
            </Container>
        </div>
    )
}


export default BrandList;