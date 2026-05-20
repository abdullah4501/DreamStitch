import React, { useState } from "react";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const ProductTab = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <section className="tab-product m-0">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => setActiveTab("1")}>
                    Description
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => setActiveTab("2")}>
                    Fabric & Care
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "3" ? "active" : ""} onClick={() => setActiveTab("3")}>
                    Sizing Guide
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "4" ? "active" : ""} onClick={() => setActiveTab("4")}>
                    Write Review
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material">
                <TabPane tabId="1">
                  <p className="mb-0 pb-0">
                    Each Dream Stitch garment is crafted with care using premium quality fabric and expert tailoring. Our men's wear collection includes sherwani, kurta shalwar, two-piece suits, three-piece suits, and fashion shirts — all stitched to perfection for a refined, confident look. Whether it's a wedding, formal event, or everyday wear, Dream Stitch delivers style with comfort.
                  </p>
                </TabPane>
                <TabPane tabId="2">
                  <p className="mb-0 pb-0">
                    We use only high-quality fabrics including lawn, khaddar, linen, and suiting cloth sourced from trusted suppliers. For best results, dry clean or hand wash with cold water. Iron on medium heat. Avoid prolonged exposure to direct sunlight to preserve colour and fabric quality.
                  </p>
                </TabPane>
                <TabPane tabId="3">
                  <p className="mb-0 pb-0">
                    For the best fit, please provide your chest, waist, shoulder, and length measurements when placing a Made to Order. For ready-to-wear items, we follow standard Pakistani sizing (S, M, L, XL, XXL). If you're unsure of your size, contact us on WhatsApp at +92 311-1294411 and we'll help you find the right fit.
                  </p>
                </TabPane>
                <TabPane tabId="4">
                  <p className="mb-0 pb-0">
                    We'd love to hear your feedback! Share your experience with this product to help other customers make the right choice. Your review helps us improve and grow. Thank you for choosing Dream Stitch.
                  </p>
                </TabPane>
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductTab;
