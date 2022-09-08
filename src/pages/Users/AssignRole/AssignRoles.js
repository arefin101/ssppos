import React, {useEffect} from 'react';
import UiContent from "../../../Components/Common/UiContent";
import MetaTags from 'react-meta-tags';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';
import RoleTable from './RoleTable';


const AssignRoles = (props) => {

    const { id } = props.match.params;

    return (
        <React.Fragment>
            <UiContent />
                <div className='page-content'>
                    <MetaTags>
                        <title>Role Assign</title>
                    </MetaTags>
                    <Container fluid>
                        <BreadCrumb title="Assign Role" pageTitle="Users" link="/user-list"/>
                        <RoleTable id={id}/>
                    </Container>
                </div>
        </React.Fragment>
    );
};

export default AssignRoles;