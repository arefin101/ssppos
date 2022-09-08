import React, { useState } from 'react';
import { MetaTags } from 'react-meta-tags';
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Spinner, Card, CardBody, CardHeader, Col, Container, Row, Form, FormGroup, FormFeedback, Button, Input, Table } from 'reactstrap';
import { useEffect } from 'react';
import { getSkuTransferViewData, getSkuTransferViewStore, skuTransfer } from "../../store/actions";
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

const SkuTransfer = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const [selectedReference, setSelectedReference] = useState(null);

    const [selectedSku, setSelectedSku] = useState(null);

    const [purchaseVariationIds, setPurchaseVariationIds] = useState([]);

    const [preLoader, setPreLoader] = useState(true);

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    const warningnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-warning text-white' });

    let allReferences =  [];

    let allSku =  [];

    let data = [];

    const { viewData, storeData, skuTransferError } = useSelector(state => ({
        viewData: state.skuTransfer.skuTransferViewData,
        storeData: state.skuTransfer.skuTransferStoreData,
        skuTransferError: state.skuTransfer.skuTransferError?state.skuTransfer.skuTransferError:{},
    }))

    useEffect(()=>{

        if(skuTransferError){
            if(skuTransferError.product_id){
                skuTransferError.product_id = null;
            }
            if(skuTransferError.purchase_variation_ids){
                skuTransferError.purchase_variation_ids = null;
            }
        }

    },[]);
    

    useEffect(()=>{

        if(skuTransferError){
            
            if(
                skuTransferError.product_id || 
                skuTransferError.purchase_variation_ids
            ){

                errornotify("SKU Transfer Failed !");

            }
        }

    },[skuTransferError]);


    if(viewData.purchase_references){
        allReferences = viewData.purchase_references?.map(item => {
            return {value:item.id, label:`${item.reference_no}`}
        });
    }

    if(viewData.products){
        allSku = viewData.products?.map(item => {
            return {value:item.id, label:`${item.sku} - ${item.name}`}
        });
    }

    let serial = 0;

    if(storeData.purchase_variations){

        data = storeData.purchase_variations;

        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            purchase_reference: elmt.purchase_reference,
            name: elmt.name,
            sku: elmt.sku,
            imei: elmt.imei,
        }));
        
    }

    useEffect(()=>{
        dispatch(getSkuTransferViewData(history));
    }, [dispatch]);

    useEffect(() => {

        if(localStorage.getItem('view_store_data')){
            if(preLoader){
                setPreLoader(false);
            }
            localStorage.removeItem('view_store_data')
        }
        
    }, [localStorage.getItem('view_store_data')]);

    useEffect(()=>{

        setPreLoader(true);

        const id = selectedReference?selectedReference.value:null;

        setPurchaseVariationIds([]);

        setSelectedSku(null);

        dispatch(getSkuTransferViewStore(history, id));

    }, [selectedReference]);

    useEffect(()=>{

        const id = selectedSku?selectedSku.value:null;

        validation.setFieldValue("product_id", id);

    }, [selectedSku]);

    useEffect(()=>{

        validation.setFieldValue("purchase_variation_ids", purchaseVariationIds);

    }, [purchaseVariationIds]);

    const check = (e, id) => {
        if(e.target.checked){

            setPurchaseVariationIds([id, ...purchaseVariationIds ]);

        }else{

            const uncheckedIds = purchaseVariationIds.filter(state => state !== id)
            setPurchaseVariationIds(uncheckedIds);
        }
    }


    const validation = useFormik({

        enableReinitialize: true,

        initialValues: {
            product_id: "",
            purchase_variation_ids: [],
        },

        validationSchema: Yup.object({
            product_id: Yup.mixed().required("Please select the SKU !"),
        }),

        onSubmit: (values) => {

            if(values.purchase_variation_ids){
                if(values.purchase_variation_ids.length<1){
                    warningnotify("Please specify the purchase variations !");
                }else{
                    dispatch(skuTransfer(history, values));
                }
            }else{
                errornotify("SKU Transfer Failed !");
            }

        }

    });

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
    

    return ( 
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>SKU Transfer</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1" style={{ padding: "10px 0", }}>SKU Change</h4>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={(e) => validate(e)}>
                                        <Row>
                                            <Col sm={4} xxl={3}>
                                                <div>
                                                    <Select
                                                        isClearable={true}
                                                        value={selectedReference}
                                                        onChange={setSelectedReference}
                                                        options={allReferences}
                                                        placeholder="Select Purchase Reference"
                                                        id="reference"
                                                    ></Select>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Card className="mt-3">
                                        {preLoader?
                                            <div className="spinner-box">
                                                <Spinner color="primary"> Loading... </Spinner> 
                                            </div>:
                                            <CardBody>
                                                <div>
                                                    <div className="live-preview">
                                                        <div className="table-responsive table-card">
                                                            <Table className="align-middle table-nowrap mb-0">
                                                                <thead className="table-light">
                                                                    <tr>
                                                                        <th></th>
                                                                        <th scope="col">#</th>
                                                                        <th scope="col">Purchase Reference</th>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">SKU</th>
                                                                        <th scope="col">IMEI</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>   
                                                                    
                                                                    {
                                                                        data.map(item => (
                                                                            <tr key={item.id}>
                                                                                <td>
                                                                                    <div className="form-check mb-3">
                                                                                        <Input 
                                                                                            className="form-check-input permissions"
                                                                                            type="checkbox" 
                                                                                            id={"checkbox"+ item.id} 
                                                                                            name={"checkbox"+ item.id} 
                                                                                            value={item.id}
                                                                                            onChange={ (e) => check(e, item.id) }
                                                                                        />
                                                                                    </div>
                                                                                </td>
                                                                                <td>{item.sl}</td>
                                                                                <td>{item.purchase_reference}</td>
                                                                                <td>{item.name}</td>
                                                                                <td>{item.sku}</td>
                                                                                <td>{item.imei}</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                    
                                                                </tbody>
                                                                {(data.length===0) && 
                                                                <tfoot>
                                                                    <tr>
                                                                        <td className="text-center" colSpan="6">Nothing is selected</td>
                                                                    </tr>
                                                                </tfoot>}
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        }
                                        </Card>
                                        {data.length > 0 && <Row>
                                            <Col sm={4} xxl={3}>
                                                <div>
                                                    <Select
                                                        isClearable={true}
                                                        value={selectedSku}
                                                        onChange={setSelectedSku}
                                                        options={allSku}
                                                        placeholder="Select SKU"
                                                        id="product_id"
                                                        styles={
                                                            (validation.touched.product_id &&
                                                            validation.errors.product_id) || skuTransferError.product_id
                                                            ? customStyles
                                                            : false
                                                        }
                                                    ></Select>
                                                    {(validation.touched.product_id && validation.errors.product_id) || 
                                                        skuTransferError.product_id ? (
                                                            <div className="text-danger">
                                                                {skuTransferError.product_id ? skuTransferError.product_id : validation.errors.product_id}
                                                            </div>
                                                        ) : null}
                                                </div>
                                            </Col>
                                            <Col>
                                                <Button color="primary" type="submit" className='w-md ms-4'>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>}
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <ToastContainer />

                </Container>
            </div>
        </React.Fragment>
     );
}
 
export default SkuTransfer;