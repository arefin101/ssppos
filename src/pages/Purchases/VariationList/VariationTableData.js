import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner} from 'reactstrap';
import { getPurchaseVariationsById } from '../../../store/actions';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const VariationTableData = (props) => {
    
    let data =[]

    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    let { response, error } =  useSelector( state => ({
        response: state.PurchaseVariations.purchaseVariationsById,
        error: state.PurchaseVariations.error,
    }));

    const errornotify = (message) => toast(message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });

    let flag = true;

    if(Object.keys(error).length !== 0 && flag){
        errornotify(error);
        flag = false;
    }
    
    const id = props.match.params.id;
    const history = useHistory();

    useEffect(() => {
        
        dispatch(getPurchaseVariationsById(id, history))

    }, []);

    if(localStorage.getItem('variationsById')) {
        if(preLoader){
            setPreLoader(false);
        }
    }

    if(response.purchase_variations){

        data = response.purchase_variations;
        let serial = 0;

        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            purchase_reference: elmt.purchase_reference,
            name: elmt.name,
            sku: elmt.sku,
            imei: elmt.imei,
            quantityPurchased: elmt.quantity_purchased,
            quantityAvailable: elmt.quantity_available,
            quantitySold: elmt.quantity_sold,
            purchasePrice: elmt.purchase_price, 
            riskFund: elmt.risk_fund*100+'%',
        }))

    }


    return (
        <React.Fragment>
            {
                preLoader ?
                <div className="spinner-box">
                    <Spinner color="primary"> Loading... </Spinner> 
                </div>
                :
                <Grid
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
                        id:"purchase_reference",
                        name: "Purchase Reference"
                    },
                    {
                        id:"name",
                        name: "Product Name"
                    },
                    {
                        id:"sku",
                        name:"SKU"
                    },
                    {
                        id:"imei",
                        name:"IMEI"
                    },
                    {
                        id:"quantityPurchased",
                        name:"Quantity Purchased"
                    },
                    {
                        id:"quantityAvailable",
                        name:"Quantity Available"
                    },
                    {
                        id:"quantitySold",
                        name:"Quantity Sold"
                    },
                    {
                        id:"purchasePrice",
                        name:"Purchase Price ($)"
                    },
                    {
                        id:"riskFund",
                        name:"Risk Fund"
                    },
                    // {
                    //     name: 'Actions',
                    //     width: '120px',
                    //     formatter: (cell, row) => _(
                    //         <div className="col-auto">
                    //             <ButtonGroup>
                    //                 <UncontrolledButtonDropdown id="btnGroupDrop1">
                    //                     <DropdownToggle color="soft-primary" className="btn-label right" size='sm'>
                    //                         <i className="ri-arrow-down-s-line label-icon align-middle fs-16 ms-2"></i> Actions
                    //                     </DropdownToggle>
                    //                     <DropdownMenu>
                    //                         <DropdownItem onClick={() => customerDetails(`/customer-details/${row.cells[1].data}`)}><i style={{marginRight:'10px', verticalAlign: 'bottom' }} className='ri-eye-fill text-primary'></i> View </DropdownItem>
                    //                     </DropdownMenu>
                    //                 </UncontrolledButtonDropdown>
                    //             </ButtonGroup>
                    //         </div>
                    //     )
                    // },
                ]}
                search={true}
                sort={true}
                pagination={{ enabled: true, limit: 15, }}
            />
            }

            <ToastContainer />
            
        </React.Fragment>
    );
};


export { VariationTableData };
