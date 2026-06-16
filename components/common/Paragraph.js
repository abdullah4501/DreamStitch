import React from "react";
import { Container, Row, Col } from "reactstrap";

const Paragraph = ({ title, inner, line, hrClass }) => {
  return (
    <>
      <div className={title}>
        <h4>Our Promise</h4>
        <h2 className={inner}>Menswear Collection</h2>
        {line ? <div className="line"></div> : hrClass ? <hr role="tournament6"></hr> : ""}
      </div>
      <Container>
        <Row>
          <Col lg="6" className="m-auto">
            <div className="product-para">
              <p className="text-center">
                Discover handcrafted men's wear from traditional sherwani and kurta shalwar to modern two and three piece suits. Every piece is tailored with precision using premium fabric.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Paragraph;
