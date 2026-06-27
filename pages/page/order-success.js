import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col } from "reactstrap";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import ProductImage from "../../components/common/ProductImage";

const ORDER_BY_NUMBER = gql`
  query OrderByNumber($orderNumber: String!) {
    orderByNumber(orderNumber: $orderNumber) {
      id
      orderNumber
      customerName
      email
      phone
      address1
      address2
      city
      province
      postalCode
      country
      subtotal
      shippingTotal
      discountTotal
      total
      status
      paymentStatus
      paymentMethod
      notes
      createdAt
      items {
        id
        productTitle
        imageSrc
        quantity
        unitPrice
        total
        variantSize
      }
    }
  }
`;

const formatDate = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(Number(dateValue) || dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getExpectedDelivery = (dateValue) => {
  const date = new Date(Number(dateValue) || dateValue || Date.now());
  date.setDate(date.getDate() + 7);
  return formatDate(date.toISOString());
};

const paymentLabel = (method) => {
  if (method === "bank-transfer") return "Bank Transfer After Confirmation";
  if (method === "cod") return "Cash on Delivery / Confirm by Phone";
  return method || "Confirm with Dream Stitch team";
};

const OrderSuccess = () => {
  const router = useRouter();
  const orderNumber = router.query.order;
  const curContext = React.useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const { data, loading } = useQuery(ORDER_BY_NUMBER, {
    variables: { orderNumber },
    skip: !orderNumber,
    fetchPolicy: "network-only",
  });
  const order = data?.orderByNumber;

  return (
    <CommonLayout parent="home" title="order success">
      <section className="section-b-space light-layout white-1">
        <Container>
          <Row>
            <Col md="12">
              <div className="success-text">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
                <h2>thank you</h2>
                <p>Your order has been placed. Our team will contact you for confirmation.</p>
                {order ? <p>Order Number: {order.orderNumber}</p> : null}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-b-space">
        <Container>
          {loading ? (
            <div className="text-center p-5">Loading order details...</div>
          ) : !order ? (
            <div className="text-center p-5">Order details are not available.</div>
          ) : (
            <Row>
              <Col lg="6">
                <div className="product-order">
                  <h3>your order details</h3>
                  {order.items.map((item) => (
                    <Row className="product-order-detail" key={item.id}>
                      <Col xs="3">
                        <ProductImage src={item.imageSrc} alt={item.productTitle} className="img-fluid blur-up lazyload" />
                      </Col>
                      <Col xs="3" className="order_detail">
                        <div>
                          <h4>product name</h4>
                          <h5>{item.productTitle}</h5>
                          {item.variantSize ? <small>Size: {item.variantSize}</small> : null}
                        </div>
                      </Col>
                      <Col xs="3" className="order_detail">
                        <div>
                          <h4>quantity</h4>
                          <h5>{item.quantity}</h5>
                        </div>
                      </Col>
                      <Col xs="3" className="order_detail">
                        <div>
                          <h4>price</h4>
                          <h5>{symbol}{item.unitPrice}</h5>
                        </div>
                      </Col>
                    </Row>
                  ))}
                  <div className="total-sec">
                    <ul>
                      <li>subtotal <span>{symbol}{order.subtotal}</span></li>
                      {order.discountTotal ? <li>discount <span>{symbol}{order.discountTotal}</span></li> : null}
                      {order.shippingTotal ? <li>shipping <span>{symbol}{order.shippingTotal}</span></li> : null}
                    </ul>
                  </div>
                  <div className="final-total">
                    <h3>total <span>{symbol}{order.total}</span></h3>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <Row className="order-success-sec">
                  <Col sm="6">
                    <h4>summary</h4>
                    <ul className="order-detail">
                      <li>Order ID: {order.orderNumber}</li>
                      <li>Order Date: {formatDate(order.createdAt)}</li>
                      <li>Order Total: {symbol}{order.total}</li>
                      <li>Status: {order.status}</li>
                    </ul>
                  </Col>
                  <Col sm="6">
                    <h4>shipping address</h4>
                    <ul className="order-detail">
                      <li>{order.customerName}</li>
                      <li>{order.address1}</li>
                      {order.address2 ? <li>{order.address2}</li> : null}
                      <li>{[order.city, order.province, order.postalCode].filter(Boolean).join(", ")}</li>
                      <li>{order.country}</li>
                      <li>Contact No. {order.phone}</li>
                    </ul>
                  </Col>
                  <Col sm="12" className="payment-mode">
                    <h4>payment method</h4>
                    <p>{paymentLabel(order.paymentMethod)}</p>
                  </Col>
                  <Col md="12">
                    <div className="delivery-sec">
                      <h3>expected date of delivery</h3>
                      <h2>{getExpectedDelivery(order.createdAt)}</h2>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </CommonLayout>
  );
};

export default OrderSuccess;
