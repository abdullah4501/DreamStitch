import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Container, Form, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import CartContext from "../../../../helpers/cart";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import { isLoggedIn } from "../../../../helpers/auth";

const ME = gql`
  query CheckoutMe {
    me {
      firstName
      lastName
      email
      phone
      addresses {
        fullName
        phone
        address1
        address2
        city
        province
        postalCode
        country
        isDefault
      }
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($input: CheckoutInput!) {
    createOrder(input: $input) {
      id
      orderNumber
      total
      status
    }
  }
`;

const SAVE_DEFAULT_ADDRESS = gql`
  mutation SaveDefaultAddress($input: AddressInput!) {
    saveDefaultAddress(input: $input) {
      id
    }
  }
`;

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [payment, setPayment] = useState("cod");
  const [saveAddress, setSaveAddress] = useState(false);
  const router = useRouter();
  const loggedIn = isLoggedIn();
  const { data: meData } = useQuery(ME, { skip: !loggedIn, fetchPolicy: "network-only" });
  const [createOrder, { loading: placingOrder }] = useMutation(CREATE_ORDER);
  const [saveDefaultAddress] = useMutation(SAVE_DEFAULT_ADDRESS);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const user = meData?.me;
    if (!user) return;
    const defaultAddress = user.addresses?.find((address) => address.isDefault) || user.addresses?.[0];

    setValue("first_name", user.firstName || "");
    setValue("last_name", user.lastName || "");
    setValue("phone", defaultAddress?.phone || user.phone || "");
    setValue("email", user.email || "");
    setValue("country", defaultAddress?.country || "Pakistan");
    setValue("address", defaultAddress?.address1 || "");
    setValue("address2", defaultAddress?.address2 || "");
    setValue("city", defaultAddress?.city || "");
    setValue("state", defaultAddress?.province || "");
    setValue("pincode", defaultAddress?.postalCode || "");
  }, [meData, setValue]);

  const onSubmit = async (data) => {
    if (!cartItems.length) return;

    const addressInput = {
      fullName: `${data.first_name} ${data.last_name}`.trim(),
      phone: data.phone,
      address1: data.address,
      address2: data.address2 || null,
      city: data.city,
      province: data.state || null,
      postalCode: data.pincode || null,
      country: data.country || "Pakistan",
      isDefault: true,
    };

    try {
      if (saveAddress && loggedIn) {
        await saveDefaultAddress({ variables: { input: addressInput } });
      }

      const { data: orderData } = await createOrder({
        variables: {
          input: {
            customerName: addressInput.fullName,
            email: data.email || null,
            phone: data.phone,
            address1: data.address,
            address2: data.address2 || null,
            city: data.city,
            province: data.state || null,
            postalCode: data.pincode || null,
            country: data.country || "Pakistan",
            paymentMethod: payment,
            notes: data.notes || null,
            items: cartItems.map((item) => ({
              productId: Number(item.id),
              variantId: item.variantId || null,
              quantity: Number(item.qty) || 1,
            })),
          },
        },
      });

      await cartContext.clearCart();
      router.push({
        pathname: "/page/order-success",
        query: { order: orderData.createOrder.orderNumber },
      });
    } catch (error) {
      alert(error.message || "Unable to place order.");
    }
  };

  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Billing Details</h3>
                  </div>
                  <div className="row check-out">
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">First Name</div>
                      <input type="text" className={`${errors.first_name ? "error_border" : ""}`} {...register("first_name", { required: true })} />
                      <span className="error-message">{errors.first_name && "First name is required"}</span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Last Name</div>
                      <input type="text" className={`${errors.last_name ? "error_border" : ""}`} {...register("last_name", { required: true })} />
                      <span className="error-message">{errors.last_name && "Last name is required"}</span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Phone</div>
                      <input type="text" className={`${errors.phone ? "error_border" : ""}`} {...register("phone", { required: true })} />
                      <span className="error-message">{errors.phone && "Phone is required."}</span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Email Address</div>
                      <input className={`${errors.email ? "error_border" : ""}`} type="email" {...register("email", { pattern: /^\S+@\S+$/i })} />
                      <span className="error-message">{errors.email && "Please enter proper email address."}</span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Country</div>
                      <select {...register("country", { required: true })}>
                        <option>Pakistan</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Address</div>
                      <input className={`${errors.address ? "error_border" : ""}`} type="text" {...register("address", { required: true })} placeholder="Street address" />
                      <span className="error-message">{errors.address && "Address is required."}</span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Address 2</div>
                      <input type="text" {...register("address2")} placeholder="Apartment, suite, landmark" />
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Town/City</div>
                      <input type="text" className={`${errors.city ? "error_border" : ""}`} {...register("city", { required: true })} />
                      <span className="error-message">{errors.city && "City is required."}</span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Province</div>
                      <input type="text" {...register("state")} />
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Postal Code</div>
                      <input type="text" {...register("pincode")} />
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Order Notes</div>
                      <textarea className="form-control" rows="3" {...register("notes")} placeholder="Any delivery or fitting notes"></textarea>
                    </div>
                    {loggedIn ? (
                      <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input type="checkbox" id="save-address" checked={saveAddress} onChange={(event) => setSaveAddress(event.target.checked)} />
                        &ensp; <label htmlFor="save-address">Save this address to my account and replace my old default address</label>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Product <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item) => (
                            <li key={item.cartItemId || item.id}>
                              {item.title} x {item.qty}
                              {item.variantSize || item.selectedSize ? <small className="d-block">Size: {item.variantSize || item.selectedSize}</small> : null}
                              <span>
                                {symbol}
                                {item.total}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="sub-total">
                          <li>
                            Subtotal
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                          <li>
                            Shipping
                            <div className="shipping">
                              <div className="shopping-option">
                                <input type="checkbox" id="free-shipping" checked readOnly />
                                <label htmlFor="free-shipping">Confirm with team</label>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <ul className="total">
                          <li>
                            Total
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <div className="upper-box">
                          <div className="payment-options">
                            <ul>
                              <li>
                                <div className="radio-option stripe">
                                  <input type="radio" name="payment-group" id="payment-cod" defaultChecked onClick={() => setPayment("cod")} />
                                  <label htmlFor="payment-cod">Cash on Delivery / Confirm by Phone</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option stripe">
                                  <input type="radio" name="payment-group" id="payment-bank" onClick={() => setPayment("bank-transfer")} />
                                  <label htmlFor="payment-bank">Bank Transfer After Confirmation</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {cartTotal !== 0 ? (
                          <div className="text-end">
                            <button type="submit" className="btn-solid btn" disabled={placingOrder}>
                              {placingOrder ? "Placing Order..." : "Place Order"}
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
