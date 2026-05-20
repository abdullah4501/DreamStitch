import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";
import aboutus from "../../public/assets/images/about/about_us.jpg";
import Slider from "react-slick";
import { Slider2 } from "../../services/script";
import ServiceLayout from "../../components/common/Service/service1.js";

const TestimonialData = [
  {
    name: "Ahmed Raza",
    post: "Karachi",
    about: "Ordered a sherwani for my wedding — the fabric quality and stitching were exceptional. Dream Stitch delivered exactly what I had in mind, perfectly fitted.",
  },
  {
    name: "Usman Tariq",
    post: "Lahore",
    about: "The three-piece suit I ordered was beyond my expectations. Precise measurements, premium cloth, and delivered on time. Will definitely order again.",
  },
  {
    name: "Bilal Khan",
    post: "Islamabad",
    about: "Their kurta shalwar collection is outstanding. Clean stitching, great fabric choices, and excellent customer service. Highly recommended.",
  },
  {
    name: "Hamza Malik",
    post: "Peshawar",
    about: "I placed a custom order for a two-piece suit. Dream Stitch made the whole process seamless — from measurement to delivery. Top quality work.",
  },
];

const TestimonialItem = ({ name, post, about }) => {
  return (
    <div>
      <div className="media">
        <div className="media-body">
          <p>{about}</p>
          <h5>{name}</h5>
          <h6>{post}</h6>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <>
      <CommonLayout parent="home" title="About Us">
        <section className="about-page section-b-space">
          <Container>
            <Row>
              <Col lg="12">
                <div className="banner-section">
                  <Media src={aboutus.src} className="img-fluid blur-up lazyload" alt="About Dream Stitch" />
                </div>
              </Col>
              <Col sm="12">
                <h4>Crafting Excellence in Men's Wear Since Day One</h4>
                <p>
                  Dream Stitch is a premium men's clothing brand dedicated to delivering impeccably tailored garments for every occasion. We specialise in sherwani, kurta shalwar, three-piece suits, two-piece suits, fashion shirts, and all types of men's traditional and contemporary wear.
                </p>
                <p>
                  What sets us apart is our commitment to craftsmanship. Every garment at Dream Stitch is crafted using carefully selected fabrics, precise measurements, and skilled tailoring. Whether you're dressing for a wedding, a formal event, or everyday wear — we make sure you look your absolute best.
                </p>
                <p>
                  We offer two ways to shop: browse our ready-to-order Men's Collection, or place a custom Made to Order where we craft the garment to your exact measurements and preferences. Our goal is to make premium men's fashion accessible, reliable, and personal.
                </p>
                <Row className="mt-4">
                  <Col md="4" className="text-center mb-3">
                    <h3 style={{ color: "#ff9d07", fontWeight: "700" }}>500+</h3>
                    <p>Happy Customers</p>
                  </Col>
                  <Col md="4" className="text-center mb-3">
                    <h3 style={{ color: "#ff9d07", fontWeight: "700" }}>100%</h3>
                    <p>Custom Fit Guarantee</p>
                  </Col>
                  <Col md="4" className="text-center mb-3">
                    <h3 style={{ color: "#ff9d07", fontWeight: "700" }}>6+</h3>
                    <p>Product Categories</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="testimonial small-section">
          <Container>
            <Row>
              <Col sm="12">
                <h2 className="text-center mb-4">What Our Customers Say</h2>
                <Slider {...Slider2} className="slide-2 testimonial-slider no-arrow">
                  {TestimonialData.map((data, i) => (
                    <TestimonialItem key={i} name={data.name} post={data.post} about={data.about} />
                  ))}
                </Slider>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section-b-space">
          <Container>
            <Row>
              <Col sm="12" className="text-center mb-4">
                <h2>Get in Touch</h2>
                <p>Have a custom order or a question? We're here to help.</p>
              </Col>
              <Col md="4" className="text-center mb-3">
                <i className="fa fa-phone fa-2x mb-2" style={{ color: "#ff9d07" }}></i>
                <p><strong>Phone / WhatsApp</strong><br />+92 311-1294411</p>
              </Col>
              <Col md="4" className="text-center mb-3">
                <i className="fa fa-envelope fa-2x mb-2" style={{ color: "#ff9d07" }}></i>
                <p><strong>Email</strong><br />info@thedreamstiches.com</p>
              </Col>
              <Col md="4" className="text-center mb-3">
                <i className="fa fa-globe fa-2x mb-2" style={{ color: "#ff9d07" }}></i>
                <p><strong>Website</strong><br />thedreamstitches.com</p>
              </Col>
            </Row>
          </Container>
        </section>

        <div className="section-b-space">
          <ServiceLayout sectionClass={"service border-section small-section"} />
        </div>
      </CommonLayout>
    </>
  );
};

export default AboutUs;
