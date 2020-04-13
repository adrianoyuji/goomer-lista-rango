import React from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(props) {
  return (
    <div className="SearchBar">
      <div className="title-container">
        <div className="search-title">{props.title}</div>
      </div>
      <div className="input-container">
        <input type="text" onChange={props.handleChange} />
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faSearch} size="1x" color="black" />
      </div>
    </div>
  );
}