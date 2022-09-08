import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Form,
  Button,
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUsers as getUserList, hasPermission } from "../../../store/actions";
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LoadingBar from 'react-top-loading-bar';



const UserList = () => {

    const [userList, setUserList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();

    const [userCreatePermissonBtn , setUserCreatePermissonBtn] = useState(false)
    
    const successnotify1 = (message) => toast(message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const ref = useRef(null);

    useEffect(() => {

        if(localStorage.getItem('user')){
            successnotify1('User Created Successfully !');
            localStorage.removeItem('user');
            ref.current.complete();
        }
        
    }, []);

    const successnotify2 = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    useEffect(() => {

        if(localStorage.getItem('roleResponse')){
            successnotify2("Role Assigned Successfully !");
            localStorage.removeItem('roleResponse');
            ref.current.complete();
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
        dispatch(hasPermission("user.register-official" , history))
    },[])

    const dispatch = useDispatch();

    const { response , assignRolePermission } = useSelector(state => ({
        response: state.User.users,
        assignRolePermission: state.General.assignRolePermission,
    }));

    useEffect(()=>{
        dispatch(hasPermission("user.assign-role" , history));
        dispatch(getUserList(history));
    }, [dispatch]);

    useEffect(() => {
        if(response.users){
            setUserList(response.users);
        }
    }, [response]);

    if(response.users){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const columns = useMemo(() => 
        [
            {
                Header: "#",
                accessor: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1;
                }
            },
            {
                Header: "Username",
                accessor: "username",
            },
            {
                Header: "Roles",
                accessor: "roles",
                Cell: (cellProps) => {
                    return rolesConcat(cellProps.cell.row.original.roles)
                }
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                        <UncontrolledDropdown>
                        <DropdownToggle
                            href="#"
                            className="btn-soft-secondary btn-sm dropdown"
                            tag="button"
                        >
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">

                            <DropdownItem onClick={() => userDetails(`/user-details/${cellProps.cell.row.original.id}`)}><i className='ri-eye-fill eye-icon'></i> View </DropdownItem>
                            {assignRolePermission === true &&
                                <DropdownItem onClick={() => assignRole(`/user-list/assign-role/${cellProps.cell.row.original.id}`)}><i className='ri-check-fill tick-icon'></i>  Assign Role </DropdownItem>
                            }
            
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    );
                },
            }
        ],
        [assignRolePermission]
    )

    function rolesConcat(roles) {
        roles = roles.map(item => item.name)
        return roles.join(", ");
    }

    const assignRole = (url) => {
        history.push(url);
    }
    const userDetails = (url) => {
        history.push(url);
    }

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setUserList(filteredData)
        }
        else {
            if(response.users){
                setUserList(response.users);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Username", "Roles"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "User List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.username, rolesConcat(data.original.roles)])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("User_List.pdf")
    }


    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <Container fluid>
                <MetaTags>
                    <title>User List</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Users</h5>
                                    <div className="d-flex gap-2">
                                        { userCreatePermissonBtn === true &&
                                            <Link to={{ pathname: "/add-user", state: { error: '' } }}>
                                                <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add User</button>
                                            </Link>
                                        }
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.username, data.original.roles.map(item => item.name).join(", ")] )}
                                            filename = "Sale_Payment_Report.csv"
                                            >
                                            <button type="button" className="btn btn-primary">
                                                <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                                                CSV
                                            </button>
                                        </CSVLink>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="bg-soft-light border border-dashed border-start-0 border-end-0">
                                <Form>
                                    <Row className="g-3">
                                        <Col sm={12} xxl={5}>
                                            <div className="search-box">
                                                <input
                                                    type="text"
                                                    id="search"
                                                    className="form-control search bg-light border-light"
                                                    placeholder="Search for user ID, username or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}>

                                        </Col>

                                        <Col sm={4} xxl={3}>

                                        </Col>

                                        <Col sm={4} xxl={1}>
                                            <div>
                                                <Button color="soft-danger" className="w-100" onClick={reset}>
                                                    {" "}
                                                    <i className="mdi mdi-refresh me-1 align-bottom"></i>
                                                    Reset
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardBody className="pt-0">
                                {preLoader?
                                    <div className="spinner-box">
                                        <Spinner color="primary"> Loading... </Spinner> 
                                    </div>:
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={userList}
                                            customPageSize={10}
                                            maxLength={response.users?response.users.length:10}
                                            filteredLength={userList.length} 
                                            isExtraFeature={true}
                                            isGlobalSearch={true}
                                            setFilteredData={setFilteredData}
                                            divClass="table-responsive"
                                            className="custom-header-css"
                                        />
                                    </div>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </div>
    )
}


export default UserList;