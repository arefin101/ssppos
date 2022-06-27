import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
import { Spinner } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { getProductCategoryList } from '../../../store/actions';


const ProductCategoryTableData = ({history}) => {

    let data =[];    
    
    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.productCategories.product_categories
    }));

    useEffect(() => {
        
        dispatch(getProductCategoryList(history))

    }, []);

    if(response.product_categories){

        data = response.product_categories;

        let serial = 0;

        data = data.map(elmt => (
        {
            sl: ++serial,
            ID: elmt.id,
            Name: elmt.name,
            Type: elmt.type
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
                            id:"sl",
                            name: '#',
                            formatter: (cell) => _(<span className="fw-semibold">{cell}</span>)
                        },
                        {
                            id: "Name",
                            name: "Name"
                        },
                        {
                            id: "Type",
                            name: "Type"
                        }
                    ]}

                    search={true}
                    sort={true}
                    pagination={{ enabled: true, limit: 15, }}
                />
            }
        </React.Fragment>
    );
};


export { ProductCategoryTableData };
