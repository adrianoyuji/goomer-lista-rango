import React, { useEffect, useState } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import axios from "axios";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const goomer_restaurant_api = "http://challange.goomer.com.br/restaurants";

export default function Menu(props) {
  const [menu, setMenu] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState("");
  const [loading, setLoading] = useState(true);
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

  /* 
  console.log(menu);
  console.log(restaurantInfo); */

  function renderMenuPage() {
    console.log(restaurantInfo);
    return (
      <div className="menu">
        <div className="info-container">
          <div className="info-image">
            <img
              src={restaurantInfo.image}
              alt="thumb"
              height="100%"
              width="188"
            />
          </div>
          <div className="infos">
            <div className="restaurante-name">{restaurantInfo.name}</div>
            <div className="restaurante-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id
              odio in dui venenatis ornare. Integer eget est sit amet tortor
              suscipit porttitor. Quisque eget pulvinar nulla. Maecenas posuere
              mauris in egestas mollis.
            </div>
          </div>
        </div>
        <SearchBar title="Buscar no Cardápio" />
      </div>
    );
  }

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
