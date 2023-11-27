import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import userImage from "./../../assets/images/default_image.png";
import { Logout } from "../../services/Services";
import { NavLink } from "react-router-dom";

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={userImage} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <NavLink
          to="/login"
          className="dropdown-item"
          onClick={() => Logout()}
          role="menuitem"
        >
          <CIcon className="me-2" icon={cilAccountLogout} /> Sign Out{" "}
        </NavLink>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
