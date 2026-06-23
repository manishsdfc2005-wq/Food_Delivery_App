import React, { createContext, useState, useEffect } from "react";
// React ke saath createContext (global data banane ke liye) aur baki hooks import kiye.
import axios from "axios";
// Backend se restaurants ka data lane ke liye axios import kiya.
const RestaurantContext = createContext();
// Ek naya context box (RestaurantContext) bana diya jahan sara shared data rahega.
const RestaurantProvider = ({ children }) => {
  // Yeh ek provider component hai jo apne andar wrap hone wale saare components (children) ko data distribute karega.
  const [restaurants, setRestaurants] = useState([]);
  // Saare restaurants ki list ko store karne ke liye state banayi, shuru mein yeh khali list ([]) hai.
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  // User ne kis restaurant par click kiya, use yaad rakhne ki state hai. Shuru mein koi selected nahi hai (null).
  const [cartItems, setCartItems] = useState([]);
  // Cart mein kaunse food items dale hain, unhe track karne ke liye state banayi.
  const [totalPrice, setTotalPrice] = useState(0);
  // Total bill kitna hua, uski state hai. Shuru mein yeh 0 rupaye hai.
  useEffect(() => {
    // Jaise hi app load hogi, yeh automatic chalega backend se data lane ke liye.
    const fetchRestaurants = async () => {
      // Backend se restaurants uthane ke liye ek async function banaya.
      try {
        const response = await axios.get("http://localhost:5000/restaurants");
        // Backend local server se saare restaurants ka data hit karke mangwaya.
        setRestaurants(response.data);
        // Data milte hi use restaurants state mein save kar diya.
      } catch (error) {
        console.error("Error fetching restaurants:", error.message);
        // Agar database se data na mile ya server down ho, toh error console mein print ho jaye.
      }
    };

    fetchRestaurants();
    // Upar wale API call function ko run (execute) kiya.
  }, []);

  const handleAddItems = (dish) => {
    // Cart mein item add karne ka main function jo argument mein clicked dish leta hai aur debug ke liye use console mein dikhata hai.
    console.log("Dish:", dish);

    // Check if the dish already exists in the cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === dish._id,
    );
    // Yeh line cart mein dhoondti hai ki kya yeh dish pehle se cart mein padi hai? Agar mili toh uska index (position) degi, nahi toh -1 degi.

    if (existingItemIndex !== -1) {
      // Agar index -1 nahi aya, matlab item cart mein PEHLE SE HAI.
      // If the dish already exists, update
      // the quantity or any other logic
      console.log(
        "Dish already exists in the cart. You may want to update the quantity.",
      );
      // Purane cart items ki ek copy banayi taaki original state ko seedhe chhede bina update kar sakein.
      // Example: Increment the quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: updatedCartItems[existingItemIndex].quantity + 1,
      };
      // Uski purani details wahi rakhi bas uski quantity ko +1 badha diya.
      //   console.log('cart',cartItems.length);
      //    setTotalPrice(prev=>prev-dish.price)

      setCartItems(updatedCartItems);
      // Updated list ko cart ki nayi state bana diya.
    } else {
      // If the dish is not in the cart, add it
      // else ka matlab item cart mein PEHLI BAAR aa raha hai.
      console.log("Dish does not exist in the cart. Adding to the cart.");
      console.log("cart", cartItems.length);
      //   setTotalPrice(prev=>prev-dish.price)

      setCartItems([...cartItems, { ...dish, quantity: 1 }]);
      // Purane saare cart items ko rakha aur saath mein nayi dish ko list mein add kar diya quantity: 1 ke saath.
    }
    setTotalPrice((prev) => prev + dish.price);
    // Item chahe naya ho ya purana, total bill mein us dish ki price add (+) kar di.
  };

  const handleRemoveItems = (dish) => {
    // Cart se item kam karne ya hatane ka function shuru hua.
    console.log("Dish ID to remove:", dish);

    // Check if the dish exists in the cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === dish._id,
    );
    // Phir se check kiya ki woh item cart mein kis position par hai.

    if (existingItemIndex !== -1) {
      // If the dish exists, decrement the
      // quantity or remove it from the cart
      console.log(
        "Dish exists in the cart. You may want to decrease the quantity or remove it.",
      );
      // Agar item cart mein mila, toh uski ek safe copy taiyar ki changes karne ke liye.

      const updatedCartItems = [...cartItems];

      if (updatedCartItems[existingItemIndex].quantity > 1) {
        // Agar item ki quantity 1 se zyada hai (jaise 2 ya 3 pizza hain).
        // If the quantity is greater than 1, decrement the quantity
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity - 1,
        };
        // Toh bas uski quantity mein se ek minus (-1) kar diya.
        setTotalPrice(totalPrice - cartItems[existingItemIndex].price);
        // Aur total bill mein se us single item ki price ghata di.
      } else {
        // If the quantity is 1, remove the dish from the cart
        updatedCartItems.splice(existingItemIndex, 1);
        // else matlab quantity sirf 1 hi bachi thi. Ab minus karne par zero ho jayegi, isliye splice use karke us item ko cart se poora delete mar diya.
        setTotalPrice(totalPrice - cartItems[existingItemIndex].price);
        // Aur total bill se uski price minus kar di.
      }

      setCartItems(updatedCartItems);
      // Nayi updated list ko final cart state set kar diya.
    } else {
      // Agar koi aisi dish remove karne ki koshish kare jo cart mein hai hi nahi, toh bas console mein message dikha dega.
      // If the dish is not in the cart,
      // log a message or handle accordingly
      console.log("Dish does not exist in the cart.");
    }
  };

  const emptyCart = () => {
    // Cart ko ek jhatke mein poora saaf karne ka function (items empty aur total price zero).
    setCartItems([]);
    setTotalPrice(0);
  };
  const value = {
    // Ek bada packet (object) banaya jisme saari states aur functions pack kar diye jo baaki components ko chahiye honge.
    restaurants,
    selectedRestaurant,
    setSelectedRestaurant,
    handleAddItems,
    handleRemoveItems,
    totalPrice,
    emptyCart,
  };

  return (
    // Context Provider ki madad se woh packet (value) pure app ke components (children) ko baant diya.
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
// Dono cheezon ko export kiya taaki baaki files use kar sakein.
