import React from 'react';
import { useRouter } from 'next/router';
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
import ProductTab from './common/product-tab';
import StickyPage from './product/sticky_page';

const ProductDetail = () => {
  const router = useRouter();
  const id = router.query.id;

  return (
    <CommonLayout parent="Home" title="Product">
      <StickyPage pathId={id} />
      <ProductTab />
      <ProductSection />
    </CommonLayout>
  );
};

export default ProductDetail;
