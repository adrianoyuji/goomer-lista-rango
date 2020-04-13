import React, { useState, useEffect } from "react";
import "./FoodItem.css";
import setInverval from "../../../utils/index";

export default function FoodItem(props) {
  const [price, setPrice] = useState("");
  const [onSale, setSale] = useState(false);

  var date, weekDay, now;

  //checks if food item has a image, if it doesn't gives a 'no image' placeholder
  if (!props.food.image) {
    props.food.image =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  }
  //special function to detect if product is on sale or not as well if it even has a price
  function checkPrice() {
    date = new Date();
    weekDay = date.getDay() + 1;
    now = date.getHours() * 60 + date.getMinutes();
    if (!!props.food.sales) {
      props.food.sales.forEach((sale) => {
        sale.hours.forEach((hours) => {
          if (hours.days.find((day) => weekDay === day)) {
            let [startHour, startMin] = hours.from.split(":");
            let start = parseFloat(startHour) * 60 + parseFloat(startMin);
            let [endHour, endMin] = hours.to.split(":");
            let end = parseFloat(endHour) * 60 + parseFloat(endMin);
            if (start <= now && now <= end) {
              setSale(true);
              setPrice(`R$ ${props.food.sales[0].price.toFixed(2)}`);
            } else {
              setPrice(`R$ ${props.food.price.toFixed(2)}`);
            }
          } else {
            setPrice(`R$ ${props.food.price.toFixed(2)}`);
          }
        });
      });
    } else if (!!props.food.price) {
      setPrice(`R$ ${props.food.price.toFixed(2)}`);
    } else {
      setPrice("Gratuito!!!");
    }
  }

  useEffect(() => {
    checkPrice();
  }, []);

  setInverval(() => {
    checkPrice();
  }, 1000); //loops function with a set delay value,check utils folder for code

  return (
    <div className="item-container">
      <div className="image-container">
        <img src={props.food.image} alt="thumb" height="100%" width="100%" />
      </div>
      <div className="food-info">
        <div className="food-name"> {props.food.name}</div>
        <div className="food-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </div>
        <div className="food-price-info">
          <div className="food-price">{price}</div>
          <div className="food-discount">
            {onSale ? <div>R$ {props.food.price.toFixed(2)}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
