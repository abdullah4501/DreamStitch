import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import MasterProductDetail from "./MasterProductDetail";
import ProductImage from "../ProductImage";

const ProductItem = ({ product, addCart, backImage, des, addWishlist, cartClass, productDetail, addCompare, title }) => {
  // eslint-disable-next-line
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const setQuantity = cartContext.setQuantity;

  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const toggleCompare = () => setModalCompare(!modalCompare);
  const toggle = () => setModal(!modal);

  const onClickHandle = (event, img) => {
    event.preventDefault();
    event.stopPropagation();
    setImage(img);
  };

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = () => {
    const titleProps = product.title.split(" ").join("");
    router.push(`/product-details/${product.id}` + "-" + `${titleProps}`);
  };

  const runCardAction = async (event, actionName, action) => {
    event.preventDefault();
    event.stopPropagation();
    if (!action || actionLoading) return;

    setActionLoading(actionName);
    try {
      await action();
    } finally {
      setTimeout(() => setActionLoading(""), 250);
    }
  };

  return (
    <div className={`product-box product-wrap ${actionLoading ? "product-card-busy" : ""}`} onClick={clickProductDetail} role="button" tabIndex={0}>
      {actionLoading ? (
        <div className="product-card-action-loader">
          <span className="loader-ring"></span>
          <strong>
            {actionLoading === "cart"
              ? "Adding to cart"
              : actionLoading === "wishlist"
              ? "Saving item"
              : "Updating"}
          </strong>
        </div>
      ) : null}
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new === true ? <span className="lable3">new</span> : ""}
          {product.sale === true ? <span className="lable4">on sale</span> : ""}
        </div>
        <div className="front">
          <ProductImage src={image ? image : product.images[0]?.src} className="img-fluid" alt={product.title} />
        </div>
        {backImage ? (
          product.images[1] === "undefined" ? (
            "false"
          ) : (
            <div className="back">
              <ProductImage src={image ? image : product.images[1]?.src} className="img-fluid m-auto" alt={product.title} />
            </div>
          )
        ) : (
          ""
        )}

        <div className={cartClass}>
          <button title="Add to cart" onClick={(event) => runCardAction(event, "cart", addCart)} disabled={actionLoading === "cart"}>
            <i className={`fa ${actionLoading === "cart" ? "fa-spinner fa-spin" : "fa-shopping-cart"}`} aria-hidden="true"></i>
          </button>
          <a href={null} title="Add to Wishlist" onClick={(event) => runCardAction(event, "wishlist", addWishlist)}>
            <i className={`fa ${actionLoading === "wishlist" ? "fa-spinner fa-spin" : "fa-heart"}`} aria-hidden="true"></i>
          </a>
          <a href={null} title="Quick View" onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggle(); }}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
          <a href={null} title="Compare" onClick={(event) => runCardAction(event, "compare", () => { toggleCompare(); return addCompare && addCompare(); })}>
            <i className={`fa ${actionLoading === "compare" ? "fa-spinner fa-spin" : "fa-refresh"}`} aria-hidden="true"></i>
          </a>
          <Modal isOpen={modalCompare} toggle={toggleCompare} size="lg" centered>
            <ModalBody onClick={(event) => event.stopPropagation()}>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    <ProductImage src={product.variants && image ? image : product.images[0]?.src} alt={product.title} className="img-fluid" />
                    <div className="media-body align-self-center text-center">
                      <h5>
                        <i className="fa fa-check"></i>Item <span>{product.title} </span>
                        <span> successfully added to your Compare list</span>
                      </h5>
                      <div className="buttons d-flex justify-content-center">
                        <Link href="/page/compare">
                          <button className="btn-sm btn-solid" onClick={(event) => { event.stopPropagation(); }}>
                            View Compare list
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
        {product.images ? (
          <ul className="product-thumb-list">
            {product.images.map((img, i) => (
              <li className={`grid_thumb_img ${img.src === image ? "active" : ""}`} key={i}>
                <a href={null} title="Add to Wishlist">
                  <ProductImage src={img.src} alt={product.title} onClick={(event) => onClickHandle(event, img.src)} />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <MasterProductDetail product={product} productDetail={productDetail} currency={currency} title={title} des={des} />
      <Modal isOpen={modal} toggle={toggle} className="modal-lg quickview-modal" centered>
        <ModalBody onClick={(event) => event.stopPropagation()}>
          <Row>
            <Col lg="6" xs="12">
              <div className="quick-view-img">
                <ProductImage src={product.variants && image ? image : product.images[0]?.src} alt={product.title} className="img-fluid" />
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right">
                <button type="button" data-dismiss="modal" className="btn-close btn btn-secondary" aria-label="Close" onClick={toggle}></button>
                <h2> {product.title} </h2>
                <h3>
                  {currency.symbol}
                  {(product.price * currency.value).toFixed(2)}
                </h3>
                <div className="border-product">
                  <h6 className="product-title">product details</h6>
                  <p>{product.description}</p>
                </div>
                <div className="product-description border-product">
                  {product.size ? (
                    <div className="size-box">
                      <ul>
                        {product.size.map((size, i) => {
                          return (
                            <li key={i}>
                              <a href={null}>{size}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <h6 className="product-title">quantity</h6>
                  <div className="qty-box">
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <button type="button" className="btn quantity-left-minus" onClick={minusQty} data-type="minus" data-field="">
                          <i className="fa fa-angle-left"></i>
                        </button>
                      </span>
                      <input type="text" name="quantity" value={quantity} onChange={changeQty} className="form-control input-number" />
                      <span className="input-group-prepend">
                        <button type="button" className="btn quantity-right-plus" onClick={() => plusQty(product)} data-type="plus" data-field="">
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product-buttons">
                  <button className="btn btn-solid" onClick={() => addCart(product)}>
                    add to cart
                  </button>
                  <button className="btn btn-solid" onClick={(event) => { event.stopPropagation(); clickProductDetail(); }}>
                    View detail
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductItem;
