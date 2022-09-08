import React, {useEffect,useState,useRef} from 'react';
import MetaTags from "react-meta-tags";
import { useSelector ,useDispatch} from 'react-redux';
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button, Table, UncontrolledPopover, PopoverHeader, PopoverBody, CardHeader, Modal, ModalBody } from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from "formik";
import { getStoreSaleView } from '../../store/actions';
import Flatpickr from 'react-flatpickr';
import { useHistory } from 'react-router-dom';
import { imeiScan, createSaleTransaction, getPurchaseVariationsSale, alternativeScan, sellingPriceApproval } from './../../store/sale/action';
import LoadingBar from 'react-top-loading-bar';


const discountTypes = [
    { value: '0', label: 'Fixed' },
    { value: '1', label: 'Parcentage' },
];

const SaleTerminal = (props) => {

    const [ selectedCustomer, setSelectedCustomer ] = useState(null);

    const [ selectedProductModel, setSelectedProductModel ] = useState(null);

    const [ selectedProductSku, setSelectedProductSku ] = useState(null);

    const [ selectedUserOfficial, setSelectedUserOfficial ] = useState(null);

    const [dataForSubmit, setdataForSubmit] = useState( { sale_transaction:{}, sale_transactions:[] } );

    const [saleVariations, setSaleVariations] = useState([]);

    const [saleTransaction, setSaleTransaction] = useState({transaction_date: "", customer_id: null, discount: 0, sale_note: "", customer_note: ""});

    const [scannedDataList, setScannedDataList] = useState([]);

    const [purchaseVariationIds, setPurchaseVariationIds] = useState([]);

    const [skuList, setSkuList] = useState([]);

    const [productSummary, setProductSummary] = useState([]);

    const [sellingError, setSellingError] = useState("");

    const [totalItems, setTotalItems] = useState(0);

    const [totalQuantity, setTotalQuantity] = useState(0);

    const [totalPayable, setTotalPayable] = useState(0);

    const [selectedDiscountType, setSelectedDiscountType] = useState({ value: '1', label: 'Parcentage' });

    const [discount, setDiscount] = useState(0);

    const [discountType, setDiscountType] = useState(1);

    const [confirm, setConfirm] = useState(true);

    const [userOfficial, setUserOfficial] = useState(true);

    const [approvalDisable, setApprovalDisable] = useState('d-none')

    const [flag, setFlag] = useState(true);

    const [approval, setApproval] = useState(true);

    const [finalize, setFinalize] = useState(true);

    const dispatch = useDispatch();

    const history = new useHistory();

    const ref = useRef(null);

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
    
    const warningnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-warning text-white' });

    // DATE PICKER
    const [date, setDate] = useState(new Date());
    
    useEffect(()=>{

        let d = new Date(Date.parse(date));
        setDate(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
        
    },[date]);


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

    let totalPrice

    useEffect(() => {
        setdataForSubmit({
            sale_transaction: saleTransaction, 
            sale_variations: saleVariations
        })

        totalPrice = saleVariations.reduce((a,v) =>  a = a + (parseFloat(v.selling_price?v.selling_price:0)*parseInt(v.quantity)) , 0 );

        setTotalPayable(totalPrice);

    }, [saleTransaction, saleVariations]);


    const validate = (e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
    }

    const createTransaction = () =>{

        dataForSubmit.sale_variations.map(item => {
            if(item.selling_price === "" ){
                setSellingError("Selling Price is required !");
                document.getElementById(`priceError${item.purchase_variation_id}`).style.display="block";
                setTimeout(function(){ document.getElementById(`priceError${item.purchase_variation_id}`).style.display="none" }, 3000);
                setFlag(false);
            }else{
                document.getElementById(`priceError${item.purchase_variation_id}`).style.display="none";
            }
        })

        if(dataForSubmit.sale_variations.length <= 0){
            warningnotify("Please select a product first");
            setFlag(false);
        }

        if(flag){

            ref.current.continuousStart();
            document.getElementById("submit").disabled = true;
            dispatch(createSaleTransaction(dataForSubmit, props.history));
            
        }

    }
    

    const discountValidation = useFormik({

        enableReinitialize: true,

        initialValues: {
            discount_amount: 0,
            discountType: ""
        },

        validationSchema: Yup.object({
            discountType: Yup.mixed().required("Please select Discount Type"),
        }),

        onSubmit: (values) => {
                       
            if(values.discount_amount>0){

                if(parseInt(values.discountType) === 0){

                    setDiscount(values.discount_amount);

                    setDiscountType(0);

                }else{

                    setDiscount(values.discount_amount/100);
                    
                    setDiscountType(1);

                }


            }else{
                setDiscount(0)
            }
            
            setDiscModal(!discModal);

        },
    });

    const discountValidate = (e) => {
        e.preventDefault();
        discountValidation.handleSubmit();
        return false;
    }

    useEffect(() => {
        if(selectedDiscountType != null){
            discountValidation.setFieldValue("discountType", selectedDiscountType.value);
        }else{
            discountValidation.setFieldValue("discountType", "");
        }
    }, [selectedDiscountType]);


    useEffect(()=>{

        if(discountValidation.values.discount_amount >= 0  && discountValidation.values.discount_amount != ''){

            if(parseInt(discountValidation.values.discountType) === 0){

                if(discountValidation.values.discount_amount <= totalPayable){

                    setSaleTransaction({...saleTransaction, discount: discountValidation.values.discount_amount });

                }else{

                    setSaleTransaction({...saleTransaction, discount:  totalPayable });
                
                }

            }else{

                if(discountValidation.values.discount_amount <= 100){

                    setSaleTransaction({...saleTransaction, discount: totalPayable * discountValidation.values.discount_amount/100 });
                    
                }else{

                    setSaleTransaction({...saleTransaction, discount: totalPayable });
                
                }

            }

        }else{

            setSaleTransaction({...saleTransaction, discount:  0 });

            setDiscount(0)

        }

    },[totalPayable, discountType, discount]);


    const noteValidation = useFormik({

        enableReinitialize: true,

        initialValues: {
            sale_note: "",
            customer_note: ""
        },

    });

    const noteValidate = (e) => {
        e.preventDefault();
        noteValidation.handleSubmit();
        return false;
    }

    const approvalValidation = useFormik({

        enableReinitialize: true,

        initialValues: {
            user_id: null,
            pin_number: null
        },

        validationSchema: Yup.object({
            pin_number: Yup.mixed().required("Please Enter Pin Number"),
        }),

        onSubmit: (values) => {
            
            dispatch(sellingPriceApproval(values, history));

        },

    });



    const approvalValidate = (e) => {
        e.preventDefault();
        approvalValidation.handleSubmit();
        return false;
    }

    const check = () => {

        let saleError = false;

        dataForSubmit.sale_variations.map(item => {
            if(item.selling_price === "" ){
                setSellingError("Selling Price is required !");
                document.getElementById(`priceError${item.purchase_variation_id}`).style.display="block";
                setTimeout(function(){ document.getElementById(`priceError${item.purchase_variation_id}`).style.display="none" }, 3000);
                setFlag(false);
                saleError = true;
            }else{
                document.getElementById(`priceError${item.purchase_variation_id}`).style.display="none";
                saleError = false;
            }
        })

        if(!saleError){
            dataForSubmit.sale_variations.map(item => {
                if(item.selling_price !== "" && parseInt(item.selling_price) < item.purchasePlusOverhead){
                    setSellingError("Selling Price less than Purchase Total !");
                    document.getElementById(`priceError${item.purchase_variation_id}`).style.display="block";
                    setTimeout(function(){ document.getElementById(`priceError${item.purchase_variation_id}`).style.display="none" }, 3000);
                    setFlag(false);
                    setApproval(false);
                }else{
                    document.getElementById(`priceError${item.purchase_variation_id}`).style.display="none";
                    setFinalize(false);
                }
            })
        }

    }

    const openApprovalForm = () => {
        setApprovalDisable('');
    }

    useEffect(() => {
        if(selectedUserOfficial != null){
            approvalValidation.setFieldValue("user_id", selectedUserOfficial.value);
            setUserOfficial(false);
            setConfirm(false);
        }else{
            approvalValidation.setFieldValue("user_id", "");
        }
    }, [selectedUserOfficial]);


    useEffect(() => {

        validation.setFieldValue("discountType", 1);   // 1 means parcentage

        if(createSaleTransactionError["sale_transaction.transaction_date"]){
            createSaleTransactionError["sale_transaction.transaction_date"]=false;
        }
        if(createSaleTransactionError["sale_transaction.customer_id"]){
            createSaleTransactionError["sale_transaction.customer_id"]=false
        }
        if(createSaleTransactionError){
            if(createSaleTransactionError.message){
                createSaleTransactionError.message=null;
            }
        }
    }, []);

 
    // GET CUSTOMER DROPDOWN DATA
    useEffect(() => {
        dispatch( getStoreSaleView(props.history) );
        purchaseVariationSaleResponse.purchase_variations=[];
    }, []);


    const { imeiScannedData, imeiScannedError, createSaleTransactionError, dropdownApiResponse, purchaseVariationSaleResponse, alternativeScannedData, sellingApproval } =  useSelector( state => ({
        dropdownApiResponse: state.Sale.customers,
        imeiScannedData: state.Sale.imeiScannedData,
        imeiScannedError: state.Sale.imeiScannedError,
        purchaseVariationSaleResponse: state.Sale.purchaseVariationSale,
        createSaleTransactionError: state.Sale.createSaleTransactionError,
        alternativeScannedData: state.Sale.alternativeScannedData,
        sellingApproval: state.Sale.sellingPriceApproval
    }));

    useEffect(() => {
        if(sellingApproval === 1){
            setFinalize(false);
            setFlag(true);
        }
    }, [sellingApproval]);

    useEffect(() => {
        if(localStorage.getItem("createSaleTransactionError")){
            ref.current.complete();
            document.getElementById("submit").disabled = false;
            errornotify("Transaction Failed !");
            localStorage.removeItem("createSaleTransactionError");
            document.getElementById("submit").disabled = false;
        }
    }, [localStorage.getItem("createSaleTransactionError")]);

    useEffect(() => {
        if(localStorage.getItem("imeiScanError")){
            errornotify(imeiScannedError);
            localStorage.removeItem("imeiScanError");
        }
    }, [localStorage.getItem("imeiScanError")]);

    useEffect(() => {

        let modelId = selectedProductModel?selectedProductModel.value:"";
        let productId = selectedProductSku?selectedProductSku.value:"";

        dispatch(getPurchaseVariationsSale(modelId, productId, history));


    }, [selectedProductModel, selectedProductSku]);


    //FOR IMEI SCAN
    let scannedData = [];

    if(localStorage.getItem("imeiScanSuccess")){

        setSellingError("")
        
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
                selling_price: "",
                purchasePlusOverhead: parseInt(imeiScannedData.purchase_variation.purchase_price) + parseInt(imeiScannedData.purchase_variation.overhead_charge),
                sku: imeiScannedData.purchase_variation.sku,
            }, ...saleVariations];

            setTotalItems(totalItems+1);

            setTotalQuantity(totalQuantity+1)

            setSaleVariations(newSaleVariations)
            
            setScannedDataList(newScannedDataList);

            if(!skuList.includes(imeiScannedData.purchase_variation.sku)){

                const newSkuList =  [ imeiScannedData.purchase_variation.sku, ...skuList ];

                const newProductSummary =  [ {
                    name: imeiScannedData.purchase_variation.name, 
                    sku: imeiScannedData.purchase_variation.sku,
                    quantity_available : imeiScannedData.purchase_variation.quantity_available
                }, ...productSummary ];

                setSkuList(newSkuList)

                setProductSummary(newProductSummary);

            }

            const newPurchaseVariationIds = [imeiScannedData.purchase_variation.id, ...purchaseVariationIds ]
            setPurchaseVariationIds(newPurchaseVariationIds);

        }else {
            warningnotify("Duplicate IMEI");
        }

        localStorage.removeItem("imeiScanSuccess");
    }

    // FOR ALTERNATIVE SCAN
    if(localStorage.getItem("alternativeScanSuccess")){

        setSellingError("")
        
        if(!purchaseVariationIds.includes(alternativeScannedData.purchase_variation.id)){

            const newScannedDataList = [{
                variation_id: alternativeScannedData.purchase_variation.id,
                product_id: alternativeScannedData.purchase_variation.product_id, 
                purchase_variation_id: alternativeScannedData.purchase_variation.id,
                name: alternativeScannedData.purchase_variation.name,
                sku: alternativeScannedData.purchase_variation.sku,
                imei: alternativeScannedData.purchase_variation.imei,
                quantity: 1, 
                quantity_available: alternativeScannedData.purchase_variation.quantity_available,
                selling_price: "",
                purchase_price: alternativeScannedData.purchase_variation.purchase_price,
                group: alternativeScannedData.purchase_variation.group
            }, ...scannedDataList ]

            const newSaleVariations =  [{
                product_id: alternativeScannedData.purchase_variation.product_id, 
                purchase_variation_id: alternativeScannedData.purchase_variation.id,
                quantity: 1, 
                selling_price: "",
                purchasePlusOverhead: parseInt(alternativeScannedData.purchase_variation.purchase_price) + parseInt(alternativeScannedData.purchase_variation.overhead_charge),
                sku: alternativeScannedData.purchase_variation.sku,
            }, ...saleVariations];

            setTotalItems(totalItems+1);

            setTotalQuantity(totalQuantity+1)

            setSaleVariations(newSaleVariations)
            
            setScannedDataList(newScannedDataList);

            if(!skuList.includes(alternativeScannedData.purchase_variation.sku)){

                const newSkuList =  [ alternativeScannedData.purchase_variation.sku, ...skuList ];

                const newProductSummary =  [ {
                    name: alternativeScannedData.purchase_variation.name, 
                    sku: alternativeScannedData.purchase_variation.sku,
                    quantity_available : alternativeScannedData.purchase_variation.quantity_available
                }, ...productSummary];

                setSkuList(newSkuList)

                setProductSummary(newProductSummary);

            }

            const newPurchaseVariationIds = [ alternativeScannedData.purchase_variation.id, ...purchaseVariationIds ]
            setPurchaseVariationIds(newPurchaseVariationIds);

        }else {
            warningnotify("Already added !");
        }

        localStorage.removeItem("alternativeScanSuccess");
    }


    const sumQuantityBySku = scannedDataList.reduce((group, nw) => {

        group[nw.sku] = (group[nw.sku] || 0) + nw.quantity || 0;
    
        return group;
    
    }, {})

    const sumPriceBySku = scannedDataList.reduce((group, nw) => {

        const price = parseFloat(nw.selling_price)?parseFloat(nw.selling_price):0;

        group[nw.sku] = (group[nw.sku] || 0) + (price * nw.quantity);
    
        return group;
    
    }, {})

    const unitPriceBySku = scannedDataList.reduce((group, nw) => {

        const price = parseFloat(nw.selling_price)?parseFloat(nw.selling_price):0;

        group[nw.sku] = price || 0;
    
        return group;
    
    }, {})

    // QUANTITY COUNT
    let quantity;
    function countUP(id) {
        quantity = scannedData[id].quantity + 1;
        if(quantity <= scannedDataList[id].quantity_available){
            setTotalQuantity(totalQuantity+1)
        }
        updateQuantity(quantity, id)
    }
    function countDown(id) { 
        quantity = scannedData[id].quantity - 1;
        if(quantity>0){
            setTotalQuantity(totalQuantity-1)
            updateQuantity(quantity, id)
        }
    }

    const initialUpdateQuantity = (quantity, id) => {

        quantity = parseInt(quantity)?parseInt(quantity):0;

        if(quantity>-1 && quantity <= scannedDataList[id].quantity_available && scannedDataList[id].imei === "N/A"){
            setTotalQuantity(quantity)
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

    const updatePrice = (selling_price, sku) => {

        if(selling_price > -1){

            setScannedDataList(state => state.map((el) => el.sku === sku
                ? { ...el, selling_price }
                : el,
            ));
            
            setSaleVariations(state => state.map((el) => el.sku === sku
                ? { ...el, selling_price }
                : el,
            ));

        }

    };

  
    let quantityForDelete;

    const deleteProduct = (id, sku) => {

        setTotalItems(totalItems-1);

        quantityForDelete = saleVariations.filter(item => item.purchase_variation_id === id)[0].quantity;

        setTotalQuantity(totalQuantity - parseInt(quantityForDelete?quantityForDelete:0));
        
        setSaleVariations(saleVariations.filter(item => item.purchase_variation_id !== id))
 
        setScannedDataList(scannedDataList.filter(item => item.variation_id !== id));

        setPurchaseVariationIds(purchaseVariationIds.filter( ids => ids !== id ));

    }

    const alternativeScanClick = (id) => {

        dispatch(alternativeScan(id, history));

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
            group: elmt.group,
        }))

    }

    let purchaseVariations = [];

    if(purchaseVariationSaleResponse.purchase_variations){

        let serial = 0;

        let list = purchaseVariationSaleResponse.purchase_variations;

        purchaseVariations = list.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            name: elmt.name,
            sku: elmt.sku,
            imei: elmt.imei,
            group: elmt.group,
            quantity: elmt.quantity_available,
        }))

    }


    let allCustomers = [];
    let allProductModels = [];
    let allProductsSku = [];

    if(dropdownApiResponse.customers){
        allCustomers = dropdownApiResponse.customers.map(item => {
            return {value:item.id, label:`${item.business_name} (${item.first_name} ${item.last_name})`}
        });
    }

    if(dropdownApiResponse.product_models){
        allProductModels = dropdownApiResponse.product_models.map(item => {
            return {value:item.id, label:item.name}
        });
    }

    if(dropdownApiResponse.products){
        allProductsSku = dropdownApiResponse.products.map(item => {
            return {value:item.id, label:`${item.sku} - ${item.name}`}
        });
    }

    let allUserOfficials;

    if(dropdownApiResponse.user_officials_arr){
        allUserOfficials = dropdownApiResponse.user_officials_arr.map(item => {
            return {value: item.id, label: item.first_name + " " + item.last_name}
        });
    }

    
    
    // HANDLE ERRORS
    const { error } = useSelector(state => ({
        error: state.Contact.error,
    }));

    useEffect(() => {
        if(date !== "NaN-NaN-NaN"){

            if(createSaleTransactionError["sale_transaction.transaction_date"]){
             
                createSaleTransactionError["sale_transaction.transaction_date"] = null;
                
            }

            validation.setFieldValue("transaction_date", date);

            const newSaleTransaction =  {...saleTransaction, transaction_date: date }

            setSaleTransaction(newSaleTransaction);

        }else{

            validation.setFieldValue("transaction_date", "");

            const newSaleTransaction =  {...saleTransaction, transaction_date: "" }

            setSaleTransaction(newSaleTransaction);

        }
    }, [date]);

    
    useEffect(() => {

        
        if(selectedCustomer !== null){

            if(createSaleTransactionError["sale_transaction.customer_id"]){
             
                createSaleTransactionError["sale_transaction.customer_id"] = null;
                
            }

            validation.setFieldValue("customer", selectedCustomer.value);
            
            const newSaleTransaction =  {...saleTransaction, customer_id: selectedCustomer.value }

            setSaleTransaction(newSaleTransaction);
            
        }else{

            validation.setFieldValue("customer", "");

            const newSaleTransaction =  {...saleTransaction, customer_id: "" }

            setSaleTransaction(newSaleTransaction);

        }

    }, [selectedCustomer]);


    useEffect(() => {

        setSaleTransaction({...saleTransaction, sale_note: noteValidation.values.sale_note });

    }, [noteValidation.values.sale_note]);

    useEffect(() => {

        setSaleTransaction({...saleTransaction, customer_note: noteValidation.values.customer_note });

    }, [noteValidation.values.customer_note]);


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
    
    // Discount Modal
    
    const [discModal, setDiscModal] = useState(false);
    
    const togDiscModal = () => {
        setDiscModal(!discModal);
    }

    useEffect(()=>{
        
        if(!discModal){
            if(discountValidation.values.discount_amount>0){
                if(discountType === 1){
                    discountValidation.setFieldValue("discount_amount", discount*100);
                }else{
                    discountValidation.setFieldValue("discount_amount", discount);
                }
            }else{
                discountValidation.setFieldValue("discount_amount", "");
            }
        }

    },[discModal]);

    const cancelDiscountModal = () => {

        if(discountType === 1){
            setSelectedDiscountType({ value: '1', label: 'Parcentage' });
        }else{
            setSelectedDiscountType({ value: '0', label: 'Fixed' });
        }

        setDiscModal(!discModal);

    }


    return (
        <React.Fragment>
            <div className="page-content pt-3 pb-0">
                <LoadingBar color='#f11946' ref={ref} />
                <MetaTags>
                    <title>Sale Terminal</title>
                </MetaTags>

                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <div className="text-end mb-4">
                                <Link to="/sale-list" className="btn btn-success btn-label left ms-auto">
                                    <i className="ri-arrow-left-line label-icon align-bottom fs-16 me-2"></i> Sale List
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
                                                            className={`form-control ${( (validation.errors.transaction_date && validation.touched.transaction_date) || createSaleTransactionError["sale_transaction.transaction_date"] ) ? 'border-red' : ''}`}
                                                            name="transaction_date"
                                                            options={{
                                                                dateFormat: "d/m/Y",
                                                                defaultDate:new Date(),
                                                            }}
                                                            onChange={setDate}
                                                        />
                                                        {(validation.touched.transaction_date && validation.errors.transaction_date) || createSaleTransactionError["sale_transaction.transaction_date"] ? (
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
                                                                validation.errors.customer) || createSaleTransactionError["sale_transaction.customer_id"]
                                                                ? customStyles
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.customer && validation.errors.customer) || createSaleTransactionError["sale_transaction.customer_id"] ? (
                                                            <div className="text-danger">
                                                                {validation.errors.customer}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>
                                                </Col>
                                        
                                                <Col md="12">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="iemi">IMEI</Label>
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
                                                                autoComplete="off"
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
                                    
                                
                                    <Card className='mt-3'>
                                        {createSaleTransactionError && createSaleTransactionError.message && 
                                        <div className="alert alert-danger" role="alert">
                                            <strong>{createSaleTransactionError && createSaleTransactionError.message[0]}</strong>
                                        </div>}
                                        <CardBody>                                      
                                            <div className="live-preview">
                                                <div className="table-responsive table-card" style={{ maxHeight: '437px', overflow: 'auto' }}>
                                                    <Table className="align-middle table-nowrap mb-0">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">Product Name</th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col">Price ($)</th>
                                                                <th scope="col">Subtotal ($)</th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        { scannedData.map(elmt => (

                                                            <tr key={elmt.sl}>

                                                                <td>{elmt.name} <br/> SKU {elmt.sku} - {elmt.imei!=="N/A"?"IMEI "+elmt.imei:"Group "+elmt.group}</td>

                                                                <td>
                                                                    <div className="input-step">
                                                                        <button type="button" className="minus" onClick={() => countDown(elmt.sl-1)} > – </button>
                                                                        <Input
                                                                            type="text"
                                                                            className="product-quantity"
                                                                            value={elmt.quantity} name="demo_vertical" 
                                                                            onChange={(e) => initialUpdateQuantity(e.target.value, elmt.sl-1)}
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
                                                                            onChange={e => updatePrice(e.target.value, elmt.sku)}
                                                                        />
                                                                    </div>
                                                                    <p className='text-danger' id={`priceError${elmt.purchase_variation_id}`} style={{ display: "none" }}>{sellingError}</p>
                                                                </td>
                                                                <td>
                                                                    {(elmt.subTotal).toFixed(2)}
                                                                </td>
                                                                <td>
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/gsqxdxog.json"
                                                                        onClick={() => deleteProduct(elmt.variation_id, elmt.sku)}
                                                                        trigger="hover"
                                                                        colors="primary:#e83a30,secondary:#e83a30"
                                                                        stroke="85"
                                                                        scale="40"
                                                                        state="hover-empty"
                                                                        style={{width:'36px', height:'36px', cursor: 'pointer'}}>
                                                                    </lord-icon>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>  
                                    
                                    <div className="div-bottom mt-3" style={{position:'absolute', bottom:'0', marginBottom:'30px', width:'calc(100% - 30px)'}}> 
                                        <Row>
                                            <Col md='12' xxl='2'>
                                                <div className="d-flex">
                                                    <Button className='btn-success me-2 right w-sm' onClick={ () => check()} >Check</Button>
                                                    <Button className='btn-info me-3 right w-sm' onClick={ () => openApprovalForm() } disabled={approval}>Approval</Button>
                                                </div>
                                            </Col>
                                            <Col md='12' xxl='6' className={`approval-box mt-3 mt-xxl-0 ps-xxl-4 ${approvalDisable}`}>
                                                <Form onSubmit={(e) => approvalValidate(e)}>
                                                    <Row>
                                                        <Col md='5'>
                                                            <FormGroup className="mb-3">
                                                                <div>
                                                                <Select
                                                                    value={selectedUserOfficial}
                                                                    onChange={setSelectedUserOfficial}
                                                                    options={allUserOfficials}
                                                                    placeholder="Select Official User"
                                                                />
                                                                </div>
                                                            </FormGroup>
                                                        </Col>

                                                        <Col md='5'>
                                                            <FormGroup className="mb-3">
                                                                <div>
                                                                    <Input
                                                                        id="pin_number"
                                                                        placeholder="Pin Number"
                                                                        type="password"
                                                                        className="form-control"
                                                                        onChange={approvalValidation.handleChange}
                                                                        disabled={userOfficial}
                                                                        invalid={
                                                                            (approvalValidation.touched.pin_number && approvalValidation.errors.pin_number )
                                                                            ? true
                                                                            : false
                                                                        }
                                                                    />
                                                                </div>
                                                                {(approvalValidation.touched.pin_number && approvalValidation.errors.pin_number ) ? (
                                                                    <div className='text-danger'>
                                                                        {approvalValidation.errors.pin_number}
                                                                    </div>
                                                                ) : null}
                                                            </FormGroup>
                                                        </Col>

                                                        <Col md='2'>
                                                            <Button className='btn-soft-info me-3 right w-sm' id='confirm' disabled={confirm} >Confirm</Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>

                                        <Card className='bg-light mt-3' >
                                            <CardBody>                                   
                                                <Row> 
                                                    <Form onSubmit={(e) => noteValidate(e)}>
                                                        <Row>
                                                            <Col md='6' xxl='4'>
                                                                <FormGroup className="mb-3">
                                                                    <div>
                                                                        <Input
                                                                            id="sale_note"
                                                                            placeholder="Sale Note"
                                                                            type="text"
                                                                            className="form-control"
                                                                            onChange={noteValidation.handleChange}
                                                                        />
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>

                                                            <Col md='6' xxl='4'>
                                                                <FormGroup className="mb-3">
                                                                    <div>
                                                                        <Input
                                                                            id="customer_note"
                                                                            placeholder="Customer Note"
                                                                            type="text"
                                                                            className="form-control"
                                                                            onChange={noteValidation.handleChange}
                                                                        />
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Form>

                                                    <Col className='billing d-flex mb-xxl-0 mb-3' style={{ gap: '30px' }} md={12} xxl={8} sm={12} >
                                                        <h5 className="fs-14 mb-0">Total Items: <span className="badge bg-soft-primary text-dark fs-15 ms-1">{totalItems}</span></h5>
                                                        <h5 className="fs-14 mb-0">Total Quantity: <span className="badge bg-soft-primary text-dark fs-15 ms-1">{totalQuantity}</span></h5>
                                                        <h5 className="fs-14 mb-0">Total: $ <span className="badge bg-soft-primary text-dark fs-15 ms-1">{(totalPayable).toFixed(2)}</span></h5>
                                                        <h5 className="fs-14 mb-0">Final: $
                                                            <span className="badge bg-soft-primary text-dark fs-15 ms-1">
                                                                {
                                                                    (discountType === 0) 
                                                                    ?
                                                                    ((totalPayable - discount) >= 0 ) ? (totalPayable - discount).toFixed(2) : (0).toFixed(2)
                                                                    :
                                                                    ( (totalPayable - (totalPayable * discount)) >= 0) ? (totalPayable - (totalPayable * discount)).toFixed(2) : (0).toFixed(2)
                                                                }
                                                            </span>
                                                        </h5>
                                                    </Col>

                                                    <Col md={12} sm={12} xxl={4} className="billing-btns">

                                                        <Button color="light" className='btn-soft-danger me-3 right' onClick={() => togDiscModal()}>Discount</Button>

                                                        <Button color="info" className='btn-info btn-label right me-3' id="PopoverSummary"><i className="ri-file-list-2-line label-icon align-bottom fs-20 ms-2"></i>Summary</Button>

                                                        <UncontrolledPopover placement="top" target="PopoverSummary" >
                                                            <PopoverHeader> Product Summary </PopoverHeader>
                                                            <PopoverBody className='summary-table'> 
                                                                <Table className="align-middle table-nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <td className='fw-semibold'>Product Name</td>
                                                                            <td className='text-end fw-semibold'>Quantity</td>
                                                                            <td className='text-end fw-semibold'>Unit Price</td>
                                                                            <td className='text-end fw-semibold'>Total Price</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {productSummary.map(elmt => (
                                                                            (sumQuantityBySku[elmt.sku] > 0) && 
                                                                            <tr key={elmt.sku}>
                                                                                <td>{elmt.name} <br /> SKU {elmt.sku}</td>
                                                                                <td className='text-end'>{sumQuantityBySku[elmt.sku]}</td>
                                                                                <td className='text-end'>
                                                                                    {
                                                                                        (unitPriceBySku[elmt.sku]).toFixed(2)
                                                                                    }
                                                                                </td>
                                                                                <td className='text-end'>
                                                                                    {
                                                                                        (sumPriceBySku[elmt.sku]).toFixed(2)
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                    {(scannedData.length===0) && 
                                                                    <tfoot>
                                                                        <tr>
                                                                            <td className="text-center" colSpan={4}>Nothing is selected</td>
                                                                        </tr>
                                                                    </tfoot>}
                                                                </Table>
                                                            </PopoverBody>
                                                        </UncontrolledPopover>

                                                        <Button onClick={() => createTransaction()} color="primary" id="submit" type="submit" className='sale-terminal-submit btn btn-primary btn-label right ms-auto float-right' disabled={finalize}>
                                                            <i className="las la-check-circle label-icon align-bottom fs-20 ms-2"></i>Finalize
                                                        </Button>
                                                    </Col>

                                                </Row>
                                            </CardBody>
                                        </Card> 
                                    </div>
                                </CardBody> 
                                
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card style={{ height: '800px' }}>
                                <CardBody>
                                    <Row>
                                        <Col md="12" xl="12" xxl="6">
                                            <FormGroup className="mb-3">

                                                <Label htmlFor="validationSize">Product Models</Label>
                                                <Select
                                                    isClearable={true}
                                                    value={selectedProductModel}
                                                    onChange={setSelectedProductModel}
                                                    options={allProductModels}
                                                    styles={
                                                        (validation.touched.product_models &&
                                                        validation.errors.product_models) 
                                                        ? customStyles
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.product_models && validation.errors.product_models) ? (
                                                    <div className="text-danger">
                                                        {validation.errors.product_models}
                                                    </div>
                                                ) : null}

                                            </FormGroup>
                                        </Col>
                                        <Col md="12" xl="12" xxl="6">
                                            <FormGroup className="mb-3">

                                                <Label htmlFor="validationSize">Product SKU</Label>
                                                <Select
                                                    isClearable={true}
                                                    value={selectedProductSku}
                                                    onChange={setSelectedProductSku}
                                                    options={allProductsSku}
                                                    styles={
                                                        (validation.touched.products &&
                                                        validation.errors.products) 
                                                        ? customStyles
                                                        : false
                                                    }
                                                />
                                                {(validation.touched.products && validation.errors.products) ? (
                                                    <div className="text-danger">
                                                        {validation.errors.products}
                                                    </div>
                                                ) : null}

                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row className='mt-3'>
                                        <div className='list-scroll' style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                            {purchaseVariations.map(item => (
                                                <Col md={12} style={{cursor:'pointer'}} key={item.sl} onClick={() => alternativeScanClick(item.id)}>
                                                    <Card className='bg-light'>

                                                        <CardBody className="d-flex">

                                                            <div className="flex-grow-1 ms-3">
                                                                <h5>{item.sku} - {item.name}</h5>
                                                                <h6 className="text-muted fs-13 mb-0">{item.imei!=="N/A"?"IMEI "+item.imei:"Group "+item.group} - Available Quantity {item.quantity}</h6>
                                                            </div>

                                                        </CardBody>

                                                    </Card>
                                                </Col>
                                            ))}
                                        </div>
                                    </Row>

                                </CardBody> 
                            </Card>
                        </Col>
                    </Row>



                    {/* Purchase Product List Modal */}                           
                    <Modal
                        isOpen={discModal}
                        scrollable={true}
                        toggle={() => {
                            togDiscModal();
                        }}
                        centered
                        className="modal-mg"
                    >

                        <ModalBody className="p-0">
                            <Card className="m-0">
                                <CardHeader>
                                    <h4 className="card-title flex-grow-1">Add Discount</h4>
                                </CardHeader>
                                
                                <CardBody>
                                    <form onSubmit={(e) => discountValidate(e)}>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3">
                                                    <Label>Discount Type:*</Label>                                                   
                                                    <Select
                                                        id='discountType'
                                                        value={selectedDiscountType}
                                                        onChange={setSelectedDiscountType}
                                                        options={discountTypes}
                                                        styles={
                                                            (discountValidation.touched.discountType && discountValidation.errors.discountType)
                                                            ? customStyles
                                                            : false
                                                        }
                                                    />
                                                    {(discountValidation.touched.discountType && discountValidation.errors.discountType) ? (
                                                        <div className="text-danger">
                                                            {discountValidation.errors.discountType}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label>Discount Amount:*</Label>
                                                    <Input
                                                        id="discount_amount"
                                                        placeholder="0.00"
                                                        type="number"
                                                        className="form-control"
                                                        onChange={discountValidation.handleChange}
                                                        value={discountValidation.values.discount_amount}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <div className="w-100 text-end">
                                            <Button id="submit" color="info" type="submit" className='submit-btn w-sm me-3'>
                                                Update
                                            </Button>
                                            <Button color="light" onClick={()=>cancelDiscountModal()} className='submit-btn w-sm'>
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </ModalBody>
                    </Modal>
                    {/* --end-- Purchase Product List Modal */}



                    <ToastContainer />
                </Container>

            </div>
        </React.Fragment>
    );

};

export default SaleTerminal;