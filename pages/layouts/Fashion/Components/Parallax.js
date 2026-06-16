import React, { Fragment } from "react";
import MasterParallaxBanner from "./MasterParallaxBanner";

const Parallax = () => {
  return (
    <Fragment>
      <MasterParallaxBanner
        bg="parallax-banner1"
        parallaxClass="text-center p-left"
        title="Dream Stitch"
        subTitle1="Crafted for the Modern Man"
        subTitle2="Premium sherwani, Jodhpuri suits, waistcoat sets, and formal menswear tailored for weddings and special occasions."
      />
    </Fragment>
  );
};

export default Parallax;
