import React ,{useEffect , useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { hasPermission } from '../../../store/actions';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { ExpenseCategoryTablesData } from './ExpenseCategoryTablesData';
import { ToastContainer  , toast} from 'react-toastify';


const ExpenseCategoryList = (props) => {

    const expenseCategory = localStorage.getItem('expenseCategory')
    const [expenseCategoryCreatePermissionBtn , setExpenseCategoryCreatePermissionBtn] = useState(false)
    
    const dispatch = useDispatch();

    const { expenseCategoryCreatePermission } =useSelector( state => ({
        expenseCategoryCreatePermission: state.General.expenseCategoryCreatePermission,
    }));

    useEffect(()=>{
        if(expenseCategoryCreatePermission){
            setExpenseCategoryCreatePermissionBtn(expenseCategoryCreatePermission)
        }
    },[expenseCategoryCreatePermission]);
    
    useEffect(()=>{
        dispatch(hasPermission("expense-category.store" , props.history))
    },[])


    // TOASTER
    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    useEffect(() => {
        if(expenseCategory) {
            successnotify("Expense Category Added Successfully !");
            localStorage.removeItem('expenseCategory');
        }
    }, []);
    
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Expense Category List</title>
                </MetaTags>
                <Container fluid>
                    {/* <BreadCrumb title="Customer List" pageTitle="Customer" /> */}

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Expense Categories</h4>
                                   { expenseCategoryCreatePermissionBtn == true &&
                                    <Link to='/expense-categories/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Category</button>
                                    </Link>
                                     } 
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <ExpenseCategoryTablesData history={props.history} />
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

export default ExpenseCategoryList;