import React, { useState, useEffect } from "react";
import Context from "./index";
import { toast } from "react-toastify";
import { gql, useApolloClient } from "@apollo/client";

const CART_QUERY = gql`
  query Cart($sessionId: String) {
    cart(sessionId: $sessionId) {
      id
      subtotal
      totalItems
      items {
        id
        productId
        variantId
        variantSize
        quantity
        price
        total
        product {
          id
          title
          price
          discount
          stock
          images {
            src
          }
        }
      }
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($sessionId: String, $productId: Int!, $variantId: String, $quantity: Int!) {
    addToCart(sessionId: $sessionId, productId: $productId, variantId: $variantId, quantity: $quantity) {
      id
      subtotal
      totalItems
      items {
        id
        productId
        variantId
        variantSize
        quantity
        price
        total
        product {
          id
          title
          price
          discount
          stock
          images {
            src
          }
        }
      }
    }
  }
`;

const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($cartItemId: ID!, $quantity: Int!) {
    updateCartItem(cartItemId: $cartItemId, quantity: $quantity) {
      id
      subtotal
      totalItems
      items {
        id
        productId
        variantId
        variantSize
        quantity
        price
        total
        product {
          id
          title
          price
          discount
          stock
          images {
            src
          }
        }
      }
    }
  }
`;

const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($cartItemId: ID!) {
    removeCartItem(cartItemId: $cartItemId) {
      id
      subtotal
      totalItems
      items {
        id
        productId
        variantId
        variantSize
        quantity
        price
        total
        product {
          id
          title
          price
          discount
          stock
          images {
            src
          }
        }
      }
    }
  }
`;

const CLEAR_CART = gql`
  mutation ClearCart($sessionId: String) {
    clearCart(sessionId: $sessionId) {
      id
      subtotal
      totalItems
      items {
        id
        productId
        variantId
        variantSize
        quantity
        price
        total
        product {
          id
          title
          price
          discount
          stock
          images {
            src
          }
        }
      }
    }
  }
`;

const getSessionId = () => {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("dreamStitchCartSessionId");
  if (!sessionId) {
    sessionId = `ds-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("dreamStitchCartSessionId", sessionId);
  }
  return sessionId;
};

const mapCartItems = (cart) =>
  (cart?.items || []).map((item) => ({
    ...item.product,
    cartItemId: item.id,
    variantId: item.variantId,
    variantSize: item.variantSize,
    selectedSize: item.variantSize,
    qty: item.quantity,
    price: item.price,
    total: item.total,
  }));

const CartProvider = (props) => {
  const client = useApolloClient();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("InStock");

  useEffect(() => {
    const loadCart = async () => {
      try {
        const { data } = await client.query({
          query: CART_QUERY,
          variables: { sessionId: getSessionId() },
          fetchPolicy: "network-only",
        });
        setCartItems(mapCartItems(data.cart));
        setCartTotal(data.cart?.subtotal || 0);
      } catch (error) {
        setCartItems([]);
        setCartTotal(0);
      }
    };

    loadCart();
  }, [client]);

  const applyCart = (cart) => {
    setCartItems(mapCartItems(cart));
    setCartTotal(cart?.subtotal || 0);
  };

  // Add Product To Cart
  const addToCart = async (item, quantityValue = 1) => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_TO_CART,
        variables: {
          sessionId: getSessionId(),
          productId: Number(item.id),
          variantId: item.selectedVariantId || item.variants?.[0]?.variant_id || item.variantId || "",
          quantity: Number(quantityValue) || 1,
        },
      });
      applyCart(data.addToCart);
      toast.success("Product Added Successfully !");
    } catch (error) {
      toast.error(error.message || "Unable to add product to cart.");
    }
  };

  const removeFromCart = async (item) => {
    try {
      const { data } = await client.mutate({
        mutation: REMOVE_CART_ITEM,
        variables: { cartItemId: item.cartItemId },
      });
      applyCart(data.removeCartItem);
      toast.error("Product Removed Successfully !");
    } catch (error) {
      toast.error(error.message || "Unable to remove product.");
    }
  };

  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("InStock");
    }
  };

  const plusQty = (item) => {
    if (item.stock >= quantity) {
      setQuantity(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };

  // Update Product Quantity
  const updateQty = async (item, quantityValue) => {
    const nextQuantity = Number(quantityValue);
    if (nextQuantity >= 1) {
      try {
        const { data } = await client.mutate({
          mutation: UPDATE_CART_ITEM,
          variables: { cartItemId: item.cartItemId, quantity: nextQuantity },
        });
        applyCart(data.updateCartItem);
        toast.info("Product Quantity Updated !");
      } catch (error) {
        toast.error(error.message || "Unable to update quantity.");
      }
    } else {
      toast.error("Enter Valid Quantity !");
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await client.mutate({
        mutation: CLEAR_CART,
        variables: { sessionId: getSessionId() },
      });
      applyCart(data.clearCart);
    } catch (error) {
      setCartItems([]);
      setCartTotal(0);
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        updateQty: updateQty,
        clearCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;
