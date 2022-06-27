import React ,{ useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PurchaseTableData } from './PurchaseTableData';
import { toast, ToastContainer } from 'react-toastify';
import { hasPermission } from '../../../store/actions';


const PurchaseList = (props) => {

    const [purchaseCreatePermissonBtn, setPurchaseCreatePermissonBtn] = useState(false)
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    const dispatch = useDispatch();

    useEffect(() => {

        if(localStorage.getItem('purchaseTransaction')) {
            successnotify("Purchase Created Successfully !");
            localStorage.removeItem('purchaseTransaction')
        }

        if(localStorage.getItem('variationsById')) {
            localStorage.removeItem('variationsById')
        }
       
    }, []);

    const { purchaseCreatePermission } =useSelector( state => ({
        purchaseCreatePermission: state.General.createPurchasePermission,
    }));


    useEffect(()=>{

        if(purchaseCreatePermission){
            setPurchaseCreatePermissonBtn(purchaseCreatePermission)
        }

    },[purchaseCreatePermission])

    useEffect(()=>{
        dispatch(hasPermission("purchase.store" , props.history))
    },[])

    return (

        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Purchase List</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Purchase List</h4>
                                   
                                    { purchaseCreatePermissonBtn === true && <Link to='/purchases/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Create Purchase</button>
                                    </Link>}
                                    
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <PurchaseTableData history={props.history}/>
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

export default PurchaseList;