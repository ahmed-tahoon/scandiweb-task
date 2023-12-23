import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />
        <div className="main-content">
          {props.children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
