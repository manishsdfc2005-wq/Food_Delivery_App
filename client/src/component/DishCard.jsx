import React, { useContext } from "react";
// React import ho raha hai aur saath mein useContext hook bhi, taaki global data storage se functions use kar sakein.
import { RestaurantContext } from "../context/RestaurantContext";
// Apne main storage (RestaurantContext) ko import kiya taaki cart mein item dalne wale functions mil sakein

const DishCard = ({ dish }) => {
  // DishCard naam ka component shuru ho raha hai. Yeh props mein ek dish object leta hai (jisme dish ka naam, price, aur photo hoti hai).
  const { handleAddItems, handleRemoveItems } = useContext(RestaurantContext);
  // Context se 2 main functions nikaale: handleAddItems (item add karne ke liye) aur handleRemoveItems (item hatane ke liye).
  const handleAdd = () => {
    handleAddItems(dish);
  };
  // Ek chhota function banaya jo click hone par current dish ko cart mein add karne wale function ko bhej deta hai.

  const handleRemove = () => {
    handleRemoveItems(dish);
  };
  // Dusra function jo click hone par current dish ko cart se hatane wale function ko pass karta hai.

  return (
    // Yahan se JSX (HTML jaisa code) shuru ho raha hai jo user ko screen par dikhega.
    <div className="dish-card">
      {/* Ek main box (container) banaya jiske andar dish ki saari details aayengi. */}
      <h3>{dish.name}</h3>
      {/* Heading mein dish ka naam (jaise Paneer Tikka) print kar diya. */}
      <img src={dish.image} alt="" />
      {/* Dish ki photo dikhane ke liye image tag lagaya jisme source (src) dish ka image URL hai. */}
      <p>Price: ${dish.price}</p>
      {/* Paragraph tag mein dish ka price show kar diya. */}

      <div
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Buttons ko tameez se ek line mein side-by-side set karne ke liye inline CSS lagayi hai. */}
        <button onClick={handleAdd}>+</button>
        {/* Plus (+) button jispar click karte hi handleAdd function chalega aur item cart mein add ho jayega. */}
        <button onClick={handleRemove}>-</button>
        {/* Minus (-) button jispar click karte hi handleRemove chalega aur item cart se kam ho jayega. */}
      </div>
    </div>
  );
};

export default DishCard;
// Isko export kar diya taaki Menu wale page par is card ko baar-baar use kiya ja sake.
