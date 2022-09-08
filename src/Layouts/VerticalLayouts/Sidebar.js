import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
//import logo
// import logoSm from "../../assets/images/logo-sm.png";
import logoSm from "../../assets/images/small/logoSm.png"
//Import Components
import SidebarContent from "./SidebarContent";
import TwoColumnLayout from "../TwoColumnLayout";
import { Container, Button, Modal, ModalBody, Card, CardBody, CardHeader } from "reactstrap";
import HorizontalLayout from "../HorizontalLayout";

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
                    <p className="fw-normal version">Version 5.0.7</p>
                </Button>
            </div>

            <Modal isOpen={modal_scroll}  toggle={() =>tog_scroll()} scrollable={true} id="exampleModalScrollable">
                <ModalBody style={{ padding:'0' }}>
                    <Card style={{ marginBottom: '0' }}>
                        <CardHeader>
                            <h4 className=" mb-0 text-primary">Updates</h4>
                        </CardHeader>
                        <CardBody style={{ minHeight:'200px' }}>

                          <h6 className="card-title">Version 5.0.7 <span className="text-muted fs-11">Sep 8, 2022</span></h6>
                          
                          <div className="card-text mb-0">
                              <ul>
                                <li>Supplier Account Statement (SAS)</li>
                                <li>Supplier Credit History</li>
                                <li>Create Purchase Return partially done</li>
                                <li>Purchase Return List</li>
                                <li>Return List in Purchase Invoice</li>
                                <li>Purchase Return Verification</li>
                                <li>Sale Terminal - Selling Price Approval</li>
                                <li>Bug fixes and improvements</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 5.0.6 <span className="text-muted fs-11">Sep 7, 2022</span></h6>
                          
                          <div className="card-text mb-0">
                              <ul>
                                <li>Product Transfer by Purchase Invoice</li>
                                <li>Product Transfer by Last Transaction</li>
                                <li>Sale Terminal - Add Discount</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 5.0.5 <span className="text-muted fs-11">Sep 6, 2022</span></h6>
                          
                          <div className="card-text mb-0">
                              <ul>
                                    <li>Payment Method Summary</li>
                                    <li>Supplier's Note</li>
                                    <li>Quantity input field in Sale Terminal</li>
                                    <li>Unit Price in Sale Terminal Summary</li>
                                    <li>Purchase Invoice PDF download</li>
                                    <li>Sale Return Invoice PDF download</li>
                                    <li>Average Purchase Price - IMEI List</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 5.0.4 <span className="text-muted fs-11">Sep 5, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                    <li>Business name displayed instead of first and last name</li>
                                    <li>Sale Invoice email and pdf download revised</li>
                                    <li>Profit/loss calculation revised</li>
                                    <li>Commission Summary revised</li>
                                    <li>Same price for same SKU in Sale Terminal</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 5.0.3 <span className="text-muted fs-11">Sep 1, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                    <li>Business Name included for Customers and Suppliers</li>
                                    <li>Bug fixes and improvements</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 5.0.2 <span className="text-muted fs-11">Aug 31, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                  <li>Salesman Reports</li>
                                  <li>Return List in Sale Invoice</li>
                                  <li>Purchase Invoice modified</li>
                                  <li>Collective Sale Payment modified</li>
                                  <li>Return Deduction for Sale Return</li>
                                  <li>Bug fixes and improvements</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 5.0.1 <span className="text-muted fs-11">Aug 25, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                  <li>Product details modal</li>
                                  <li>Application Optimization</li>
                                  <li>Bug fixes and improvements</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 4.0.6 <span className="text-muted fs-11">Aug 24, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                  <li>IMEI Search</li>
                                  <li>Smartphone Depot Pool</li>
                                  <li>Withdraw Customer Credit</li>
                                  <li>Risk Fund and Average Profit</li>
                                  <li>Purchase Invoice from Supplier</li>
                                  <li>Bug Fixes and other improvements</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 4.0.5 <span className="text-muted fs-11">Aug 17, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                  <li>Payment Method Report</li>
                                  <li>Verification Feature for Sale, Sale Return, Purchase, Expense, Payment</li>
                                  <li>Verification Report</li>
                                  <li>Profit by Date, Products, Models, Categories</li>
                                  <li>Product Transfer</li>
                                  <li>SKU Transfer</li>
                                  <li>Verification Record</li>
                                  <li>User Login Logout Record</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 4.0.4 <span className="text-muted fs-11">Aug 04, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                  <li>Modifications for Purchase and Expense</li>
                                  <li>Expense Summary</li>
                                  <li>New Table Design applied in a number of tables</li>
                                  <li>Design improvements</li>
                                  <li>Bug Fixes</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 4.0.3 <span className="text-muted fs-11">Jul 28, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                  <li>Transaction Records</li>
                                  <li>Money Records</li>
                                  <li>Product Summary in Sale Terminal</li>
                                  <li>Sale Return Invoice Modal</li>
                                  <li>Lock Purchase Transaction</li>
                                  <li>Download Sale Invoice</li>
                                  <li>Email Sale Invoice</li>
                                  <li>Expense Payment</li>
                                  <li>Expense Payment Report</li>
                                  <li>New Table Design applied in a number of tables</li>
                                  <li>Minor Bug Fixes</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 4.0.2 <span className="text-muted fs-11">Jul 21, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                  <li>Collective Sale Payment</li>
                                  <li>Purchase Payment</li>
                                  <li>Purchase Payment Report</li>
                                  <li>Profit by Sale Invoice</li>
                                  <li>Profit by Customer</li>
                                  <li>Sale Invoice Modal</li>
                                  <li>Purchase Invoice Modal</li>
                                  <li>Design Improvements</li>
                                  <li>Minor Bug Fixes</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 4.0.1 <span className="text-muted fs-11">Jul 5, 2022</span></h6>

                          <div className="card-text mb-0">
                              <ul>
                                  <li>Sale Return and Return Credit for Customer</li>
                                  <li>Add Customer Credit and Credit History</li>
                                  <li>Payment Methods, Sale Payment and Sale Payment Report</li>
                                  <li>Customer Account Statement</li>
                                  <li>Minor Bug Fixes</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 3.0.3 <span className="text-muted fs-11">Jun 30, 2022</span></h6>
                          
                          <div className="card-text mb-0">
                              <ul>
                                  <li>Product list added in Sale Terminal</li>
                                  <li>Bug fixes and improvements</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 3.0.2 <span className="text-muted fs-11">Jun 23, 2022</span></h6>
                          <div className="card-text mb-0">
                              <ul>
                                  <li>Customer User Association (CUA)</li>
                                  <li>Sale Terminal modified</li>
                                  <li>All Permissions checked and revised</li>
                                  <li>Bug fixes</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 3.0.1 <span className="text-muted fs-11">Jun 16, 2022</span></h6>
                          <div className="card-text mb-0">
                              <ul>
                                  <li>Entities released - Sale Transaction, Sale Terminal</li>
                                  <li>View variations for each product</li>
                              </ul>
                          </div>

                          <h6 className="card-title">Version 2.0.4 <span className="text-muted fs-11">Jun 9, 2022</span></h6>
                          <div className="card-text mb-0">
                              <ul>
                                  <li>Tax ID and License Certificate for customers</li>
                                  <li>Product forms modified</li>
                                  <li>Modifications for product names</li>
                                  <li>Total item count for purchase transactions</li>
                                  <li>Major bug fixes and code refactoring</li>
                              </ul>
                          </div>

                            <h6 className="card-title">Version 2.0.3 <span className="text-muted fs-11">Jun 2, 2022</span></h6>
                            <div className="card-text mb-0">
                                <ul>
                                    <li>Expense Catagories, References and Transactions</li>
                                    <li>Minor bug fixes</li>
                                </ul>
                            </div>

                            <h6 className="card-title">Version 2.0.2 <span className="text-muted fs-11">May 26, 2022</span></h6>
                            <div className="card-text mb-0">
                                <ul>
                                    <li>View purchase variations for individual purchase transactions</li>
                                    <li>Bugs fixed in add variations</li>
                                    <li>Summary for newly added variations</li>
                                    <li>Average purchase price</li>
                                    <li>Edit feature for User officials, Customers and Suppliers</li>
                                    <li>Bugs fixed for customer shipping address</li>
                                </ul>
                            </div>

                            <h6 className="card-title">Version 2.0.1 <span className="text-muted fs-11">May 19, 2022</span></h6>
                            <div className="card-text mb-0">
                                <ul>
                                    <li>Entities released - Purchase Transaction, Import/Add Purchase Variations</li>
                                    <li>View details for User Officials, Customers and Suppliers</li>
                                    <li>View Customer shipping addresses</li>
                                </ul>
                            </div>

                            <h6 className="card-title">Version 1.0.4 <span className="text-muted fs-11">May 17, 2022</span></h6>
                            <div className="card-text mb-0">
                                <ul>
                                    <li>Minor bug fixes for products</li>
                                    <li>Bugs fixed for login/logout</li>
                                </ul>
                            </div>


                            <h6 className="card-title">Version 1.0.3 <span className="text-muted fs-11">May 15, 2022</span></h6>
                            <div className="card-text mb-0">
                                <ul>
                                    <li>Roles and permissions made effective for individual users</li>
                                    <li>Bugs fixed for form dropdowns</li>
                                </ul>
                            </div>

                            <h6 className="card-title">Version 1.0.2 <span className="text-muted fs-11">May 12, 2022</span></h6>
                            <div className="card-text mb-0">
                                <ul>
                                    <li>Bugs fixed for roles and permissions</li>
                                    <li>Bugs fixed for login/logout</li>
                                </ul>
                            </div>

                            <h6 className="card-title">Version 1.0.1 <span className="text-muted fs-11">May 11, 2022</span></h6>
                            <div className="card-text mb-0">
                                <ul>
                                    <li>Entities released - Users, Roles, Contacts, Brands, Product Catagories, Product Models, Products</li>
                                </ul>
                            </div>
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
