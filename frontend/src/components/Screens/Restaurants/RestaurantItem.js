import React, { useState, useEffect } from "react";
import "./Restaurants.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import setInverval from "../../../utils/index";

//code understands that if no object hours does not exist the store is open

export default function RestaurantItem(props) {
  const [open, setOpen] = useState(true);
  var date, weekDay, now;
  function checkOpen() {
    date = new Date();
    weekDay = date.getDay() + 1;
    now = date.getHours() * 60 + date.getMinutes();
    if (!!props.restaurant.hours) {
      var teste = 1;
      //verifies if object hours exists and prevent errors
      props.restaurant.hours.forEach((element) => {
        if (element.days.find((day) => day === weekDay) && teste) {
          let [startHour, startMin] = element.from.split(":");
          let start = parseFloat(startHour) * 60 + parseFloat(startMin);
          let [endHour, endMin] = element.to.split(":");
          let end = parseFloat(endHour) * 60 + parseFloat(endMin);
          if (end < 360 && now < 1440) {
            //checks if object 'to' is under 6 AM and current time is below 11:59PM adds an extra 24 hours worth of minutes to total
            end = end + 1440;
          }
          if (start <= now && now <= end) {
            setOpen(true);
            teste = 0;
          } else {
            setOpen(false);
          }
        }
      });
    }
  }

  useEffect(() => {
    checkOpen();
  }, []); //runs function to check if restaurant is open

  setInverval(() => {
    checkOpen();
  }, 1000); //loops function with a set delay value,check utils folder for code

  return (
    <div
      className="restaurante-item"
      onClick={() => props.setRestaurantId(props.restaurant.id)}
    >
      <div className="image-container">
        <img
          src={props.restaurant.image}
          alt="thumb"
          height="100%"
          width="100%"
        />
      </div>
      <div className="restaurant-info">
        <div className="restaurante-name">{props.restaurant.name}</div>
        <div className="restaurant-address">{props.restaurant.address}</div>
      </div>
      <div className="open-container">
        {open ? (
          <div className="open">
            <FontAwesomeIcon icon={faCheck} className="icon" size="lg" />
            Aberto
          </div>
        ) : (
          <div className="closed">
            <FontAwesomeIcon icon={faTimes} className="icon" size="lg" />
            Fechado
          </div>
        )}
      </div>
    </div>
  );
}
