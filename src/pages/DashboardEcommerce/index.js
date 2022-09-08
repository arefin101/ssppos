import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import MetaTags from 'react-meta-tags';
import Widget from "./Widgets";
import BestSellingProducts from "./BestSellingProducts";
import RecentActivity from "./RecentActivity";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import SalesByLocations from "./SalesByLocations";
import Section from "./Section";
import StoreVisits from "./StoreVisits";
import TopSellers from "./TopSellers";
import LoadingBar from 'react-top-loading-bar';
import comingsoon from '../../assets/images/comingsoon.png';


const DashboardEcommerce = () => {
  const ref = useRef(null);

  useEffect(() => {
        ref.current.complete();
  }, []);


  return (
    <React.Fragment>
      <LoadingBar color='#fff' ref={ref} />

      <div className="page-content">
        
      <Container>
          <Row>
              <Col lg={12}>
                  <div className="text-center mt-sm-5 pt-4 bg-soft-primary">
                      <div className="pt-5 pb-sm-4 pb-5">
                          <img src={comingsoon} alt="" height="120" className="move-animation" />
                      </div>
                      <div className="pb-5">
                          <h1 className="display-2 coming-soon-text">Coming Soon</h1>
                      </div>
                  </div>
              </Col>
          </Row>
      </Container>
        {/* <Container fluid>
          <MetaTags>
            <title>Dashboard</title>
          </MetaTags>
          <Row>
            <Col>
              <div className="h-100">
                <Section />
                <Row>
                  <Widget />
                </Row>
                <Row>
                  <Col xl={8}>
                    <Revenue />
                  </Col>
                  <SalesByLocations />
                </Row>
                <Row>
                  <BestSellingProducts />
                  <TopSellers />
                </Row>
                <Row>
                  <StoreVisits />
                  <RecentOrders />
                </Row>
              </div>
            </Col>
            <RecentActivity />
          </Row>
        </Container> */}
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
