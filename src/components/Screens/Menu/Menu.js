import React, { useEffect, useState } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import axios from "axios";
import "./Menu.css";
import Category from "./Category";
import FoodItem from "./FoodItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const goomer_restaurant_api = "http://challange.goomer.com.br/restaurants";

export default function Menu(props) {
  const [menu, setMenu] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  //gets restaurant's menu and restaurant's information
  useEffect(() => {
    axios
      .get(
        `https://challange.goomer.com.br/restaurants/${props.restaurantId}/menu`
      )
      .then((resp) => {
        setMenu(resp.data);
      })
      .catch((error) => alert("Error while getting menu"));

    axios
      .get(goomer_restaurant_api)
      .then((response) => {
        let aux = response.data.filter(
          (restaurant) => restaurant.id === props.restaurantId
        );
        aux.map((item) => setRestaurantInfo(item));
        setLoading(false);
      })
      .catch((error) => alert("Error while getting restaurant list"));
  }, []);

  //renders menu page with categories and menu items, also filters searchbar inputs
  function renderMenuPage() {
    let categories = _.groupBy(menu, "group");
    categories = Object.entries(categories);

    var filteredList = categories.map((category) =>
      category[1].filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    return (
      <div className="menu">
        <div className="info-container">
          <div className="info-image">
            <img
              src={restaurantInfo.image}
              alt="thumb"
              height="100%"
              width="100%"
            />
          </div>
          <div className="infos">
            <div className="restaurante-name">{restaurantInfo.name}</div>
            <div className="restaurant-hours">
              {restaurantInfo.hours
                ? restaurantInfo.hours.map((hours, index) =>
                    renderHours(hours, index)
                  )
                : null}
            </div>
          </div>
        </div>
        <SearchBar title="Buscar no Cardápio" handleChange={handleChange} />
        <div className="categories">
          {searchText ? (
            <div className="filtered-list">
              {filteredList.map((foods) =>
                foods.map((food, index) => <FoodItem food={food} key={index} />)
              )}
            </div>
          ) : (
            categories.map((category, index) => (
              <Category category={category} key={index} />
            ))
          )}
        </div>
      </div>
    );
  }

  //Returns an html tag with the restaurant's schedules
  function renderHours(hours, index) {
    let start, end;

    switch (hours.days[0]) {
      case 1:
        start = "Domingo";
        break;
      case 2:
        start = "Segunda";
        break;
      case 3:
        start = "Terça";
        break;
      case 4:
        start = "Quarta";
        break;
      case 5:
        start = "Quinta";
        break;
      case 6:
        start = "Sexta";
        break;
      case 7:
        start = "Sábado";
        break;
      default:
        start = "";
        break;
    }
    switch (hours.days[hours.days.length - 1]) {
      case 1:
        end = "Domingo";
        break;
      case 2:
        end = "Segunda";
        break;
      case 3:
        end = "Terça";
        break;
      case 4:
        end = "Quarta";
        break;
      case 5:
        end = "Quinta";
        break;
      case 6:
        end = "Sexta";
        break;
      case 7:
        end = "Sábado";
        break;
      default:
        start = "";
        break;
    }
    let days = start + " à " + end + ":";
    let time = hours.from + " às " + hours.to;
    return (
      <div key={index} className="flex-row">
        <div className="days"> {days}</div>
        <div className="hours">{time}</div>
      </div>
    );
  }

  //handles search bar text changes
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <div className="backbutton" onClick={() => props.setRestaurantId("")}>
        <FontAwesomeIcon icon={faChevronLeft} className="icon" />
        Voltar
      </div>
      {loading ? (
        <div className="loading">Carregando, por favor aguarde...</div>
      ) : (
        renderMenuPage()
      )}
    </div>
  );
}
