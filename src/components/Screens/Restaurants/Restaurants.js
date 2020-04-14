import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Restaurants.css";
import SearchBar from "../../SearchBar/SearchBar";
import RestaurantItem from "./RestaurantItem";

const goomer_restaurant_api = "http://challange.goomer.com.br/restaurants";

/* this component renders all the available restaurants gotten from the api */

export default function Restaurants(props) {
  const [restaurantList, setRestaurantList] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  //Busca lista de restaurantes utilizando axios e o endereço da api
  useEffect(() => {
    axios
      .get(goomer_restaurant_api)
      .then((response) => {
        setRestaurantList(response.data);
        setLoading(false);
      })
      .catch((error) => alert("Error while getting restaurant list"));
  }, []);

  //handles search bar text changes
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  //renders list of restaurants, also handles search bar filters
  function renderRestaurantList() {
    let filteredList = restaurantList.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredList.map((restaurant, index) => (
      <RestaurantItem
        key={index}
        restaurant={restaurant}
        setRestaurantId={props.setRestaurantId}
      />
    ));
  }
  return (
    <div className="restaurant">
      <h1>Seja bem-vindo!</h1>
      <SearchBar title="Pesquisar Restaurantes" handleChange={handleChange} />
      <div className="restaurant-list">
        {loading ? (
          <div className="loading">Carregando, por favor aguarde...</div>
        ) : (
          renderRestaurantList()
        )}
      </div>
    </div>
  );
}
