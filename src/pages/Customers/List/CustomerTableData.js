import React from 'react';
import { Grid, _ } from 'gridjs-react';
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle,DropdownMenu, DropdownItem } from 'reactstrap';
import { getCustomers } from '../../../store/actions';


const CustomerTableData = ({history}) => {

    const [preLoader, setPreLoader] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( getCustomers(history) );
    }, []);
    
    const { response } =  useSelector( state => ({
        response: state.Contact.customers
    }));
    

    let data =[];
    let serial = 0;

    if(response.users){
        data = response.users;

        data = data.map(elmt => ({
            sl: ++serial,
            id: elmt.id,
            FirstName: elmt.first_name,
            LastName: elmt.last_name, 
            username: elmt.username, 
            email: elmt.email
        }))

        if(preLoader){
            setPreLoader(false);
        }
    }

    const customerDetails = (url) => {
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
                        id:"FirstName",
                        name: "First Name"
                    },
                    {
                        id:"LastName",
                        name:"Last Name"
                    },
                    {
                        id:"username",
                        name:"Username"
                    },
                    {
                        name: 'Email',
                        formatter: (cell) => _(<span>{cell}</span>)
                    },
                    {
                        name: 'Actions',
                        width: '120px',
                        formatter: (cell, row) => _(
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


export { CustomerTableData };
