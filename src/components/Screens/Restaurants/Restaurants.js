import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Restaurants.css";
import Spinner from "react-bootstrap/Spinner";
import SearchBar from "../../SearchBar/SearchBar";
import RestaurantItem from "./RestaurantItem";

const goomer_restaurant_api = "https://challange.goomer.com.br/restaurants";

/* this component renders all the available restaurants gotten from the api */

export default function Restaurants(props) {
  const [restaurantList, setRestaurantList] = useState("");
  const [loading, setLoading] = useState(true);
  const [fakeLoading, setFakeLoading] = useState(false);
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
    setFakeLoading(true);
  };

  //renders list of restaurants, also handles search bar filters
  function renderRestaurantList() {
    let filteredList = restaurantList.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (fakeLoading) {
      setTimeout(() => {
        setFakeLoading(false);
      }, 500); // 0.5 second
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return filteredList.map((restaurant, index) => (
        <RestaurantItem
          key={index}
          restaurant={restaurant}
          setRestaurantId={props.setRestaurantId}
        />
      ));
    }
  }

  return (
    <div className="restaurant">
      <div className="welcome">Seja bem-vindo!</div>
      <SearchBar title="Pesquisar Restaurantes" handleChange={handleChange} />
      <div className="restaurant-list">
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          renderRestaurantList()
        )}
      </div>
    </div>
  );
}
