import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ButtonGroup, UncontrolledButtonDropdown, DropdownToggle,DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import { getProductModels } from '../../../store/actions';
import {Link, BrowserRouter} from 'react-router-dom';


const ProductModelTableData = ({history}) => {
    let data =[];
    const [preLoader, setPreLoader] = useState(true);
    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.productModels.productModels,
    }));

    useEffect(() => {
        dispatch(getProductModels(history))
    }, []);

    if(response.product_models){
        data =  response.product_models;

        let serial = 0;

        data = data.map(elmt => (
        {
            sl: ++serial,
            Name: elmt.name
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
                            id:"Name",
                            name: "Name"
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


export { ProductModelTableData };
