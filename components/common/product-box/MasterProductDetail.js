import React from "react";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  detailClass,
  title,
  des,
}) => {
  const rating = Number(product.rating) || 5;
  const RatingStars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const className =
      rating >= starValue
        ? "fa fa-star"
        : rating >= starValue - 0.5
        ? "fa fa-star-half-o"
        : "fa fa-star-o";

    return <i className={className} key={index}></i>;
  });

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
          {Number(product.discount) > 0 ? (
            <del>
              <span className="money">
                {currency.symbol}
                {(product.price * currency.value).toFixed(2)}
              </span>
            </del>
          ) : (
            ""
          )}
        </h4>

      </div>
    </div>
  );
};

export default MasterProductDetail;
