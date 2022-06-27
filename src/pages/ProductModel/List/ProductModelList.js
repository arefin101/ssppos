import React, {useEffect} from 'react';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { ProductModelTableData } from './ProductModelTablesData';
import { ToastContainer  , toast} from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hasPermission } from './../../../store/general/action';

const ProductModelList = (props) => {
    const productModel = localStorage.getItem('productModel')

    const [modelCreatePermissonBtn , setModelCreatePermissonBtn] = useState(false)
    const dispatch = useDispatch();
   
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    
    useEffect(() => {
        if(productModel) {
            successnotify("Model Created Successfully !");
            localStorage.removeItem('productModel')
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
        dispatch(hasPermission("product-model.store" , props.history))
    },[])
   

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Models</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Models</h4>
                                    {modelCreatePermission==true && <Link to='/models/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Model</button>
                                    </Link>}
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <ProductModelTableData history={props.history}/>
                                    </div>
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

export default ProductModelList;