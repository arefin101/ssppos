import React, {useEffect} from 'react';
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ProductTableData } from './ProductTableData';
import { ToastContainer  , toast} from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hasPermission } from './../../../store/general/action';

const ProductList = (props) => {
    
    const [phoneCreatePermissonBtn , setPhoneCreatePermissonBtn] = useState(false);
    const [chargerCreatePermissonBtn , setChargerCreatePermissonBtn] = useState(false);
    const phoneProduct = localStorage.getItem('phoneProduct')
    const chargerProduct = localStorage.getItem('chargerProduct')

    const dispatch = useDispatch();
   
    const successnotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    const chargersuccessnotify = () => toast("Product Added Successfully !", { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });
    
    useEffect(() => {
        if(phoneProduct) {
            successnotify("Product Added Successfully !");
            localStorage.removeItem('phoneProduct');
        }
    }, []);
  

    useEffect(() => {
        if(chargerProduct) {
            chargersuccessnotify();
            localStorage.removeItem('chargerProduct')
        }
    }, []);

    const { phoneCreatePermission } =useSelector( state => ({
        phoneCreatePermission: state.General.phoneCreatePermission,
    }));

    const { chargerCreatePermission } =useSelector( state => ({
        chargerCreatePermission: state.General.chargerCreatePermission,
    }));

    useEffect(()=>{

        if(phoneCreatePermission){
            setPhoneCreatePermissonBtn(phoneCreatePermission)
        }

    },[phoneCreatePermission])

    useEffect(()=>{

        if(chargerCreatePermission){
            setChargerCreatePermissonBtn(chargerCreatePermission)
        }

    },[chargerCreatePermission])

    useEffect(()=>{
        dispatch(hasPermission("product.store-phone" , props.history));
        dispatch(hasPermission("product.store-charger", props.history));
        localStorage.removeItem('variationsByProduct');
    },[])

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Products</title>
                </MetaTags>
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className='d-flex'>
                                    <h4 className="card-title mb-0 flex-grow-1">Products</h4>

                                    <ButtonGroup vertical>

                                        <br></br>

                                        {(phoneCreatePermissonBtn==true || chargerCreatePermissonBtn==true) && <UncontrolledButtonDropdown id="btnGroupVerticalDrop1">

                                            <DropdownToggle color="success" className="bg-succes" style={{ borderTopRightRadius: "3px", borderBottomRightRadius: "3px", padding: "4px 12px" }}> 
                                                Add <i className="ri-add-line label-icon align-middle fs-16 ms-2"></i> 
                                            </DropdownToggle>

                                            <DropdownMenu style={{ padding:"0" }}>
                                                { phoneCreatePermissonBtn==true && <DropdownItem>
                                                    <Link to='/phone-add'>
                                                        <p className='text-success' style={{ marginBottom: "0", padding: "4px 0" }}><i className="ri-add-line align-bottom me-1"></i>Add Phone</p>
                                                    </Link>
                                                </DropdownItem>}
                                                { chargerCreatePermissonBtn==true && <DropdownItem>
                                                    <Link to='/charger-add'>
                                                        <p className='text-success' style={{ marginBottom: "0", padding: "4px 0" }}><i className="ri-add-line align-bottom me-1"></i>Add Charger</p>
                                                    </Link>
                                                </DropdownItem>}
                                            </DropdownMenu>

                                        </UncontrolledButtonDropdown>}
                                    </ButtonGroup>

                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                    
                                        <ProductTableData history={props.history}/>
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

export default ProductList;