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
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getRoles, hasPermission } from "../../../store/actions";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast, ToastContainer } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'





const RoleList = () => {

    const [roleList, setRoleList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const history = useHistory();
    
    const ref = useRef(null);

    const dispatch = useDispatch();

    const [roleCreatePermissonBtn , setRoleCreatePermissonBtn] = useState(false);
    
    const { response, permissionsUpdatePermission } = useSelector(state => ({
        response: state.Role.roles,
        permissionsUpdatePermission : state.General.permissionsUpdatePermission?state.General.permissionsUpdatePermission:false,
        
    }));
    
    useEffect(() => {
        dispatch(hasPermission("role.assign-permission" ,history));
        dispatch(getRoles(history));
    }, []);

    
    useEffect(() => {
        if(localStorage.getItem("role")){
            successnotify("Role Created Successfully !");
            localStorage.removeItem("role");
            ref.current.complete();
        }
        if(localStorage.getItem("permission_message")) {
            successnotify("Permissions Assigned Successfully !");
            localStorage.removeItem('permission_message');
            ref.current.complete();
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
        dispatch(hasPermission("role.store" , history))
    },[])

    useEffect(() => {
        if(response.roles){
            setRoleList(response.roles);
        }
    }, [response]);

    if(response.roles){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const click = (url) => {
        history.push(url);
    }

    const columns = useMemo(() => 
        [
            {
                Header: "#",
                accessor: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1
                }
            },
            {
                accessor: 'name',
                Header: 'Name'
            },
            {
                accessor: 'description',
                Header: 'Description'
            },        
            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                       cellProps.cell.row.original.name !== "super_admin" &&
                        <UncontrolledDropdown >
                            <DropdownToggle
                                href="#"
                                className="btn-soft-secondary btn-sm dropdown"
                                tag="button"
                            >
                                <i className="ri-more-fill align-middle"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                            { permissionsUpdatePermission &&
                                <DropdownItem onClick={() => click(`/role/assign-permission/${cellProps.cell.row.original.id}`)}>
                                    <i className='ri-check-fill tick-icon'></i> 
                                    Assign Permission
                                </DropdownItem>
                            }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    );
                },
            }
        ],
        [permissionsUpdatePermission]
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.roles.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setRoleList(filteredData)
        }
        else {
            if(response.roles){
                setRoleList(response.roles);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Name", "Description"];

    // const exportPDF = () => {
    //     const unit = "pt";
    //     const size = "A4"; // Use A1, A2, A3 or A4
    //     const orientation = "portrait"; // portrait or landscape
    
    //     const marginLeft = 40;
    //     const doc = new jsPDF(orientation, unit, size);
    
    //     doc.setFontSize(15);
    
    //     const title = "Role List";
    //     const headers = [tableHeaders];
    //     const data = filteredData.map(data => [data.original.name, data.original.description])
    
    //     let content = {
    //         startY: 50,
    //         head: headers,
    //         body: data
    //     };
    
    //     doc.text(title, marginLeft, 40);
    //     doc.autoTable(content);
    //     doc.save("Role_List.pdf")
    // }


    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <MetaTags>
                <title>Role List</title>
            </MetaTags>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card id="roleList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Roles</h5>
                                    <div className="d-flex gap-2">
                                        { roleCreatePermissonBtn === true &&
                                            <Link to='/Role/add'>
                                                <button type="button" id="create-btn" className="add-btn btn btn-success">
                                                    <i className="ri-add-line align-bottom me-1"></i>{" "}Create Role
                                                </button>
                                            </Link>
                                        }

                                        {/* <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>

                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.name, data.original.description] )}
                                            filename = "Role_List.csv"
                                            >
                                            <button type="button" className="btn btn-success">
                                                <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                                                CSV
                                            </button>
                                        </CSVLink> */}
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
                                                    placeholder="Search for role ID, name, description or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3}></Col>

                                        <Col sm={4} xxl={3}></Col>

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
                                            data={roleList}
                                            customPageSize={10}
                                            maxLength={response.roles?response.roles.length:10}
                                            filteredLength={roleList.length} 
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
                <ToastContainer/>
            </Container>
        </div>
    )
}


export default RoleList;