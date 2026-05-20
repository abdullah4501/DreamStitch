import React, { Fragment } from "react";
import Link from "next/link";

const LogoImage = ({ logo }) => {
  return (
    <Fragment>
      <Link href={"/"}>
        <img
          src={`/assets/images/icon/logo-2.png`}
          alt="Dream Stitch"
          className="img-fluid"
          style={{ maxHeight: "80px" }}
        />
      </Link>
    </Fragment>
  );
};

export default LogoImage;
