import React, { useState, useEffect } from "react";

const TapTop = () => {
  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 500;
        setGoingUp((current) =>
          current === shouldShow ? current : shouldShow
        );
        animationFrame = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const tapToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };
  return (
    <div
      className="tap-top top-cls"
      style={goingUp ? { display: "block" } : { display: "none" }}
      onClick={tapToTop}
    >
      <div>
        <i className="fa fa-angle-double-up"></i>
      </div>
    </div>
  );
};

export default TapTop;
