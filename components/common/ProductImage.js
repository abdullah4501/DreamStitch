import React, { useCallback } from "react";

export const PRODUCT_PLACEHOLDER = "/assets/images/placeholder.png";

const ProductImage = ({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  decoding = "async",
  onError,
  ...props
}) => {
  const handleError = useCallback(
    (event) => {
      const image = event.currentTarget;
      if (image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.src = PRODUCT_PLACEHOLDER;
      onError?.(event);
    },
    [onError]
  );

  return (
    <img
      src={src || PRODUCT_PLACEHOLDER}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      {...props}
    />
  );
};

export default React.memo(ProductImage);
