import React ,{useEffect , useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { hasPermission } from '../../../store/actions';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { CustomerTableData } from './CustomerTableData';
import { ToastContainer  , toast} from 'react-toastify';

const CustomerList = (props) => {

    const customer = localStorage.getItem('customer');
    
    const [customerCreatePermissonBtn , setCustomerCreatePermissonBtn] = useState(false);

    const dispatch = useDispatch();
    
    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    useEffect(() => {
        if(customer) {
            successnotify("Customer Created Successfully !");
            localStorage.removeItem('customer')
        }
    }, []);

    
    const { customerCreatePermission } = useSelector( state => ({
        customerCreatePermission: state.General.customerCreatePermission,
    }));

    useEffect(()=>{
        if(customerCreatePermission){
            setCustomerCreatePermissonBtn(customerCreatePermission)
        }
    },[customerCreatePermission])
    
    useEffect(()=>{
        dispatch(hasPermission("user.register-customer" , props.history))
    },[])
    
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Customer List</title>
                </MetaTags>

                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Customers</h4>
                                   { customerCreatePermissonBtn == true &&
                                    <Link to='/customer/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Customer</button>
                                    </Link>
                                   }
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <CustomerTableData history={props.history} />
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

export default CustomerList;