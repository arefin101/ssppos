import React ,{useEffect , useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { hasPermission } from '../../../store/actions';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { ExpenseReferenceTableData } from './ExpenseReferenceTableData';
import { ToastContainer  , toast} from 'react-toastify';

const ExpenseReferenceList = (props) => {

    const expenseReference = localStorage.getItem('expenseReference')
    const [expenseReferenceCreatePermissionBtn , setExpenseReferenceCreatePermissionBtn] = useState(false)
    const dispatch = useDispatch();
    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    useEffect(() => {
        if(expenseReference) {
            successnotify("Expense References Added Successfully !");
            localStorage.removeItem('expenseReference')
        }
    }, []);

    
    const { expenseReferenceCreatePermission } =useSelector( state => ({
        expenseReferenceCreatePermission: state.General.expenseReferenceCreatePermission,
    }));

    useEffect(()=>{
        if(expenseReferenceCreatePermission){
            setExpenseReferenceCreatePermissionBtn(expenseReferenceCreatePermission)
        }

    },[expenseReferenceCreatePermission])
    
    useEffect(()=>{
        dispatch(hasPermission("expense-reference.store" , props.history))
    },[])
    
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Expense References</title>
                </MetaTags>
                <Container fluid>
                    {/* <BreadCrumb title="Customer List" pageTitle="Customer" /> */}

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Expense References</h4>
                                   { expenseReferenceCreatePermissionBtn == true &&
                                    <Link to='/expense-references/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Reference</button>
                                    </Link>
                                    } 
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <ExpenseReferenceTableData history={props.history} />
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

export default ExpenseReferenceList;