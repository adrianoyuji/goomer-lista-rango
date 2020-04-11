import React, { useState, useEffect } from "react";
import "./Restaurants.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//O algoritmo entende que quando não há o objeto Hour que o restaurante se encontra aberto

export default function RestaurantItem(props) {
  const [open, setOpen] = useState(true);
  var date = new Date();
  const weekDay = date.getDay() + 1;
  const now = date.getHours() * 60 + date.getMinutes();

  useEffect(() => {
    if (!!props.restaurant.hours) {
      //verifies if object hours exists and prevent errors
      props.restaurant.hours.forEach((element) => {
        if (element.days.find((day) => day === weekDay)) {
          let [startHour, startMin] = element.from.split(":");
          let start = parseFloat(startHour) * 60 + parseFloat(startMin);
          let [endHour, endMin] = element.to.split(":");
          let end = parseFloat(endHour) * 60 + parseFloat(endMin);
          if (start <= now && now <= end) {
            setOpen(true);
          } else {
            setOpen(false);
          }
        }
      });
    }
  }, []);
  //console.log(props.restaurant);

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
          width="128"
        />
      </div>
      <div className="restaurant-info">
        <div className="restaurante-name">{props.restaurant.name}</div>
        <div className="restaurant-address">{props.restaurant.address}</div>
      </div>
      <div className="open-container">
        {open ? (
          <div className="open">
            <FontAwesomeIcon icon={faCheck} />
            Aberto
          </div>
        ) : (
          <div className="closed">
            {" "}
            <FontAwesomeIcon icon={faTimes} />
            Fechado
          </div>
        )}
      </div>
    </div>
  );
}
