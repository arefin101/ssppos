import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner} from 'reactstrap';
import { getPurchaseVariations } from '../../../store/actions';

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";


const PurchaseVariationTableData = ({history}) => {
    let data =[];
    let serial = 0;

    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.PurchaseVariations.purchaseVariations,
    }));

    useEffect(() => {
        dispatch(getPurchaseVariations(history))
    }, []);

    if(response.purchase_variations){
        data = response.purchase_variations;

        // data = data.map(elmt => (
        // {
        //     sl: ++serial,
        //     id: elmt.id,
        //     purchase_reference: elmt.purchase_reference,
        //     name: elmt.name,
        //     sku: elmt.sku,
        //     imei: elmt.imei,
        //     quantityPurchased: elmt.quantity_purchased,
        //     quantityAvailable: elmt.quantity_available,
        //     quantitySold: elmt.quantity_sold,
        //     purchasePrice: elmt.purchase_price, 
        //     riskFund: elmt.risk_fund*100+'%',
        // }))

        if(preLoader){
            setPreLoader(false);
        }
    }

    useEffect(() => {
        $('#data_table').DataTable({
            destroy: true,
            responsive: true,
            dom:  "<'row'<'col-sm-5'l><'col-sm-7 d-flex justify-content-end'fB>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7 d-flex justify-content-end'p>>",
            buttons: [
                { extend: 'csv', className: 'btn btn-info btn-sm' },
                { extend: 'print', className: 'btn btn-primary btn-sm' },
            ],
            aLengthMenu: [
                [10, 25, 50, 100, 200, -1],
                [10, 25, 50, 100, 200, "All"]
            ],
        });
    }, [response]);


    return (
        <React.Fragment>
            {
                preLoader ?
                <div className="spinner-box">
                    <Spinner color="primary"> Loading... </Spinner> 
                </div>
                :
                <table id="data_table" className="display">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Purchase Reference</th>
                            <th>Product Name</th>
                            <th>SKU</th>
                            <th>IMEI</th>
                            <th>Quantity Purchased</th>
                            <th>Quantity Available</th>
                            <th>Quantity Sold</th>
                            <th>Purchase Price ($)</th>
                            <th>Risk Fund</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{++serial}</td>
                                        <td>{item.purchase_reference}</td>
                                        <td>{item.name}</td>
                                        <td>{item.sku}</td>
                                        <td>{item.imei}</td>
                                        <td>{item.quantity_purchased}</td>
                                        <td>{item.quantity_available}</td>
                                        <td>{item.quantity_sold}</td>
                                        <td>{item.purchase_price}</td>
                                        <td>{item.risk_fund*100+'%'}</td>
                                        {/* <td>
                                            <div className="col-auto">
                                                <ButtonGroup>
                                                    <UncontrolledButtonDropdown id="btnGroupDrop1">
                                                        <DropdownToggle color="soft-primary" className="btn-label right" size='sm'>
                                                            <i className="ri-arrow-down-s-line label-icon align-middle fs-16 ms-2"></i> Actions
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem onClick={() => customerDetails(`/customer-details/${row.cells[1].data}`)}><i style={{marginRight:'10px', verticalAlign: 'bottom' }} className='ri-eye-fill text-primary'></i> View </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledButtonDropdown>
                                                </ButtonGroup>
                                            </div>
                                        </td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                // <Grid
                //     data={data}
                //     columns={[
                //         {
                //             id: "sl",
                //             name: '#',
                //             formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                //         },
                //         {
                //             id:'id',
                //             name: 'ID',
                //             hidden:true
                //         },
                //         {
                //             id:"purchase_reference",
                //             name: "Purchase Reference"
                //         },
                //         {
                //             id:"name",
                //             name: "Product Name"
                //         },
                //         {
                //             id:"sku",
                //             name:"SKU"
                //         },
                //         {
                //             id:"imei",
                //             name:"IMEI"
                //         },
                //         {
                //             id:"quantityPurchased",
                //             name:"Quantity Purchased"
                //         },
                //         {
                //             id:"quantityAvailable",
                //             name:"Quantity Available"
                //         },
                //         {
                //             id:"quantitySold",
                //             name:"Quantity Sold"
                //         },
                //         {
                //             id:"purchasePrice",
                //             name:"Purchase Price ($)"
                //         },
                //         {
                //             id:"riskFund",
                //             name:"Risk Fund"
                //         },
                //         // {
                //         //     name: 'Actions',
                //         //     width: '120px',
                //         //     formatter: (cell, row) => _(
                //         //         <div className="col-auto">
                //         //             <ButtonGroup>
                //         //                 <UncontrolledButtonDropdown id="btnGroupDrop1">
                //         //                     <DropdownToggle color="soft-primary" className="btn-label right" size='sm'>
                //         //                         <i className="ri-arrow-down-s-line label-icon align-middle fs-16 ms-2"></i> Actions
                //         //                     </DropdownToggle>
                //         //                     <DropdownMenu>
                //         //                         <DropdownItem onClick={() => customerDetails(`/customer-details/${row.cells[1].data}`)}><i style={{marginRight:'10px', verticalAlign: 'bottom' }} className='ri-eye-fill text-primary'></i> View </DropdownItem>
                //         //                     </DropdownMenu>
                //         //                 </UncontrolledButtonDropdown>
                //         //             </ButtonGroup>
                //         //         </div>
                //         //     )
                //         // },
                //     ]}
                //     search={true}
                //     sort={true}
                //     pagination={{ enabled: true, limit: 15, }}
                // />
            }
            
        </React.Fragment>
    );
};


export { PurchaseVariationTableData };
