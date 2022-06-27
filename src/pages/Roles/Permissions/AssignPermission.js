import React, {useEffect} from 'react';
import UiContent from "../../../Components/Common/UiContent";
import MetaTags from 'react-meta-tags';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';

import PermissionTable from './PermissionTable';

const AssignPermission = (props) => {
    
    const { id } = props.match.params
    
    const permission_message_error = localStorage.getItem('permission_message_error')
    const errornotify = (message) => toast( message, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-danger text-white' });
    useEffect(() => {
        if(permission_message_error) {
            errornotify("Permissions Update Failed !");
            localStorage.removeItem('role')
        }
    }, []);

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <MetaTags>
                    <title>Assign Permission</title>
                </MetaTags>
                <Container fluid>
                    <BreadCrumb title="Assign Permission" pageTitle="Roles" link="/role-List"/>
                    <PermissionTable id={id} history={props.history}/>
                    <ToastContainer />
                </Container>
            </div>
        </React.Fragment>
    );
    
};

export default AssignPermission;