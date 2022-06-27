import React, { useState, useEffect }  from 'react';
import { Grid, _ } from 'gridjs-react';
import { Modal, ModalBody, Spinner, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { getProducts, hasPermission } from '../../../store/actions';


const ProductTableData = ({history}) => {
    
    let data =[];
    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    const { products, productIndexPermission } =  useSelector( state => ({
        products: state.Product.products,
        productIndexPermission: state.General.productIndexPermission
    }));

    useEffect(() => {
        
        dispatch(getProducts(history))
        dispatch(hasPermission('product.index', history))

    }, []);

    if(products.products){

        data =  products.products;

        let serial = 0;

        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            Name: elmt.name,
            SKU: elmt.sku,
            Brand: elmt.brand,
            Category: elmt.product_category,
            Model: elmt.product_model,
            Image: elmt.image
        }))
        if(preLoader){
            setPreLoader(false);
        }
    }
    
    const [modal_animationZoom, setmodal_animationZoom] = useState(false);
    const [modal_image, setmodal_image] = useState();

    function tog_animationZoom(data) {
        setmodal_animationZoom(!modal_animationZoom);
        setmodal_image(data);
    }

    const viewVariation = (url) => {
        history.push(url);
    }

    return (
      
        <React.Fragment>
            <Modal id="flipModal" className='product-modal' isOpen={modal_animationZoom} toggle={() => { tog_animationZoom(); }} modalClassName="zoomIn" centered >
                <ModalBody>
                    <img className='product-image' src={modal_image} alt="" />
                </ModalBody>
                
            </Modal>

            {
                preLoader ?
                <div className="spinner-box">
                    <Spinner color="primary"> Loading... </Spinner> 
                </div>
                :
                <Grid
                h1
                    data={data}
                    columns={[
                        {
                            id: "sl",
                            name: '#',
                            formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                        },
                        {
                            id:'id',
                            name: 'ID',
                            hidden:true
                        },
                        {
                            id: "Name",
                            name: "Name"
                        },
                        {
                            id: "SKU",
                            name: "SKU"
                        },
                        {
                            id: "Brand",
                            name: "Brand"
                        },
                        {
                            id: "Category",
                            name: "Category"
                        },
                        {
                            id: "Model",
                            name: "Model"
                        },
                        {
                            id:"Image",
                            name: 'Image',
                            sort: {
                                enabled: false
                            },
                            formatter: (cell) => _(<a  onClick={() => tog_animationZoom(cell)}><img  width="50px" src={cell} /> </a>)
                        },
                        {
                            name: 'Actions',
                            hidden: productIndexPermission===true?false:true,
                            width: '120px',
                            formatter: (cell, row) => _(
                                <div className="col-auto">
                                    <ButtonGroup>
                                        <UncontrolledButtonDropdown id="btnGroupDrop1">
                                            <DropdownToggle color="soft-primary" className="btn-label right" size='sm'>
                                                <i className="ri-arrow-down-s-line label-icon align-middle fs-16 ms-2"></i> Actions
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => viewVariation(`/variation-list-by-product/${row.cells[1].data}`)}><i style={{marginRight:'10px', verticalAlign: 'bottom' }} className='ri-eye-fill text-primary'></i> View Variations</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </ButtonGroup>
                                </div>
                            )
                        },
                    ]}
                    search={true}
                    sort={true}
                    pagination={{ enabled: true, limit: 15, }}
                />
            }
        </React.Fragment>
    );
};


export { ProductTableData };
