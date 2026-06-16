import React, { useState } from "react";
import Link from "next/link";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Form, Label, Input, Modal, ModalBody, Media } from "reactstrap";

const phoneNumber = "+92 311-1294411";
const whatsappUrl = "https://wa.me/923111294411?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20place%20a%20made-to-order%20request%20with%20Dream%20Stitch.";
const sizeChart = {
  name: "Size Chart",
  image: "/assets/images/size-chart.jpg",
};

const fabrics = Array.from({ length: 9 }, (_, index) => ({
  id: `fabric-${index + 1}`,
  name: `Fabric ${index + 1}`,
  description: "Premium fabric sample for made-to-order menswear. Final details, availability, and matching will be confirmed by our team.",
  image: `/assets/images/fabrics/fab${index + 1}.png`,
}));

const categories = [
  "Kameez Shalwar",
  "Sherwani",
  "3-Piece Suit",
  "2-Piece Suit",
  "5-Piece Sherwani",
  "Jodhpuri Style",
  "Waistcoat Set",
];

const colors = [
  { name: "Black", value: "#111111" },
  { name: "Off White", value: "#f4efe3" },
  { name: "White", value: "#ffffff" },
  { name: "Navy Blue", value: "#13233f" },
  { name: "Maroon", value: "#6f1625" },
  { name: "Bottle Green", value: "#174136" },
  { name: "Gold", value: "#c99a2e" },
  { name: "Silver Grey", value: "#b8b8b8" },
  { name: "Beige", value: "#d6c1a3" },
];

const MadeToOrder = () => {
  const [previewFabric, setPreviewFabric] = useState(null);
  const [selectedFabricId, setSelectedFabricId] = useState(fabrics[0].id);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const selectedFabric = fabrics.find((fabric) => fabric.id === selectedFabricId) || fabrics[0];

  const openFabric = (fabric) => setPreviewFabric(fabric);
  const closeFabric = () => setPreviewFabric(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Your made-to-order request has been prepared. Our team will contact you for confirmation and final measurements.");
  };

  return (
    <CommonLayout parent="home" title="Made To Order">
      <section className="made-order-page section-b-space">
        <Container>
          <div className="title1 ">
            <h4>Fabric Selection</h4>
            <h2 className="title-inner1">Available Fabric Samples</h2>
          </div>

          <Row className="made-order-fabric-grid">
            {fabrics.map((fabric) => (
              <Col xl="4" md="6" key={fabric.id}>
                <button type="button" className="fabric-card rounded-4" onClick={() => openFabric(fabric)}>
                  <span className="fabric-image">
                    <Media src={fabric.image} alt={fabric.name} className=""/>
                  </span>
                  <span className="fabric-content">
                    <strong>{fabric.name}</strong>
                    <small>{fabric.description}</small>
                  </span>
                </button>
              </Col>
            ))}
          </Row>
          <Row className="align-items-center made-order-intro">
            <Col lg="7">
              <div className="made-order-copy">
                <span>Custom tailoring by Dream Stitch</span>
                <h2>Choose a fabric, share your measurements, and let us prepare your outfit.</h2>
                <p>
                  Select any fabric sample below and submit your made-to-order request. Our team will contact you for fabric confirmation, fitting details, delivery timing, and any special embroidery or styling requirements.
                </p>
              </div>
            </Col>
            <Col lg="5">
              <div className="made-order-contact">
                <h4>Prefer direct contact?</h4>
                <p>Call us or start a WhatsApp chat for quick guidance before placing your order.</p>
                <div className="made-order-contact-actions">
                  <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="btn btn-outline">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    {phoneNumber}
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-solid">
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="made-order-form-section">
            <Col lg="4">
              <div className="made-order-form-copy section-t-space">
                <span>Order Form</span>
                <h3>Give direct order through the form</h3>
                <p>
                  Fill in the details you know. If you are unsure about any measurement or design option, leave a note and our team will guide you before confirming the order.
                </p>
                <ul>
                  <li>Fabric and color confirmation</li>
                  <li>Measurements and fitting guidance</li>
                  <li>Design, embroidery, and delivery discussion</li>
                </ul>
                <button type="button" className="made-order-size-chart" onClick={() => openFabric(sizeChart)}>
                  <Media src={sizeChart.image} alt="Dream Stitch size chart" />
                  <span>
                    <strong>Size Chart</strong>
                    <small>Click to view measurement guide</small>
                  </span>
                </button>
              </div>
            </Col>
            <Col lg="8">
              <Form className="theme-form made-order-form" onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <Label className="form-label" for="customerName">Full Name *</Label>
                    <Input id="customerName" name="customerName" type="text" placeholder="Enter your full name" required />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="phone">Phone / WhatsApp *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+92 300 0000000" required />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">Email Optional</Label>
                    <Input id="email" name="email" type="email" placeholder="name@example.com" />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="category">Order Category *</Label>
                    <Input id="category" name="category" type="select" required>
                      {categories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </Input>
                  </Col>
                  <Col md="7">
                    <Label className="form-label" for="fabric">Fabric *</Label>
                    <Input id="fabric" name="fabric" type="select" value={selectedFabricId} onChange={(event) => setSelectedFabricId(event.target.value)} required>
                      {fabrics.map((fabric) => (
                        <option key={fabric.id} value={fabric.id}>{fabric.name}</option>
                      ))}
                    </Input>
                  </Col>
                  <Col md="5">
                    <Label className="form-label">Selected Fabric</Label>
                    <button type="button" className="selected-fabric-preview" onClick={() => openFabric(selectedFabric)}>
                      <Media src={selectedFabric.image} alt={selectedFabric.name} />
                      <span>{selectedFabric.name}</span>
                    </button>
                  </Col>
                  <Col md="12">
                    <Label className="form-label">Preferred Color *</Label>
                    <div className="made-order-color-grid">
                      {colors.map((color) => (
                        <button
                          type="button"
                          key={color.name}
                          className={`color-choice ${selectedColor.name === color.name ? "active" : ""}`}
                          onClick={() => setSelectedColor(color)}
                        >
                          <span style={{ backgroundColor: color.value }}></span>
                          {color.name}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="color" value={selectedColor.name} />
                  </Col>
                  <Col md="4">
                    <Label className="form-label" for="fit">Preferred Fit</Label>
                    <Input id="fit" name="fit" type="select">
                      <option>Regular</option>
                      <option>Slim</option>
                      <option>Loose</option>
                      <option>Custom guidance needed</option>
                    </Input>
                  </Col>
                  <Col md="4">
                    <Label className="form-label" for="eventDate">Required Date</Label>
                    <Input id="eventDate" name="eventDate" type="date" />
                  </Col>
                  <Col md="4">
                    <Label className="form-label" for="city">City</Label>
                    <Input id="city" name="city" type="text" placeholder="Your city" />
                  </Col>
                  <Col md="12">
                    <div className="measurement-title">Measurements Optional</div>
                  </Col>
                  {["Length", "Chest", "Shoulder", "Sleeve", "Neck", "Waist", "Hip", "Trouser Length", "Armhole"].map((field) => (
                    <Col md="4" sm="6" key={field}>
                      <Label className="form-label" for={field.replace(/\s/g, "")}>{field}</Label>
                      <Input id={field.replace(/\s/g, "")} name={field.replace(/\s/g, "")} type="text" placeholder="In inches" />
                    </Col>
                  ))}
                  <Col md="6">
                    <Label className="form-label" for="embroidery">Embroidery / Handwork</Label>
                    <Input id="embroidery" name="embroidery" type="select">
                      <option>None / Simple</option>
                      <option>Light embroidery</option>
                      <option>Heavy handwork</option>
                      <option>Need guidance</option>
                    </Input>
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="budget">Approx. Budget</Label>
                    <Input id="budget" name="budget" type="select">
                      <option>Need estimate</option>
                      <option>Under Rs. 20,000</option>
                      <option>Rs. 20,000 - Rs. 40,000</option>
                      <option>Rs. 40,000 - Rs. 70,000</option>
                      <option>Above Rs. 70,000</option>
                    </Input>
                  </Col>
                  <Col md="12">
                    <Label className="form-label" for="instructions">Design Notes / Special Requirements</Label>
                    <textarea id="instructions" name="instructions" className="form-control" rows="5" placeholder="Tell us about style, occasion, embroidery, reference design, delivery timeline, or any measurement details you want us to know."></textarea>
                  </Col>
                  <Col md="12">
                    <div className="made-order-submit-row">
                      <button className="btn btn-solid" type="submit">Submit Order</button>
                      
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal isOpen={!!previewFabric} toggle={closeFabric} centered className="fabric-preview-modal">
        <ModalBody>
          {previewFabric ? (
            <>
              <button type="button" className="btn-close" aria-label="Close" onClick={closeFabric}></button>
              <Media src={previewFabric.image} alt={previewFabric.name} />
            </>
          ) : null}
        </ModalBody>
      </Modal>
    </CommonLayout>
  );
};

export default MadeToOrder;
