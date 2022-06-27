import React, { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import { hasPermission } from '../../../store/actions';
import { TableData } from './TablesData';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const UserList = (props) => {
    const [userCreatePermissonBtn , setUserCreatePermissonBtn] = useState(false)
    const successnotify1 = (message) => toast(message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    const dispatch = useDispatch();
    useEffect(() => {

        if(localStorage.getItem('user')){
            successnotify1('User Created Successfully !');
            localStorage.removeItem('user')
        }
        
    }, []);

    const successnotify2 = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    useEffect(() => {

        if(localStorage.getItem('roleResponse')){
            successnotify2("Role Assigned Successfully !");
            localStorage.removeItem('roleResponse')
        }
        
    }, []);

    const { userCreatePermission } =useSelector( state => ({ 
        userCreatePermission: state.General.userCreatePermission,
    }));

    useEffect(()=>{

        if(userCreatePermission){
            setUserCreatePermissonBtn(userCreatePermission)
        }

    },[userCreatePermission])

    useEffect(()=>{
        dispatch(hasPermission("user.register-official" , props.history))
    },[])
    

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>User List</title>
                </MetaTags>
                <Container fluid>
                    {/* <BreadCrumb title="Users"/> */}

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Users</h4>
                                    { userCreatePermissonBtn == true &&
                                        <Link to={{ pathname: "/add-user", state: { error: '' } }}>
                                            <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add User</button>
                                        </Link>
                                    }
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <TableData  />
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

export default UserList;