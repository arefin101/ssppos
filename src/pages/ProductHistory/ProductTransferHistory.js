import React, { useEffect, useState, useMemo, useRef } from "react";
import { Card, CardBody, Col, Container, CardHeader, Row, Form, Button, Spinner, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Modal, ModalBody, Table } from "reactstrap";
import LoadingBar from 'react-top-loading-bar';
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProductTransferHistory, getProductTransferHistoryDetails } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {ToastContainer, toast} from 'react-toastify';


const ProductTransferHistory = () => {

    const ref = useRef(null);

    const [transferHistoryList, setTransferHistoryList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [preLoader, setPreLoader] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const { response, productTransferHistoryDetails } = useSelector(state => ({
        response: state.productLocation.productTransferHistory,
        productTransferHistoryDetails: state.productLocation.productTransferHistoryDetails,
    }));

    useEffect(()=>{
        dispatch( getProductTransferHistory(history) );
    }, []);

    useEffect(() => {
        if(response.transfer_history){
            setTransferHistoryList(response.transfer_history);
        }
    }, [response.transfer_history]);

    if(response.transfer_history){
        if(preLoader){
            setPreLoader(false);
        }
    } 

    const columns = useMemo(() => 
        [
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Batch No",
                accessor: "batch_no",
            },
            {
                Header: "Sender",
                accessor: "sender",
            },
            {
                Header: "Receiver",
                accessor: "receiver",
            },
            {
                Header: "Total",
                accessor: "total",
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                return (
                    <UncontrolledDropdown >
                        <DropdownToggle href="#" className="btn-soft-secondary btn-sm dropdown" tag="button">
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>

                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem onClick={() => historyDetails(cellProps.row.original.batch_no)}><i className='ri-eye-fill eye-icon'></i> View Details</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
                },
            },
        ],
        []
    )
    
    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.transfer_history.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setTransferHistoryList(filteredData)
        }
        else {
            if(response.transfer_history){
                setTransferHistoryList(response.transfer_history);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Date","Batch No","Sender","Receiver","Total"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Products Transfer History";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date, data.original.batch_no, data.original.sender, data.original.receiver, data.original.total])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("transfer_history.pdf")
    }



    // Transfer History Modal
    let serial = 0;

    const [detailsModal, setDetailsModal] = useState(false);
    const [batchNo, setBatchNo] = useState("--");
    const [historyDetailsList, setHistoryDetailsList] = useState([]);

    const togDetailsModal = () => {
        setDetailsModal(!detailsModal);
    }

    const historyDetails = (id) => {
        ref.current.continuousStart();
        dispatch( getProductTransferHistoryDetails(id, history) );
        setBatchNo(id);
    }

    useEffect(() => {
        if(productTransferHistoryDetails.transfer_history_details){
            setHistoryDetailsList(productTransferHistoryDetails.transfer_history_details);
        }
    }, [productTransferHistoryDetails.transfer_history_details]);

    useEffect(() => {
        if(localStorage.getItem("history details")){
            ref.current.complete();
            setDetailsModal(!detailsModal);
            localStorage.removeItem("history details");
        }
    }, [localStorage.getItem("history details")]);

    // --end-- Transfer History Modal

    

    //TOASTER
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: true, className: 'bg-success text-white' });
    
    useEffect(() => {
        if(localStorage.getItem("Product Transfer")){
            successnotify("Product Transfer Complete !");
            localStorage.removeItem("Product Transfer");
        }
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <Container fluid>
                    <MetaTags>
                        <title>Product Transfer History</title>
                    </MetaTags>
                    <Row>
                        <Col lg={12}>
                            <Card id="sprList">
                                <CardHeader className="card-header  border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Product Transfer History</h5>
                                        <div className="d-flex gap-2">
                                            <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                                <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                            </button>
                                            <CSVLink 
                                                filename="transfer_history.csv"
                                                headers={tableHeaders}
                                                data={filteredData.map(data => [data.original.date, data.original.batch_no, data.original.sender, data.original.receiver, data.original.total])}
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
                                                        placeholder="Search for batch no, sender and receiver name or something..."
                                                        onChange={(e) => searchItems(e.target.value)}
                                                    />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </Col>

                                            <Col sm={4} xxl={3}> </Col>
                                            <Col sm={4} xxl={3}> </Col>

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
                                                data={transferHistoryList}
                                                customPageSize={10}
                                                maxLength={response.transfer_history?response.transfer_history.length:10}
                                                filteredLength={transferHistoryList.length} 
                                                isExtraFeature={true}
                                                isGlobalSearch={true}
                                                setFilteredData={setFilteredData}
                                                divClass="table-responsive"
                                                className="custom-header-css"
                                            />
                                        </div>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer/>
            </div>

            {/* Transfer History Modal */}                      
            <Modal
                isOpen={detailsModal}
                toggle={() => {
                    togDetailsModal();
                }}
                scrollable={true}
                centered
                className="modal-lg"
            >

                <ModalBody className="p-0">
                    <Card className='m-0'>
                        <CardHeader>
                            <h4 className="card-title mb-0 flex-grow-1">Product Transfer History for <span className="text-primary">Batch {batchNo}</span></h4>
                        </CardHeader>

                        <CardBody>
                            <Card className="m-0">
                                <CardBody>
                                    <div className="live-preview">
                                        <div className="table-responsive table-card">
                                            <Table className="align-middle table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">SKU</th>
                                                        <th scope="col">IMEI</th>
                                                    </tr>
                                                </thead>
                                                <tbody>   
                                                    { historyDetailsList.map(elmt => (
                                                        <tr key={elmt.id}>
                                                            <td>{++serial}</td>
                                                            <td>{elmt.name}</td>
                                                            <td>{elmt.sku}</td>
                                                            <td>{elmt.imei}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardBody>

                    </Card>
                </ModalBody>
            </Modal>
            {/* --end-- Transfer History Modal */}

        </React.Fragment>
    )
}


export default ProductTransferHistory