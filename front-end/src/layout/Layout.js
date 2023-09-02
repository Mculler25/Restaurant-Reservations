import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import { today } from "../utils/date-time";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-2 side-bar bg-danger">
          <Menu />
        </div>
        <div className="col bg-dark">
          <Routes date={today()}/>
        </div>
      </div>
    </div>
  );
}

export default Layout;
