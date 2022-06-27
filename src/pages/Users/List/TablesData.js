import React, { useState , useEffect } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useSelector, useDispatch } from "react-redux";
import { getUsers as userList } from "../../../store/user/action";
import { Spinner, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle,DropdownMenu, DropdownItem, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { hasPermission } from '../../../store/actions';


const TableData = (props) => {

    const dispatch = useDispatch();

    const history = useHistory()

    const [preLoader, setPreLoader] = useState(true);

    let data = [];
    
    const { response , assignRolePermission } = useSelector(state => ({
        response: state.User.users,
        assignRolePermission :state.General.assignRolePermission,
    }));

    useEffect(() => {
        dispatch(hasPermission("user.assign-role" , props.history))
        dispatch(userList(history));
    },[]);

    if(response.users){
        data = response.users;
        if(preLoader){
            setPreLoader(false);
        }
    }

    const assignRole = (url) => {
        history.push(url);
    }
    const userDetails = (url) => {
        history.push(url);
    }

    function rolesConcat(roles) {
        roles = roles.map(item => item.name)
        return roles.join(", ");
    }

    let serial = 0;

    data = data.map(elmt => ( 
        { 
            sl: ++serial, 
            id: elmt.id,  
            username: elmt.username,  
            email: elmt.email ,
            roles: rolesConcat(elmt.roles)
        })
    )


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
                        id:'username',
                        name: 'Username',
                    },
                    {
                        name: 'Email',
                        hidden:true,
                        formatter: (cell) => _(<span>{cell}</span>)
                    },
                    {
                        id:"roles",
                        name:"Roles"
                    },
                    {
                        name: 'Actions',
                        width: '120px',
                        sort: {
                            enabled: false
                        },
                        formatter: (cell, row) => _(
                            <div className="col-auto">
                                <ButtonGroup>
                                    <UncontrolledButtonDropdown id="btnGroupDrop1">
                                        <DropdownToggle color="soft-primary" className="btn-label right" size='sm'>
                                            <i className="ri-arrow-down-s-line label-icon align-middle fs-16 ms-2"></i> Actions
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => userDetails(`/user-details/${row.cells[1].data}`)}><i className='ri-eye-fill eye-icon'></i> View </DropdownItem>
                                            {assignRolePermission == true &&
                                                <DropdownItem onClick={() => assignRole(`/user-list/assign-role/${row.cells[1].data}`)}><i className='ri-check-fill tick-icon'></i>  Assign Role </DropdownItem>
                                            }
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </ButtonGroup>
                            </div>
                        )
                    },
                    ]}
                    search={true}
                    sort={true}
                    pagination={{ enabled: true, limit: 15 }}
                />
            }
        </React.Fragment>
    );
};


export { TableData };
