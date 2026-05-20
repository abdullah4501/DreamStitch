import React, { Fragment } from "react";
import Link from "next/link";
import { Container, Row, Col, Media } from "reactstrap";
const Data = [
  {
    img: "/assets/images/final/KS_03827.JPG",
    about: "Men's Collection",
    offer: "New Arrivals",
    link: "/shop/six_grid",
    class: "p-right text-center",
  },
  {
    img: "/assets/images/final/KS_04198.JPG",
    about: "Made to Order",
    offer: "Custom Fit",
    link: "/page/account/contact",
    class: "p-right text-center",
  },
];

const MasterCollectionBanner = ({ img, about, offer, link, classes }) => {
  return (
    <Col md="6">
      <Link href={link}>
        <div className={`collection-banner ${classes}`}>
          <Media src={img} className="img-fluid" alt="" />
          <div className="contain-banner">
            <div className="inner-contain-banner">
              <h4>{offer}</h4>
              <h2>{about}</h2>
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};

const CollectionBanner = () => {
  return (
    <Fragment>
      <section className="pb-0">
        <Container>
          <Row className="partition2">
            {Data.map((data, i) => (
              <MasterCollectionBanner
                key={i}
                img={data.img}
                about={data.about}
                link={data.link}
                offer={data.offer}
                classes={data.class}
              />
            ))}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default CollectionBanner;
