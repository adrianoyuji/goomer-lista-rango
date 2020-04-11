import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Restaurants.css";
import SearchBar from "../../SearchBar/SearchBar";
import RestaurantItem from "./RestaurantItem";

const goomer_restaurant_api = "http://challange.goomer.com.br/restaurants";

export default function Restaurants(props) {
  const [restaurantList, setRestaurantList] = useState("");
  const [loading, setLoading] = useState(true);

  //Busca lista de restaurantes utilizando axios e o endereço da api
  useEffect(() => {
    axios
      .get(goomer_restaurant_api)
      .then((response) => {
        setRestaurantList(response.data);
        setLoading(false);
      })
      .catch((error) => alert("Error"));
  }, []);

  console.log(restaurantList);

  return (
    <div className="restaurant">
      <h1>Seja bem-vindo!</h1>
      <SearchBar title="Pesquisar Restaurantes" />
      <div className="restaurant-list">
        {loading ? (
          <div className="loading">Carregando, por favor aguarde...</div>
        ) : (
          restaurantList.map((restaurant, index) => (
            <RestaurantItem
              key={index}
              restaurant={restaurant}
              setRestaurantId={props.setRestaurantId}
            />
          ))
        )}
      </div>
    </div>
  );
}
