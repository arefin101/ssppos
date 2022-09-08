import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from 'reactstrap';
import { getExpenseReference } from '../../../store/actions';


const ExpenseReferenceTableData = ({history}) => {
    let data =[]
    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    const { expense_references } =  useSelector( state => ({
        expense_references: state.ExpenseReference.expense_references,
    }));

    useEffect(() => {
        
        dispatch(getExpenseReference(history))

    }, []);

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
