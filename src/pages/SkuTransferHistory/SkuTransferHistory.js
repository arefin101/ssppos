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
  Modal,
  ModalBody,
  Table,
} from "reactstrap";
import TableContainer from "./TableContainer";
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getSkuTransferHistory, getHistoryDetails } from '../../store/actions';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from 'react-toastify';


const SkuTransferHistory = () => {

    const [historyList, setHistoryList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

    const [batchNo, setBatchNo] = useState("--");

    const ref = useRef(null);

    const history = useHistory();

    const dispatch = useDispatch();

    const { response, historyResponse } = useSelector(state => ({
        response: state.skuTransfer.skuTransferHistory,
        historyResponse: state.skuTransfer.skuTransferHistoryDetails,
    }));

    useEffect(()=>{
        dispatch( getSkuTransferHistory(history) );
    }, [dispatch]);

    useEffect(() => {

        if(localStorage.getItem('sku_transfer')){
            successnotify("SKU Transfered Successfully !");
            localStorage.removeItem('sku_transfer')
        }
        
    }, [localStorage.getItem('sku_transfer')]);
    

    useEffect(() => {
        if(response.history){
            setHistoryList(response.history);
        }
    }, [response]);

    if(response.history){
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
                Header: "Total",
                accessor: "total",
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
                            <DropdownItem onClick={() => handleInvoiceModal(cellProps.cell.row.original.batch_no)}>
                                <i className="ri-eye-fill align-bottom me-2 text-primary"></i>{" "}
                                View Details
                            </DropdownItem>
                        </DropdownMenu>

                    </UncontrolledDropdown>
                );
                },
            },
        ],
        []
    )

    function handleInvoiceModal(batch_no) {
        ref.current.continuousStart()
        dispatch( getHistoryDetails(batch_no, history) );
        setBatchNo(batch_no);
    }

    const [historyModal, setHistoryModal] = useState(false);

    const [historyDetails, setHistoryDetails] = useState([]);

    let detailSerial = 0;

    useEffect(() => {
        if(localStorage.getItem("history_details")){
            setHistoryModal(!historyModal);
            ref.current.complete();
            localStorage.removeItem("history_details")
        }
    }, [localStorage.getItem("history_details")]);

    function togHistoryModal(){
        setHistoryModal(!historyModal);
    }

    useEffect(() => {
        if(historyResponse.history_details){
            setHistoryDetails(historyResponse.history_details);
        }
    }, [historyResponse]);

    const searchItems = (searchValue) => {

        if (searchValue !== '') {

            const filteredData = response.history.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setHistoryList(filteredData)
        }
        else {
            if(response.history){
                setHistoryList(response.history);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const tableHeaders = ["Date", "Batch No",	"Total"];

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "SKU Transfer History";
        const headers = [tableHeaders];
        const data = filteredData.map(data => [data.original.date, data.original.batch_no, data.original.total])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("sku_transfer_history.pdf")
    }


    return (
        <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <Container fluid>
                <MetaTags>
                    <title>SKU Transfer History</title>
                </MetaTags>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader className="card-header  border-0">
                                <div className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">SKU Transfer History</h5>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                            <i className="ri-printer-line align-bottom me-1"></i>{" "}PDF
                                        </button>
                                        <CSVLink 
                                            headers={tableHeaders}
                                            data={filteredData.map( data => [data.original.date, data.original.batch_no, data.original.total] )}
                                            filename = "sku_transfer_history.csv"
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
                                                    placeholder="Search for batch no, total or something..."
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
                                            data={historyList}
                                            customPageSize={10}
                                            maxLength={response.history?response.history.length:10}
                                            filteredLength={historyList.length} 
                                            isExtraFeature={true}
                                            isGlobalSearch={true}
                                            setFilteredData={setFilteredData}
                                            divClass="table-responsive"
                                            className="custom-header-css"
                                        />
                                    </div>
                                }

                                <Modal
                                    size="xl"
                                    isOpen={historyModal}
                                    toggle={() => {
                                        togHistoryModal();
                                    }}
                                    centered
                                    className="modal-xl"
                                >
                                    <ModalBody className="p-0">
                                        <Card className='m-0'>
                                            <CardHeader>
                                                <h4 className="card-title mb-0 flex-grow-1">SKU Transfer History for <span className="text-primary">Batch {batchNo}</span></h4>
                                            </CardHeader>

                                            <CardBody>
                                                <Card className="m-0">
                                                    <CardBody>
                                                        <div className="live-preview">
                                                            <div className="table-responsive table-card">
                                                                <Table className="align-middle table-nowrap mb-0">
                                                                    <thead>
                                                                        <tr className="table-active">
                                                                            <th scope="col" style={{ width: "50px" }}>#</th>
                                                                            <th scope="col">IMEI</th>
                                                                            <th scope="col">Purchase Reference</th>
                                                                            <th scope="col">Previous Product Name</th>
                                                                            <th scope="col">Previous SKU</th>
                                                                            <th scope="col">Current Product Name</th>
                                                                            <th scope="col">Current SKU</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {historyDetails.map(elmt => (
                                                                            <tr key={elmt.id}>
                                                                                <th scope="row">{++detailSerial}</th>
                                                                                <td>{elmt.imei}</td>
                                                                                <td>{elmt.purchase_reference}</td>
                                                                                <td>{elmt.previous_product_name}</td>
                                                                                <td>{elmt.previous_sku}</td>
                                                                                <td>{elmt.current_product_name}</td>
                                                                                <td>{elmt.current_sku}</td>
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <ToastContainer />

            </Container>
        </div>
    )
}


export default SkuTransferHistory;