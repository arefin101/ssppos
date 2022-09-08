import React, { useEffect, useState, useRef } from 'react';
import MetaTags from "react-meta-tags";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeaderMain from '../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button, Table } from 'reactstrap';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {createPurchaseVariation, getProductCategory, getStorePurchaseVariationView, removeProductCategory } from '../../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import { CardTables } from '../../Tables/BasicTables/BasicTablesCode';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import LoadingBar from 'react-top-loading-bar';


const conditions = [
    { value: '1', label: 'A' },
    { value: '2', label: 'A-' },
    { value: '3', label: 'B' },
    { value: '4', label: 'C' },
    { value: '5', label: 'New' },
];

const PurchaseVariations = (props) => {
    
    const ref = useRef(null);

    const dispatch = useDispatch();

    const [purchaseVariationList, setPurchaseVariationList] = useState('');
    const[purchaseTransactionId , setPurchaseTransactionId] = useState(props.match.params.id);
    const [selectedSku, setSelectedSku] = useState(null);
    const [quantityVisibility, setQuantityVisibility] = useState(true);
    const [imeiVisibility, setImeiVisibility] = useState(true);
    const [riskfundRadio, setRiskFundRadio] = useState('');
    const [preLoader, setPreLoader] = useState(true);
    const [lockedView, setLockedView] = useState(false);

    const successnotify = ( message ) => toast( message , { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });    
    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
    const warningnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-warning text-white' });

    let refNo = props.location.state ? props.location.state.refNo : "--";
    let lockStatus = 0;

    if(localStorage.getItem("setStatus")){
        lockStatus = props.location.state.lockStatus;
        localStorage.removeItem("setStatus");
    }
    
    function clearServerSideErrorForPurchaseVariation(){
        if(errorPurchaseVariation) {
            errorPurchaseVariation.product_id= "";
            errorPurchaseVariation.quantity_purchased= "";
            errorPurchaseVariation.purchase_price= "";
            errorPurchaseVariation.overhead_charge= "";
            errorPurchaseVariation.serial= "";
            errorPurchaseVariation.purchase_locked = "";
            errorPurchaseVariation.risk_fund= "";
        }
    }

    useEffect(() => {
        if(lockStatus === 1){
            setLockedView(true);
        }
        dispatch(getStorePurchaseVariationView(props.history));
    }, []);

    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
            id:props.match.params.id,
            sku: "",
            quantity: 1,
            price: 0.00,
            overhead_charge: 0,
            imei:"",
            riskFund:""
        },

        validationSchema: Yup.object({
            sku: Yup.mixed().required("Please select a SKU"),
            quantity: Yup.number().required("Please enter quantity").min(1,"Minimum quantity must be 1"),
            price: Yup.number().required("Please enter product price").min(1,"Minimum Price must be bigger than 0"),
            imei: Yup.string().required("Please enter product imei"),
            riskFund: Yup.mixed().required("Please specify risk fund"),
        }),

        onSubmit: (values) => {
            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();

            let purchaseVariations={
                purchase_transaction_id:values.id,
                product_id:values.sku,
                serial:values.imei,
                quantity_purchased: values.quantity,
                purchase_price: values.price,
                overhead_charge: values.overhead_charge === "" ? 0 : values.overhead_charge,
                risk_fund: values.riskFund
            };
            dispatch(createPurchaseVariation(purchaseVariations, props.history));
        },
        
    });


    useEffect(() => {
        
        if(localStorage.getItem("purchaseVariation")) {
            ref.current.complete();
            document.getElementById("submit").disabled = false;

            successnotify("Purchase Variation Created Successfully !");
            const newPurchaseVariationList = [responsePurchaseVariation, ...purchaseVariationList ]
            setPurchaseVariationList(newPurchaseVariationList);
            localStorage.removeItem('purchaseVariation')
            imeiVisibility==true ? validation.setFieldValue("imei" , "N/A") : validation.setFieldValue("imei" , "")
            validation.touched.imei=false
            validation.touched.riskFund=false
            clearServerSideErrorForPurchaseVariation()
        }
    }, [localStorage.getItem("purchaseVariation")]);

    

    useEffect(() => {

        if(selectedSku != null){

            errorPurchaseVariation.product_id = "";

            validation.setFieldValue("sku", selectedSku.value);

            dispatch(getProductCategory(selectedSku.value,props.history));

            setQuantityVisibility(true)
            // validation.values.quantity=""
            setImeiVisibility(true)
            validation.values.imei="N/A"
            validation.values.price=""
            validation.values.overhead_charge=0
            validation.values.riskFund=''
            validation.touched.imei= false
            validation.touched.price= false
            validation.touched.overhead_charge= false
            validation.touched.riskFund= false
            setRiskFundRadio('');

        }else{
            errorPurchaseVariation.product_id = "Please select a SKU";
            validation.setFieldValue("sku", "");
        }

    }, [selectedSku]);

    useEffect(() => {

        clearServerSideErrorForPurchaseVariation();
        dispatch(removeProductCategory())
        productCategoryType=false;

    }, []);

    let data = [];
    let sku = [];
    
    const { products , errorPurchaseVariation, responsePurchaseVariation} =  useSelector( state => ({
        products: state.PurchaseVariations.response,
        errorPurchaseVariation: state.PurchaseVariations.errorPurchaseVariations?state.PurchaseVariations.errorPurchaseVariations:{},
        responsePurchaseVariation: state.PurchaseVariations.purchaseVariation,
    }));
    

    let { productCategoryType } =  useSelector( state => ({
        productCategoryType:state.Product.productCategoryType,
    }));
    
   
    useEffect(() => {
        
        if(errorPurchaseVariation){
            if( (errorPurchaseVariation.product_id) || 
                (errorPurchaseVariation.quantity_purchased) || 
                (errorPurchaseVariation.purchase_price) || 
                (errorPurchaseVariation.overhead_charge) || 
                (errorPurchaseVariation.serial) || 
                (errorPurchaseVariation.purchase_locked) || 
                (errorPurchaseVariation.risk_fund))
            {
                ref.current.complete();
                document.getElementById("submit").disabled = false;

                (errorPurchaseVariation.serial) 
                ? warningnotify(errorPurchaseVariation.serial[0])
                : (errorPurchaseVariation.purchase_locked) 
                ? warningnotify(errorPurchaseVariation.purchase_locked[0]) 
                : errornotify("Purchase Variation Creation Failed !");
            }
            
            imeiVisibility==true ? validation.setFieldValue("imei" , "N/A") : validation.setFieldValue("imei" , "")
        }
    }, [errorPurchaseVariation]);

    useEffect(()=>{
        if(productCategoryType){
            if(productCategoryType == "Single" ){
                setQuantityVisibility(false)
                validation.values.quantity=""
                setImeiVisibility(true)
                validation.values.imei="N/A"
                validation.values.price=""
                validation.values.overhead_charge=0
                validation.values.riskFund=''
                setRiskFundRadio('');
            }else if(productCategoryType == "Variable" )
            {
                setQuantityVisibility(true)
                validation.values.quantity=1
                setImeiVisibility(false)
                validation.values.imei=""
                validation.values.price=""
                validation.values.overhead_charge=0
                validation.values.riskFund=''
                errorPurchaseVariation.serial=""
                setRiskFundRadio('');
            }
        }
    }, [productCategoryType,quantityVisibility,imeiVisibility])
  
    if(products.products){
        data =  products.products;

        sku = data?.map(item => {
            return {value:item.id, label:item.sku +" - " + item.name}
        });
       
    }


    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

    const customStyles = {
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ?
            '#ddd' : 'red',
        })
    }

    let variationList = [];
    
    if(purchaseVariationList){
        
        variationList = purchaseVariationList

        let serial = 0;

        variationList =  variationList.map(elmt => (
        {
            sl: ++serial,
            id: elmt.product_id,
            purchase_reference: elmt.purchase_reference,
            name: elmt.name,
            sku: elmt.sku,
            imei: elmt.serial,
            group: elmt.group,
            quantityPurchased: elmt.quantity_purchased,
            purchasePrice: elmt.purchase_price, 
            overhead_charge: elmt.overhead_charge, 
            risk_fund: elmt.risk_fund*100+'%',
        }))

        if(preLoader){
            setPreLoader(false);
        }

    }

    return (
        <React.Fragment>
            <div className="page-content">
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Add Purchase Variation</title>
                </MetaTags>
                <Container fluid>
                    
                    <BreadCrumb title="Purchase Variation" pageTitle="Purchase List" link="/purchase-list"/>

                    {
                        lockedView 
                        ?
                        <div className="d-flex align-items-center justify-content-center" style={{ height: '70vh' }}>
                            <div className="locked-view text-center">
                                <h2 className="text-danger mb-3">This Purchase Transaction is Locked !</h2>
                                <h5 className="">You are not allowed to add variations to this purchase</h5>
                                <p className='text-muted'>To add more variations, please contact Super Admin</p>
                                <Link to="/purchase-list" color="primary" className="btn btn-label btn-primary left pt-1 pb-1" size='sm'>
                                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Go Back to Purchase List
                                </Link>
                            </div>
                        </div>
                        :
                        <>
                            <Card >
                                <PreviewCardHeaderMain title={`Add Purchase Variation for ${refNo}`} />
                                <CardBody>
                                    <div className="live-preview">
                                        <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                            <Row>
                                                <Input
                                                    name="purchaseTransactionId"
                                                    type="text"
                                                    className="form-control"
                                                    id="purchaseTransactionId"
                                                    hidden = {true}
                                                    value={purchaseTransactionId}
                                                    readOnly={true}
                                                />
                                                <Col md="3">
                                                    <div className="mb-3">
                                                        <Label htmlFor="sku">SKU<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedSku}
                                                            id = "sku"
                                                            onChange={setSelectedSku}
                                                            options={sku}
                                                            styles={
                                                                (validation.touched.sku &&
                                                                validation.errors.sku) || errorPurchaseVariation.product_id
                                                                ? customStyles
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.sku &&
                                                        validation.errors.sku) || errorPurchaseVariation.product_id ? (
                                                            <div className="text-danger">
                                                                {errorPurchaseVariation.product_id ? errorPurchaseVariation.product_id : validation.errors.sku}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
    
                                                <Col md="3">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="quantity">Quantity<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="quantity"
                                                            placeholder="Enter Quantity"
                                                            type="number"
                                                            className="form-control"
                                                            id="quantity"
                                                            readOnly={quantityVisibility}
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={quantityVisibility? 1 : validation.values.quantity }
                                                            invalid={
                                                                (validation.touched.quantity &&
                                                                validation.errors.quantity && !quantityVisibility) || errorPurchaseVariation.quantity_purchased
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.quantity &&
                                                        validation.errors.quantity) || errorPurchaseVariation.quantity_purchased ? (
                                                        <FormFeedback type="invalid">
                                                            {errorPurchaseVariation.quantity_purchased ? errorPurchaseVariation.quantity_purchased : validation.errors.quantity}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
    
                                                <Col md="3">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="price">Purchase Price<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="price"
                                                            placeholder="Enter your Purchase price"
                                                            type="number"
                                                            className="form-control"
                                                            id="price"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.price || ""}
                                                            invalid={
                                                                (validation.touched.price &&
                                                                validation.errors.price) || errorPurchaseVariation.purchase_price
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.price &&
                                                        validation.errors.price) || errorPurchaseVariation.purchase_price ? (
                                                        <FormFeedback type="invalid">
                                                            {errorPurchaseVariation.purchase_price ? errorPurchaseVariation.purchase_price : validation.errors.price}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
    
                                                <Col md="3">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="overhead_charge">Overhead Charge</Label>
                                                        <Input
                                                            name="overhead_charge"
                                                            placeholder="Enter your Purchase Overhead Charge"
                                                            type="number"
                                                            className="form-control"
                                                            id="overhead_charge"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.overhead_charge || ""}
                                                            invalid={
                                                                (validation.touched.overhead_charge &&
                                                                validation.errors.overhead_charge) || errorPurchaseVariation.overhead_charge
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.overhead_charge &&
                                                        validation.errors.overhead_charge) || errorPurchaseVariation.overhead_charge ? (
                                                        <FormFeedback type="invalid">
                                                            {errorPurchaseVariation.overhead_charge ? errorPurchaseVariation.overhead_charge : validation.errors.overhead_charge}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                                
                                                <Col md="8">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="iemi">IMEI<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <div className="form-icon">
                                                            <Input
                                                                name="imei"
                                                                placeholder="IMEI"
                                                                type="text"
                                                                className="form-control form-control-icon"
                                                                id="iemi"
                                                                readOnly={imeiVisibility}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={imeiVisibility ? "N/A" : validation.values.imei }
                                                                invalid={
                                                                    (validation.touched.imei &&
                                                                    validation.errors.imei && !imeiVisibility) || errorPurchaseVariation.serial
                                                                    ? true
                                                                    : false
                                                                }
                                                            />
                                                            {(validation.touched.imei &&
                                                            validation.errors.imei) || errorPurchaseVariation.serial ? (
                                                            <FormFeedback type="invalid">
                                                                {errorPurchaseVariation.serial ? errorPurchaseVariation.serial : validation.errors.imei}
                                                            </FormFeedback>
                                                            ) : null}
                                                            <i className="mdi mdi-barcode-scan text-muted" style={{ fontSize: '20px', display:'block', top:'4px', }}></i>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                
                                                <Col md="4">
                                                    <FormGroup className="mb-3">
                                                        <Label className="form-check-label" for="riskFund">Risk Fund<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <div className="form-check form-radio-outline form-radio-primary mb-3">
                                                            <Input
                                                                className="form-check-input" 
                                                                type="radio" 
                                                                name="riskFund" 
                                                                id="rfyes"
                                                                value={0.10}
                                                                onClick={()=>{setRiskFundRadio(0.10)}}
                                                                checked={riskfundRadio === 0.10}
                                                                onChange={validation.handleChange} 
                                                                invalid={
                                                                    (validation.touched.riskFund &&
                                                                    validation.errors.riskFund) || errorPurchaseVariation.risk_fund
                                                                    ? true
                                                                    : false
                                                                }
                                                            />
                                                            <Label className="form-check-label" for="rfyes">
                                                                Yes
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-radio-outline form-radio-primary mb-3">
                                                            <Input 
                                                                className="form-check-input" 
                                                                type="radio" 
                                                                name="riskFund" 
                                                                id="rfno" 
                                                                value={0.00}
                                                                onClick={()=>{setRiskFundRadio(0.00)}}
                                                                checked={riskfundRadio === 0.00}
                                                                onChange={validation.handleChange} 
                                                                invalid={
                                                                    (validation.touched.riskFund &&
                                                                    validation.errors.riskFund) || errorPurchaseVariation.risk_fund
                                                                    ? true
                                                                    : false
                                                                }
                                                            />
                                                            <Label className="form-check-label" for="rfno">
                                                                No
                                                            </Label>
                                                        {(validation.touched.riskFund &&
                                                        validation.errors.riskFund) || errorPurchaseVariation.riskFund ? (
                                                        <FormFeedback type="invalid">
                                                            {errorPurchaseVariation.risk_fund ? errorPurchaseVariation.risk_fund : validation.errors.riskFund}
                                                        </FormFeedback>
                                                        ) : null}
                                                        </div>
                                                        
                                                    
                                                    </FormGroup>
                                                </Col>
    
                                            </Row>
                                            <Button id="submit" color="primary" type="submit" className='submit-btn w-md'>
                                                Submit
                                            </Button>
                                            <Link to="/purchase-list" className="btn btn-info btn-label left w-md ms-3 submit-btn"><i className="ri-arrow-left-s-fill label-icon align-middle me-2 fs-16"></i>Back</Link>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
    
                            <Row>
                                <Col xl={12}>
                                    <Card>
                                        <CardBody>                                       
                                            <div className="live-preview">
                                                <div className="table-responsive table-card">
                                                    <Table className="align-middle table-nowrap mb-0">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Purchase Reference</th>
                                                                <th scope="col"> Product Name</th>
                                                                <th scope="col">SKU</th>
                                                                <th scope="col">IMEI</th>
                                                                <th scope="col">Group</th>
                                                                <th scope="col">Purchase Quantity</th>
                                                                <th scope="col">Purchase Price ($)</th>
                                                                <th scope="col">Overhead Charge ($)</th>
                                                                <th scope="col">Risk Fund</th>
                                                                <th scope="col" style={{"width": "150px"}}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>   
                                                            { variationList.map(elmt => (
                                                                <tr key={elmt.sl}>
                                                                    <td>{elmt.sl}</td>
                                                                    <td>{elmt.purchase_reference}</td>
                                                                    <td>{elmt.name}</td>
                                                                    <td>{elmt.sku}</td>
                                                                    <td>{(elmt.imei) ? elmt.imei : "N/A"}</td>
                                                                    <td>{(elmt.group) ? elmt.group : "N/A"}</td>
                                                                    <td>{elmt.quantityPurchased}</td>
                                                                    <td>{elmt.purchasePrice}</td>
                                                                    <td>{elmt.overhead_charge}</td>
                                                                    <td>{elmt.risk_fund}</td>
                                                                    <td>
                                                                        <button type="button" className="btn btn-sm btn-soft-primary">Delete</button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
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
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row> 
                        </>
                    }
                    
                    <ToastContainer />

                </Container>
            </div>
        </React.Fragment>
    );
};

export default PurchaseVariations;
