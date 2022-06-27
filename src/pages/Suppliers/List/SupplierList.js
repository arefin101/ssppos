import React, {useEffect,useState} from 'react';
import MetaTags from "react-meta-tags";
import { useSelector ,useDispatch} from 'react-redux';
import { hasPermission } from '../../../store/actions';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ToastContainer  , toast} from 'react-toastify';
import { SupplierTableData } from './SupplierTableData';

const SupplierList = (props) => {
    const supplier = localStorage.getItem('supplier')
    const [supplierCreatePermissonBtn , setSupplierCreatePermissonBtn] = useState(false)
    
    const dispatch = useDispatch();
    
    const successnotify = (message) => toast( message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });const errornotify = () => toast("Error ! An error occurred.", { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
    
    useEffect(() => {
        if(supplier) {
            successnotify("Supplier Created Successfully !");
            localStorage.removeItem('supplier')
        }
    }, []);


    const { supplierCreatePermission } =useSelector( state => ({
        supplierCreatePermission: state.General.supplierCreatePermission,
    }));


    useEffect(()=>{
        if(supplierCreatePermission){
            setSupplierCreatePermissonBtn(supplierCreatePermission)
        }

    },[supplierCreatePermission]);
    
    useEffect(()=>{
        dispatch(hasPermission("user.register-supplier" , props.history))
    },[]);


    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Supplier List</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Suppliers</h4>
                                    { supplierCreatePermissonBtn == true &&
                                        <Link to='/supplier/add'>
                                            <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Supplier</button>
                                        </Link>
                                    }
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <SupplierTableData history={props.history} />
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

export default SupplierList;