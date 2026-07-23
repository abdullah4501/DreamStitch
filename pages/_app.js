import React from "react";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
// import MessengerCustomerChat from "react-messenger-customer-chat";
import CartContextProvider from "../helpers/cart/CartContext";
import { WishlistContextProvider } from "../helpers/wishlist/WishlistContext";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import { CompareContextProvider } from "../helpers/Compare/CompareContext";
import { CurrencyContextProvider } from "../helpers/Currency/CurrencyContext";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../helpers/apollo";

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <>
          {/* <MessengerCustomerChat
            pageId="2123438804574660"
            appId="406252930752412"
            htmlRef="https://connect.facebook.net/en_US/sdk.js"
          /> */}
          <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta
                name="description"
                content="Dream Stitch creates premium men's wear, including sherwani, Jodhpuri suits, kurta shalwar, waistcoats, and formal suits tailored with care."
              />
              <meta
                name="keywords"
                content="Dream Stitch, menswear, sherwani, Jodhpuri suit, kurta shalwar, formal suits, Pakistani men's wear"
              />
              {/* <Head>
              <link rel="icon" type="image/x-icon" href={favicon} />
            </Head> */}
              <title>Dream Stitch | Premium Men's Wear</title>
            </Head>
          <div>
              <SettingProvider>
                <CompareContextProvider>
                  <CurrencyContextProvider>
                    <CartContextProvider>
                      <WishlistContextProvider>
                        <FilterProvider>
                          <Component {...pageProps} />
                        </FilterProvider>
                      </WishlistContextProvider>
                    </CartContextProvider>
                  </CurrencyContextProvider>
                </CompareContextProvider>
              </SettingProvider>
              <ToastContainer />
              <TapTop />
          </div>
        </>
      </ApolloProvider>
    </>
  );
}
