import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const BreadCrumb = ({ title, pageTitle, link, pageTitle2, link2, pageHeader }) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        {pageHeader && <h4 className="mb-sm-0">{pageHeader}</h4>}

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                {
                                    pageTitle && <>
                                         <li className="breadcrumb-item"><Link to="/dashboard"><i className='ri-home-5-fill'></i></Link></li>
                                        <li className="breadcrumb-item"><Link to={link}>{pageTitle}</Link></li>
                                        {pageTitle2 && link2 && <li className="breadcrumb-item"><Link to={link2}>{pageTitle2}</Link></li>}
                                        <li className="breadcrumb-item active">{title}</li>
                                    </>
                                }
                            </ol>
                        </div>

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb;