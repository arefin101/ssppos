import React, {useEffect, useState, useRef} from 'react';
import {  Input, Label, Table, Button, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPermission } from '../../../store/actions';
import { assignPermissions } from '../../../store/role/action';
import LoadingBar from 'react-top-loading-bar';


const PermissionTable = ({ id : roleId ,history}) => {
    const ref = useRef(null);

    const [allPermissions,setAllPermissions] = useState({}) ;
    const [rolePermissions,setRolePermissions] = useState([]) ;
    const [roleName,setRoleName] = useState({}) ;
    const [preLoader, setPreLoader] = useState(true);
    const dispatch = useDispatch();
    
    const { role_name,all_permissions, role_permissions } =  useSelector( state => ({
        role_name: state.Role.response.role_name,
        all_permissions: state.Role.response.all_permissions,
        role_permissions: state.Role.response.role_permissions
    }));

    let rolePer = [];

    useEffect(()=>{

        if(role_permissions){
            rolePer = role_permissions.map(item => item.id);
            setRolePermissions(rolePer);
        }
        
        if(all_permissions){
            setAllPermissions (all_permissions);
        }
        
    },[role_permissions])

    if (allPermissions.Brand || rolePermissions.length<0) {
        if(preLoader){
            setPreLoader(false);
        }
    }

    useEffect(()=>{
        if(role_name){
            setRoleName(role_name)
        }
        
    },[role_name])
    
    useEffect(() => {
        
        setRoleName({});
        setAllPermissions({});
        setRolePermissions([]);
        dispatch(getPermission(roleId, history))
        
    }, []);
    
    const checkBox ={
        marginRight : '5px'
    }

    const checkAll  = (id, key) => {
        const checkboxes = document.getElementsByName('permission'+key);
        const selectAllBtn = document.getElementById(id);
        
        for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].checked = selectAllBtn.checked;
        }
    }

    const updatePermissions = () => {

        document.getElementById("submit").disabled = true;
        ref.current.continuousStart();

        let permissionCheckboxes = document.getElementsByClassName('permissions');
        let permissionIds = [];
        for(let i=0; i<permissionCheckboxes.length; i++) {
            if(permissionCheckboxes[i].checked){
                permissionIds.push(permissionCheckboxes[i].value);
            }
        }
        let data = {
            role_id:roleId,
            permission_ids:permissionIds
        }

        dispatch(assignPermissions(data, history))

    }
    
    return (
        <React.Fragment>
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
                <form action="">
                    <div className="table-responsive" style={{ padding: '0 20px' }}>
                        {
                            preLoader ?
                            <div className="spinner-box">
                                <Spinner color="primary"> Loading... </Spinner> 
                            </div>
                            :
                            <>
                                <h5> Assign Permissions to  <b> {Object.values(roleName)} </b> </h5>
                                <Table className="align-middle table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Permission Group</th>
                                            <th scope="col">Permissions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.keys(allPermissions).map((key) => { 
                                                
                                                return (
                                                    <tr key={key}>
                                                        
                                                        <td style={{ fontWeight: 'bold' }}>{key}</td>

                                                        <td>
                                                            <div className="form-check mb-4">
                                                                <Input className="form-check-input" style={checkBox} type="checkbox" id={'formCheck6'+key} onClick={() =>checkAll(('formCheck6'+key), key)}/>
                                                                <Label className="form-check-label" for={'formCheck6'+key} style={{ textTransform: 'uppercase'}}>
                                                                    Select all
                                                                </Label>
                                                            </div>
                                                            <Table style={{ marginBottom: '0' }}>
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ padding:'0', borderStyle: 'none', width: '40%' }}>
                                                                            {
                                                                                allPermissions[key].map((obj) => {
                                                                                    return (
                                                                                        <div className="form-check mb-3" key={obj.id}>
                                                                                            <Input className="form-check-input permissions" style={checkBox} type="checkbox" id={'formCheck6'+obj.id} name={'permission'+key} value={obj.id} defaultChecked={rolePermissions.includes(obj.id)}/>
                                                                                            <Label className="form-check-label" for={'formCheck6'+obj.id}>
                                                                                                {obj.alias}
                                                                                            </Label>
                                                                                        </div>
                                                                                    ) 
                                                                                })
                                                                            }
                                                                        </td>
                                                                        <td style={{ color: '#777',padding:'0', borderStyle: 'none' }}>
                                                                            {
                                                                                allPermissions[key].map((obj) => {
                                                                                    return (
                                                                                        <p key={obj.id}>{obj.description}</p>
                                                                                    ) 
                                                                                })
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                <Button id="submit" color="primary" className="w-lg" style={{ margin: '40px 20px 60px 0' }} onClick={updatePermissions}> Update </Button>
                                <div style={{ clear: 'both' }}></div>
                            </>
                        }
                    </div>
                </form>
        </React.Fragment>
    );
};

export default PermissionTable;