import React, {useEffect, useState} from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { BrandTableData } from './BrandTableData';
import {Link} from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hasPermission } from './../../store/general/action';

const BrandList = (props) => {
    const brand = localStorage.getItem('brand')

    const [brandCreatePermissonBtn , setBrandCreatePermissonBtn] = useState(false);
   
    const successnotify = (message) => toast( message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const dispatch = useDispatch();

    useEffect(() => {
        if(brand) {
            successnotify("Brand Created Successfully !");
            localStorage.removeItem('brand')
        }
    }, []);

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
    
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Brands</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Brands</h4>
                                    {brandCreatePermission === true && <Link to ='/brand-create'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Brand</button>
                                    </Link>}
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <BrandTableData history={props.history}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <ToastContainer />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BrandList;