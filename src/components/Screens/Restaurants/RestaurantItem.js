import React, { useState, useEffect } from "react";
import "./RestaurantItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import setInverval from "../../../utils/index";

//code understands that if no object hours does not exist the store is open
/*
props.restaurant :{
id: Float
name: String
address: String
hours: Array
        hours: Array
            from: String
            to: String
            days: Array
                 0:Float
image: String}
 */

export default function RestaurantItem(props) {
  const [open, setOpen] = useState(true);
  var date, weekDay, now;
  /*Function checks current time and compares if it is in range of the object 'to' and 'from' to tell if the restaurant is open */
  function checkOpen() {
    date = new Date();
    weekDay = date.getDay() + 1;
    now = date.getHours() * 60 + date.getMinutes();
    if (!!props.restaurant.hours) {
      var stopCondition = 1; //this serves as a stopping condition in order to prevent this function from checking uneccessary time schedules
      //verifies if object hours exists and prevent errors
      props.restaurant.hours.forEach((restaurant) => {
        if (restaurant.days.find((day) => day === weekDay) && stopCondition) {
          let [startHour, startMin] = restaurant.from.split(":");
          let start = parseFloat(startHour) * 60 + parseFloat(startMin);
          let [endHour, endMin] = restaurant.to.split(":");
          let end = parseFloat(endHour) * 60 + parseFloat(endMin);
          if (end < 360 && now < 1440) {
            //checks if object 'to' is under 6 AM and current time is below 11:59PM adds an extra 24 hours worth of minutes to total
            end = end + 1440;
          }
          if (start <= now && now <= end) {
            setOpen(true);
            stopCondition = 0;
          } else {
            setOpen(false);
          }
        }
      });
    } else setOpen(true);
  }

  useEffect(() => {
    checkOpen();
  }, []); //runs function to check if restaurant is open

  setInverval(() => {
    //loops function with a set delay value,check utils folder for code
    checkOpen();
  }, 1000); // 1 second

  return (
    <div
      className="restaurant-item"
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
        <div className="restaurant-name">{props.restaurant.name}</div>
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
