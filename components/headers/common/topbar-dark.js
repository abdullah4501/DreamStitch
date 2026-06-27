import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { clearAuth, isLoggedIn } from "../../../helpers/auth";

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuth = () => setLoggedIn(isLoggedIn());
    syncAuth();
    window.addEventListener("storage", syncAuth);
    router.events.on("routeChangeComplete", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      router.events.off("routeChangeComplete", syncAuth);
    };
  }, [router.events]);

  const Logout = () => {
    clearAuth();
    setLoggedIn(false);
    router.push("/page/account/login");
  };
  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Welcome to Dream Stitch</li>
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: +92 329-8386422
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  {/* <a> */}
                  <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  {/* </a> */}
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> My Account
                <ul className="onhover-show-div">
                  {loggedIn ? (
                    <>
                      <li>
                        <Link href="/page/account/profile">
                          <span style={{ fontWeight: 600 }}>Profile</span>
                        </Link>
                      </li>
                      <li onClick={() => Logout()}>
                        <a style={{ color: "#c0392b", cursor: "pointer", fontWeight: 600 }}>Logout</a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link href="/page/account/register">
                          <span style={{ color: "#2f7d32", fontWeight: 600 }}>Register</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page/account/login">
                          <span style={{ color: "#2f7d32", fontWeight: 600 }}>Login</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
