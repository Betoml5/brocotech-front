import React from "react";
import Alert from "./Alert";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default Layout;
