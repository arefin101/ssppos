import React, { useState, useEffect } from 'react';
import { Grid, _ } from 'gridjs-react';
import { Spinner, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { getRoles, hasPermission } from '../../../store/actions';


const RoleTableData = ({history}) => {

    let data =[];
    let serial = 0;
    
    const [preLoader, setPreLoader] = useState(true);
    const [permissionsUpdatePermissionbtn , setPermissionsUpdatePermissionBtn] = useState(false);
    const dispatch = useDispatch();
    
    const { response, permissionsUpdatePermission } =  useSelector( state => ({
        response: state.Role.roles,
        permissionsUpdatePermission :state.General.permissionsUpdatePermission,
    }));
    
    useEffect(() => {
        dispatch(hasPermission("role.assign-permission" ,history))
        dispatch(getRoles(history))

    }, []);

    useEffect(()=>{

        if(permissionsUpdatePermission){
            setPermissionsUpdatePermissionBtn(permissionsUpdatePermission)
        }

    },[permissionsUpdatePermission])

    if(response.roles){
        data =  response.roles;

        data = data.map(elmt => (
        {
            sl: ++serial,
            id: elmt.id,
            name: elmt.name,
            description: elmt.description, 
            
        }))

        if(preLoader){
            setPreLoader(false);
        }
    }

    const click = (url) => {
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
                        id:"id",
                        name:"id",
                        hidden: true
                    },
                    {
                        id: "name",
                        name:"Name",
                    },
                    {
                        id: "description",
                        name:"Description",
                    },
                    {
                        name: 'Actions',
                        width: '120px',
                        sort: {
                            enabled: false
                        },
                        formatter: (cell, row) => _(
                            <div className="col-auto">
                                {row.cells[2].data !== "super_admin" &&
                                <ButtonGroup vertical>
                                    <UncontrolledButtonDropdown id="btnGroupVerticalDrop1">
                                        <DropdownToggle color="soft-primary" className="btn-label right" size='sm'>
                                            <i className="ri-arrow-down-s-line label-icon align-middle fs-16 ms-2"></i> Actions
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            { permissionsUpdatePermissionbtn == true &&
                                                <DropdownItem onClick={() => click(`/role/assign-permission/${row.cells[1].data}`)}><i className='ri-check-fill tick-icon'></i>  Assign Permission </DropdownItem>
                                            }
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </ButtonGroup>
                                }
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


export { RoleTableData };
