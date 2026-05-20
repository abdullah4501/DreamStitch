import React, { Fragment } from "react";
import Slider from "react-slick";
import MasterBanner from "./MasterBanner";

const Data = [
  {
    img: "home1",
    title: "Dream Stitch",
    desc: "Men's Collection",
    link: "/shop/six_grid",
    btn: "Shop Now",
  },
  {
    img: "home2",
    title: "Crafted for You",
    desc: "Made to Order",
    link: "/page/account/contact",
    btn: "Order Now",
  },
];

const Banner = () => {
  return (
    <Fragment>
      <section className="p-0">
        <Slider className="slide-1 home-slider">
          {Data.map((data, i) => (
            <MasterBanner
              key={i}
              img={data.img}
              desc={data.desc}
              title={data.title}
              link={data.link}
              btn={data.btn}
            />
          ))}
        </Slider>
      </section>
    </Fragment>
  );
};

export default Banner;
