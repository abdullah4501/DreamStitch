import React from "react";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  detailClass,
  title,
  des,
}) => {
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }

  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        {title !== "Product style 4" ? (
          <div className="rating">{RatingStars}</div>
        ) : (
          ""
        )}
        <h6>{product.title}</h6>
        {des ? <p>{product.description}</p> : ""}
        <h4>
          {currency.symbol}
          {(
            (product.price - (product.price * product.discount) / 100) *
            currency.value
          ).toFixed(2)}
          <del>
            <span className="money">
              {currency.symbol}
              {(product.price * currency.value).toFixed(2)}
            </span>
          </del>
        </h4>

      </div>
    </div>
  );
};

export default MasterProductDetail;
