import React, { useEffect, useState, useMemo, useRef } from "react";
import MetaTags from 'react-meta-tags';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById, hasPermission } from '../../../store/actions';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { CardBody, CardHeader, Container, Row, Col, Card, Table, Spinner, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import profileBg from "../../../assets/images/profile-bg.jpg";
import userDummy from '../../../assets/images/users/user-dummy-img.jpg';
import LoadingBar from 'react-top-loading-bar';


const UserDetails = (props) => {

    const ref = useRef(null);
    
    const userId = props.match.params.id;

    const [preLoader, setPreLoader] = useState(true);
    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();
    
    const { response, permission } = useSelector( state => ({
        response: state.User.user,
        permission: state.General.updateUserOfficialPermission,
    }));

   
    useEffect(() => {
        if(response){
            setUserData(response.user_official);
        }
        else{
            setUserData([])
        }
        
    }, [response]);
    
    useEffect(() => {
        dispatch(hasPermission("user.update-official" , props.history))
        setUserData({});
        dispatch( getUserById( userId, props.history ) );
    }, []);
 
    if(Object.keys(userData).length !== 0){
        if(preLoader){
            setPreLoader(false);
        }
    }
    
    const editUser = (url) => {
        props.history.push(url);
    }
    
    // TAB PANE
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    // toaster
    const infoUpdateResponse = localStorage.getItem('user-info-update');

    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    useEffect(() => {
        if(infoUpdateResponse) {
            successnotify("Information Updated Successfully !");
            localStorage.removeItem('user-info-update');
            ref.current.complete();
        }
    }, [response]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                    
                    <MetaTags> <title>User Details</title> </MetaTags>
                    
                    <BreadCrumb title="User Details" pageTitle="Users" link="/user-list"/>

                    {
                        preLoader ?
                        <div className="spinner-box">
                            <Spinner color="primary"> Loading... </Spinner> 
                        </div>
                        :
                        <>
                            <div className="profile-foreground position-relative mx-n4 mt-n4">
                                <div className="profile-wid-bg">
                                    <img src={profileBg} alt="" className="profile-wid-img" />
                                </div>
                            </div>

                            <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                                <Row className="g-4">
                                    <div className="col-auto">
                                        <div className="avatar-lg">
                                            <img src={userDummy} alt="user-img"
                                                className="img-thumbnail rounded-circle" />
                                        </div>
                                    </div>
        
                                    <Col>
                                        <div className="p-2">
                                            <h3 className="text-white mb-1">{userData.first_name + " " + userData.last_name}</h3>
                                            <p className="text-white-75">User Official</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <Row>
                                <Col lg={12}>
                                    <div>
                                        {/* <div className="d-flex"> */}
                                            <Nav pills className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                                                <NavItem>
                                                    <NavLink
                                                        href="#overview"
                                                        className={classnames({ active: activeTab === '1' })}
                                                        onClick={() => { toggleTab('1'); }}
                                                    >
                                                        <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                            className="d-none d-md-inline-block">Overview</span>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        {/* </div> */}

                                        <TabContent activeTab={activeTab} className="pt-4">
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col>
                                                        <Card>
                                                            <CardHeader>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <h4 className="card-title">User Information</h4>
                                                                    {permission === true  && <Link className="btn btn-success" to={"/update-user-details/" + userId} onClick={() => editUser("/update-user-details/" + userId)}>
                                                                        <i className="ri-edit-box-line align-bottom"></i> Edit
                                                                    </Link>}
                                                                </div>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <div className="table-responsive">
                                                                    <Table className="table-borderless mb-0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row" style={{ width:'20%' }}>First Name :</th>
                                                                                <td>{userData.first_name}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Last Name :</th>
                                                                                <td>{userData.last_name}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Username :</th>
                                                                                <td>{userData.username}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Email :</th>
                                                                                <td>{userData.email}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Contact No. :</th>
                                                                                <td>{userData.contact_no}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Address :</th>
                                                                                <td>{userData.address}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">City :</th>
                                                                                <td>{userData.city}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">State :</th>
                                                                                <td>{userData.state}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Country :</th>
                                                                                <td>{userData.country}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th className="ps-0" scope="row">Zip Code :</th>
                                                                                <td>{userData.zip_code === "null" ? "" : userData.zip_code }</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    }
                    
                    <ToastContainer />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default UserDetails;
