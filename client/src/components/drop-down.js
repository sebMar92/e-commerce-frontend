import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DropDown(tittle, array) {
  const [dropDown, setDropDown] = useState(false);
  const openCloseDrop = () => {
    setDropDown(!dropDown);
  };
  const handleClick = (e) => {
    const { value } = e.target;
    e.preventDefault();
    if (tittle === "Category") {
      <Link to={`/products/${value}`}></Link>;
    } else if (tittle === "Notifications") {
      <Link to={`/notifications/${value}`}></Link>;
    } else {
      // shopping cart
      <Link to={`/shopping/${value}`}></Link>;
    }
  };

  return (
    <div className="DropDown">
      <Dropdown isOpen={dropDown} toggle={openCloseDrop}>
        <DropdownToggle caret>${tittle}</DropdownToggle>
        <DropdownMenu>
          $
          {array.length?.map((i) => (
            <DropdownItem onClick={handleClick} value={i.name}>
              ${i.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
