import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from 'reactstrap';
import { getExpenseList } from '../../../store/actions';


const ExpenseListTableData = ({history}) => {
    let data =[]
    const [preLoader, setPreLoader] = useState(true);

    const dispatch = useDispatch();
    
    const { response } =  useSelector( state => ({
        response: state.ExpenseList.expense_transactions,
    }));
    
    useEffect(() => {
        dispatch( getExpenseList(history) );
    }, []);
    
    if(response.expense_transactions){
        data = response.expense_transactions;

        let serial = 0;

        data = data.map(elmt => (
        {
            sl: ++serial,
            Date: elmt.date,
            Reference: elmt.reference,
            Category: elmt.category,
            Amount: elmt.amount,
            PaymentStatus: elmt.payment_status,
            ExpenseFor: elmt.expense_for ? elmt.expense_for: "N/A",
            ExpenseNote: elmt.expense_note,
            FinalizedBy: elmt.finalized_by,
        }));

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
                    id:"Date",
                    name: "Date"
                }, 
                {
                    id:"Reference",
                    name: "Reference"
                },
                {
                    id:"Category",
                    name: "Category"
                },
                {
                    id:"Amount",
                    name: "Amount ($)"
                },
                {
                    id:"PaymentStatus",
                    name: "Payment Status"
                },
                {
                    id:"ExpenseFor",
                    name: "Expense For"
                },
                {
                    id:"ExpenseNote",
                    name: "Expense Note"
                },
                {
                    id:"FinalizedBy",
                    name: "Finalized By"
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


export { ExpenseListTableData };
