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
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { hasPermission, getProductModels } from '../../../store/actions';
import { ToastContainer  , toast} from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'



const ProductModelList = () => {

    const [modelList, setModelList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const productModel = localStorage.getItem('productModel')

    const [modelCreatePermissonBtn , setModelCreatePermissonBtn] = useState(false);
    
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const history = useHistory();

    const ref = useRef(null);

    const dispatch = useDispatch();


    useEffect(() => {
        if(productModel) {
            successnotify("Model Created Successfully !");
            localStorage.removeItem('productModel');
            ref.current.complete();
        }
    }, []);

    const { modelCreatePermission } =useSelector( state => ({
        modelCreatePermission: state.General.modelCreatePermission,
    }));

    useEffect(()=>{

        if(modelCreatePermission){
            setModelCreatePermissonBtn(modelCreatePermission)
        }

    },[modelCreatePermission])

    useEffect(()=>{
        dispatch(hasPermission("product-model.store" , history))
    },[])


    const { response } =  useSelector( state => ({
        response: state.productModels.productModels,
    }));

    useEffect(() => {
        dispatch(getProductModels(history))
    }, []);

    useEffect(() => {
        if(response.product_models){
            setModelList(response.product_models);
        }
    }, [response]);

    if(response.product_models){
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
                accessor: "name",
            },
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.product_models.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setModelList(filteredData)
        }
        else {
            if(response.product_models){
                setModelList(response.product_models);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };


    return (
        <div className="page-content">
            <Container fluid>
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Model List</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Models</h5>
                                    <div className="d-flex gap-2">
                                        {modelCreatePermission==true && <Link to='/models/add'>
                                            <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Model</button>
                                        </Link>}
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
                                                    placeholder="Search for model ID, name or something..."
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
                                            data={modelList}
                                            customPageSize={10}
                                            maxLength={response.product_models?response.product_models.length:10}
                                            filteredLength={modelList.length} 
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


export default ProductModelList;