import React from 'react';
import { useRouter } from 'next/router';
import StickyPage from './product/sticky_page';
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
import ProductTab from './common/product-tab';

const Sticky = () => {
  const router = useRouter();
  const id = router.query.id || '1';

  return (
    <CommonLayout parent="home" title="product">
      <StickyPage pathId={id} />
      <ProductTab />
      <ProductSection />
    </CommonLayout>
  );
};

export default Sticky;
