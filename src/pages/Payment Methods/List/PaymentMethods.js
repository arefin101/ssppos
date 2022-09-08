import React, {useEffect, useState, useMemo, useRef} from 'react';
import MetaTags from "react-meta-tags";
import { Button,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getPaymentMethods } from '../../../store/actions';
import { Card, CardBody, CardHeader, Col, Container, Row, Spinner, Form } from 'reactstrap';
import { ToastContainer  , toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { hasPermission } from '../../../store/actions';
import TableContainer from "./TableContainer";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LoadingBar from 'react-top-loading-bar';


const PaymentMethods = ({history}) => {
    const ref = useRef(null);

    const [preLoader, setPreLoader] = useState(true);
    const [paymentMethodCreatePermission , setPaymentMethodCreatePermission] = useState(false);
    const dispatch = useDispatch();

    const [paymentMethods, setPaymentMethods] = useState([]);

    const [filteredData, setFilteredData] = useState([]);
    
    const { response } =  useSelector( state => ({
        response: state.Payment.paymentMethods,
    }));

    useEffect(() => {
        dispatch(getPaymentMethods(history))
    }, []);

    useEffect(() => {
        if(response.payment_methods){
            setPaymentMethods(response.payment_methods);
        }
    }, [response]);

    if(response.payment_methods){
        if(preLoader){
            setPreLoader(false);
        }
    }

    let paymentMethod = localStorage.getItem('paymentMethod');
   
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    useEffect(() => {
        if(paymentMethod) {
            successnotify("Payment Method Added Successfully !");
            localStorage.removeItem('paymentMethod')
            ref.current.complete();
        }
    }, []);


    const { addPaymentMethodPermission } = useSelector( state => ({
        addPaymentMethodPermission: state.General.addPaymentMethodPermission,
    }));

    useEffect(()=>{
        if(addPaymentMethodPermission){
            setPaymentMethodCreatePermission(addPaymentMethodPermission)
        }
    },[addPaymentMethodPermission]);

    useEffect(()=>{
        dispatch( hasPermission("payment-method.store" , history) );
    },[])



    // Table Properties
    const columns = useMemo(() => 
        [
            {
                Header: "#",
                Cell: (cellProps) => {
                    return cellProps.cell.row.index+1;
                }
            },
            {
                Header: "Name",
                accessor: "name",
            }
        ],
        []
    )

    const searchItems = (searchValue) => {

        if (searchValue !== '') {
            const filteredData = response.payment_methods.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })

            setPaymentMethods(filteredData)
        }else {
            if(response.payment_methods){
                setPaymentMethods(response.payment_methods);
            }
        }
    };

    const reset = () => {
        document.getElementById('search').value = "";
        searchItems("");
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Payment Methods";
        const headers = [["#", "Name"]];
        const data = filteredData.map(data => [data.index+1, data.original.name])
    
        let content = {
            startY: 50,
            head: headers,
            body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("payment_methods.pdf")
    }

   

    return (
        <React.Fragment>
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Payment Methods</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">Payment Methods</h4>
                                        { 
                                            paymentMethodCreatePermission === true && <Link to='/add-payment-methods'>
                                                <button type="button" id="create-btn" className="add-btn btn btn-success"><i className="ri-add-line align-bottom me-1"></i>Add Payment Method</button>
                                            </Link>
                                        }
                                        <div className="d-flex gap-2 ms-2">
                                            <button type="button" className="btn btn-info" onClick={() => exportPDF()}>
                                                <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                                PDF
                                            </button>
                                            <CSVLink 
                                                headers={["#", "Name"]} 
                                                data={filteredData.map(data => [data.index+1, data.original.name])}
                                                filename="Payment_methods.csv"
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
                                                        placeholder="Search for payment method name or something..."
                                                        onChange={(e) => searchItems(e.target.value)}
                                                    />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </Col>

                                            <Col sm={4} xxl={3}></Col>

                                            <Col sm={4} xxl={3}></Col>

                                            <Col sm={4} xxl={1}>
                                                <div>
                                                    <Button color="soft-danger" className="w-100" onClick={reset}>{" "}<i className="mdi mdi-refresh me-1 align-bottom"></i>Reset</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>

                                <CardBody>
                                    <div id="table-gridjs">
                                        {
                                            preLoader ?
                                            <div className="spinner-box">
                                                <Spinner color="primary"> Loading... </Spinner> 
                                            </div> :
                                            <div>
                                                <TableContainer
                                                    columns={columns}
                                                    data={paymentMethods}
                                                    customPageSize={10}
                                                    maxLength={response.payment_methods ? response.payment_methods.length:10}
                                                    filteredLength={paymentMethods.length} 
                                                    isExtraFeature={true}
                                                    isGlobalSearch={true}
                                                    setFilteredData={setFilteredData}
                                                    divClass="table-responsive"
                                                    className="custom-header-css"
                                                />
                                            </div>
                                        }
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

export default PaymentMethods;