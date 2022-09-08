import React, { useEffect, useState, useRef } from 'react';
import { Input, Label, Row, Table, Button, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles, addRole, getRoleById } from '../../../store/actions';
import { useHistory } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


const RoleTable = ( { id } ) => {

    const checkBox = {
        marginRight: '5px'
    }

    const [allRoles, setAllRoles] = useState({}) ;
    const [userRole, setUserRole] = useState([]) ;
    const [userName, setUserName] = useState({}) ;
    const [preLoader, setPreLoader] = useState(true);

    const ref = useRef(null);

    const dispatch = useDispatch();

    const history = useHistory();

    const { user_name, all_roles, user_role } =  useSelector( state => ({
        user_name: state.User.response.user_name,
        all_roles: state.User.response.all_roles,
        user_role: state.User.response.user_roles,

    }));


    useEffect(()=>{

        if(all_roles){
            setAllRoles(all_roles);
        }

    },[all_roles])

    useEffect(()=>{

        if(user_name){
            setUserName(user_name);
        }

    },[user_name])

    let user_roles = [];

    useEffect(()=>{

        if(user_role){
            user_roles = user_role.map(item => item.id);
            setUserRole(user_roles);
        }

    },[user_role])


    useEffect(() => {
        setUserName({})
        setAllRoles({});
        setUserRole([]);
        dispatch(getRoleById(id, history))

    }, []);
    
    if(allRoles.length>0){
        if(preLoader){
            setPreLoader(false);
        }
    }

    let data = [];

    if(Object.keys(allRoles).length !== 0){

        data =  allRoles;
    }
    
    const submit = (e) => {
        e.preventDefault();

        document.getElementById("submit").disabled = true;
        
        ref.current.continuousStart();

        let roles = document.getElementsByClassName('roles');

        let role_ids = [];

        for(let i=0; i<roles.length; i++){
            if(roles[i].checked){
                role_ids.push(roles[i].value)
            }
        }

        let values = {
            user_id: id,
            role_ids: role_ids
        }

        dispatch( addRole(values, history) );

        return false;
    }

    return (
        <React.Fragment>
            <LoadingBar color='rgba(240, 101, 72, 0.85)' ref={ref} />
            <form onSubmit={(e) => submit(e)}>
                <div className="table-responsive">
                    {
                        preLoader ?
                        <div className="spinner-box">
                            <Spinner color="primary"> Loading... </Spinner> 
                        </div>
                        :
                        <>
                            <h5>Assign Roles to <b> {Object.values(userName)} </b> </h5>
                            <Table className="align-middle">
                                <thead>
                                    <tr>
                                        <th>Roles</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { data.map(role => (
                                        <tr key={role.id}>
                                            <td style={{ width:'30%' }}>
                                                <div className="form-check mb-3">
                                                    <Input 
                                                        className="form-check-input roles" 
                                                        style={checkBox} 
                                                        type="checkbox" 
                                                        id={role.name}
                                                        value={role.id}
                                                        name="roles"
                                                        defaultChecked = {userRole.includes(role.id)? true : false}
                                                    />
                                                    <Label className="form-check-label" for={role.name}>
                                                        {role.name}
                                                    </Label>
                                                </div>
                                            </td>
                                            <td>{role.description}</td>
                                        </tr>
                                    )) }
                                </tbody>
                            </Table>
                            <div style={{ textAlign: "left", marginTop:"15px", marginLeft:"10px"}}>
                                <Button id="submit" color="primary" className="bg-gradient"> Update </Button>
                            </div>
                        </>
                    }
                </div>
            </form>
        </React.Fragment>
    )

};

export default RoleTable;