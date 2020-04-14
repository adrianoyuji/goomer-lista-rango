import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Restaurants from "./components/Screens/Restaurants/Restaurants";
import Menu from "./components/Screens/Menu/Menu";

//Developed by Adriano Vasconcelos
//Renders restaurant list until a restaurant is selected,
//if a restaurant is selected it renders the
//selected restaurant information and menu

function App() {
  const [restaurantId, setRestaurantId] = useState("");

  function renderRestaurants() {
    return <Restaurants setRestaurantId={setRestaurantId} />;
  }

  function renderMenu() {
    return (
      <Menu restaurantId={restaurantId} setRestaurantId={setRestaurantId} />
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="body">
        {restaurantId ? renderMenu() : renderRestaurants()}
      </div>
    </div>
  );
}

export default App;
