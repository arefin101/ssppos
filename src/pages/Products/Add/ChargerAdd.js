import React, {useRef} from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Row, Label, Input, Form, FormGroup, FormFeedback, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { FormGrid } from '../../Forms/FormLayouts/FormlayoutsCode';
import PreviewCardHeaderMain from '../../../Components/Common/PreviewCardHeaderMain';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createCharger,getProductBrand} from '../../../store/actions';
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
const types = [
    { value: 'Wired', label: 'Wired' },
    { value: 'Wireless', label: 'Wireless' },
];

const ChargerAdd = (props) => {

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedProductModel, setSelectedProductModel] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);

    const dispatch = useDispatch();

    const ref = useRef(null);

    const validation = useFormik({

        enableReinitialize: true,
    
        initialValues: {
            image: "",
            brand_id: "",
            product_model_id: "",
            color: "",
            condition: "",
            wattage: "",
            type: "",
        },

        validationSchema: Yup.object({
            brand_id: Yup.mixed().required("Please select a brand"),
            product_model_id: Yup.mixed().required("Please select a product model"),
            wattage: Yup.string().required("Please enter charger wattage"),
            type: Yup.string().required("Please enter charger type"),
            color: Yup.string().required("Please enter charger color"),
            condition: Yup.string().required("Please select a charger condition"),
            image:Yup.mixed().required("Please upload an image"),
        }),

        onSubmit: (values) => {

            const formData = new FormData();
            let colorCase = values.color.toUpperCase();

            formData.append('brand_id', values.brand_id);
            formData.append('product_model_id', values.product_model_id); 
            formData.append('color', colorCase);
            formData.append('wattage', values.wattage);
            formData.append('type', values.type);
            formData.append('condition', values.condition);
            formData.append('image', values.image);

            document.getElementById("submit").disabled = true;

            ref.current.continuousStart();

            dispatch(createCharger(formData, props.history));

        },

    });

    useEffect(() => {

        if(selectedBrand != null){
            error.brand_id = "";
            validation.setFieldValue("brand_id", selectedBrand.value);
        }else{
            error.brand_id = "Please select a charger model";
            validation.setFieldValue("brand_id", "");
        }

    }, [selectedBrand]);

    useEffect(() => {
        if(selectedProductModel != null){
            error.product_model_id = "";
            validation.setFieldValue("product_model_id", selectedProductModel.value);
        }else{
            error.product_model_id = "Please select a charger model";
            validation.setFieldValue("product_model_id", "");
        }
    }, [selectedProductModel]);

    useEffect(() => {
        if(selectedCondition != null){
            error.condition = "";
            validation.setFieldValue("condition", selectedCondition.label);
        }else{
            error.condition = "Please select a charger condition";
            validation.setFieldValue("condition", "");
        }
    }, [selectedCondition]);

    useEffect(() => {
        if(selectedType != null){
            error.type = "";
            validation.setFieldValue("type", selectedType.value);
        }else{
            error.type = "Please select device type";
            validation.setFieldValue("type", "");
        }
    }, [selectedType]);


    let { error } = useSelector(state => ({
        error: (state.Product.error ? state.Product.error : {})
    }));

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    useEffect(() => {
        
        error.name= "";
        error.brand_id= "";
        error.product_model_id= "";
        error.color= "";
        error.wattage= "";
        error.type= "";
        error.condition= "";
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
                error.wattage ||
                error.type ||
                error.condition ||
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
                    <title>Add  Charger</title>
                </MetaTags>
                <Container fluid>
                    
                    <BreadCrumb title="Add Charger" pageTitle="Products List" link="/product-list"/>
                    {/* <Row>
                        <Col> */}
                            <Card >
                                <PreviewCardHeaderMain title="Add Charger" />
                                <CardBody>
                                    <div className="live-preview">
                                        <Form className="needs-validation" onSubmit={(e) => validate(e)}>
                                            <Row>

                                                <Col md="4">
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

                                                <Col md="4">
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

                                                <Col md="4">
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

                                                <Col md="3">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationStorage">Wattage (W)<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="wattage"
                                                            placeholder="Enter your charger wattage"
                                                            type="number"
                                                            className="form-control"
                                                            id="validationStorage"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.wattage || ""}
                                                            invalid={
                                                                (validation.touched.wattage &&
                                                                validation.errors.wattage) || error.wattage
                                                                ? true
                                                                : false
                                                            }
                                                        />
                                                        {(validation.touched.wattage &&
                                                        validation.errors.wattage) || error.wattage ? (
                                                        <FormFeedback type="invalid">
                                                            {error.wattage ? error.wattage : validation.errors.wattage}
                                                        </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>

                                                <Col md="3">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="validationColor">Color<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Input
                                                            name="color"
                                                            placeholder="Enter your charger color"
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
                                                        <Label htmlFor="validationRam">Type<span className='text-danger' style={{ fontSize:"10px", verticalAlign: "top" }}><i className="mdi mdi-asterisk"></i></span></Label>
                                                        <Select
                                                            isClearable={true}
                                                            value={selectedType}
                                                            onChange={setSelectedType}
                                                            options={types}
                                                            styles={(validation.touched.type && validation.errors.type) || error.type ? customStyles : ""}
                                                        />
                                                        <div className="text-danger">
                                                            { (validation.touched.type && validation.errors.type) || error.type ? "Please select charging type" : ""}
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
                                                            { (validation.touched.condition && validation.errors.condition) || error.condition ? "Please select a charger condition" : ""}
                                                        </div>
                                                    </div>
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

export default ChargerAdd;
