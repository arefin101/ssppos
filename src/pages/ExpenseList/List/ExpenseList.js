import React , {useEffect} from 'react';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { ExpenseListTableData } from './ExpenseListTableData';
import { ToastContainer  , toast} from 'react-toastify';
import { hasPermission } from './../../../store/general/action';
import { useDispatch, useSelector } from 'react-redux';


const ExpenseList = (props) => {

    const expense = localStorage.getItem('expense');
    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(expense) {
            successnotify("Expense Added Successfully !");
            localStorage.removeItem('expense');
        }

        dispatch(hasPermission("expense.store" , props.history))

    }, []);

    const { addExpensePermission } =useSelector( state => ({ 
        addExpensePermission: state.General.addExpensePermission,
    }));
    
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Expense List</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Expense List</h4>
                                    
                                    {addExpensePermission && <Link to='/expense-list/add'>
                                        <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Expense</button>
                                    </Link>}
                                    
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <ExpenseListTableData history={props.history} />
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

export default ExpenseList;