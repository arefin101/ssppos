import React, {useEffect,useState} from 'react';
import MetaTags from "react-meta-tags";
import { useSelector ,useDispatch} from 'react-redux';
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button, Table } from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { ToastContainer  , toast} from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from "formik";
import { getStoreSaleView } from '../../store/actions';
import Flatpickr from 'react-flatpickr';
import { useHistory } from 'react-router-dom';
import { imeiScan, createSaleTransaction } from './../../store/sale/action';


const SaleTerminal = (props) => {

    const [ selectedCustomer, setSelectedCustomer ] = useState(null);

    const [dataForSubmit, setdataForSubmit] = useState( { sale_transaction:{}, sale_transactions:[] } );

    const [saleVariations, setSaleVariations] = useState([]);

    const [saleTransaction, setSaleTransaction] = useState({transaction_date: "", customer_id: null});

    const [scannedDataList, setScannedDataList] = useState([]);

    const [purchaseVariationIds, setPurchaseVariationIds] = useState([]);

    const dispatch = useDispatch();

    const history = new useHistory();

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
    
    const warningnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-warning text-white' });

    // DATE PICKER
    let [date, setDate] = useState(null);
    let d = new Date(Date.parse(date));
    date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;



    // FORM VALIDATION
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            customer: "",
            transaction_date: "",
            sale_transaction:{},
            sale_variations: {},
        },
        validationSchema: Yup.object({
            transaction_date: Yup.string().required("Please select transaction date"),
            customer: Yup.string().required("Please select Customer"),
        }),

        onSubmit: (values) => {
            
            //

        },
    });



    useEffect(() => {
        setdataForSubmit({
            sale_transaction: saleTransaction, 
            sale_variations: saleVariations
        })
    }, [saleTransaction, saleVariations]);

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

    const createTransaction = () =>{
        dispatch(createSaleTransaction(dataForSubmit, props.history));
    }
    

 
    // GET CUSTOMER DROPDOWN DATA
    useEffect(() => {
        dispatch( getStoreSaleView(props.history) );
    }, []);



    const { customerResponse, imeiScannedData, imeiScannedError } =  useSelector( state => ({
        customerResponse: state.Sale.customers,
        imeiScannedData: state.Sale.imeiScannedData,
        imeiScannedError: state.Sale.imeiScannedError,
    }));

    useEffect(() => {
        if(localStorage.getItem("imeiScanError")){
            errornotify(imeiScannedError);
            localStorage.removeItem("imeiScanError");
        }
    }, [localStorage.getItem("imeiScanError")]);


    let scannedData = [];

    if(localStorage.getItem("imeiScanSuccess")){
        
        if(!purchaseVariationIds.includes(imeiScannedData.purchase_variation.id)){

            const newScannedDataList = [{
                variation_id: imeiScannedData.purchase_variation.id,
                product_id: imeiScannedData.purchase_variation.product_id, 
                purchase_variation_id: imeiScannedData.purchase_variation.id,
                name: imeiScannedData.purchase_variation.name,
                sku: imeiScannedData.purchase_variation.sku,
                imei: imeiScannedData.purchase_variation.imei,
                quantity: 1, 
                quantity_available: imeiScannedData.purchase_variation.quantity_available,
                selling_price: "",
                purchase_price: imeiScannedData.purchase_variation.purchase_price
            }, ...scannedDataList ]

            const newSaleVariations =  [{
                product_id: imeiScannedData.purchase_variation.product_id, 
                purchase_variation_id: imeiScannedData.purchase_variation.id,
                quantity: 1, 
                selling_price: 0
            }, ...saleVariations];

            setSaleVariations(newSaleVariations)
            
            setScannedDataList(newScannedDataList);

            const newPurchaseVariationIds = [imeiScannedData.purchase_variation.id, ...purchaseVariationIds ]
            setPurchaseVariationIds(newPurchaseVariationIds);

        }else {
            warningnotify("Duplicate IMEI");
        }

        localStorage.removeItem("imeiScanSuccess");
    }



    // QUANTITY COUNT
    let quantity;
    function countUP(id) {
        quantity = scannedData[id].quantity + 1;
        updateQuantity(quantity, id)
    }
    function countDown(id) { 
        quantity = scannedData[id].quantity - 1;
        if(quantity>0){
            updateQuantity(quantity, id)
        }
    }

    const updateQuantity = (quantity, index) => {

        if(quantity <= scannedDataList[index].quantity_available){
            setScannedDataList(state => state.map((el, i) => i === index
                ? { ...el, quantity }
                : el,
            ));
            setSaleVariations(state => state.map((el, i) => i === index
                ? { ...el, quantity }
                : el,
            ));
            document.getElementById(`quantityError${index}`).innerHTML = ""
        }else{
            document.getElementById(`quantityError${index}`).innerHTML = "Limit exceeded"
            setTimeout(function(){ document.getElementById(`quantityError${index}`).innerHTML = "" }, 3000);
        }

    };

    const updatePrice = (selling_price, index) => {
        // if(parseInt(selling_price) >= parseInt(scannedDataList[index].purchase_price)){
            setScannedDataList(state => state.map((el, i) => i === index
                ? { ...el, selling_price }
                : el,
            ));
            setSaleVariations(state => state.map((el, i) => i === index
                ? { ...el, selling_price }
                : el,
            ));
        //     document.getElementById(`priceError${index}`).innerHTML = ""
        // }else{
        //     setScannedDataList(state => state.map((el, i) => i === index
        //         ? { ...el, selling_price }
        //         : el,
        //     ));
        //     document.getElementById(`priceError${index}`).innerHTML = "Price Limit exceeded"
        //     setTimeout(function(){ document.getElementById(`priceError${index}`).innerHTML = "" }, 3000);
        // }
    };

    const deleteProduct = (id) => {
        
        setSaleVariations(saleVariations.filter(item => item.purchase_variation_id != id))
 
        setScannedDataList(scannedDataList.filter(item => item.variation_id != id));

        setPurchaseVariationIds(purchaseVariationIds.filter( id => id != id ));

    }


    if(scannedDataList){

        let serial = 0;

        scannedData = scannedDataList.map(elmt => (
        {
            sl: ++serial,
            variation_id: elmt.variation_id,
            product_id: elmt.product_id,
            purchase_variation_id: elmt.purchase_variation_id,
            name: elmt.name,
            sku: elmt.sku,
            imei: elmt.imei,
            quantity: elmt.quantity,
            selling_price: elmt.selling_price,
            subTotal: elmt.quantity * elmt.selling_price,
        }))

    }



    let data = [];
    let allCustomers = [];

    if(customerResponse.customers){
        data = customerResponse.customers;
        allCustomers = data.map(item => {
            return {value:item.id, label:`${item.first_name} ${item.last_name}`}
        });
    }

    
    
    // HANDLE ERRORS
    const { error } = useSelector(state => ({
        error: state.Contact.error,
    }));

    useEffect(() => {
        if(date !== "NaN-NaN-NaN"){

            validation.setFieldValue("transaction_date", date);

            const newSaleTransaction =  {...saleTransaction, transaction_date: date }

            setSaleTransaction(newSaleTransaction);

        }else{

            validation.setFieldValue("transaction_date", "");

        }
    }, [date]);

    
    useEffect(() => {
        if(selectedCustomer !== null){

            validation.setFieldValue("customer", selectedCustomer.value);
            
            const newSaleTransaction =  {...saleTransaction, customer_id: selectedCustomer.value }

            setSaleTransaction(newSaleTransaction);
            
        }else{

            validation.setFieldValue("customer", "");
        }
    }, [selectedCustomer]);

    
    const customStyles = {
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ? '#ddd' : 'red',
        })
    }

    const handleKeyDown = (event) => {

        const imei = document.getElementById("imei");

        if (event.keyCode === 13 && saleTransaction.transaction_date !== "" && saleTransaction.customer_id !== null) {

            dispatch(imeiScan(imei.value, history))
            event.target.value = "";
            document.getElementById("imei").focus();
            
        }
    }


    return (
        <React.Fragment>
            <div className="page-content pt-3">
                
                <MetaTags>
                    <title>Sale Terminal</title>
                </MetaTags>

                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <div className="text-end mb-4">
                                <Link to="/sale-list" className="btn btn-success btn-label left ms-auto">
                                    <i className="ri-arrow-left-line label-icon align-bottom fs-16 me-2"></i> Go Back to Sale List
                                </Link>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <Card style={{ height: '800px' }}>
                                <CardBody>
                                    <div className="live-preview">
                                        <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationRam">Transaction Date<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Flatpickr
                                                            className={`form-control ${(validation.errors.transaction_date && validation.touched.transaction_date ) ? 'border-red' : ''}`}
                                                            name="transaction_date"
                                                            options={{
                                                                dateFormat: "d/m/Y",
                                                            }}
                                                            onChange={setDate}
                                                        />
                                                        {(validation.touched.transaction_date && validation.errors.transaction_date) ? (
                                                            <div className="text-danger">
                                                                {validation.errors.transaction_date}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>     

                                                <Col md="6">
                                                    <FormGroup className="mb-3">

                                                        <Label htmlFor="validationSize">Customer<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedCustomer}
                                                            onChange={setSelectedCustomer}
                                                            options={allCustomers}
                                                            styles={
                                                                (validation.touched.customer &&
                                                                validation.errors.customer) 
                                                                ? customStyles
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.customer && validation.errors.customer) ? (
                                                            <div className="text-danger">
                                                                {validation.errors.customer}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>
                                                </Col>
                                        
                                                <Col md="12">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="iemi">IMEI<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <div className="form-icon">
                                                            <Input
                                                                autoFocus 
                                                                name="imei"
                                                                placeholder="IMEI"
                                                                type="text"
                                                                className="form-control form-control-icon"
                                                                id="imei"
                                                                onChange={validation.handleChange}
                                                                onKeyDown={handleKeyDown}
                                                                onBlur={validation.handleBlur}
                                                                invalid={
                                                                    (validation.touched.imei &&
                                                                    validation.errors.imei) || error.serial
                                                                    ? true
                                                                    : false
                                                                }
                                                            />
                                                            {(validation.touched.imei &&
                                                            validation.errors.imei) ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.imei}
                                                            </FormFeedback>
                                                            ) : null}
                                                            <i className="mdi mdi-barcode-scan text-muted" style={{ fontSize: '20px', display:'block', top:'4px', }}></i>
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="mb-3">
                                                        <Button style={{ display: "none" }}>
                                                            Submit
                                                        </Button>
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                        </Form>
                                    </div>
                                    
                                
                                    <Card className='mt-5'>
                                        <CardBody>                                      
                                            <div className="live-preview">
                                                <div className="table-responsive table-card" style={{ maxHeight: '437px', overflow: 'auto' }}>
                                                    <Table className="align-middle table-nowrap mb-0">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">Product Name</th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col">Price ($)</th>
                                                                <th scope="col">Subtotal</th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        { scannedData.map(elmt => (

                                                            <tr key={elmt.sl}>

                                                                <td>{elmt.name} <br/> SKU {elmt.sku} - IMEI {elmt.imei}</td>

                                                                <td>
                                                                    <div className="input-step">
                                                                        <button type="button" className="minus" onClick={() => countDown(elmt.sl-1)} > – </button>
                                                                        <Input
                                                                            type="text"
                                                                            className="product-quantity"
                                                                            value={elmt.quantity} name="demo_vertical" readOnly 
                                                                        />
                                                                        <button type="button" className="plus" onClick={() => countUP(elmt.sl-1)} > + </button>
                                                                    </div>
                                                                    <p className='text-danger' id={`quantityError${elmt.sl-1}`}></p>
                                                                </td>

                                                                <td>
                                                                    <div className="input-group mb-3">
                                                                        <span className="input-group-text" id="product-price-addon" > $ </span>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            id="productPrice"
                                                                            placeholder="Enter price"
                                                                            aria-label="Price"
                                                                            aria-describedby="product-price-addon"
                                                                            value={elmt.selling_price}
                                                                            onChange={e => updatePrice(e.target.value, elmt.sl-1)}
                                                                        />
                                                                    </div>
                                                                    {/* <p className='text-danger' id={`priceError${elmt.sl-1}`}></p> */}
                                                                </td>
                                                                <td>
                                                                    {elmt.subTotal}
                                                                </td>
                                                                <td>
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/gsqxdxog.json"
                                                                        onClick={() => deleteProduct(elmt.variation_id)}
                                                                        trigger="hover"
                                                                        colors="primary:#e83a30,secondary:#e83a30"
                                                                        stroke="85"
                                                                        scale="40"
                                                                        state="hover-empty"
                                                                        style={{width:'36px', height:'36px', cursor: 'pointer'}}>
                                                                    </lord-icon>
                                                                    {/* <i onClick={() => deleteProduct(elmt.variation_id)} className='mdi mdi-delete-outline fs-20 text-danger icon-cursor'></i> */}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>   
                                    
                                    <ToastContainer />
                                    
                                    <Button onClick={() => createTransaction()} color="primary" type="submit" className='submit-btn btn btn-primary btn-label right ms-auto' style={{ position:'absolute', bottom:'0', marginBottom:'10px' }}>
                                        <i className="las la-check-circle label-icon align-bottom fs-20 ms-2"></i>Finalize
                                    </Button>
                                </CardBody> 
                                
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card style={{ height: '800px' }}>
                                <CardBody>

                                </CardBody> 
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </div>
        </React.Fragment>
    );

};

export default SaleTerminal;