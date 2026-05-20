import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Col } from "reactstrap";
import DetailsWithPrice from "../common/detail-price";

const GET_SINGLE_PRODUCTS = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      title
      description
      type
      brand
      category
      price
      new
      sale
      discount
      stock
      variants {
        id
        color
        image_id
        variant_id
        size
      }
      images {
        image_id
        src
      }
    }
  }
`;

const StickyPage = ({ pathId }) => {
  var { data } = useQuery(GET_SINGLE_PRODUCTS, {
    variables: {
      id: parseInt(pathId) || 1,
    },
  });

  const changeColorVar = () => {};

  return (
    <section>
      <div className="collection-wrapper">
        <div className="container">
          <div className="row data-sticky_parent">
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row">
                      <div
                        className="col-12 product_img_scroll image-scroll"
                        data-sticky_column
                      >
                        <div>
                          {data?.product?.images?.map((img, index) => (
                            <div key={index}>
                              <img
                                src={img.src}
                                alt=""
                                className="img-fluid blur-up lazyload"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {data ? (
                    <Col lg="6" className="rtl-text">
                      <div className="sticky-top-cls">
                        <DetailsWithPrice
                          item={data.product}
                          changeColorVar={changeColorVar}
                          stickyclassName="pro_sticky_info"
                        />
                      </div>
                    </Col>
                  ) : (
                    <Col lg="6">
                      <div className="text-center p-5">Loading...</div>
                    </Col>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyPage;
