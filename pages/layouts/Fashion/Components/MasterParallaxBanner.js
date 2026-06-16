import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const MasterParallaxBanner = ({
  parallaxSectionClass,
  bg,
  parallaxClass,
  title,
  subTitle1,
  subTitle2,
}) => {
  return (
    <Fragment>
      <section className={`p-0 ${parallaxSectionClass}`}>
        <div className={`full-banner dream-stitch-parallax ${bg} parallax ${parallaxClass}`}>
          <Container>
            <Row>
              <Col lg="7" md="9">
                <div className="banner-contain">
                  <span className="banner-kicker">{subTitle1}</span>
                  <h2>{title}</h2>
                  <p>{subTitle2}</p>
                  <Link href="/page/made-to-order" className="btn btn-solid">
                    Order Now
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Fragment>
  );
};

export default MasterParallaxBanner;
