import React, {useRef} from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import PreviewCardHeaderMain from '../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createPhone, getProductBrand } from '../../../store/actions';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import LoadingBar from 'react-top-loading-bar'


const conditions = [
    { value: '5', label: 'New' },
    { value: '1', label: 'A' },
    { value: '2', label: 'A-' },
    { value: '3', label: 'B' },
    { value: '4', label: 'C' },
];
const ram = [
    { value: '1', label: '1 GB' },
    { value: '2', label: '2 GB' },
    { value: '3', label: '3 GB' },
    { value: '4', label: '4 GB' },
    { value: '6', label: '6 GB' },
    { value: '8', label: '8 GB' },
    { value: '10', label: '10 GB' },
    { value: '12', label: '12 GB' },
    { value: '16', label: '16 GB' },
    { value: '32', label: '32 GB' },
    { value: '64', label: '64 GB' },
];

const deviceStorage = [
    { value: '16', label: '16 GB' },
    { value: '32', label: '32 GB' },
    { value: '64', label: '64 GB' },
    { value: '128', label: '128 GB' },
    { value: '256', label: '256 GB' },
    { value: '512', label: '512 GB' },
    { value: '1', label: '1 TB' },
    { value: '2', label: '2 TB' },
    { value: '4', label: '4 TB' },
];

const UserList = (props) => {

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedProductModel, setSelectedProductModel] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedRam, setSelectedRam] = useState(null);

    const phoneProduct = localStorage.getItem('phoneProduct')

    const ref = useRef(null);

    const dispatch = useDispatch();

    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
            image: "",
            brand_id: "",
            product_model_id: "",
            storage: "",
            color: "",
            ram: "",
            condition: "",
            size: "",
        },

        validationSchema: Yup.object({
            brand_id: Yup.mixed().required("Please select a brand"),
            product_model_id: Yup.mixed().required("Please select a product model"),
            storage: Yup.string().required("Please enter phone storage"),
            color: Yup.string().required("Please enter phone color"),
            ram: Yup.string().required("Please enter phone ram"),
            size: Yup.string().required("Please enter phone size"),
            condition: Yup.string().required("Please select a phone condition"),
            image:Yup.mixed().required("Please upload an image"),
        }),

        onSubmit: (values) => {

            const formData = new FormData();
            
            let colorCase = values.color.toUpperCase();

            formData.append('brand_id', values.brand_id);
            formData.append('product_model_id', values.product_model_id); 
            formData.append('color', colorCase);
            formData.append('ram', values.ram);
            formData.append('storage', values.storage);
            formData.append('condition', values.condition);
            formData.append('size', values.size);
            formData.append('image', values.image);

            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();

            dispatch(createPhone(formData, props.history));

        },

    });

    useEffect(() => {

        if(selectedBrand != null){
            error.brand_id = "";
            validation.setFieldValue("brand_id", selectedBrand.value);
        }else{
            error.brand_id = "Please select a phone model";
            validation.setFieldValue("brand_id", "");
        }

    }, [selectedBrand]);

    useEffect(() => {
        if(selectedProductModel != null){
            error.product_model_id = "";
            validation.setFieldValue("product_model_id", selectedProductModel.value);
        }else{
            error.product_model_id = "Please select a phone model";
            validation.setFieldValue("product_model_id", "");
        }
    }, [selectedProductModel]);

    useEffect(() => {
        if(selectedRam != null){
            error.ram = "";
            validation.setFieldValue("ram", selectedRam.value);
        }else{
            error.ram = "Please select device ram";
            validation.setFieldValue("ram", "");
        }
    }, [selectedRam]);

    useEffect(() => {
        if(selectedStorage != null){
            error.storage = "";
            validation.setFieldValue("storage", selectedStorage.value);
        }else{
            error.storage = "Please select device storage";
            validation.setFieldValue("storage", "");
        }
    }, [selectedStorage]);

    useEffect(() => {
        if(selectedCondition != null){
            error.condition = "";
            validation.setFieldValue("condition", selectedCondition.label);
        }else{
            error.condition = "Please select phone condition";
            validation.setFieldValue("condition", "");
        }
    }, [selectedCondition]);


    let { error } = useSelector(state => ({
        error: (state.Product.errorPhone ? state.Product.errorPhone : {}),
    }));

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    useEffect(() => {
        
        error.name= "";
        error.brand_id= "";
        error.product_model_id= "";
        error.color= "";
        error.ram= "";
        error.storage= "";
        error.condition= "";
        error.size= "";
        error.image= "";

    }, []);

    let data = [];
    let brands = [];
    let productModels= []

    const { productDropDown } =  useSelector( state => ({
        productDropDown: state.Product.productBrandsSelect
    }));

    if(productDropDown){

        data =  productDropDown;

        brands = data.brands?.map(item => {
            return {value:item.id, label:item.name}
            }
        );

        productModels = data.product_models?.map(item => {
            return {value:item.id, label:item.name}
            }
        );
       
    }

    useEffect(() => {  
        dispatch(getProductBrand())
    }, []);

    useEffect(() => {

        if(error){

            if( 
                error.name ||
                error.brand_id ||
                error.product_model_id ||
                error.color ||
                error.ram ||
                error.storage ||
                error.condition ||
                error.size ||
                error.image
            ){
                ref.current.complete();
                document.getElementById("submit").disabled = false;
                errornotify("Product Creation Failed !")
            }
        }

    }, [error]);

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
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <MetaTags>
                    <title>Add Phone</title>
                </MetaTags>
                <Container fluid>
                    
                    <BreadCrumb title="Add Phone" pageTitle="Products" link="/product-list"/>
                            <Card >
                                <PreviewCardHeaderMain title="Add Phone" />
                                <CardBody>
                                    <div className="live-preview">
                                        <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                            <Row>

                                                <Col md="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationImage">Image<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="image"
                                                            placeholder="Upload Image"
                                                            type="file"
                                                            className="form-control"
                                                            id="validationImage"
                                                            aria-label="file example"
                                                            onChange={(e)=> validation.setFieldValue('image', e.target.files[0])}
                                                            onBlur={validation.handleBlur}
                                                            
                                                            invalid={
                                                                (validation.touched.image &&
                                                                validation.errors.image) || error.image
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        <div className="invalid-feedback">
                                                            {error.image ? error.image : validation.errors.image}
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="validationBrand">Brand<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedBrand}
                                                            onChange={setSelectedBrand}
                                                            options={brands}
                                                            styles={
                                                                (validation.touched.brand_id &&
                                                                validation.errors.brand_id) || error.brand_id
                                                                ? customStyles
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.brand_id &&
                                                        validation.errors.brand_id) || error.brand_id ? (
                                                            <div className="text-danger">
                                                                {error.brand_id ? error.brand_id : validation.errors.brand_id}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label htmlFor="validationProductModel">Product Model<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedProductModel}
                                                            onChange={setSelectedProductModel}
                                                            options={productModels}
                                                            styles={
                                                                (validation.touched.product_model_id &&
                                                                validation.errors.product_model_id) || error.product_model_id
                                                                ? customStyles
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.product_model_id &&
                                                        validation.errors.product_model_id) || error.product_model_id ? (
                                                            <div className="text-danger">
                                                                {error.product_model_id ? error.product_model_id : validation.errors.product_model_id}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col md="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationStorage">Storage (GB)<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedStorage}
                                                            onChange={setSelectedStorage}
                                                            options={deviceStorage}
                                                            styles={(validation.touched.storage && validation.errors.storage) || error.storage ? customStyles : ""}
                                                        />
                                                        <div className="text-danger">
                                                            { (validation.touched.storage && validation.errors.storage) || error.storage ? "Please select a device storage" : ""}
                                                        </div>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="3">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationColor">Color<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="color"
                                                            placeholder="Enter your phone color"
                                                            type="text"
                                                            className="form-control"
                                                            id="validationColor"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.color || ""}
                                                            invalid={
                                                                (validation.touched.color &&
                                                                validation.errors.color) || error.color
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.color &&
                                                        validation.errors.color) || error.color ? (
                                                        <FormFeedback type="invalid">
                                                            {error.color ? error.color : validation.errors.color}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>

                                                <Col md="3">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationRam">Ram (GB)<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedRam}
                                                            onChange={setSelectedRam}
                                                            options={ram}
                                                            styles={(validation.touched.ram && validation.errors.ram) || error.ram ? customStyles : ""}
                                                        />
                                                        <div className="text-danger">
                                                            { (validation.touched.ram && validation.errors.ram) || error.ram ? "Please select device rammm" : ""}
                                                        </div>                                             
            
                                                    </FormGroup>
                                                </Col>

                                                <Col md="3">
                                                    <div className="mb-3">
                                                        <Label htmlFor="validationCondition">Condition<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>                                                   
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedCondition}
                                                            onChange={setSelectedCondition}
                                                            options={conditions}
                                                            styles={(validation.touched.condition && validation.errors.condition) || error.condition ? customStyles : ""}
                                                        />
                                                        <div className="text-danger">
                                                            { (validation.touched.condition && validation.errors.condition) || error.condition ? "Please select a phone condition" : ""}
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col md="3">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationSize">Size (Inch)<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="size"
                                                            placeholder="Enter your phone size"
                                                            type="number"
                                                            className="form-control"
                                                            id="validationSize"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.size || ""}
                                                            invalid={
                                                                (validation.touched.size &&
                                                                validation.errors.size) || error.size
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.size &&
                                                        validation.errors.size) || error.size ? (
                                                        <FormFeedback type="invalid">
                                                            {error.size ? error.size : validation.errors.size}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Button id="submit" color="primary" type="submit" className='submit-btn w-md'>
                                                Submit
                                            </Button>
                                        </Form>
                                    </div>
                                    <div className="d-none code-view">
                                        <pre className="language-markup" style={{ "height": "375px" }}>
                                            <code>
                                                <FormGrid />
                                            </code>
                                        </pre>
                                    </div>
                                </CardBody>
                            </Card>
                    
                    <ToastContainer />

                </Container>
            </div>
        </React.Fragment>
    );
};

export default UserList;
