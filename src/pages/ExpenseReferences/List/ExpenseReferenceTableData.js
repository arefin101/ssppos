import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from 'reactstrap';

// import getexpenserefernce
import { getExpenseReference } from '../../../store/actions';


// Base Example
const ExpenseReferenceTableData = ({history}) => {
    let data =[]
    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    const { expense_references } =  useSelector( state => ({
        expense_references: state.ExpenseReference.expense_references,
    }));
    // console.log(expense_references);
    useEffect(() => {
        
        dispatch(getExpenseReference(history))

    }, []);
    // console.log(expense_categories);
    if(expense_references.expense_references){
        data = expense_references.expense_references

        let serial = 0;

        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            Name: elmt.name,
        }))

        if(preLoader){
            setPreLoader(false);
        }
        
        // console.log(data)
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


export { ExpenseReferenceTableData };
