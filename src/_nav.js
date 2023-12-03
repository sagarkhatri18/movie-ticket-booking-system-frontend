import React from "react";
import CIcon from "@coreui/icons-react";
import { cilCouch, cilMovie, cilSpeedometer } from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Movie",
  },
  {
    component: CNavItem,
    name: "Movie",
    to: "/movie",
    icon: <CIcon icon={cilMovie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Theatre",
    to: "/theatre",
    icon: <CIcon icon={cilCouch} customClassName="nav-icon" />,
  },
];

export default _nav;
