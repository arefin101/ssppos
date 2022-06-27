import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner} from 'reactstrap';
import { getAveragePurchasePrices } from '../../store/actions';


const AveragePurchasePriceTableData = ({history}) => {

    let data =[];
    let serial = 0;

    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    const { averagePurchasePrice } =  useSelector( state => ({
        averagePurchasePrice: state.AveragePurchasePrice.averagePurchasePrices,
    }));

    useEffect(() => {
        
        dispatch(getAveragePurchasePrices(history))

    }, []);

    if(averagePurchasePrice.average_purchase_prices){
        data = averagePurchasePrice.average_purchase_prices;

        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            name: elmt.name,
            sku: elmt.sku,
            quantityAvailable: elmt.quantity_available,
            averagePurchasePrice: elmt.average_purchase_price,

        }))

        if(preLoader){
            setPreLoader(false);
        }
        
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
                            id:"name",
                            name: "Product Name"
                        },
                        {
                            id:"sku",
                            name:"SKU"
                        },
                        {
                            id:"quantityAvailable",
                            name:"Quantity Available"
                        },
                        {
                            id:"averagePurchasePrice",
                            name:"Average Purchase Price ($)"
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


export { AveragePurchasePriceTableData };
