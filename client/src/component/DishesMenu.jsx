import React, { useContext } from "react";
// React aur useContext hook ko import kiya, taaki global state (data) ko access kiya ja sake.
import DishCard from "./DishCard";
// Jo card humne pichli baar banaya tha (DishCard), usko yahan import kar liya taaki har ek dish ke liye use kar sakein.
import { RestaurantContext } from "../context/RestaurantContext";
// Apne main context (data hub) ko connect kiya jahan saari restaurant details saved hain.
const DishesMenu = () => {
  // Yahan se DishesMenu naam ka functional component shuru ho raha hai jo menu page dikhayega.
  const { selectedRestaurant } = useContext(RestaurantContext);
  // Context se humne woh restaurant nikaal liya jisko user ne select kiya hai (selectedRestaurant).

  return (
    // Yahan se JSX shuru ho raha hai jo screen par render hoga (dikhega).
    <div>
      {/* Ek simple container open kiya aur upar ek sahi si heading daal di: Menu. */}
      <h2>Menu</h2>
      {selectedRestaurant && (
        // Yeh ek check (conditional rendering) hai. Iska matlab hai: "Agar koi restaurant selected HAI, tabhi aage ka code chalao, warna screen par kuch mat dikhao (taki app crash na ho agar data na mile)."
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Ek flexible box banaya jisme saare dish cards ek ke baad ek side-by-side aayenge. flexWrap: "wrap" ka matlab hai ki agar screen par jagah khatam ho jaye, toh card automatic niche wali line mein chala jaye. */}
          {selectedRestaurant.menu.map((dish) => (
            // Yahan map loop chal raha hai. Restaurant ke andar jo dishes ki list (menu) hai, uske ek-ek item (dish) par yeh loop ghumega.
            <DishCard key={dish.name} dish={dish} />
            // Loop ke andar har ek dish ke liye hum ek <DishCard> generate kar rahe hain. React ko samjhane ke liye ek unique key di (dish ka naam) aur dish ka saara data prop ke roop mein card ko bhej diya.
          ))}
          {/* Yahan par map loop aur conditional check (&&) dono khatam ho rahe hain. */}
        </div>
      )}
    </div>
  );
};

export default DishesMenu;
// Isko export maara taaki is pure menu page ko App.js ya kisi aur bade page par dikha sakein.
