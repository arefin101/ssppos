import React, { useEffect, useState, useMemo, useRef } from "react";
import {Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,} from "reactstrap";
import MetaTags from 'react-meta-tags';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getCustomers, hasPermission } from '../../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ToastContainer  , toast} from 'react-toastify';
import TableContainer from "./TableContainer";
import LoadingBar from 'react-top-loading-bar';


const CustomerList = () => {

    const [customerList, setCustomerList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const history = useHistory();

    const ref = useRef(null);

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.Contact.customers,
    }));

    const [customerCreatePermissonBtn , setCustomerCreatePermissonBtn] = useState(false);

    const { customerCreatePermission } = useSelector( state => ({
        customerCreatePermission: state.General.customerCreatePermission,
    }));

    useEffect(()=>{
        if(customerCreatePermission){
            setCustomerCreatePermissonBtn(customerCreatePermission)
        }
    },[customerCreatePermission])

    useEffect(()=>{
        localStorage.removeItem("response");
        dispatch(hasPermission("user.register-customer" , history));
    },[])

    useEffect(() => {
        if(localStorage.getItem("customer")){
            successnotify("Customer Created Successfully !");
            localStorage.removeItem("customer");
            ref.current.complete();
        }
    }, []);

    useEffect(()=>{
        dispatch(getCustomers(history));
    }, [dispatch]);

    useEffect(() => {
        if(response.users){
            setCustomerList(response.users);
        }
    }, [response]);

    if(response.users){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const customerDetails = (url) => {
        history.push(url);
    }

    const customerCredit = (url, available_credit) => {
        history.push(url, {available_credit: available_credit});
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
                accessor: 'first_name',
                Header: 'First Name'
            },
            {
                accessor: 'last_name',
                Header: 'Last Name'
            },
            {
                accessor: 'business_name',
                Header: 'Business Name',
                Cell: (cellProps) => {
                    return cellProps.cell.row.original.business_name ? cellProps.cell.row.original.business_name : "-"
                }
            },
            {
                accessor:"available_credit",
                Header:"Available Credit ($)"
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                        <UncontrolledDropdown >
                        <DropdownToggle
                            href="#"
                            className="btn-soft-secondary btn-sm dropdown"
                            tag="button"
                        >
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">

                            <DropdownItem onClick={() => customerDetails(`/customer-details/${cellProps.cell.row.original.id}`)}>
                                <i className='ri-eye-fill eye-icon'></i> 
                                View
                            </DropdownItem>

                            <DropdownItem onClick={() => customerCredit(`/customer-credit/${cellProps.cell.row.original.id}`, cellProps.cell.row.original.available_credit )}>
                                <i className='ri-eye-fill eye-icon'></i> 
                                View Credit History
                            </DropdownItem>
            
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    );
                },
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setCustomerList(filteredData)
        }
        else {
            if(response.users){
                setCustomerList(response.users);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["First Name", "Last Name", 'Business Name', "Available Credit ($)"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Customer List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.first_name , data.original.last_name, data.original.business_name, data.original.available_credit])

        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Customer_List.pdf")
    }

    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <MetaTags>
                <title>Customer List</title>
            </MetaTags>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card id="customerList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Customers</h5>
                                    <div className="d-flex gap-2">
                                        {customerCreatePermissonBtn == true &&
                                            <Link to='/customer/add'>
                                                <button type="button" className="btn btn-success" >
                                                    <i className="ri-add-line align-bottom me-1"></i>{" "}Add Customer
                                                </button>
                                            </Link>
                                        }
                                        
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        
                                        <CSVLink 
                                            headers={tableHeaders}
                                           data={filteredData.map( data => [data.original.first_name , data.original.last_name, data.original.business_name, data.original.available_credit] )}
                                            filename = "Customer_List.csv"
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
                                                    placeholder="Search for customer's username, credit or something..."
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col sm={4} xxl={3} />

                                        <Col sm={4} xxl={3} />

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
                                            data={customerList}
                                            customPageSize={10}
                                            maxLength={response.users?response.users.length:10}
                                            filteredLength={customerList.length} 
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


export default CustomerList;