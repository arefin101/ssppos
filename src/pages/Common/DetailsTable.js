import { use } from 'echarts';
import React from 'react';
import { CardBody, Container, Progress, Row, Card, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from "reactstrap";

import Img2 from "../../assets/images/companies/img-2.png";

const DetailsTable = ({ userData }) => {

    let currentUserData = [];
    let objKeys = [];

    Object.keys(userData).map((elem) => (
        currentUserData.push( userData[elem] )
    ));
    Object.keys(userData).map((elem) => (
        objKeys.push( elem )
    ));

    // console.log(currentUserData);
    // console.log(objKeys);
    console.log(userData);

    return ( 
        <React.Fragment>
            <Row>
                <div className="col-xxl-3">
                    <Card>
                        <CardBody className="p-4">
                            <div>
                                <div className="flex-shrink-0 avatar-md mx-auto">
                                    <div className="avatar-title bg-light rounded">
                                        <img src={Img2} alt="" height="50" />
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h5 className="mb-1">{userData.first_name + " " + userData.last_name}</h5>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table mb-0 table-borderless">
                                        <tbody>
                                            {
                                                
                                            }
                                            <tr>
                                                <th>
                                                    <span className="fw-medium">First Name</span>
                                                </th>
                                                <td>{userData.first_name}</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <span className="fw-medium">Last Name</span>
                                                </th>
                                                <td>{userData.last_name}</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <span className="fw-medium">Username</span>
                                                </th>
                                                <td>{userData.username}</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <span className="fw-medium">Email</span>
                                                </th>
                                                <td>{userData.email}</td>
                                            </tr>
                                            {/* <tr>
                                                <th>
                                                <span className="fw-medium">Website</span>
                                                </th>
                                                <td>
                                                <Link to="#" className="link-primary">
                                                    www.forcemedicines.com
                                                </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                <span className="fw-medium">Contact No.</span>
                                                </th>
                                                <td>+(123) 9876 654 321</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                <span className="fw-medium">Fax</span>
                                                </th>
                                                <td>+1 999 876 5432</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                <span className="fw-medium">Location</span>
                                                </th>
                                                <td>United Kingdom</td>
                                            </tr> */}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Row>
        </React.Fragment>
    )
}
 
export default DetailsTable;