import React, { useState, useEffect } from 'react';
import { Grid, _ } from 'gridjs-react';
import { Spinner, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { getPurchases} from '../../../store/actions';
import { useHistory } from 'react-router-dom';
import { hasPermission } from './../../../store/general/action';



const PurchaseTableData = (props) => {
    let data =[];
    let serial = 0;
    
    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    const { response, addVariationPermission, purchaseIndexPermission } =  useSelector( state => ({
        response: state.Purchase.purchases,
        addVariationPermission: state.General.addVariationPermission,
        purchaseIndexPermission: state.General.purchaseIndexPermission,
    }));


    const history = useHistory()

    useEffect(() => {
        dispatch(hasPermission("purchase-variation.store", history))
        dispatch(hasPermission("purchase.index", history))
        dispatch(getPurchases(history))
    }, []);


    if(response.purchase_transactions){
        data =  response.purchase_transactions;
        data = data.map(elmt => (
            {
                sl: ++serial,
                id: elmt.id,
                reference_no: elmt.reference_no,
                supplier: elmt.supplier,
                amount: elmt.amount,
                purchase_status: elmt.purchase_status,
                total_items: elmt.total_items,
                payment_status: elmt.payment_status,
                transaction_date: elmt.date,
                finalized_by: elmt.finalized_by
            }
        ))

        if(preLoader){
            setPreLoader(false);
        }

    }

    const addVariations = (url) => {
        history.push(url);
    }

    const seeVariations = (url) => {
        history.push(url);
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
                    // {
                    //     id: "sl",
                    //     name: '#',
                    //     formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                    // },
                    {
                        id:"id",
                        name:"id",
                        hidden: true
                    },
                    {
                        id: "transaction_date",
                        name:"Date",
                    }, 
                    {
                        id: "reference_no",
                        name:"References No",
                    },
                    {
                        id: "supplier",
                        name: "Supplier"
                    },
                    {
                        id: "purchase_status",
                        name:"Purchase Status",
                    }, 
                    {
                        id: "total_items",
                        name:"Total Items",
                    }, 
                    {
                        id: "payment_status",
                        name:"Payment Status",
                    },  
                    {
                        id: "amount",
                        name:"Amount ($)",
                    }, 
                    {
                        id: "finalized_by",
                        name:"Finalized By",
                    },
                    {
                        name: 'Actions',
                        width: '120px',
                        sort: {
                            enabled: false
                        },
                        hidden: (!purchaseIndexPermission && !addVariationPermission)?true:false,
                        formatter: (cell, row) => _(
                            <div className="col-auto">
                               {row.cells[2].data !== "super_admin" &&
                               <ButtonGroup vertical>
   
                                   <UncontrolledButtonDropdown id="btnGroupVerticalDrop1">
                                       <DropdownToggle color="soft-primary" className="btn-label right" size='sm'>
                                           <i className="ri-arrow-down-s-line label-icon align-middle fs-16 ms-2"></i> Actions
                                       </DropdownToggle>
                                       <DropdownMenu>
                                           { addVariationPermission == true &&
                                               <DropdownItem onClick={() => addVariations(`/variation-store/${row.cells[0].data}`)}><i className=" ri-add-circle-line text-success" style={{ marginRight: '5px', verticalAlign: 'bottom' }}></i> Add Variations </DropdownItem>
                                           }
                                           { purchaseIndexPermission == true &&
                                               <DropdownItem onClick={() => seeVariations(`/variation-list/${row.cells[0].data}`)}><i className='ri-eye-fill eye-icon' style={{ marginRight: '5px', verticalAlign: 'bottom' }}></i> View Variations </DropdownItem>
                                           }
                                       </DropdownMenu>
                                   </UncontrolledButtonDropdown>
   
                               </ButtonGroup>}
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


export { PurchaseTableData };
