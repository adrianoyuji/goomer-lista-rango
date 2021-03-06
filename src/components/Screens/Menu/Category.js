import React, { useState } from "react";
import "./Category.css";
import FoodItem from "./FoodItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

/*This component renders categories bars inside a menu
props.category:{
  0:String //restaurante name
  1:array with products
}
*/

export default function Category(props) {
  const [open, setOpen] = useState(false);

  //renders when category is clicked to be expanded
  function renderOpen() {
    return (
      <>
        <div className="category-box" onClick={() => setOpen(false)}>
          <div className="category-title">{props.category[0]}</div>
          <FontAwesomeIcon
            icon={faChevronUp}
            size="2x"
            className="category-icon"
          />
        </div>
        <div className="category-list">
          {props.category[1].map((food, index) => (
            <FoodItem food={food} key={index} />
          ))}
        </div>
      </>
    );
  }

  //renders when category is clicked to be closed
  function renderClosed() {
    return (
      <div className="category-box" onClick={() => setOpen(true)}>
        <div className="category-title">{props.category[0]}</div>
        <FontAwesomeIcon
          icon={faChevronDown}
          size="2x"
          className="category-icon"
        />
      </div>
    );
  }

  return (
    <div className="category-container">
      {open ? renderOpen() : renderClosed()}
    </div>
  );
}
