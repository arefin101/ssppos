import React ,{ useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RoleTableData } from './RoleTableData';
import { toast, ToastContainer } from 'react-toastify';
import { hasPermission } from '../../../store/actions';


const RoleList = (props) => {
    const role = localStorage.getItem('role')
    const permission_message = localStorage.getItem('permission_message')
    const [roleCreatePermissonBtn , setRoleCreatePermissonBtn] = useState(false)
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    const dispatch = useDispatch();

    useEffect(() => {

        if(role) {
            successnotify("Role Created Successfully !");
            localStorage.removeItem('role')
        }
        if(permission_message) {
            successnotify("Permissions Assigned Successfully !");
            localStorage.removeItem('permission_message')
        }
       
    }, []);

    const { roleCreatePermission } =useSelector( state => ({
        roleCreatePermission: state.General.roleCreatePermission,
    }));

    useEffect(()=>{

        if(roleCreatePermission){
            setRoleCreatePermissonBtn(roleCreatePermission)
        }

    },[roleCreatePermission])

    useEffect(()=>{
        dispatch(hasPermission("role.store" , props.history))
    },[])

    return (

        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Role List</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Roles</h4>
                                    { roleCreatePermissonBtn === true &&
                                        <Link to='/Role/add'>
                                            <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Create Role</button>
                                        </Link>
                                    }
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">

                                        <RoleTableData history={props.history}/>
                                        
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

export default RoleList;