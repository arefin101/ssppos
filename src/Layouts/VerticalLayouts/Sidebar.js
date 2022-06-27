import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

//Import Components
import SidebarContent from "./SidebarContent";
import TwoColumnLayout from "../TwoColumnLayout";
import { Container, Button, UncontrolledTooltip, Modal, ModalBody, ModalHeader, ModalFooter, PopoverBody, PopoverHeader, UncontrolledPopover, Card, CardBody, CardHeader } from "reactstrap";
import HorizontalLayout from "../HorizontalLayout";
import Transactions from './../../pages/Crypto/Transactions/index';

const Sidebar = ({ layoutType }) => {

  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName("vertical-overlay");
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener("click", function () {
        document.body.classList.remove("vertical-sidebar-enable");
      });
    }
  });

  const addEventListenerOnSmHoverMenu = () => {
    // add listener Sidebar Hover icon on change layout from setting
    if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover') {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
    } else if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover-active') {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    } else {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    }
  };

    
    const [modal_scroll, setmodal_scroll] = useState(false);
    function tog_scroll() {
        setmodal_scroll(!modal_scroll);
    }


  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
            <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                {/* <img src={logoDark} alt="" height="17" /> */}
                <h2 style={{ color: '#fff', paddingTop: '20px', marginBottom: '0' }}>SSPPOS</h2>
                </span>
            </Link>

            <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                {/* <img src={logoLight} alt="" height="17" /> */}
                <h2 style={{ color: '#fff', paddingTop: '20px', marginBottom: '0' }}>SSPPOS</h2>
                </span>
            </Link>
            <div className="popover-btn">
                <Button color="primary" size='sm' outline className="btn btn-ghost-light" onClick={() => tog_scroll()}>
                    <p className="fw-normal version">Version 3.0.2</p>
                </Button>
            </div>

            <Modal isOpen={modal_scroll}  toggle={() =>tog_scroll()} scrollable={true} id="exampleModalScrollable">
                <ModalBody style={{ padding:'0' }}>
                    <Card style={{ marginBottom: '0' }}>
                        <CardHeader>
                            <h4 className=" mb-0 text-primary">Updates</h4>
                        </CardHeader>
                        <CardBody style={{ minHeight:'200px' }}>

                          <h6 className="card-title">Version 3.0.2</h6>
                          <p className="card-text text-muted mb-0">
                              <ul>
                                  <li>Customer User Association (CUA)</li>
                                  <li>Sale Terminal modified</li>
                                  <li>All Permissions checked and revised</li>
                                  <li>Bugs fixed</li>
                              </ul>
                          </p>

                          <h6 className="card-title">Version 3.0.1</h6>
                          <p className="card-text text-muted mb-0">
                              <ul>
                                  <li>Entities released - Sale Transaction, Sale Terminal</li>
                                  <li>View variations for each product</li>
                              </ul>
                          </p>

                          <h6 className="card-title">Version 2.0.4</h6>
                          <p className="card-text text-muted mb-0">
                              <ul>
                                  <li>Tax ID and License Certificate for customers</li>
                                  <li>Product forms modified</li>
                                  <li>Modifications for product names</li>
                                  <li>Total item count for purchase transactions</li>
                                  <li>Major bug fixes and code refactoring</li>
                              </ul>
                          </p>

                            <h6 className="card-title">Version 2.0.3</h6>
                            <p className="card-text text-muted mb-0">
                                <ul>
                                    <li>Expense Catagories, References and Transactions</li>
                                    <li>Minor bugs fixed</li>
                                </ul>
                            </p>

                            <h6 className="card-title">Version 2.0.2</h6>
                            <p className="card-text text-muted mb-0">
                                <ul>
                                    <li>View purchase variations for individual purchase transactions</li>
                                    <li>Bugs fixed in add variations</li>
                                    <li>Summary for newly added variations</li>
                                    <li>Average purchase price</li>
                                    <li>Edit feature for User officials, Customers and Suppliers</li>
                                    <li>Bugs fixed for customer shipping address</li>
                                </ul>
                            </p>

                            <h6 className="card-title">Version 2.0.1</h6>
                            <p className="card-text text-muted mb-0">
                                <ul>
                                    <li>Entities released - Purchase Transaction, Import/Add Purchase Variations</li>
                                    <li>View details for User Officials, Customers and Suppliers</li>
                                    <li>View Customer shipping addresses</li>
                                </ul>
                            </p>

                            <h6 className="card-title">Version 1.0.4</h6>
                            <p className="card-text text-muted mb-0">
                                <ul>
                                    <li>Minor bug fixes for products</li>
                                    <li>Bugs fixed for login/logout</li>
                                </ul>
                            </p>


                            <h6 className="card-title">Version 1.0.3</h6>
                            <p className="card-text text-muted mb-0">
                                <ul>
                                    <li>Roles and permissions made effective for individual users</li>
                                    <li>Bugs fixed for form dropdowns</li>
                                </ul>
                            </p>

                            <h6 className="card-title">Version 1.0.2</h6>
                            <p className="card-text text-muted mb-0">
                                <ul>
                                    <li>Bugs fixed for roles and permissions</li>
                                    <li>Bugs fixed for login/logout</li>
                                </ul>
                            </p>

                            <h6 className="card-title">Version 1.0.1</h6>
                            <p className="card-text text-muted mb-0">
                                <ul>
                                    <li>Entities released - Users, Roles, Contacts, Brands, Product Catagories, Product Models, Products</li>
                                </ul>
                            </p>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>

            
            <button
                onClick={addEventListenerOnSmHoverMenu}
                type="button"
                className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                id="vertical-hover"
            >
                <i className="ri-record-circle-line"></i>
            </button>
        </div>
        {layoutType === "horizontal" ? (
          <div id="scrollbar">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <HorizontalLayout />
              </ul>
            </Container>
          </div>
        ) : layoutType === 'twocolumn' ? (
          <TwoColumnLayout />
        ) : (
          <SimpleBar id="scrollbar" className="h-100">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <SidebarContent layoutType={layoutType} />
              </ul>
            </Container>
          </SimpleBar>
        )}
      </div>
      <div className="vertical-overlay"></div>
    </React.Fragment>
  );
};

export default Sidebar;
