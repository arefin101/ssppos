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
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getSuppliers, hasPermission } from '../../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';



const SupplierList = () => {

    const [supplierCreatePermissonBtn , setSupplierCreatePermissonBtn] = useState(false)

    const [supplierList, setSupplierList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const history = useHistory();

    const ref = useRef(null);

    const dispatch = useDispatch();

    const { response } = useSelector(state => ({
        response: state.Contact.supplier,
    }));

    useEffect(() => {
        if(localStorage.getItem("supplier")){
            successnotify("Supplier Created successfully !");
            localStorage.removeItem("supplier");
            ref.current.complete();
        }
    }, []);

    useEffect(()=>{
        
        dispatch( getSuppliers(history) );
    }, [dispatch]);

    useEffect(() => {
        if(response.users){
            setSupplierList(response.users);
        }
    }, [response]);

    if(response.users){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const supplierDetails = (url) => {
        history.push(url);
    };

    const { supplierCreatePermission } =useSelector( state => ({
        supplierCreatePermission: state.General.supplierCreatePermission,
    }));


    useEffect(()=>{
        if(supplierCreatePermission){
            setSupplierCreatePermissonBtn(supplierCreatePermission)
        }

    },[supplierCreatePermission]);
    
    useEffect(()=>{
        dispatch(hasPermission("user.register-supplier" , history))
    },[]);


    const supplierCredit = (url, supplier_credit) => {
        history.push(url, {supplier_credit: supplier_credit});
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
                Header:"Supplier Credit ($)"
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

                            <DropdownItem onClick={() => supplierDetails(`/supplier-details/${cellProps.cell.row.original.id}`)}>
                                <i className='ri-eye-fill eye-icon'></i> 
                                View 
                            </DropdownItem>

                            <DropdownItem onClick={() => supplierCredit(`/supplier-credit/${cellProps.cell.row.original.id}`, cellProps.cell.row.original.available_credit )}>
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
            setSupplierList(filteredData);
        }
        else {
            if(response.users){
                setSupplierList(response.users);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["First Name", "Last Name", 'Business Name', "Email"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Supplier List";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.first_name, data.original.last_name, data.original.business_name, data.original.email])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Supplier_List.pdf")
    }
    

    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <MetaTags>
                <title>Supplier List</title>
            </MetaTags>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Card id="sprList">
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">Suppliers</h5>
                                    <div className="d-flex gap-2">

                                        { supplierCreatePermissonBtn === true &&
                                            <Link to='/supplier/add'>
                                                <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Supplier</button>
                                            </Link>
                                        }
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.first_name, data.original.last_name, data.original.business_name, data.original.email] )}
                                            filename = "supplier_list.csv"
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
                                                    placeholder="Search for supplier ID, name, email or something..."
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
                                            data={supplierList}
                                            customPageSize={10}
                                            maxLength={response.users ? response.users.length:10}
                                            filteredLength={supplierList.length} 
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


export default SupplierList;