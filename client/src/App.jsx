import React, { useContext } from "react";
import RestaurantList from "./component/RestaurantList";
import DishesMenu from "./component/DishesMenu";
import Cart from "./component/Cart";
import { RestaurantContext } from "./context/RestaurantContext";
import "./App.css"; // Import the CSS file

const App = () => {
  const { selectedRestaurant } = useContext(RestaurantContext);

  return (
    <>
      <div className="container">
        <h1 className="header">GFG Food Delivery App</h1>
        <Cart style={{ position: "absolute", right: "20px", top: "20px" }} />
        <RestaurantList />
        {selectedRestaurant && <DishesMenu />}
      </div>
    </>
  );
};

export default App;
