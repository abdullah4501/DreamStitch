import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { isLoggedIn } from "../../../helpers/auth";
import CheckoutPage from "./common/checkout-page";
import Login from "./login";

const Checkout = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    setCurrentUser(isLoggedIn());
    setAuthChecked(true);
  }, []);

  if (!authChecked) return null;

  return currentUser ? (
    <CommonLayout parent="home" title="checkout">
      <CheckoutPage />
    </CommonLayout>
  ) : (
    <Login />
  );
};

export default Checkout;