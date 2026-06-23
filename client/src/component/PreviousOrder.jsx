//PreviousOrders.js

import React, { useState, useEffect } from "react";
// React ke saath 2 hooks import ho rahe hain: useState (orders ka data save rakhne ke liye) aur useEffect (page load hote hi backend se data kheenchne ke liye).
import axios from "axios";
// React ke saath 2 hooks import ho rahe hain: useState (orders ka data save rakhne ke liye) aur useEffect (page load hote hi backend se data kheenchne ke liye).
const PreviousOrders = ({ handleShow }) => {
  // PreviousOrders naam ka function/component shuru ho raha hai. Isko props mein ek handleShow function mil raha hai jo is page/modal ko band karne ke kaam aayega.
  const [orders, setOrders] = useState([]);
  // Ek state banayi orders naam ki jahan saare purane orders save honge. Shuru mein yeh ek khaali list ([]) hai.

  useEffect(() => {
    // Yeh hook tab chalta hai jab yeh component screen par pehli baar aata hai. Aakhiri mein [] lagane ka matlab hai ki yeh bas ek hi baar chalega.
    const fetchOrders = async () => {
      // useEffect ke andar ek async function banaya jo backend se data lane ka kaam karega.
      try {
        // Safe coding ke liye use hota hai. Agar try ke andar ka code sahi chala toh sahi, warna agar koi gadbad hui toh catch us error ko handle kar lega taaki app crash na ho.
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/previousOrders`,
        );
        // Backend URL par GET request maari taaki saare purane orders mil jayein. await lagaya taaki jab tak server se reply na aaye, code ruka rahe.
        setOrders(response.data);
        // Server se jo orders ka data mila, usko humne setOrders use karke apni state mein save kar diya taaki screen par dikhne lage.
      } catch (error) {
        // Agar server down hai ya internet nahi chal raha, toh error message browser ke console mein print ho jayega
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
    // Upar jo fetchOrders function banaya tha, usko yahan call (chalana) kar diya.
  }, []);

  return (
    // Yahan se JSX shuru ho raha hai jo browser mein as HTML render hoga.
    <div className="previous-orders-container">
      {/* Ek main box banaya jo pure previous orders page ko wrap kar raha hai. */}
      <h2>Your Previous Orders</h2>
      {/* Ek badhiya si heading daal di screen par: Your Previous Orders. */}
      <button
        style={{ backgroundColor: "white", color: "red" }}
        onClick={handleShow}
      >
        Close
      </button>
      {/* Ek button banaya jiska background white hai aur text red hai. Ispar click karte hi props wala handleShow function chalega aur yeh page/modal close ho jayega. */}
      <ul className="orders-list">
        {/* Ek unordered list (<ul>) banayi jiske andar saare orders ek-ek karke list items (<li>) bankar aayenge. */}
        {orders.map((order) => (
          // Yahan map loop chal raha hai. State mein jitne bhi orders hain, un sab par ek-ek karke loop ghumega aur har order ke liye niche wala card banayega.
          <li key={order.orderId} className="order-card">
            {/* Har ek order ke liye ek list item (<li>) box banaya. React ko confuse hone se bachane ke liye ek unique key di jisme order ki ID daal di. */}
            <h3>Order #{order.orderId}</h3>
            {/* Heading mein order ka number (ID) dikha diya, jaise: Order #123. */}
            <div className="order-details">
              <div>Items: 1</div>
              <div>Total Amount: ${order.amount.toFixed(2)}</div>
            </div>
            {/* Ek details ka section banaya jahan abhi hardcoded (fix) likha hai ki 1 item order hua tha. */}
            <div>
              Ordered on: {new Date(order.dateOfOrder).toLocaleDateString()}
              {/* Order ka total bill dikha diya. .toFixed(2) ka matlab hai ki price hamesha decimal ke baad 2 numbers tak dikhega (jaise $45.50). */}
            </div>
          </li>
        ))}
      </ul>
      {/* Saare tags close kiye aur component ko export kar diya taaki baaki files mein use ho sake. */}
    </div>
  );
};

export default PreviousOrders;
