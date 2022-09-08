import React, { useEffect, useState, useRef } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import MetaTags from "react-meta-tags";
import { Spinner, Card, CardBody, CardHeader, Col, Container, Row, Form, FormGroup, FormFeedback, Button, Input, Table } from 'reactstrap';
import * as Yup from "yup";
import { useFormik } from "formik";
import Flatpickr from 'react-flatpickr';
import { getSaleReturnStoreView, createSaleReturn } from '../../../store/actions';
import { CardTables } from '../../Tables/BasicTables/BasicTablesCode';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { useHistory } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import LoadingBar from 'react-top-loading-bar'


const SaleReturnTerminal = (props) => {

    const ref = useRef(null);

    const [preLoader, setPreLoader] = useState(true);

    let data =[];

    let initialTableData =[];

    let serial = 0;

    const id = props.match.params.id;

    const warningnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-warning text-white' });

    const [saleReturnTransaction, setSaleReturnTransaction] = useState({"sale_transaction_id": null, "transaction_date": ""});

    const [saleVariations, setSaleVariations] = useState([]);

    const [saleReturnForSubmit, setSaleReturnForSubmit] = useState( { sale_return_transaction: {}, sale_variations: [] } );

    const [tableData, setTableData] = useState([]);
    
    const history = useHistory()

    let initialSaleVariation = {};
    
    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.Sale.saleReturnStoreView,
    }));

    if(response.sale_variations){
        data = response.sale_variations;

        initialTableData = data.map(elmt => (
            {
                id: elmt.id,
                price: parseFloat(elmt.price),
                finalPrice:0
            }));

        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            name: elmt.name,
            sku: elmt.sku,
            imei: elmt.imei,
            group: elmt.group,
            sale_quantity: elmt.sale_quantity,
            previously_returned: elmt.previously_returned,
            price: elmt.price,
        }));
    }
    
    useEffect(() => {
        dispatch( getSaleReturnStoreView(id, props.history) );
    }, []);

    useEffect(() => {
        setTableData(initialTableData)
    }, [response.sale_variations]);

    useEffect(() => {
        if(localStorage.getItem('SaleReturnStoreView')){
            if(preLoader){
                setPreLoader(false);
            }
        }
    }, [localStorage.getItem('SaleReturnStoreView')]);

    
    const customerName = response.customer_name;

    const InvoiceNo = response.sale_invoice;


    let [date, setDate] = useState(null);
    let d = new Date(Date.parse(date));
    date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    
    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
            transaction_date: "",
            return_quantity: "",
        },

        validationSchema: Yup.object({
            transaction_date: Yup.date().required("Please select date").typeError("Please select date"),
        }),

        onSubmit: (values) => {
            
            document.getElementById("submit").disabled = true;
            ref.current.continuousStart();

            let permission = true; 

            if(saleReturnForSubmit.sale_variations.length>0){

                saleReturnForSubmit.sale_variations.map(data => {
                
                    if(data.return_quantity === "") {

                        document.getElementById(`quantityError${data.sale_variation_id}`).innerHTML = "You have to enter quantity"

                        setTimeout(function(){ document.getElementById(`quantityError${data.sale_variation_id}`).innerHTML = "" }, 3000);

                        permission = false;

                    }
                    
                })

            } else {
                document.getElementById("submit").disabled = false;
                ref.current.complete();
                permission = false;

            }

            if(saleReturnForSubmit.sale_variations && saleReturnForSubmit.sale_return_transaction){
                if(saleReturnForSubmit.sale_variations.length === 0 && saleReturnForSubmit.sale_return_transaction.transaction_date !== ""){
                    warningnotify("Nothing is Selected !");
                }
            }

            if(!permission){

                document.getElementById("submit").disabled = false;
                ref.current.complete();

            }

            if(permission){
                
                dispatch(createSaleReturn(saleReturnForSubmit, history));

            }
            

        },

    });


    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    useEffect(() => {
        if(localStorage.getItem("saleReturnError")){
            ref.current.complete();
            document.getElementById("submit").disabled = false;
            errornotify("Sale return unsuccessful");
            localStorage.removeItem("saleReturnError");
        }
    }, [localStorage.getItem("saleReturnError")]);


    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }
    
    
    const { error } = useSelector(state => ({
        error: state.Sale.createSaleReturnError,
    }));


    useEffect(() => {
        if(date !== "NaN-NaN-NaN"){
            if(error){
                if(error.transaction_date){
                    error.transaction_date = "";
                }
            }
            validation.setFieldValue("transaction_date", date);

            const newSaleReturnTransaction = { ...saleReturnTransaction, transaction_date: date }

            setSaleReturnTransaction( newSaleReturnTransaction );

        }else{
            if(error){
                if(error.transaction_date){
                    error.transaction_date = "Please select date !";
                }
            }
            validation.setFieldValue("transaction_date", "");
        }
    }, [date]);


    useEffect(() => {

        if(error){
            if(error.transaction_date){
                error.transaction_date= "";
            }
        }

        const newSaleReturnTransaction = { ...saleReturnTransaction, sale_transaction_id: id }
        
        setSaleReturnTransaction( newSaleReturnTransaction );

    }, []);

    
    const check = (e, id) => {

        if(e.target.checked) {
            
            initialSaleVariation = data.filter(data => data.id === parseInt(e.target.value));

            const newSaleVariations = [{
                sale_variation_id: initialSaleVariation[0].id,
                return_quantity: "",
                return_deduction: 0
            }, ...saleVariations]

            setSaleVariations(newSaleVariations);

        } else {

            setTableData(state => state.map(elmt => elmt.id === id
                ? {...elmt, finalPrice:0}
                : elmt
            ));

            initialSaleVariation = saleVariations.filter(data => data.sale_variation_id !== parseInt(e.target.value));

            setSaleVariations(initialSaleVariation);

        }

    }  

    const updateQuantity = (return_quantity, id, saleQuantity, previouslyReturned) => {

        let availablity = saleVariations.filter(state => state.sale_variation_id === id);

        if(availablity.length===0){
            document.getElementById(`quantityError${id}`).innerHTML = "You have to check first";
            setTimeout(function(){ document.getElementById(`quantityError${id}`).innerHTML = "" }, 3000);
        }

        let availableQuantity = saleQuantity - previouslyReturned;

        if(availableQuantity >= return_quantity && availablity.length !== 0) {

            setTableData(state => state.map(elmt => elmt.id === id
                ? {...elmt, finalPrice:elmt.price*parseInt(return_quantity?return_quantity:0)}
                : elmt
            ));

            setSaleVariations(state => state.map((el) => (el.sale_variation_id === id)
                ? { ...el, return_quantity }
                : el,
            ));

        }        

    };

    const updateSubtotal = (id, price, return_deduction) => {

        let availablity = saleVariations.filter(state => state.sale_variation_id === id);

        let quantity;

        if(availablity.length===0){
            document.getElementById(`quantityError${id}`).innerHTML = "You have to check first"
            setTimeout(function(){ document.getElementById(`quantityError${id}`).innerHTML = "" }, 3000);
        }
        
        quantity = parseInt(availablity[0].return_quantity)?parseInt(availablity[0].return_quantity) : 0;

        let returnDeduction = parseInt(return_deduction)? parseInt(return_deduction) :0;

        if(quantity < 1){
            document.getElementById(`quantityError${id}`).innerHTML = "Please enter return quantity";
            setTimeout(function(){ document.getElementById(`quantityError${id}`).innerHTML = "" }, 3000);
        }

        if(quantity > 0 && returnDeduction >= 0 && returnDeduction <= parseInt(price) && availablity.length!=0) {
            
            setTableData(state => state.map(elmt => elmt.id === id
                ? {...elmt, finalPrice: (elmt.price * quantity) - (returnDeduction * quantity)}
                : elmt
            ));

            setSaleVariations(state => state.map((el) => (el.sale_variation_id === id)
                ? { ...el, return_deduction: returnDeduction}
                : el,
            ));

        } 

    }


    useEffect(() => {

        setSaleReturnForSubmit({

            sale_return_transaction: saleReturnTransaction,

            sale_variations: saleVariations

        })


    }, [saleReturnTransaction, saleVariations]);

    return (
        <React.Fragment>
            <div className="page-content">
                <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Sale List</title>
                </MetaTags>

                <Container fluid>
                    <BreadCrumb title="Sale Return" pageTitle="Sale List" link="/sale-list"/>

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardHeader className='d-flex'>
                                        <h4 className="card-title mb-0 flex-grow-1" style={{ padding: "10px 0", }}>Sale Return</h4>
                                        <div className="hstack gap-3 flex-wrap">
                                            <div className="text-muted fs-14">
                                                Customer Name :{" "} <span className="text-primary fw-medium"> {customerName} </span>
                                            </div>
                                            <div className="vr"></div>
                                            <div className="text-muted fs-14">
                                                Sale Invoice :{" "} <span className="text-body fw-medium"> {InvoiceNo} </span>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardBody>
                                        <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                            <Row>
                                                <Col md={3}>
                                                    <div className="">
                                                        {/* <Label htmlFor="validationSupplierName">Date<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label> */}
                                                        <Flatpickr
                                                            className={`form-control ${(validation.errors.transaction_date && validation.touched.transaction_date) || error.transaction_date ? 'border-red' : ''}`}
                                                            name="transaction_date"
                                                            options={{
                                                                dateFormat: "d/m/Y",
                                                            }}
                                                            onChange={setDate}
                                                            placeholder="Select Date"
                                                        />
                                                        {(validation.touched.transaction_date &&
                                                        validation.errors.transaction_date) || error.transaction_date ? (
                                                            <div className="text-danger">
                                                                {error.transaction_date ? error.transaction_date : validation.errors.transaction_date}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Card className='mt-3'>
                                                <CardBody>
                                                    {
                                                        preLoader ?
                                                        <div className="spinner-box">
                                                            <Spinner color="primary"> Loading... </Spinner> 
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="live-preview">
                                                                <div className="table-responsive table-card">
                                                                    <Table className="align-middle table-nowrap mb-0">
                                                                        <thead className="table-light">
                                                                            <tr>
                                                                                <th></th>
                                                                                <th scope="col">#</th>
                                                                                <th scope="col">Name</th>
                                                                                <th scope="col">Sale Quantity</th>
                                                                                <th scope="col">Previously Returned</th>
                                                                                <th scope="col">Return Quantity</th>
                                                                                <th scope="col">Price ($)</th>
                                                                                <th scope="col">Return Deduction ($)</th>
                                                                                <th scope="col">Subtotal ($)</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>   
                                                                            { data.map(elmt => (
                                                                                <tr key={elmt.id}>
                                                                                    <td>
                                                                                        <div className="form-check mb-3">
                                                                                            <Input 
                                                                                                className="form-check-input permissions"
                                                                                                type="checkbox" 
                                                                                                id={"checkbox"+ elmt.id} 
                                                                                                name={"checkbox"+ elmt.id} 
                                                                                                value={elmt.id}
                                                                                                onChange={ (e) => check(e, elmt.id) }
                                                                                            />
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>{elmt.sl}</td>
                                                                                    <td>{elmt.name} <br /> SKU {elmt.sku} - {elmt.imei === "N/A" ? "GROUP " + elmt.group : "IMEI " + elmt.imei}</td>
                                                                                    <td>{elmt.sale_quantity}</td>
                                                                                    <td>{elmt.previously_returned}</td>
                                                                                    <td>
                                                                                        <FormGroup className="mb-3">
                                                                                            <Input
                                                                                                name="return_quantity"
                                                                                                placeholder="0"
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="validationreturn_quantity"
                                                                                                onChange={e => updateQuantity(e.target.value, elmt.id, elmt.sale_quantity, elmt.previously_returned)}
                                                                                                onBlur={validation.handleBlur}
                                                                                                value={saleVariations.filter(state => state.sale_variation_id === elmt.id)[0] ? saleVariations.filter(state => state.sale_variation_id === elmt.id)[0].return_quantity:0}
                                                                                                invalid={
                                                                                                    (validation.touched.return_quantity &&
                                                                                                    validation.errors.return_quantity) || error.return_quantity
                                                                                                    ? true
                                                                                                    : false
                                                                                                }
                                                                                            />
                                                                                            {(validation.touched.return_quantity &&
                                                                                            validation.errors.return_quantity) || error.return_quantity ? (
                                                                                            <FormFeedback type="invalid">
                                                                                                {error.return_quantity ? error.return_quantity : validation.errors.return_quantity}
                                                                                            </FormFeedback>
                                                                                            ) : null}
                                                                                        </FormGroup>
                                                                                        <p className='text-danger' id={`quantityError${elmt.id}`}></p>
                                                                                    </td>
                                                                                    <td>$ {elmt.price}</td>
                                                                                    <td>
                                                                                        <FormGroup className="mb-3">
                                                                                            <Input
                                                                                                name="return_deduction"
                                                                                                placeholder="0"
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="validationreturn_deduction"
                                                                                                onChange={e => updateSubtotal(elmt.id, elmt.price, e.target.value)}
                                                                                                value={saleVariations.filter(state => state.sale_variation_id === elmt.id)[0] ? saleVariations.filter(state => state.sale_variation_id === elmt.id)[0].return_deduction:0}
                                                                                            />
                                                                                        </FormGroup>
                                                                                        <p className='text-danger' id={`quantityError${elmt.id}`}></p>
                                                                                    </td>
                                                                                    <td>$ 
                                                                                        { (
                                                                                            (elmt.price 
                                                                                            * 
                                                                                            (saleVariations.filter(state => state.sale_variation_id === elmt.id)[0] ? saleVariations.filter(state => state.sale_variation_id === elmt.id)[0].return_quantity:0) )
                                                                                            -
                                                                                            ((saleVariations.filter(state => state.sale_variation_id === elmt.id)[0] ? saleVariations.filter(state => state.sale_variation_id === elmt.id)[0].return_deduction:0)
                                                                                            *
                                                                                            (saleVariations.filter(state => state.sale_variation_id === elmt.id)[0] ? saleVariations.filter(state => state.sale_variation_id === elmt.id)[0].return_quantity:0))
                                                                                        )
                                                                                        }
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                        {(data && (data.length > 0)) ? 
                                                                        <tfoot>
                                                                            <tr>
                                                                                <td className="text-center fs-16" colSpan="8"><strong>Total:</strong></td>
                                                                                <td> $ {tableData.length>0 && tableData.map(data=>data.finalPrice).reduce((total, array)=>total = total+array)}</td>
                                                                            </tr>
                                                                        </tfoot>
                                                                        :
                                                                        <tfoot>
                                                                            <tr>
                                                                                <td className="text-center fs-16" colSpan="9"><strong>No Data Found</strong></td>
                                                                            </tr>
                                                                        </tfoot>
                                                                        }
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                            <div className="d-none code-view">
                                                                <pre className="language-markup" style={{"height": "275px"}}>
                                                                <code>
                                                                    <CardTables/>  
                                                                </code>
                                                                </pre>
                                                            </div>
                                                        </>
                                                    }
                                                </CardBody>
                                            </Card>

                                            <Button id="submit" color="primary" type="submit" className='submit-btn w-md'>
                                                Submit
                                            </Button>
                                        
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <ToastContainer />
                </Container>

            </div>   
        </React.Fragment>
    )
}

export default SaleReturnTerminal