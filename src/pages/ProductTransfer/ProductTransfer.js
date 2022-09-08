import React, { useEffect, useState, useRef } from "react";
import MetaTags from 'react-meta-tags';
import Select from "react-select";
import "jspdf-autotable";
import * as Yup from "yup";
import { Card, CardBody, Col, Container, CardHeader, Row, FormFeedback, Label, FormGroup, Form, Button, Spinner, Table, Input } from "reactstrap";
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProductTransferView , getPurchaseInvoiceList , getLastTransactions, getProductsByPurchaseInvoice , getProductsByLastTransaction, getProductsByImeiScan} from '../../store/actions';
import {ToastContainer, toast} from 'react-toastify';

const ProductTransfer = () => {

    const ref = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const [ checkedValues, setCheckedValues ] = useState([]);
    const [ preLoader, setPreLoader ] = useState(true);
    const [selectType , setselectType] = useState({});
    const [purchaseInvoice , setPurchaseInvoice] = useState("");
    const [lastTransaction , setLastTransaction] = useState("");
    const [imeiScan , setImeiScan] = useState([]);

    let data=[];
    let initialCheckedValue = {};
    let purchaseInvoiceList=[]
    let previousTransactionOption=[]
    
    useEffect(() => {
        dispatch( getProductTransferView( history ) );
        dispatch( getPurchaseInvoiceList( history ) );
        dispatch( getLastTransactions( history ) );
        dispatch( getProductsByPurchaseInvoice(purchaseInvoice.value , history ) );
        dispatch( getProductsByLastTransaction(lastTransaction.value, history ) );

    }, [dispatch, purchaseInvoice, lastTransaction]);

    const { response , invoiceList, previousTransactions, productsByPurchaseInVoice,productsBylastTransaction, productByImei} = useSelector(state => ({
        response: state.productLocation.productTransferView,
        previousTransactions: state.productLocation.lastTransactions,
        productsByPurchaseInVoice: state.productLocation.productsByPurchaseInvoice,
        productsBylastTransaction: state.productLocation.productsByLastTransition,
        invoiceList: state.productLocation.purchaseInvoiceList,
        productByImei: state.productLocation.productByImei,
        
    }));


    if(invoiceList){
        purchaseInvoiceList = invoiceList.purchase_transactions_invoice?.map(item => {
                return {value:item.id, label:item.reference_no}
            }
        );
    }
    
    if(previousTransactions){
        previousTransactionOption = previousTransactions.lastTransactions?.map(item => {
            return {value:item.batch_no, label:item.batch_no}
            }
        );
    }


    if(selectType.value == "by_select"){
        if(response.purchase_variations){
            data = response.purchase_variations;
            if(preLoader){
                setPreLoader(false);
            }
        }
    }

    
    let item = localStorage.getItem('product');

    useEffect(() => {
        if(item){
            const product = [productByImei.search_by_imei[0], ...imeiScan ]
            setImeiScan(product);
            localStorage.removeItem('product')
        }
    }, [item]);
    
    // if(imeiScan){
    //     data = imeiScan;
    //     // setCheckedValues(data)
    // }

 

    if(selectType.value == "by_purchase_invoice")
    {
        if(purchaseInvoice){
            if(productsByPurchaseInVoice.product_by_purchase_invoice){

                data = productsByPurchaseInVoice.product_by_purchase_invoice;
                
                if(preLoader){
                    setPreLoader(false);
                }
            }
        }
    }

    if(selectType.value == "by_last_transaction")
    {
        if(lastTransaction){
            if(productsBylastTransaction.product_by_transaction){
                data = productsBylastTransaction.product_by_transaction;

                if(preLoader){
                    setPreLoader(false);
                }
            }
        }
    }
    
    useEffect(() => {
       setselectType({ value: 'by_select', label: 'By Select' }) 
    },[])

    useEffect(() => {

        if(response.purchase_variations){
            data=[];
            
            data = response.purchase_variations;
            if(preLoader){
                setPreLoader(false);
            }
        }

        if(purchaseInvoice){
            if(productsByPurchaseInVoice.product_by_purchase_invoice){

                data = productsByPurchaseInVoice.product_by_purchase_invoice;
                setCheckedValues(data)
                
                if(preLoader){
                    setPreLoader(false);
                }
            }
        }
     
        if(lastTransaction){
            if(productsBylastTransaction.product_by_transaction){

                data = productsBylastTransaction.product_by_transaction;

                setCheckedValues(data);

                if(preLoader){
                    setPreLoader(false);
                }
            }
        }

        // if(productByImei.search_by_imei){
        //     data = productByImei.search_by_imei;
        //     setCheckedValues(data);
        // }
    
    }, [selectType, purchaseInvoice, productsByPurchaseInVoice ,lastTransaction, productsBylastTransaction])


    
    const check = (e) => {
        if(e.target.checked){
            initialCheckedValue = data.filter(elmt => elmt.id === parseInt(e.target.value));
            const newCheckedValue = [initialCheckedValue[0], ...checkedValues];
            setCheckedValues(newCheckedValue);
        }
        else{
            initialCheckedValue = checkedValues.filter(elmt => elmt.id !== parseInt(e.target.value));
            setCheckedValues(initialCheckedValue);
        }
    }  


    const type = [
        { value: 'by_select', label: 'By Select' },
        // { value: 'by_imei_scan', label: 'By IMEI Scan' },
        { value: 'by_purchase_invoice', label: 'By Purchase Invoice' },
        { value: 'by_last_transaction', label: 'By Last Transaction' },
    ]

    const validation = useFormik({

        enableReinitialize: true.valueOf,

        initialValues: {
            imei:"",
        },

        validationSchema: Yup.object({
            imei: Yup.string().required("Please Enter IMEI"),
        }),

        onSubmit: (values) => {

            dispatch( getProductsByImeiScan(values.imei, history) );

            // ref.current.continuousStart();
            // ref.current.complete();
        }

    });

    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

    //TOASTER
    const warningnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-warning text-white' });
    
    const handleSubmit = () => {
        if(checkedValues.length !== 0){
            history.push(`/transfer-product`, {items : checkedValues});
        }else{
            warningnotify("Please select product !");
        }
    }

    return (    
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Product Transfer</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card className="card70vh">

                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Available Products for Transfer</h4>
                                </CardHeader>

                                <CardBody>
                                    <Row>
                                        <Col sm={4} xxl={3}>
                                            <div>
                                                <Select
                                                    isClearable={false}
                                                    value={selectType}
                                                    onChange={setselectType}
                                                    options={type}
                                                    placeholder="Select Transfer Type"
                                                    name="choices_transfer_type"
                                                    id="Transfer_type"
                                                ></Select>
                                            </div>
                                        </Col>

                                        
                                            {
                                                selectType.value === "by_purchase_invoice" ?

                                                <Col sm={4} xxl={3}>
                                                    <div>
                                                        <Select
                                                            isClearable={false}
                                                            value={purchaseInvoice}
                                                            onChange={setPurchaseInvoice}
                                                            options= {purchaseInvoiceList}
                                                            placeholder="Select Purchase Invoive Type"
                                                            name="choices_purchase_invoce_type"
                                                            id="purchase_incoice_type"
                                                        ></Select>
                                                    </div>
                                                </Col>
                                                :

                                                selectType.value === "by_last_transaction" ?

                                                <Col sm={4} xxl={3}>
                                                    <div>
                                                        <Select
                                                            isClearable={false}
                                                            value={lastTransaction}
                                                            onChange={setLastTransaction}
                                                            options={previousTransactionOption}
                                                            placeholder="Select Last Transaction"
                                                            name="choices_last_transaction"
                                                            id="last_transition"
                                                        ></Select>
                                                    </div>
                                                </Col>

                                                : null

                                            }

                                            {
                                                selectType.value === "by_imei_scan" &&
                                                <Col xxl='8'>
                                                    <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                                        <Row>
                                                            <Col sm={4} xxl={6}>
                                                                <FormGroup>
                                                                    <div className="form-icon">
                                                                        <Input 
                                                                            type="text"
                                                                            className='form-control form-control-icon'
                                                                            placeholder='Enter IMEI'
                                                                            id='imei'
                                                                            onChange={validation.handleChange}
                                                                            onBlur={validation.handleBlur}
                                                                            value={validation.values.imei || ""}
                                                                            invalid={
                                                                                (validation.touched.imei && validation.errors.imei) ? true : false
                                                                            }
                                                                        />
                                                                        {(validation.touched.imei && validation.errors.imei ) ? (
                                                                            <FormFeedback type="invalid"> {validation.errors.imei} </FormFeedback>
                                                                        ) : null}
                                                                        <i className="mdi mdi-barcode-scan text-muted" style={{ fontSize: '20px', display:'block', top:'4px', }}></i>
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col sm={4} xxl={6}>
                                                                <Button color="primary" className='w-md' type="submit">Submit</Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Col>
                                            }

                                    </Row>

                                    <Card className="mt-4">
                                        <CardBody>  
                                            {   
                                                preLoader
                                                ?
                                                <div className="spinner-box">
                                                    <Spinner color="primary"> Loading... </Spinner> 
                                                </div>
                                                :
                                                <div className="live-preview">
                                                    <div className="table-responsive table-card">
                                                        <Table className="align-middle table-nowrap mb-0 table-hover">
                                                            <thead className="table-light">
                                                                <tr>
                                                                    {selectType.value === "by_select" ? <th></th> : null  }
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">SKU</th>
                                                                    <th scope="col">IMEI</th>
                                                                    <th scope="col">Quantity Available</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>   
                                                                { data.map(elmt => (
                                                                    <tr key={elmt.id}>
                                                                        {selectType.value === "by_select" ? 
                                                                        <td>
                                                                            <div className="form-check">
                                                                                <Input 
                                                                                    className="form-check-input permissions"
                                                                                    type="checkbox" 
                                                                                    id={"checkbox"+ elmt.id} 
                                                                                    name={"checkbox"+ elmt.id} 
                                                                                    value={elmt.id}
                                                                                    onChange={ (e) => check(e) }
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                        :null
                                                                        }
                                                                        <td>{elmt.name}</td>
                                                                        <td>{elmt.sku}</td>
                                                                        <td>{elmt.imei} </td>
                                                                        <td>{elmt.quantity_available}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            }
                                        </CardBody>
                                    </Card>
                                        
                                    <Button color="primary" onClick={handleSubmit} className="btn-label right w-md"><i className="ri-arrow-right-s-fill label-icon align-middle ms-2 fs-16"></i>Next</Button>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <ToastContainer/>
                </Container>
            </div>
        </React.Fragment>
    )

}


export default ProductTransfer;