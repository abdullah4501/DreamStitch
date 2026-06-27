import React, { useEffect, useState } from "react";

export const PRODUCT_PLACEHOLDER = "/assets/images/placeholder.png";

const ProductImage = ({ src, alt = "", className = "", delay = 250, ...props }) => {
  const [displaySrc, setDisplaySrc] = useState(PRODUCT_PLACEHOLDER);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      if (!src) return;
      const image = new Image();
      image.onload = () => {
        if (mounted) setDisplaySrc(src);
      };
      image.onerror = () => {
        if (mounted) setDisplaySrc(PRODUCT_PLACEHOLDER);
      };
      image.src = src;
    }, delay);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [src, delay]);

  return <img src={displaySrc} alt={alt} className={className} {...props} />;
};

export default ProductImage;
