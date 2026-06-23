import React, { useContext, useState } from "react";
// React import ho raha hai hooks ke saath (useContext data share karne ke liye, useState screen par changes dikhane ke liye).
import axios from "axios";
// axios import kiya taaki backend API ko request bhej sakein (checkout data send karne ke liye).
import { RestaurantContext } from "../context/RestaurantContext";
// Global data storage (RestaurantContext) se connect ho rahe hain taaki cart ki details mil sakein.

const Cart = () => {
  // Yahan se apna main Cart naam ka function/component shuru ho raha hai.
  const { totalPrice, emptyCart } = useContext(RestaurantContext);
  // Context se 2 cheezein nikaali: totalPrice (total bill kitna hua) aur emptyCart (checkout ke baad cart saaf karne ka function).
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  // Ek state banayi jo yaad rakhegi ki checkout chal raha hai ya nahi. Shuru mein yeh false (band) hai.

  const generateOrderId = () => {
    // Generate a unique order ID
    // (you can use a library like uuid for a more robust solution)
    // Ek simple function banaya jo har order ke liye ek random number (0 se 999 ke beech) generate karega order ID ke naam par.
    return `${Math.floor(Math.random() * 1000)}`;
  };

  const handleCheckout = async () => {
    // Yeh tab chalega jab user "Checkout" button par click karega. Yeh async hai kyunki backend ka wait karna padega.
    try {
      setIsCheckingOut(true);
      // Jaise hi click hua, isko true kar diya taaki button par "Checking out..." likha aa jaye aur user baar-baar click na kare.

      const orderId = generateOrderId();
      // Upar wale function ko call karke ek random order ID generate kar li.

      // Assuming you have a backend endpoint to handle the checkout
      const response = await axios.post(
        "http://localhost:5000/previousOrders",
        {
          orderId,
          dateOfOrder: new Date(),
          amount: totalPrice,
        },
      );
      // Backend server (localhost:5000) par POST request bheji order ID, aaj ki date, aur total price ke saath, taaki order save ho jaye. await lagaya taaki response aane ka wait ho.

      console.log(response.data);
      // Server se jo bhi reply aaya, usko browser ke console mein print kar diya check karne ke liye.
      emptyCart();
      // Order successfully place ho gaya, toh ab cart ko khaali (zero) kar diya.
    } catch (error) {
      // Agar server down hai ya checkout fail ho gaya, toh error console mein dikha dega taaki app crash na ho.
      console.error("Error during checkout:", error.message);
    } finally {
      // Chahe order hit ho ya fail, aakhiri mein checking out ka kaam khatam, toh state wapas false kar di.
      setIsCheckingOut(false);
    }
  };

  return (
    // Yahan se HTML jaisa dikhne wala (JSX) code shuru ho raha hai jo user ko screen par dikhega.
    <div className="cart-container">
      <h2>Cart</h2>
      {/* Screen par bada sa "Cart" heading dikhane ke liye. */}
      <div className="cart-content">
        <span style={{ color: "brown" }}>Total Price: </span> ${totalPrice}
        {/* Brown color mein "Total Price:" likha aayega aur uske aage cart ka total bill dikhega. */}
        <button onClick={handleCheckout} disabled={isCheckingOut}>
          {/* Ek button banaya jispar click karne se handleCheckout chalega. Agar process chal raha hai (isCheckingOut true hai), toh button click hona band (disabled) ho jayega. */}
          {isCheckingOut ? "Checking out..." : "Checkout"}
          {/* Agar backend par data ja raha hai toh button par "Checking out..." likha dikhega, nahi toh normal "Checkout" dikhega. */}
        </button>
      </div>
    </div>
  );
};

export default Cart;
// Iskko export kar diya taaki app ke dusre files mein is component ko use kiya ja sake.
