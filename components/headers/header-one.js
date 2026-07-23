import React, { useState, useEffect } from "react";
import NavBar from "./common/navbar";
import Cart from "../containers/Cart";
import CartContainer from "../containers/CartContainer";
import TopBarDark from "./common/topbar-dark";
import { Media, Container, Row, Col } from "reactstrap";
import LogoImage from "./common/logo";
import search from "../../public/assets/images/icon/search.png";
import cart from "../../public/assets/images/icon/cart.png";
import SearchOverlay from "./common/search-overlay";

const HeaderOne = ({ logoName, headerClass, topClass, noTopBar, direction }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const header = document.getElementById("sticky");
    let animationFrame = 0;
    let isFixed = false;

    const updateHeader = () => {
      const shouldFix = window.scrollY >= 300 && window.innerWidth >= 581;
      if (shouldFix !== isFixed) {
        header?.classList.toggle("fixed", shouldFix);
        isFixed = shouldFix;
      }
      animationFrame = 0;
    };
    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateHeader);
      }
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    updateHeader();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  const toggleDark = () => {
    document.body.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <div>
      <header id="sticky" className={`sticky ${headerClass}`}>
        <div className="mobile-fix-option"></div>
        {noTopBar ? "" : <TopBarDark topClass={topClass} />}

        <Container>
          <Row>
            <Col>
              <div className="main-menu">
                <div className="menu-left">
                  <div className="brand-logo">
                    <LogoImage logo={logoName} />
                  </div>
                </div>
                <div className="menu-right pull-right">
                  <NavBar />
                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search">
                          <div>
                            <Media src={search.src} onClick={openSearch} className="img-fluid" alt="" />
                            <i className="fa fa-search" onClick={openSearch}></i>
                          </div>
                        </li>
                        <li className="onhover-div" onClick={toggleDark} style={{ cursor: "pointer" }}>
                          <div>
                            <i className={`fa ${isDark ? "fa-sun-o" : "fa-moon-o"}`} aria-hidden="true" style={{ fontSize: "18px" }}></i>
                          </div>
                        </li>
                        {direction === undefined ? (
                          <CartContainer layout={direction} icon={cart.src} />
                        ) : (
                          <Cart layout={direction} icon={cart.src} />
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <SearchOverlay />
    </div>
  );
};

export default HeaderOne;
